---
layout: post
title: "HomeAway: A Small CLI for Switching Wi-Fi Modes"
date: 2026-04-12 12:00:00 +0800
category: devops
description: "At home I use a side router and manual Wi-Fi settings. Outside I need DHCP. HomeAway turns that repetitive macOS network shuffle into one command."
cover_image: "/assets/images/homeaway-cli-switching-wifi-modes-cover.webp"
---

<blockquote>
  <p><a href="https://github.com/GoodBran/homeaway">HomeAway</a> is a tiny macOS CLI that flips my Wi-Fi between manual and DHCP mode. It exists because I got tired of digging through System Settings every time I left home.</p>
</blockquote>

<p>At home, my setup is a little strange but very effective.</p>

<p>I keep a side router around specifically for traffic that needs to get past the Great Firewall. When I am home, I point my Mac at that router with manual Wi-Fi settings and let it handle the first proxy layer. From there I can add a second VPN on macOS, like NordVPN, if I want another layer on top.</p>

<p>Outside, that setup falls apart. The side router is not with me, so manual mode is useless. I need DHCP just to get normal internet access. And without that first router-based proxy layer, NordVPN is usually not an option either. I can still use Clash or another local proxy for basic GFW bypass, but the network setup on the Mac has to change first.</p>

<p>That small switch between home and away turned into a recurring nuisance: open settings, find Wi-Fi, flip from manual to DHCP or back, recheck router and DNS values, then hope I did not leave something half-configured.</p>

<p>So I made HomeAway.</p>

<h2 id="what-it-does">What it does</h2>

<p>HomeAway is not a full network manager. It is a thin wrapper around the one thing I actually keep doing.</p>

<ul>
  <li>Detect the Wi-Fi interface</li>
  <li>Switch between manual mode and DHCP</li>
  <li>Pick an available IP when switching back to manual</li>
  <li>Optionally clear DNS when returning to DHCP</li>
</ul>

<p>Install it:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>gem <span class="nb">install </span>homeaway
</code></pre></div></div>

<p>Run it:</p>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>homeaway
</code></pre></div></div>

<p>On first run it asks for the router address, DNS server, and whether DHCP mode should clear DNS settings. After that, it just remembers.</p>

<h2 id="why-this-exists">Why this exists</h2>

<p>The point is not sophistication. The point is removing friction from a real routine.</p>

<p>I know exactly when I want manual mode: at home, with the side router. I know exactly when I want DHCP: everywhere else. That should be a one-command decision, not a small trip through macOS settings.</p>

<p>That is all HomeAway does. Small tool, specific job, less clicking.</p>
