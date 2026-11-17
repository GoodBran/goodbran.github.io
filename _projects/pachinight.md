---
title: Pachinight
order: 1
kind: game
status: free download
description: A pixel-art ball-drop roguelike set in a late-night arcade. Score Chips × Mult and build a machine that can clear eight antes.
started: 2026-10-23
platforms: [macOS, Windows, Linux]
stack: [DragonRuby, Ruby]
cover_image: /assets/images/projects/pachinight.webp
cover_width: 1280
cover_height: 720
cover_alt: "Pachinight in fever on a late ante: five charms equipped and a 41,000,000 score against a 1,100,000 target"
thumbnail: /assets/images/projects/pachinight-thumb.webp
links:
  - label: Get the game
    url: https://pachinight.goodbran.com/
---

Pachinight is a pachinko-style roguelike: shoot balls through a board of pins, score **Chips × Mult**, and beat each blind's target through eight antes. It's free for macOS, Windows and Linux, in English and 简体中文.

## How a run works

Each ante has a Small, Big and Boss blind. A blind gives you a fresh supply of balls and a score target. Hit the target and you cash out, then spend your winnings in the shop before the next blind.

- **Shoot.** Hold Space or the mouse to charge, release to fire. Balls bounce through the pins into pockets that pay chips, mult or spins.
- **Time the extras.** Hold a spin for the right moment, and spend fever tickets when the board is set up to pay.
- **Build between blinds.** Combine charms, upgraded pins and special balls into a machine that keeps up with rising targets.
- **Expect surprises.** Boss blinds change the rules, crew members bring passives, and each of the eight antes dresses the board in its own look.

## How it's made

The game is written in Ruby with [DragonRuby Game Toolkit](https://dragonruby.org), which hot-reloads code while the game runs. That made tuning scoring and feel fast: change a number, watch the next ball. One export script packages builds for every platform, and the [landing page](https://pachinight.goodbran.com/) runs on Cloudflare.
