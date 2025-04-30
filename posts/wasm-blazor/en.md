---
title: "Why I Abandoned Server-Side Rendering"
slug: "wasm-blazor"
date: "2025-04-21"
tags: ["blazor", "wasm", "web"]
summary: "Exploring the choice to move entirely to client-side Blazor and ditch traditional SSR."
cover: ""
language: en
published: true
---


There was a time when I thought SSR was inevitable — the “professional” way.

Until I tried running everything inside the browser with **Blazor WASM**.

> No server. No runtime backend. Just a static push to GitLab Pages.

And it worked. Like *really* worked.

---

## 🔥 Key reasons I ditched SSR:

- ✅ Full control over deployment
- 💸 Zero backend costs
- 🧠 Markdown content, versioned in Git
- ⚙️ Rendered by .NET directly in the browser
- 📦 Published with GitLab Pages

---

## 🧪 Here’s a code block to test highlighting

```csharp
@code {
    protected override async Task OnInitializedAsync()
    {
        var data = await Http.GetFromJsonAsync<Post>("posts/wasm-blazor/en.json");
        Console.WriteLine(data.Title);
    }
}