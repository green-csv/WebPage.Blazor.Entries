---
title: Pre-flight checklist for Rider (.Net)
slug: pre-flight-checklist-rider
date: 2025-05-02
tags:
  - rider
  - dot-net
  - windows
summary: Rider pre-flight notes to avoid .NET/Blazor WASM environment hiccups.
cover: 
language: en
published: true
---


Every time I start or pull a .NET project in JetBrains Rider I run this short checklist. It kills most environment-specific bugs that have burned me, especially with Blazor + WASM.

- **Namespace provider**  
	Mark each `src/` folder as a Namespace provider (right-click folder → **Mark Directory As → Namespace Provider**).

- **MSBuild version (Windows Only)**  
	force Rider to use the exact MSBuild that ships with Visual Studio. A minor-version mismatch spawns divergent assets and mysterious warnings.

- **.NET CLI path**  
	Verify the `dotnet` executable active, multiple SDKs + Rider’s bundled runtime can lead to mismatches (e.g. `*.blazor.css` not resolving).

Anything else to add?

> 💡 **Got another tip?** Drop me an email at [aruiz@greencsv.dev](mailto:aruiz@greencsv.dev)!

while I add some comment service