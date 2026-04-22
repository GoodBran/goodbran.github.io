---
layout: post
title: "Markdown Syntax Showcase"
date: 2026-03-25 12:00:00 +0800
description: "A demo post showing the Markdown and KaTeX syntax supported by Perron and kramdown."
---

<p>This post demonstrates the Markdown and KaTeX syntax rendering capabilities of the blog.</p>

<h2 id="basic-formatting">Basic Formatting</h2>

<p><strong>Bold text</strong> and <em>italic text</em> work as expected. You can also use <del>strikethrough</del> and <code>inline code</code>.</p>

<h2 id="headings">Headings</h2>

<p>Headings use the standard Markdown syntax with hash symbols. They render with proper hierarchy and spacing.</p>

<h2 id="lists">Lists</h2>

<p>Unordered lists:</p>

<ul>
  <li>First item</li>
  <li>Second item
    <ul>
      <li>Nested item</li>
      <li>Another nested item</li>
    </ul>
  </li>
  <li>Third item</li>
</ul>

<p>Ordered lists:</p>

<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>

<h2 id="code-blocks">Code Blocks</h2>

<p>Fenced code blocks with syntax highlighting:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">def</span> <span class="nf">hello_world</span>
  <span class="nb">puts</span> <span class="s2">"Hello, world!"</span>
<span class="k">end</span>
</code></pre></div></div>

<h2 id="blockquotes">Blockquotes</h2>

<blockquote>
  <p>This is a blockquote. It can span multiple lines and contain other formatting.</p>
</blockquote>

<h2 id="horizontal-rules">Horizontal Rules</h2>

<hr>

<h2 id="links">Links</h2>

<p><a href="https://example.com">Link text</a> goes to external sites. Internal links work too.</p>

<h2 id="images">Images</h2>

<p>Images can be embedded with alt text:</p>

<p><img src="https://cdn.goodbran.com/images/kidsui.png" alt="Sample image with alt text"></p>

<h2 id="tables">Tables</h2>

<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
      <td>Cell 3</td>
    </tr>
    <tr>
      <td>Cell 4</td>
      <td>Cell 5</td>
      <td>Cell 6</td>
    </tr>
  </tbody>
</table>

<h2 id="math-with-katex">Math with KaTeX</h2>

<p>Inline math: $E = mc^2$</p>

<p>Block math:</p>

\[\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}\]</p>

<p>More complex expressions:</p>

\[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]</p>

\[\begin{pmatrix} a & b \\ c & d \end{pmatrix}\]</p>

<h2 id="combined-example">Combined Example</h2>

<p>Here's a quadratic formula solution:</p>

\[x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\]</p>

<p>And the code to calculate it:</p>

<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">import</span> <span class="nn">math</span>

<span class="k">def</span> <span class="nf">solve_quadratic</span><span class="p">(</span><span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">,</span> <span class="n">c</span><span class="p">):</span>
    <span class="n">discriminant</span> <span class="o">=</span> <span class="n">b</span><span class="o">**</span><span class="mi">2</span> <span class="o">-</span> <span class="mi">4</span><span class="o">*</span><span class="n">a</span><span class="o">*</span><span class="n">c</span>
    <span class="k">if</span> <span class="n">discriminant</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">:</span>
        <span class="k">return</span> <span class="bp">None</span>
    <span class="n">x1</span> <span class="o">=</span> <span class="p">(</span><span class="o">-</span><span class="n">b</span> <span class="o">+</span> <span class="n">math</span><span class="p">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">discriminant</span><span class="p">))</span> <span class="o">/</span> <span class="p">(</span><span class="mi">2</span><span class="o">*</span><span class="n">a</span><span class="p">)</span>
    <span class="n">x2</span> <span class="o">=</span> <span class="p">(</span><span class="o">-</span><span class="n">b</span> <span class="o">-</span> <span class="n">math</span><span class="p">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">discriminant</span><span class="p">))</span> <span class="o">/</span> <span class="p">(</span><span class="mi">2</span><span class="o">*</span><span class="n">a</span><span class="p">)</span>
    <span class="k">return</span> <span class="p">(</span><span class="n">x1</span><span class="p">,</span> <span class="n">x2</span><span class="p">)</span>
</code></pre></div></div>

<h2 id="conclusion">Conclusion</h2>

<p>This covers most of the syntax you'll need for writing rich blog posts with mathematical content.</p>
