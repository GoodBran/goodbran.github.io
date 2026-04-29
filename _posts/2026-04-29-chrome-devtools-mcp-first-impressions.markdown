---
layout: post
title: "First Impressions: Chrome DevTools MCP with Claude Code"
date: 2026-04-29 10:00:00 +0800
category: tools
description: "My first experience with the Chrome DevTools MCP server - giving Claude the ability to 'see' my browser screen and debug web pages in real-time."
cover_image: "/assets/images/chrome-devtools-mcp-first-impressions-cover.webp"
---

I discovered the [Chrome DevTools MCP server](https://github.com/ChromeDevTools/chrome-devtools-mcp) from a [Google Chrome Developers YouTube video](https://www.youtube.com/watch?v=DanTBy6Qazg&list=PLNYkxOF6rcIAcezfL8q0rjt13ufKseL5X&index=6). The idea was intriguing: connect Claude Code directly to my browser via Chrome's remote debugging protocol.

## Installation

Installing it in Claude Code CLI was straightforward. I added this simple configuration:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "enabled": false,
      "args": [
        "chrome-devtools-mcp@latest"
      ]
    }
  }
}
```

I kept it disabled by default for reasons I'll explain below.

## Getting It to Work

The `--auto-connect` feature didn't work for me—connection would fail silently. After removing that flag and launching a dedicated Chrome instance with remote debugging, it worked:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-mcp-profile
```

Using a separate user data directory has a nice side effect: you can log into Google accounts or any websites, and the sessions persist. Pretty convenient.

## The Token Cost

After just a few queries involving page navigation and screenshots, I burned through approximately **5 million tokens**. The MCP pipes full DOM trees, computed styles, and metadata into the context window. It's powerful, but expensive.

## My Take

I'm using [Fireworks AI](https://app.fireworks.ai/) with their Firepass plan which helps with the usage. My recommendation: **only enable it when you need it**, not as a default. A few queries and the token count stacks up fast.

## Terminal Session

Here's what it looks like in practice:

![Chrome DevTools MCP terminal session showing Claude interacting with the browser](/assets/images/chrome-devtools-mcp-terminal.png)

## Bottom Line

It's genuinely useful having an AI assistant that can "look" at your screen and debug live web pages. Just remember to disable it when you're done—your token budget will thank you.
