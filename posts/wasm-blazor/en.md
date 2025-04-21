---
title: "Why I Abandoned Server-Side Rendering"
slug: "wasm-blazor"
date: "2025-04-21"
tags: ["blazor", "wasm", "web"]
summary: "Exploring the choice to move entirely to client-side Blazor and ditch traditional SSR."
cover: "posts-assets/wasm-blazor/banner.png"
language: en
published: true
---

There was a time when I thought SSR was inevitable.

Until I tried running everything inside the browser with Blazor WASM.

No server. No runtime backend. Just a static push to GitLab Pages.

And it worked.

### Key reasons:

- Full control over deployment
- Zero backend costs
- Markdown content, versioned in Git
- Rendered by .NET in the browser

The result? Faster load times, fewer moving parts, and a dev workflow that feels like breathing.

> We don't need servers. We need clarity.
