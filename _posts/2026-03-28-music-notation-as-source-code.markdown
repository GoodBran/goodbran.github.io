---
layout: post
title: "Music Notation as Source Code"
date: 2026-03-28 12:00:00 +0800
category: music
description: "LilyPond turns plain text into engraved sheet music, and that makes it feel like code."
cover_image: "/assets/images/music-notation-as-source-code-cover.webp"
---

<p>I am very new to music, so what struck me about LilyPond was how much it feels like code.</p>

<p><a href="https://lilypond.org/">LilyPond</a> takes a plain text file and produces engraved sheet music.</p>

<h2 id="the-text-file-is-the-score">The text file is the score</h2>

<p>Instead of dragging notes around a canvas, you describe the music directly:</p>

<pre><code class="language-lilypond">\relative c' {
  \key c \major
  \time 4/4
  c4 e g e |
  d4 f a f |
}
</code></pre>

<p>Even without knowing much music, I can read the shape of this. Key, time signature, notes, rhythm – all as text.</p>

<p>If you spend the day in a code editor, this feels familiar. You write a file, compile it, and get an artifact. It just happens to be music.</p>

<h2 id="why-it-fits">Why it fits</h2>

<p>What makes LilyPond interesting is that the source stays readable and diffable. You can review changes, track revisions, and keep the <code>.ly</code> file in the same repository as the rest of your project.</p>

<p>The output matters too. LilyPond gives you professional-looking results without nudging everything by hand.</p>

<h2 id="where-it-went">Where it went</h2>

<p>I started with a small experiment and quickly liked the workflow. A rake task compiles <code>.ly</code> files into SVG and PDF, so it fits naturally into a codebase.</p>

<p>Text file in, engraved score out, automated build. Exactly the kind of workflow I want.</p>
