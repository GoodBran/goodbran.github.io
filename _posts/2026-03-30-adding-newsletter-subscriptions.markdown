---
layout: post
title: "Adding Newsletter Subscriptions"
date: 2026-03-30 12:00:00 +0800
description: "A double opt-in newsletter for a Rails blog. Two models, two mailers, one rake task, and no third-party service."
---

<p>Most newsletter setups start with "sign up for Mailchimp." This one starts with <code>rails g model</code>. If you already run a Rails app, everything you need for a proper double opt-in newsletter is already in the box. Here's how ours works.</p>

<h2 id="the-subscriber-lifecycle">The subscriber lifecycle</h2>

<p>A subscriber goes through three states: pending, confirmed, and unsubscribed. One table tracks all three with two timestamp columns:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">create_table</span> <span class="ss">:subscribers</span> <span class="k">do</span> <span class="o">|</span><span class="n">t</span><span class="o">|</span>
  <span class="n">t</span><span class="p">.</span><span class="nf">string</span> <span class="ss">:email</span><span class="p">,</span> <span class="ss">null: </span><span class="kp">false</span>
  <span class="n">t</span><span class="p">.</span><span class="nf">datetime</span> <span class="ss">:confirmed_at</span>
  <span class="n">t</span><span class="p">.</span><span class="nf">datetime</span> <span class="ss">:unsubscribed_at</span>
  <span class="n">t</span><span class="p">.</span><span class="nf">string</span> <span class="ss">:source</span>
  <span class="n">t</span><span class="p">.</span><span class="nf">timestamps</span>
<span class="k">end</span>

<span class="n">add_index</span> <span class="ss">:subscribers</span><span class="p">,</span> <span class="s2">"lower(email)"</span><span class="p">,</span> <span class="ss">unique: </span><span class="kp">true</span>
</code></pre></div></div>

<p>No <code>status</code> enum, no state machine gem. A <code>nil</code> <code>confirmed_at</code> means pending. A present <code>confirmed_at</code> with a <code>nil</code> <code>unsubscribed_at</code> means active. Both present means they left. The scopes write themselves:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">scope</span> <span class="ss">:pending</span><span class="p">,</span>   <span class="o">-&gt;</span> <span class="p">{</span> <span class="n">where</span><span class="p">(</span><span class="ss">confirmed_at: </span><span class="kp">nil</span><span class="p">,</span> <span class="ss">unsubscribed_at: </span><span class="kp">nil</span><span class="p">)</span> <span class="p">}</span>
<span class="n">scope</span> <span class="ss">:confirmed</span><span class="p">,</span> <span class="o">-&gt;</span> <span class="p">{</span> <span class="n">where</span><span class="p">.</span><span class="nf">not</span><span class="p">(</span><span class="ss">confirmed_at: </span><span class="kp">nil</span><span class="p">)</span> <span class="p">}</span>
<span class="n">scope</span> <span class="ss">:active</span><span class="p">,</span>    <span class="o">-&gt;</span> <span class="p">{</span> <span class="n">confirmed</span><span class="p">.</span><span class="nf">where</span><span class="p">(</span><span class="ss">unsubscribed_at: </span><span class="kp">nil</span><span class="p">)</span> <span class="p">}</span>
</code></pre></div></div>

<p>The functional <code>lower(email)</code> index catches duplicates regardless of casing. Combined with <code>create_or_find_by!</code>, re-subscribing the same address is a no-op instead of an error.</p>

<h2 id="double-opt-in-with-signed-ids">Double opt-in with signed IDs</h2>

<p>The confirmation flow uses Rails' built-in signed IDs — no token column, no custom crypto:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1"># Generating the confirmation link</span>
<span class="n">confirm_newsletter_url</span><span class="p">(</span>
  <span class="ss">token: </span><span class="n">subscriber</span><span class="p">.</span><span class="nf">signed_id</span><span class="p">(</span><span class="ss">purpose: :newsletter_confirm</span><span class="p">,</span> <span class="ss">expires_in: </span><span class="mi">7</span><span class="p">.</span><span class="nf">days</span><span class="p">)</span>
<span class="p">)</span>

<span class="c1"># Verifying it</span>
<span class="n">subscriber</span> <span class="o">=</span> <span class="no">Subscriber</span><span class="p">.</span><span class="nf">find_signed!</span><span class="p">(</span><span class="n">params</span><span class="p">[</span><span class="ss">:token</span><span class="p">],</span> <span class="ss">purpose: :newsletter_confirm</span><span class="p">)</span>
<span class="n">subscriber</span><span class="p">.</span><span class="nf">mark_confirmed!</span>
</code></pre></div></div>

<p><code>signed_id</code> encodes the record's ID with a purpose and expiry into a tamper-proof token. Rails handles the signing, verification, and expiration. The token lives in the URL, so there's nothing to store.</p>

<p>The same pattern works for unsubscribe links, just with a different purpose:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="no">Subscriber</span><span class="p">.</span><span class="nf">find_signed!</span><span class="p">(</span><span class="n">params</span><span class="p">[</span><span class="ss">:token</span><span class="p">],</span> <span class="ss">purpose: :newsletter_unsubscribe</span><span class="p">)</span>
</code></pre></div></div>

<p>One mechanism, two use cases.</p>

<h2 id="sending-newsletters">Sending newsletters</h2>

<p>Newsletters are campaigns. Each one is a database row with a subject, an HTML body, and a plain-text body. A rake task ties everything together:</p>

<div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code>bin/rails newsletter:send <span class="nv">SUBJECT</span><span class="o">=</span><span class="s2">"Monthly note"</span> <span class="nv">MARKDOWN_FILE</span><span class="o">=</span><span class="s2">"path/to/issue.md"</span>
</code></pre></div></div>

<p>The task reads a Markdown file, converts it to HTML with Kramdown, strips tags for the text version, and enqueues a delivery job for every active subscriber:</p>

<div class="language-ruby highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">campaign</span> <span class="o">=</span> <span class="no">NewsletterCampaign</span><span class="p">.</span><span class="nf">create_from_markdown_file!</span><span class="p">(</span><span class="n">subject</span><span class="p">:,</span> <span class="n">file_path</span><span class="p">:)</span>

<span class="no">Subscriber</span><span class="p">.</span><span class="nf">active</span><span class="p">.</span><span class="nf">find_each</span> <span class="k">do</span> <span class="o">|</span><span class="n">subscriber</span><span class="o">|</span>
  <span class="no">NewsletterMailer</span><span class="p">.</span><span class="nf">issue</span><span class="p">(</span><span class="n">subscriber</span><span class="p">,</span> <span class="n">campaign</span><span class="p">).</span><span class="nf">deliver_later</span>
<span class="k">end</span>
</code></pre></div></div>

<p>Each email gets its own unsubscribe link. The <code>List-Unsubscribe</code> and <code>List-Unsubscribe-Post</code> headers tell email clients to show an unsubscribe button natively — Gmail, Apple Mail, and others will render it without you building any UI on their end.</p>

<h2 id="why-not-a-third-party-service">Why not a third-party service?</h2>

<p>For a personal blog with a modest list, the answer is simplicity and cost. The goal is to minimize the budget for this blog system as much as possible. No API keys to rotate, no webhook endpoints to maintain, and no monthly bill that scales with your subscriber count. The entire subscription system is about 150 lines of application code. Rails' <code>deliver_later</code> handles background delivery, and Amazon SES (Simple Email Service) handles the actual sending for pennies.</p>

<p>If the list grows to thousands and you need analytics, A/B testing, or deliverability optimization — sure, migrate to a dedicated service then. But starting with your own gives you something no SaaS does: complete understanding of every line in the stack, and a monthly bill that rounds to zero.</p>
