---
layout: post
title: "Code Previews Belong in the Post"
date: 2026-05-05 10:00:00 +0800
category: code
description: "How this blog got a tiny static code playground with preview, HTML, CSS, and JS tabs."
cover_image: "/assets/images/code-previews-belong-in-the-post-cover.webp"
---

A post about code should show the code running. Not as a SaaS embed. Not as a dependency carnival. Right here, in the page.

So this blog now has a tiny static playground: Preview, HTML, CSS, JS. Boring pieces. Great result.

## The Core Idea

Treat the demo as content.

The post captures three strings: `html`, `css`, and `js`. The include renders the source tabs with Rouge highlighting, then renders the live preview inside a sandboxed `iframe` using `srcdoc`.

No server. No client-side compiler. No framework ceremony. Just HTML doing HTML things.

## The Shape

{% raw %}
```liquid
{% capture demo_html %}
<button class="hello-button" data-answer>Click me</button>
{% endcapture %}

{% capture demo_css %}
.hello-button {
  padding: 0.8rem 1rem;
  border: 0;
  border-radius: 999px;
  background: #0250bb;
  color: white;
  font-weight: 800;
}
{% endcapture %}

{% capture demo_js %}
document.querySelector("[data-answer]").addEventListener("click", (event) => {
  event.currentTarget.textContent = "Yes. Ship it.";
});
{% endcapture %}

{% include code-playground.html title="Button Demo" html=demo_html css=demo_css js=demo_js %}
```
{% endraw %}

## The Result

{% capture demo_html %}
<button class="hello-button" data-answer>Click me</button>
{% endcapture %}

{% capture demo_css %}
.hello-button {
  padding: 0.8rem 1rem;
  border: 0;
  border-radius: 999px;
  background: #0250bb;
  color: white;
  cursor: pointer;
  font-weight: 800;
}
{% endcapture %}

{% capture demo_js %}
document.querySelector("[data-answer]").addEventListener("click", (event) => {
  event.currentTarget.textContent = "Yes. Ship it.";
});
{% endcapture %}

{% include code-playground.html title="Button Demo" html=demo_html css=demo_css js=demo_js height="220px" %}

## Why This Is Better

The reader can see the result first, then inspect the exact HTML, CSS, and JS that made it happen. That is the contract. No mystery gap between explanation and output.

This is the web at its best: simple parts, composed well, with the machinery left visible.
