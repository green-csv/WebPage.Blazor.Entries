---
title: Test
slug: test
date: 2000-12-01
tags:
  - test
  - markdown
summary: This post has testing purpses, yeah only that
cover: ""
language: en
published: true
---

# Test Markdown Features

This file contains example Markdown elements to use as a visual reference.

---

## Headings

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

---

## Paragraphs and Emphasis

Normal paragraph text. **Bold text**, _italic text_, **_bold italic_**, ~~strikethrough~~.

Inline code: `const x = 42;`

---

## Blockquotes

> This is a blockquote.
> 
> > Nested blockquote.
> > 
> > - With a list inside.
> >     

---

## Lists

### Unordered List

- Item one
    
- Item two
    
    - Nested item two.a
        
    - Nested item two.b
        
- Item three
    

### Ordered List

1. First item
    
2. Second item
    
    1. Sub-first
        
    2. Sub-second
        
3. Third item
    

---

## Code Blocks

```js
// JavaScript code block
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet('World');
```

```csharp
// C# code block
public class Person {
  public string Name { get; set; }
  public void SayHi() => Console.WriteLine($"Hi, {Name}");
}
```

---
## Tables

|Feature|Supported|Notes|
|:---|:---:|---:|
|Headings|✅|Levels 1–6|
|Emphasis|✅|Bold, italic, strikethrough|
|Lists|✅|Nested, ordered, unordered|
|Code blocks|✅|Fenced with language hint|
|Tables|✅|GitHub-style|
|Blockquotes|✅|Nested|

---

## Links and Images

[Visit GreenCSV.dev](https://greencsv.dev/)

![Sample Cover Image](https://via.placeholder.com/800x200 "Cover Image Placeholder")

---

## Horizontal Rule

---

### Task List

- [x] Completed task  
- [ ] Incomplete task  
- [ ] Another one

---

## Emoji

🎉 🚀 🐛 📦

---
## Raw HTML

<div style="padding:1em; border:1px solid #333; background:#111; color:#0f0;"> ⚙️ This HTML block should appear verbatim. </div>

---

## Definition List

_End of test file._

This is the footnote text. [↩](#user-content-fnref-1)