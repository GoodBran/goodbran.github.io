---
layout: post
title: "Continuous Deployment with Kamal"
date: 2026-03-27 12:00:00 +0800
category: devops
description: "Push to main, deploy to production. The whole setup in three files and a few secrets."
cover_image: "/assets/images/continuous-deployment-with-kamal-cover.webp"
---

<p>This site deploys on every push to main. No manual steps, no SSH sessions, no forgetting to deploy. Here's how the pieces fit together.</p>

<h2 id="kamal-on-the-server">Kamal on the server</h2>

<p><a href="https://kamal-deploy.org/">Kamal</a> is a deployment tool from 37signals. It wraps Docker containers with zero-downtime deploys, health checks, and rolling restarts.</p>

<p>Configuration lives in <code>config/deploy.yml</code>:</p>

<div class="language-yaml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="na">service</span><span class="pi">:</span> <span class="s">goodbran</span>
<span class="na">image</span><span class="pi">:</span> <span class="s">goodbran/goodbran</span>
<span class="na">servers</span><span class="pi">:</span>
  <span class="pi">-</span> <span class="s">192.0.2.1</span>

<span class="na">registry</span><span class="pi">:</span>
  <span class="na">server</span><span class="pi">:</span> <span class="s">ghcr.io</span>
  <span class="na">username</span><span class="pi">:</span> <span class="s">goodbran</span>
  <span class="na">password</span><span class="pi">:</span>
    <span class="pi">-</span> <span class="s">KAMAL_REGISTRY_PASSWORD</span>

<span class="na">env</span><span class="pi">:</span>
  <span class="na">secret</span><span class="pi">:</span>
    <span class="pi">-</span> <span class="s">RAILS_MASTER_KEY</span>
    <span class="pi">-</span> <span class="s">DATABASE_URL</span>
</code></pre></div></div>

<p>The server runs a Docker container. GitHub Actions builds and pushes that container. Kamal handles the rest.</p>

<h2 id="github-actions-for-ci">GitHub Actions for CI</h2>

<p>The workflow file in <code>.github/workflows/ci.yml</code> runs tests on every push. Not much to say here — standard Rails testing with a Postgres service container.</p>

<h2 id="automatic-deploys">Automatic deploys</h2>

<p>The second workflow in <code>.github/workflows/deploy.yml</code> triggers on pushes to main:</p>

<div class="language-yaml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="na">name</span><span class="pi">:</span> <span class="s">Deploy</span>

<span class="na">on</span><span class="pi">:</span>
  <span class="na">push</span><span class="pi">:</span>
    <span class="na">branches</span><span class="pi">:</span> <span class="pi">[</span> <span class="nv">main</span> <span class="pi">]</span>

<span class="na">jobs</span><span class="pi">:</span>
  <span class="na">deploy</span><span class="pi">:</span>
    <span class="na">runs-on</span><span class="pi">:</span> <span class="s">ubuntu-latest</span>
    <span class="na">steps</span><span class="pi">:</span>
      <span class="pi">-</span> <span class="na">uses</span><span class="pi">:</span> <span class="s">actions/checkout@v4</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s">Setup Docker Buildx</span>
        <span class="na">uses</span><span class="pi">:</span> <span class="s">docker/setup-buildx-action@v3</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s">Login to GitHub Container Registry</span>
        <span class="na">uses</span><span class="pi">:</span> <span class="s">docker/login-action@v3</span>
        <span class="na">with</span><span class="pi">:</span>
          <span class="na">registry</span><span class="pi">:</span> <span class="s">ghcr.io</span>
          <span class="na">username</span><span class="pi">:</span> <span class="s">${{ github.actor }}</span>
          <span class="na">password</span><span class="pi">:</span> <span class="s">${{ secrets.GITHUB_TOKEN }}</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s">Build and push</span>
        <span class="na">uses</span><span class="pi">:</span> <span class="s">docker/build-push-action@v5</span>
        <span class="na">with</span><span class="pi">:</span>
          <span class="na">context</span><span class="pi">:</span> <span class="s">.</span>
          <span class="na">push</span><span class="pi">:</span> <span class="kc">true</span>
          <span class="na">tags</span><span class="pi">:</span> <span class="s">ghcr.io/goodbran/goodbran:${{ github.sha }}</span>
          <span class="na">cache-from</span><span class="pi">:</span> <span class="s">type=gha</span>
          <span class="na">cache-to</span><span class="pi">:</span> <span class="s">type=gha,mode=max</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s">Setup Kamal</span>
        <span class="na">uses</span><span class="pi">:</span> <span class="s">ruby/setup-ruby@v1</span>
        <span class="na">with</span><span class="pi">:</span>
          <span class="na">ruby-version</span><span class="pi">:</span> <span class="s">3.3</span>

      <span class="pi">-</span> <span class="na">name</span><span class="pi">:</span> <span class="s">Deploy with Kamal</span>
        <span class="na">env</span><span class="pi">:</span>
          <span class="na">KAMAL_REGISTRY_PASSWORD</span><span class="pi">:</span> <span class="s">${{ secrets.GITHUB_TOKEN }}</span>
          <span class="na">RAILS_MASTER_KEY</span><span class="pi">:</span> <span class="s">${{ secrets.RAILS_MASTER_KEY }}</span>
          <span class="na">DATABASE_URL</span><span class="pi">:</span> <span class="s">${{ secrets.DATABASE_URL }}</span>
        <span class="na">run</span><span class="pi">:</span> <span class="pi">|</span>
          <span class="s">gem install kamal</span>
          <span class="s">kamal deploy --version=${{ github.sha }}</span>
</code></pre></div></div>

<p>The build uses Docker layer caching via GitHub Actions cache. First deploys are slow; subsequent ones reuse layers.</p>

<h2 id="the-server-setup">The server setup</h2>

<p>The target server needs:</p>

<ul>
  <li>Docker installed</li>
  <li>A user with SSH key access</li>
  <li><code>docker run</code> permissions</li>
</ul>

<p>Kamal connects over SSH, pulls the image, and orchestrates the container swap. It boots the new container, waits for the health check to pass, then redirects traffic and stops the old one.</p>

<h2 id="secrets-management">Secrets management</h2>

<p>Two locations:</p>

<ul>
  <li><strong>GitHub Secrets:</strong> <code>GITHUB_TOKEN</code> (auto), <code>RAILS_MASTER_KEY</code>, <code>DATABASE_URL</code>. These flow into the workflow.</li>
  <li><strong>Server env:</strong> Kamal passes these to the container at runtime.</li>
</ul>

<p>The <code>RAILS_MASTER_KEY</code> unlocks Rails' encrypted credentials. The <code>DATABASE_URL</code> points to the Postgres instance.</p>

<h2 id="the-result">The result</h2>

<p>Push to main. Two minutes later, the change is live. No manual deploy commands, no context switching from coding to ops.</p>

<p>That is continuous deployment: every successful build ships immediately.</p>
