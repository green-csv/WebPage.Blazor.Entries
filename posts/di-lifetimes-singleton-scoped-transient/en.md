---
title: DI Lifetimes Scoped, Trasient, Singleton
slug: singleton-scope-trasient
date: 2025-05-06
tags:
  - dot-net
  - blazor
  - web-api
summary: English summary goes here.
cover: 
language: en
published: false
---



# Understanding Dependency Injection Lifetimes in .NET: Singleton, Scoped & Transient

Modern applications rely on decoupled components and clear separation of concerns. At the heart of this lies **Inversion of Control (IoC)**—the idea that you hand off the responsibility for creating and managing object lifetimes to an external container or framework. **Dependency Injection (DI)** is a concrete pattern for implementing IoC: you declare your dependencies, and the container wires them up for you.

ASP NET Core’s built-in DI container takes this a step further by offering three distinct **lifetimes**:

- **Singleton**: one instance for the entire application
    
- **Scoped**: one instance per logical operation (e.g. per HTTP request)
    
- **Transient**: a new instance every time it’s requested
    

Understanding these lifetimes is crucial for building efficient, maintainable, and thread-safe services—especially when working with resources like database contexts, HTTP clients, or long-running background jobs.



Understanding these lifetimes is only the first step. Behind them lies a rich landscape of design patterns, best practices, and advanced container features (Seemann & van Deursen, 2019)[^1]. If you’re intrigued by how DI shapes modular, testable, and maintainable codebases, dive into the full article for practical examples and deeper insights into IoC, constructor injection, and lifetime management (Fowler, 2004)[^2].


[^1]: Seemann, M., & van Deursen, S. (2019). _Dependency Injection Principles, Practices, and Patterns_. Addison-Wesley Professional. ISBN 978-1-61729-473-0.
    
[^2]:Fowler, M. (2004, January 23). _Inversion of Control Containers and the Dependency Injection pattern_. Retrieved from [https://martinfowler.com/articles/injection.html](https://martinfowler.com/articles/injection.html)