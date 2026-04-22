---
layout: post
title: "From LilyPond to Playable Piano"
date: 2026-03-31 12:00:00 +0800
description: "We now compile LilyPond into sheet music, MIDI, MP3, and OGG, then play it right on the score page."
cover_image: "/assets/images/from-lilypond-to-playable-piano-cover.png"
---

<p>The score pipeline used to stop at display. Today, it goes all the way to sound. A single LilyPond file now compiles into sheet music (SVG, PDF), raw performance data (MIDI), and playable web audio (MP3, OGG) you can listen to right in the browser.</p>

<h2 id="expanding-the-output">Expanding the output</h2>

<p>The flow remains simple: write LilyPond, compile it, publish the results. But the output is much wider. The build task now emits five artifacts for each piece:</p>

<ul>
  <li>
<code>SVG</code> for inline display on the page</li>
  <li>
<code>PDF</code> for printing</li>
  <li>
<code>MIDI</code> for raw performance instructions</li>
  <li>
<code>MP3</code> for broad browser support</li>
  <li>
<code>OGG</code> for an open audio format</li>
</ul>

<p>A score page is no longer just something to look at. It is something to read, download, and hear.</p>

<h2 id="finding-the-sound">Finding the sound</h2>

<p>LilyPond can write MIDI, but MIDI is not audio. It is a set of instructions: play this note, at this time, with this instrument.</p>

<p>To turn that into sound, the build now pipes the MIDI through <code>fluidsynth</code> with a piano SoundFont, then hands the result to <code>ffmpeg</code> for <code>MP3</code> and <code>OGG</code> encoding.</p>

<p>That small change shifts everything. The pipeline feels complete. Text in, sheet music out, audio out.</p>

<h2 id="piano-first">Piano first</h2>

<p>I do not need a hundred synthetic instruments. I just need one decent piano.</p>

<p>Our setup leans hard into that constraint. The score asks for <code>acoustic grand</code>, the local build uses a dedicated piano SoundFont, and the audio path is tuned for that single instrument instead of general MIDI convenience.</p>

<p>It is still a simple system. But it is simple in the right direction.</p>

<h2 id="closing-the-loop">Closing the loop</h2>

<p>The score page keeps the engraved notation, adds fast download links for the new files, and includes a plain native browser audio player.</p>

<p>That is the part I appreciate most. The same text source file now serves three jobs simultaneously:</p>

<ol>
  <li>Readable source in the repository</li>
  <li>Engraved sheet music on the page</li>
  <li>Playable piano audio in the browser</li>
</ol>

<p>It is not a massive feature on paper. But it completes the experience. Write the music. Compile it. See it. Hear it.</p>
