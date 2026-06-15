---
layout: post
title: "Test the Real Network Before the Event"
date: 2026-06-15 12:00:00 +0800
category: code
description: "A short lesson from two school presentation web apps: always test deployment from the real network before the event."
cover_image: "/assets/images/test-the-real-network-before-the-event-cover.png"
---

Always test the project in the real network environment before the event. A web app can look perfect at home, pass every local test, and still fail in the room where it actually needs to work.

I recently generated a simple web app for my kids' kindergarten school project: [OpenKids Caterpillar](https://github.com/OpenKids/caterpillar). The app looked good. The interactions felt good. We even recorded several sound effects with my kids, which made the little presentation feel personal and fun.

Then the actual event happened.

The deployment was on GitHub Pages, and GitHub is not well supported in China. The loading speed was painfully slow. The sound effects, which were one of the best parts of the project, could not load at all.

Technically, nothing was broken in the app. Practically, the experience was broken.

That was the lesson.

For the next presentation project, [OpenKids Crocodile](https://github.com/OpenKids/crocodile), I wanted to introduce World Crocodile Day and avoid repeating the same mistake. This time I planned to use Cloudflare Pages instead of GitHub Pages.

Luckily, because of the previous failure, I tested it from a normal non-VPN network before the event.

That test found another problem: the default free Cloudflare Pages endpoint uses the `*.workers.dev` domain, and that domain was completely blocked by the China firewall in my test environment. If I had only tested from my usual development setup, I probably would have missed it.

Because I found the issue early, the fix was simple. I added a custom domain for the project, tested again, and it worked.

The takeaway is simple: deployment is part of the product, especially for a presentation. Do not only test the app. Test the URL, the assets, the audio, and the exact network conditions where people will use it.
