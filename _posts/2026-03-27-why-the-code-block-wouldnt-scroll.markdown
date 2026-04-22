---
layout: post
title: "Why the Code Block Wouldn't Scroll"
date: 2026-03-27 12:00:00 +0800
description: "The code block had `overflow-x: auto` and still refused to scroll. The culprit was the grid item around it."
cover_image: "/assets/images/why-the-code-block-wouldnt-scroll-cover.webp"
---

<p>I had a code block that clearly <em>should</em> scroll. The CSS was already there:</p>

<div class="language-css highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nc">.prose</span> <span class="nt">pre</span> <span class="p">{</span>
  <span class="nl">overflow-x</span><span class="p">:</span> <span class="nb">auto</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div></div>

<p>And yet on mobile, the long line didn't create an internal scrollbar. It made the whole page wider instead.</p>

<h2 id="the-problem-wasnt-the-code-block">The problem wasn't the code block</h2>

<p>This is the part that took a minute to remember: grid items don't shrink the way you'd expect.</p>

<p>If a <code>pre</code> sits inside a grid item, that grid item defaults to <code>min-width: auto</code>. In practice, that means the grid child is allowed to grow to fit the long unbroken line inside the code block. So instead of the <code>pre</code> overflowing and scrolling, the parent layout expands.</p>

<p>The scroll logic was fine. The layout was the problem.</p>

<h2 id="the-fix">The fix</h2>

<p>The fix was one line in the right place:</p>

<div class="language-css highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nt">body</span> <span class="o">&gt;</span> <span class="nt">main</span><span class="o">,</span>
<span class="nt">body</span> <span class="o">&gt;</span> <span class="nt">main</span> <span class="o">&gt;</span> <span class="o">*</span> <span class="p">{</span>
  <span class="py">min-inline-size</span><span class="p">:</span> <span class="m">0</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div></div>

<p>You can also write it as <code>min-width: 0</code>, but I am already using logical properties here, so <code>min-inline-size</code> fit better.</p>

<p>Once the grid item is allowed to shrink, the browser can finally do what <code>overflow-x: auto</code> was asking for all along: keep the layout constrained and let the code block scroll horizontally.</p>

<h2 id="the-lesson">The lesson</h2>

<p>When something inside a grid or flex layout refuses to scroll, check the parent before you blame the child.</p>

<p>A lot of overflow bugs are really sizing bugs. The element with <code>overflow-x: auto</code> is often innocent.</p>
