---
layout: post
title: "X API, POSSE, and the Cost of Automation"
date: 2026-04-05 12:00:00 +0800
description: "I wanted to auto-syndicate blog posts to X. Then I found out every API request costs money. Here's why that might actually be fine."
cover_image: "/assets/images/x-api-posse-cost-automation-cover.png"
---

<p>Most newsletter setups start with "sign up for Mailchimp." My POSSE experiment started with "how hard could posting to X be?" Turns out, pretty hard – or at least, surprisingly expensive.</p>

<h2 id="posse"><a href="https://indieweb.org/POSSE#">POSSE</a></h2>

<p>POSSE stands for <strong>Publish (on your) Own Site, Syndicate Elsewhere</strong>. The idea is simple: you own the canonical copy of your content, but you push copies to wherever your readers are.</p>

<p>The appeal is obvious. Your blog is yours. The URLs are yours. But your friends aren't all going to subscribe to your RSS feed. So you syndicate. Write once, publish everywhere.</p>

<p>I wanted to build it into my Rails blog. Write a post, hit publish, and have it automatically post a summary with a link to X. Classic POSSE.</p>

<h2 id="the-x-api-today">The X API Today</h2>

<p>X's <a href="https://docs.x.com/overview">developer documentation</a> used to say "get started with a free API key." Now it says "purchase API credits."</p>

<p>The current model is <strong>pay-per-usage</strong>. You buy credits upfront. Different endpoints cost different amounts. There's a 24-hour deduplication window – request the same post twice in a day, pay once. The free tier is effectively gone for new developers.</p>

<p>For someone who posts occasionally – say, a few times a month – the economics don't work. You're buying credits upfront for a trickle of posts. The dream of automatic POSSE-to-X died quickly.</p>

<h2 id="why-i-get-it">Why I Get It</h2>

<p>AI-generated content is cheap to produce. Ungodly amounts of it can be generated for pennies. If the API were free, X would be flooded with AI posts, bot replies, and automated engagement farming.</p>

<p>Nobody wants to use a platform where everything might be AI-generated. X is essentially saying: programmatic access costs money. This filters out low-value automation. It makes spam uneconomical.</p>

<p>The pricing isn't about extracting revenue from legitimate developers. It's a defense against the AI flood. Rate limits add another layer – even with credits, you can't fire off unlimited requests. Billing blocks abuse; rate limits protect infrastructure.</p>

<h2 id="paid-api-free-app">Paid API, Free App</h2>

<p>The website and official apps are free. The API costs money. How?</p>

<p>X's apps use first-party OAuth credentials that the gateway recognizes as trusted. Third-party developers get different keys. The gateway inspects every request: first-party passes through, third-party gets metered and billed. Same API, different treatment based on the key.</p>

<p>Could you extract the app's keys and impersonate it? Technically possible, but X layers defenses: certificate pinning, code obfuscation, device attestation, behavioral detection. The goal isn't perfect security – it's making the legitimate path easier than the adversarial one.</p>

<p>This pattern is spreading. OpenAI charges for API tokens while ChatGPT the app is free. Reddit has paid API tiers. Google Maps has for years. The model is: humans through the app, free; machines through the API, metered.</p>

<h2 id="what-now">What Now</h2>

<p>I'll keep posting to X manually when I feel like it. The POSSE dream lives on for platforms with friendlier APIs – Mastodon, Bluesky, RSS, webmentions.</p>

<p>A platform that costs a little to automate is better than one that's free to drown in AI slop. Sometimes the right technical decision is the one that makes the easy thing expensive.</p>
