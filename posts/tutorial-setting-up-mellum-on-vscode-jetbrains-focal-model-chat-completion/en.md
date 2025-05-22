---
title: "Tutorial: Setting up Mellum focal model on VsCode with Continue"
slug: tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion
date: 2025-05-21
tags: 
  - tutorial
  - ollama
  - continue
  - vs-Code
  - jetbrains
summary: walkthrough configuring JetBrains Mellum LLM with Ollama and Continue on VSCode
cover: 
language: en
published: true
---


# Contents

With Mellum launching as an open source model[^3], I found a good opportunity to test it against my current Unity learning[^8] workflow. Rider/Unity runs slowly, so VS Code is my go to, and this week I have read two posts that align with that flow. Resharper is in public preview in VS Code [^9], and Mellum is now open source[^3].

# Tutorial: Setting Up and Running Mellum

1. Clone the Mellum model files
```bash
   git clone https://huggingface.co/JetBrains/Mellum-4b-base-gguf
```
(~4.5 GB)[^3]

2. Install Ollama[^7]
    Download and install the appropriate Ollama package for your OS (Ollama, 2025).
    
3. Install Continue[^10] in VS Code
    Add the Continue extension to wire up Mellum via Ollama.

# Add Mellum to Ollama

1. In your project directory, create a file named `Modelfile` with:
```text
FROM ./mellum-4b-base.Q8_0.gguf
# PARAMETER <parameter> <value>

SYSTEM "You are a completion assistant. Predict the most likely continuation of the given input accurately and concisely."

PARAMETER temperature      0.2
PARAMETER top_p            0.9
PARAMETER top_k            40
PARAMETER repeat_penalty   1.2
PARAMETER repeat_last_n    128
PARAMETER num_predict      512
PARAMETER num_ctx          8192

PARAMETER stop "###"
PARAMETER stop "\n\n"

```
All of these directives and parameters come from the Ollama Modelfile[^1]

2. (Optional) To run a quantized build on modest hardware at the expense of some accuracy, see Ollama’s quantization guide:  
> [https://ollama.readthedocs.io/en/import/#quantizing-a-model](https://ollama.readthedocs.io/en/import/#quantizing-a-model)
    
3. Create your Ollama model
```pws
ollama create Mellum -f .\Modelfile`
```
Make sure the `FROM` base matches the one used to the Model file (Chang, n.d.).

4. Inspect default values
```
ollama show Mellum
```

You’ll see something like:
```
 Model
    architecture        llama
    parameters          4.0B
    context length      8192
    embedding length    3072
    quantization        Q8_0

  Capabilities
    completion

  Parameters
    top_k             40
    top_p             0.9
    num_ctx           8192
    num_predict       512
    repeat_last_n     128
    repeat_penalty    1.2
    stop              "###"
    stop              "\n\n"
    temperature       0.2

```
Tweak any settings in your `Modelfile`, then rebuild with `ollama create` as above.


# VS Code, Continue & Ollama


**Continue**[^10] lets you hook any local or remote model into VS Code, select Ollama as your provider, then Add a Local Model even though it isn’t in the Ollama registry by default. Configure per-context assistants from the Continue UI, and you’ll get Mellum focal context completions right in VS Code.

![Continue configuration for Ollama + Mellum ](https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/img-20250522093033.png)

Overall, on my station with a dedicated GPU it’s fast, but on smaller machines you can quantize the model to fit your needs. Now I can zip between Unity and VS Code with context-aware completions via Mellum.

In continue configured for each context available a here are some insights 

![Mellum Context completion](https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/GameManager.mp4)

![Mellum Instructions](https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/ShiInputManager.mp4)

[^1][^2][^3][^4][^5][^6][^7][^8][^9][^10]

[^1]:Chang, L. (n.d.). _Model file specification Ollama_ [Documentation]. GitHub. Retrieved May 21, 2025, from [https://github.com/lloydchang/ollama-ollama/blob/main/docs/modelfile.md](https://github.com/lloydchang/ollama-ollama/blob/main/docs/modelfile.md)

[^2]:JetBrains. (2025a, February). Why and how JetBrains built Mellum – the LLM designed for code completion. _JetBrains Blog._ Retrieved May 21, 2025, from [https://blog.jetbrains.com/ai/2025/02/why-and-how-jetbrains-built-mellum-the-llm-designed-for-code-completion/](https://blog.jetbrains.com/ai/2025/02/why-and-how-jetbrains-built-mellum-the-llm-designed-for-code-completion/)

[^3]:JetBrains. (2025b, April). Mellum goes open source: A purpose‐built LLM for developers, now on Hugging Face. _JetBrains Blog._ Retrieved May 21, 2025, from [https://blog.jetbrains.com/ai/2025/04/mellum-goes-open-source-a-purpose-built-llm-for-developers-now-on-hugging-face/](https://blog.jetbrains.com/ai/2025/04/mellum-goes-open-source-a-purpose-built-llm-for-developers-now-on-hugging-face/)

[^4]:JetBrains. (2025c, April 8). _JetBrains Mellum overview & usage_ [IDE Services documentation]. Retrieved May 21, 2025, from [https://www.jetbrains.com/help/ide-services/jetbrains-mellum.html](https://www.jetbrains.com/help/ide-services/jetbrains-mellum.html)

[^5]:JetBrains. (2025d, May). JetBrains AI Assistant – now in Visual Studio Code. _JetBrains Blog._ Retrieved May 21, 2025, from [https://blog.jetbrains.com/ai/2025/05/jetbrains-ai-assistant-now-in-visual-studio-code/](https://blog.jetbrains.com/ai/2025/05/jetbrains-ai-assistant-now-in-visual-studio-code/)

[^6]:JetBrains. (2025e). _Mellum-4b-base-gguf_ [Model]. Hugging Face. Retrieved May 21, 2025, from [https://huggingface.co/JetBrains/Mellum-4b-base-gguf](https://huggingface.co/JetBrains/Mellum-4b-base-gguf)

[^7]:Ollama. (2025). Download Ollama on Windows [Software]. Retrieved May 21, 2025, from [https://ollama.com/download/windows](https://ollama.com/download/windows)

[^8]:YouTube. (n.d.). _How To Make a 3D Space Shooter Game in Unity – Tutorial_ [Video]. YouTube. Retrieved May 21, 2025, from [https://www.youtube.com/watch?v=VW3PkEF1Fzk](https://www.youtube.com/watch?v=VW3PkEF1Fzk)

[^9]: JetBrains. (2025f, May). _ReSharper for Visual Studio Code_ [Extension]. Visual Studio Marketplace. Retrieved May 21, 2025, from https://marketplace.visualstudio.com/items?itemName=jetbrains.resharper-code

[^10]: Continue.dev. (2025). _Continue – Open-source AI code assistant_ [Extension]. Visual Studio Marketplace. Retrieved May 21, 2025, from https://marketplace.visualstudio.com/items?itemName=Continue.continue
