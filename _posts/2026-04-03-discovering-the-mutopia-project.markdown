---
layout: post
title: "Discovering the Mutopia Project"
date: 2026-04-03 12:00:00 +0800
description: "A free library of public domain sheet music that fits perfectly into a code-first workflow."
cover_image: "/assets/images/discovering-the-mutopia-project-cover.png"
---

<p>I stumbled onto the <a href="https://www.mutopiaproject.org/">Mutopia Project</a> while looking for trustworthy sheet music sources. Their entire collection is open source on <a href="https://github.com/MutopiaProject/MutopiaProject">GitHub</a>.</p>

<p>It is exactly what I needed: a volunteer-run archive of public domain scores, all typeset in LilyPond and freely licensed. No sketchy PDFs from questionable corners of the internet. Just clean, engrave-ready source files.</p>

<h2 id="why-it-matters-for-learning">Why it matters for learning</h2>

<p>When you are learning piano, finding good beginner material is harder than it should be. Most free sheet music online is either:</p>

<ul>
  <li>Low-quality scans with blurry notation</li>
  <li>Copyrighted material in a legal gray zone</li>
  <li>Watermarked previews trying to sell you something</li>
</ul>

<p>The Mutopia Project is none of that. Every piece is verified public domain, professionally typeset, and available as a <code>.ly</code> source file.</p>

<h2 id="what-i-found">What I found</h2>

<p>The first piece I grabbed was the <strong>Minuet in G Major (BWV Anh. 114)</strong> from the Anna Magdalena Bach notebook. It is the perfect beginner piece: simple hand positions, clear melody, just enough ornamentation to teach mordents.</p>

<p>The source file compiled cleanly. One <code>rake</code> task later I had PDF, SVG, MIDI, and audio rendered with my Grand Piano soundfont.</p>

<h2 id="the-workflow">The workflow</h2>

<p>The beautiful part is that Mutopia scores integrate directly into a code-based pipeline:</p>

<ol>
  <li>Download the <code>.ly</code> file</li>
  <li>Run the LilyPond compiler</li>
  <li>Get web-ready assets: SVG for display, PDF for printing, audio for playback</li>
</ol>

<p>Because the source is plain text, you can version it, diff it, and review changes like any other code file.</p>

<h2 id="whats-available">What's available</h2>

<p>The collection spans centuries: Bach minuets, Burgmüller etudes, Clementi sonatinas, Beethoven dances. Most of the standard beginner repertoire is there, waiting to be compiled.</p>

<p>For anyone building a piano learning tool or just collecting repertoire, Mutopia is a goldmine. Free, legal, and built for the same source-code mindset that makes LilyPond appealing in the first place.</p>
