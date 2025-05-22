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
summary: Guía pa' configurar el modelo Mellum de JetBrains con Ollama y Continue en VSCode.
cover: 
language: es
published: true
---

# Contents

El lanzamiento de Mellum como modelo de código abierto[^3], vi la oportunidad para probarlo dentro de mi flujo de aprendizaje actual con Unity[^8]. Rider con Unity es algo lento, así que VS Code es mi alternativa principal. Esta semana leí dos publicaciones que se alinean con ese flujo: ReSharper está en public preview para VS Code[^9] y Mellum se presenta open source[^3].

# Tutorial: Set Up & Running Mellum

1. Clonar Mellum guff desde el repo de Jetbrains
```bash
   git clone https://huggingface.co/JetBrains/Mellum-4b-base-gguf
```
(~4.5 GB)[^3]

2. Instalar Ollama[^7]
    Descarga e instala el paquete correspondiente según al sistema operativo host.
    
3. Instalar Continue[^10] en VS Code
    Agrega la extensión Continue con esto pretenderemos conectar Mellum a través de Ollama.

# Agregar Mellum a Ollama

1. En el directorio donde se clono Mellum, crear un archivo llamado `Modelfile` con
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
Estas directivas provienen de la especificación del Modelfile de Ollama[^1].

2. _(Opcional)_ Para ejecutar una versión quantized en hardware modesto (a costa de algo de precisión):
> [https://ollama.readthedocs.io/en/import/#quantizing-a-model](https://ollama.readthedocs.io/en/import/#quantizing-a-model)
    
3. Crea el modelo en Ollama
```pws
ollama create Mellum -f .\Modelfile`
```
El modelo base en `FROM` coincida con el usado con el Modelfile creado[^1].

4. Validar los valores por defecto
```
ollama show Mellum
```

Algo así aparecería en consola:
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
Los valores se pueden ajustar  `Modelfile` y reconstruir usando `ollama create` nuevamente.


# VS Code, Continue & Ollama


**Continue**[^10]  permite conectar modelos locales o remotos en VS Code. Selecciona Ollama como proveedor, agrega el modelo Mellum manualmente (ya que no está en el registro oficial), se puede configurar asistentes por contexto desde la interfaz de Continue. Con esto obtener completaciones enfocadas al contexto.

![Continue configuration for Ollama + Mellum ](https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/img-20250522093033.png)

En mi máquina con GPU dedicada, el modelo funciona rápido, osea no me quejo en velocidad ni recursos; En sistemas más modestos, se puede usar quantized para adaptarlo al hardware.

Con Continue configurado para cada contexto, dejo aquí mis insights 

<div>
<video 
controls width="100%" 
alt="Mellum Context completion"
src="https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/GameManager.mp4" 
>
  Your browser doesn’t support video.
</video>
</div>

<div > 
<video 
controls width="100%" 
alt="Mellum Instructions"
src="https://entries.greencsv.dev/media/tutorial-setting-up-mellum-on-vscode-jetbrains-focal-model-chat-completion/ShiInputManager.mp4" 
>
  Your browser doesn’t support video.
</video>

</div>




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
