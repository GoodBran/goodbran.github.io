---
layout: post
title: "Moving Assets to Cloudflare R2"
date: 2026-04-04 12:00:00 +0800
category: devops
description: "Stop committing MP3s and PDFs to Git. Serve them from R2 instead—zero egress fees, local development still works, and your repo shrinks by 30MB."
cover_image: "/assets/images/moving-assets-to-cloudflare-r2-cover.webp"
---

<p>Binary files in Git are a trap. They bloat your repo, slow clones, and create false promises of version control. When you change one pixel in a 5MB image, Git stores another 5MB. Do this enough and your repository becomes a burden.</p>

<p>My sheet music project was heading there. Each piano score generated five files: SVG, PDF, MIDI, MP3, and the LilyPond source. Plus a bird guessing game with 13 bird photos and 8 audio clips. 32 files, 33MB, all checked into Git.</p>

<p>Cloudflare R2 fixes this. Zero egress fees, S3-compatible API, cheap storage. Here's the setup.</p>

<h2 id="the-architecture">The architecture</h2>

<table>
  <thead>
    <tr>
      <th>Environment</th>
      <th>Files served from</th>
      <th>URL base</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Development</td>
      <td>
<code>public/music/</code> and <code>public/projects/</code>
</td>
      <td><code>/music</code></td>
    </tr>
    <tr>
      <td>Production</td>
      <td>R2 bucket</td>
      <td><code>https://cdn.goodbran.com/music</code></td>
    </tr>
  </tbody>
</table>

<p>Same code, different sources. Rails environment determines where files come from.</p>

<h2 id="uploading-with-rclone">Uploading with rclone</h2>

<p>R2 uses S3-compatible API. rclone speaks that natively.</p>

<p>Configure once:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>rclone config
<span class="c"># Choose "Amazon S3", enter your R2 access key and secret</span>
<span class="c"># Endpoint: https://&lt;account_id&gt;.r2.cloudflarestorage.com</span>
</code></pre></div></div>

<p>Then sync:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>rclone <span class="nb">sync </span>public/music/ r2:goodbran/music/
rclone <span class="nb">sync </span>public/projects/ r2:goodbran/projects/
</code></pre></div></div>

<p>I added rake tasks for convenience:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>rails assets:sync_music      <span class="c"># Sync sheet music</span>
rails assets:sync_projects   <span class="c"># Sync project files</span>
rails assets:sync_all        <span class="c"># Both</span>
</code></pre></div></div>

<h2 id="environment-aware-urls">Environment-aware URLs</h2>

<p>The <code>Content::Sheet</code> model generates asset URLs. In production, they point to the CDN. In development, they point to local files.</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Content::Sheet</span> <span class="o">&lt;</span> <span class="no">Perron</span><span class="o">::</span><span class="no">Resource</span>
  <span class="no">CDN_BASE</span> <span class="o">=</span> <span class="no">Rails</span><span class="p">.</span><span class="nf">env</span><span class="p">.</span><span class="nf">production?</span> <span class="p">?</span> 
    <span class="s2">"https://cdn.goodbran.com/music"</span> <span class="p">:</span> <span class="s2">"/music"</span>

  <span class="k">def</span> <span class="nf">pdf_url</span>
    <span class="s2">"</span><span class="si">#{</span><span class="no">CDN_BASE</span><span class="si">}</span><span class="s2">/</span><span class="si">#{</span><span class="n">pdf_filename</span><span class="si">}</span><span class="s2">"</span> <span class="k">if</span> <span class="n">pdf_filename</span><span class="p">.</span><span class="nf">present?</span>
  <span class="k">end</span>
<span class="k">end</span>
</code></pre></div></div>

<p>No configuration files, no environment variables. The code knows where it lives.</p>

<h2 id="removing-from-git">Removing from Git</h2>

<p>After syncing to R2, I removed the assets from Git tracking:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c"># Update .gitignore</span>
<span class="nb">echo</span> <span class="s2">"/public/music/*"</span> <span class="o">&gt;&gt;</span> .gitignore
<span class="nb">echo</span> <span class="s2">"/public/projects/*"</span> <span class="o">&gt;&gt;</span> .gitignore

<span class="c"># Remove from tracking but keep local files</span>
git <span class="nb">rm</span> <span class="nt">-r</span> <span class="nt">--cached</span> public/music/
git <span class="nb">rm</span> <span class="nt">-r</span> <span class="nt">--cached</span> public/projects/
</code></pre></div></div>

<p>Local files stay for development. Fresh clones get an empty <code>public/music/</code> directory. Run <code>rails lilypond:compile</code> or <code>rclone sync</code> to populate it.</p>

<h2 id="the-workflow-now">The workflow now</h2>

<p><strong>Adding new sheet music:</strong></p>

<ol>
  <li>Create <code>.ly</code> file in <code>app/content/lilypond/</code>
</li>
  <li>Run <code>rails lilypond:compile[new-piece]</code>
</li>
  <li>Files appear in <code>public/music/</code> — works immediately in dev</li>
  <li>Run <code>rails assets:sync_music</code> — now on CDN for production</li>
</ol>

<p><strong>The bird game works the same way.</strong> The <code>ProjectsController</code> builds URLs based on environment, feeding JSON to a Stimulus controller that plays sounds and shows images.</p>

<h2 id="cost-and-limits">Cost and limits</h2>

<p>R2's free tier: 10GB storage, 10 million reads per month. My entire asset collection is under 35MB. It costs nothing.</p>

<p>Even if it grows to 1GB, that's $0.015/month for storage. Egress is free. The only risk is going over 10 million monthly reads, which would cost $0.36 per million after that. For a personal site, unreachable.</p>

<h2 id="summary">Summary</h2>

<ul>
  <li>33MB removed from Git repository</li>
  <li>Deploys are faster (fewer files to copy)</li>
  <li>CDN serves assets globally</li>
  <li>Local development still works offline</li>
  <li>Cost: $0</li>
</ul>

<p>The repo contains source files. The CDN serves generated files. Separation of concerns, finally.</p>
