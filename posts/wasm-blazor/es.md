---
title: "Por qué abandoné el renderizado del lado del servidor"
slug: "wasm-blazor"
date: "2025-04-21"
tags: ["blazor", "wasm", "web"]
summary: "Explorando la decisión de mover todo a Blazor en el cliente y olvidar el SSR tradicional."
cover: ""
language: es
published: true
---

Hubo un tiempo en que creía que el SSR era inevitable.

Hasta que probé ejecutar todo en el navegador con Blazor WASM.

Sin servidor. Sin backend. Solo una publicación estática en GitLab Pages.

Y funcionó.

### Razones principales:

- Control total sobre el despliegue
- Cero costos de backend
- Contenido en Markdown, versionado con Git
- Renderizado por .NET en el navegador

¿El resultado? Cargas más rápidas, menos partes móviles y un flujo de trabajo que se siente natural.

> No necesitamos servidores. Necesitamos claridad.
