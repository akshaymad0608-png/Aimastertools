import { BlogPost } from '../types';

// The eight earlier posts (ids 1-8) were titles and excerpts with no body:
// every one rendered as an empty article. They were removed rather than left
// as thin pages; vercel.json redirects their URLs to /blog.
const _RAW_BLOG_POSTS: BlogPost[] = [
  {
    id: '9',
    slug: 'run-ai-models-locally-ollama-lm-studio-gpt4all-anythingllm',
    title: 'Run AI Models Locally: Ollama, LM Studio, GPT4All Compared',
    category: 'CODING',
    excerpt: 'Four free ways to run open AI models offline in 2026, what each one is good at, what hardware you need, and how they fit together.',
    date: 'Oct 3, 2026',
    readTime: '7 min read',
    imageUrl: '',
    url: '/blog/run-ai-models-locally-ollama-lm-studio-gpt4all-anythingllm',
    content: `Running a language model on your own machine used to mean compiling code and reading GitHub issues. In 2026 it is a normal app install. The reasons people do it are practical: nothing you type leaves the computer, there is no per-token bill, it works offline, and you can try open models the week they are released.

This guide compares the four tools most people start with — [Ollama](/tool/ollama), [LM Studio](/tool/lm-studio), [GPT4All](/tool/gpt4all) and [AnythingLLM](/tool/anythingllm). All four are free to use. Details below are current as of October 2026; check each project's site before you rely on a specific feature.

## The short answer

- **Ollama** if you are a developer, or want other apps to use a local model through an API.
- **LM Studio** if you want the most polished point-and-click app for finding and chatting with models.
- **GPT4All** if you want the simplest offline chat on an ordinary laptop, including chatting with a folder of your documents.
- **AnythingLLM** if your goal is asking questions about your own files, with workspaces and agents, using either a local or a cloud model.

They are not rivals so much as layers. A common setup is Ollama or LM Studio running the model, with AnythingLLM or another chat app on top.

## Ollama: the engine other apps plug into

Ollama is a command-line tool (with a small desktop app) that downloads and runs open models such as Llama, Gemma, Mistral, Qwen and DeepSeek. One command pulls a model, another runs it, and a local REST API lets editors, chat clients and automation tools such as n8n talk to it.

- **Licence:** MIT, free for personal and commercial use.
- **Best at:** being a reliable background service for other software.
- **Worth knowing:** Ollama Inc. also sells optional cloud plans for running larger models on its servers. You do not need them to run models locally.

## LM Studio: the friendliest desktop app

LM Studio combines a model browser, a chat window and a local server in one install for Windows, macOS and Linux. It runs GGUF models through llama.cpp and, on Apple Silicon Macs, MLX models, which are usually faster on M-series chips. Its local server speaks the same API format as OpenAI's, so many tools can switch to it by changing one URL.

- **Licence:** the app is closed source but free, including for work use since mid-2025. Its command-line tool and SDK are open source.
- **Best at:** browsing models, comparing them, and seeing how much memory each one needs before you download it.

## GPT4All: offline chat with your documents

GPT4All, from Nomic, is aimed at ordinary laptops. It runs quantised models on the CPU or GPU you already have and needs no API key. Its LocalDocs feature indexes a folder of your files so answers can draw on them, with nothing leaving the machine.

- **Licence:** MIT, open source, with a Python package for developers.
- **Best at:** a private assistant for notes, manuals or study material on a modest computer.

## AnythingLLM: a workspace for your files

AnythingLLM, from Mintplex Labs, is built around workspaces. You add PDFs, web pages and documents, then chat with answers grounded in them. It can use a local model (often through Ollama or LM Studio) or a commercial API, and it includes simple agents.

- **Licence:** the desktop app is free and MIT-licensed; a hosted cloud version is paid.
- **Best at:** small teams or individuals who want a private document assistant without building one.

## What hardware do you need?

Model size matters more than the app. Rough guidance for 4-bit quantised models:

- **7–8 billion parameters:** about 5–6 GB of free RAM or VRAM. Usable on most laptops with 16 GB of RAM.
- **12–14 billion:** about 9–10 GB. Comfortable with a 12 GB graphics card or a Mac with 24 GB or more of unified memory.
- **30 billion and up:** 20 GB or more. Workstations, high-memory Macs, or splitting the model between GPU and system RAM (slower).

A graphics card or Apple Silicon speeds things up a lot, but small models do run on the CPU alone, just more slowly. Start small, check that the answers are good enough for your task, and only then move to a bigger model.

## A sensible way to start

1. Install LM Studio or Ollama and download one small, recent model.
2. Ask it the kind of questions you actually need answered, not benchmark puzzles.
3. If you want it to read your files, add AnythingLLM or use GPT4All's LocalDocs.
4. If you want other software to use it, turn on the local server and point the app at it.

Local models are not as capable as the largest cloud models on hard reasoning, and very new releases can need an app update before they run. For private notes, drafting, summarising and coding help, they are already good enough for a lot of everyday work.

**Related:** [Ollama](/tool/ollama) · [LM Studio](/tool/lm-studio) · [GPT4All](/tool/gpt4all) · [AnythingLLM](/tool/anythingllm) · [Chatbox](/tool/chatbox)`
  },
  {
    id: '10',
    slug: 'ai-tools-free-plans-what-you-really-get-2026',
    title: 'AI Tool Free Plans Explained: What You Really Get',
    category: 'PRODUCTIVITY',
    excerpt: 'Daily credits, one-time credits, no downloads, card-required trials: how AI tool free plans actually work, with real examples from October 2026.',
    date: 'Oct 3, 2026',
    readTime: '6 min read',
    imageUrl: '',
    url: '/blog/ai-tools-free-plans-what-you-really-get-2026',
    content: `"Free" on an AI tool's pricing page can mean very different things. Some free plans are genuinely usable every day, some are a one-off taste, and some let you create but not keep what you made. Knowing which kind you are looking at saves a lot of sign-ups.

The examples below come from each vendor's published plans as of October 2026. Free tiers change often, so treat the numbers as a snapshot and check the pricing page before you commit.

## 1. Daily allowances that reset

These give you a small amount every day. Unused credit usually disappears instead of carrying over.

- **[Leonardo.ai](/tool/leonardo-phoenix):** 150 tokens a day, reset every 24 hours, with no rollover. Enough for a few dozen basic images.
- **[Lovable](/tool/lovable-dev):** 5 credits a day, capped at 30 a month, for building apps by chat.
- **[Reve](/tool/reve-image):** a daily image-generation allowance on free accounts, plus a sign-up bonus.

**Good for:** steady, light use. If you need a lot on one day, you will hit the cap.

## 2. One-time credits

You get a block of credits when you sign up and nothing more until you pay.

- **[Taskade](/tool/taskade):** unlimited projects, AI chat and basic agents, plus a one-time grant of 3,000 AI credits for its heavier features.
- **[Superscale](/tool/superscale-ai):** 1,000 credits to try the ad agent, no card needed.
- **[Hailuo](/tool/hailuo-minimax):** welcome credits for video generation.

**Good for:** testing whether a tool fits before paying. Not good for regular use.

## 3. Monthly caps

A fixed amount each month.

- **[Mem](/tool/mem-ai):** 25 notes, 25 chat messages and 25 PDF pages a month on the free plan.
- **[Softr](/tool/softr):** apps for up to 10 users on the free plan.

**Good for:** personal projects that stay small.

## 4. Create for free, pay to keep

The trap that catches most people: you can make as much as you like, but downloading or using the result commercially costs money.

- **[Soundraw](/tool/soundraw):** unlimited music generation and preview on the free plan, but downloads and the commercial licence need a paid plan.

**Good for:** trying ideas. Check the export and licence terms before you spend an afternoon on it.

## 5. Free with limits, no paid consumer tier

- **[DeepSeek](/tool/deepseek):** the chat app is free; the paid part is the developer API.
- **[Mistral's Le Chat](/tool/mistral-large):** free with daily limits, with a Pro plan for heavier use.

## 6. Genuinely free and open source

No credits at all, because the software runs on your own hardware.

- **[Ollama](/tool/ollama), [GPT4All](/tool/gpt4all), [AnythingLLM](/tool/anythingllm)** for running language models locally.
- **[ComfyUI](/tool/comfyui)** and **[WebUI Forge](/tool/webui-forge)** for image generation.

The cost here is your time and hardware: you need a capable computer, and setup takes longer than a website sign-up.

## 7. No free plan, only a trial

- **[Jasper](/tool/jasper-marketing):** a 7-day trial of the Pro plan that needs a card.
- **[Scite](/tool/scite):** a 7-day trial, no permanent free tier.
- **[Designrr](/tool/designrr), [Magnific](/tool/magnific-ai), [Topaz Video](/tool/topaz-video-ai):** paid only.

If a trial needs a card, set a reminder for the day before it ends.

## A quick checklist before you sign up

1. **Does the allowance reset** daily or monthly, or is it one-time?
2. **Can you download and use the output commercially** on the free plan?
3. **Is there a watermark** or lower resolution on free exports?
4. **Does the trial need a card,** and does it convert to paid automatically?
5. **Where does your data go,** especially for documents and meeting audio?

You can filter the directory to [free AI tools](/free) to see tools with a free tier in each category.`
  },
  {
    id: '11',
    slug: 'ai-tool-changes-retired-renamed-repriced-2026',
    title: 'Retired, Renamed, Repriced: AI Tool Changes to Know',
    category: 'RESEARCH',
    excerpt: 'Quizlet retired Q-Chat, Wix ADI became the Wix AI Website Builder, Topaz went subscription-only: the AI tool changes that affect what you pay and use.',
    date: 'Oct 3, 2026',
    readTime: '5 min read',
    imageUrl: '',
    url: '/blog/ai-tool-changes-retired-renamed-repriced-2026',
    content: `AI tools change faster than most software. Features get retired, products get renamed, and pricing models flip from one-time purchases to subscriptions. While updating the listings in this directory, these were the changes that most affect what people actually pay for and use.

## Retired: Quizlet Q-Chat

Quizlet's Q-Chat, an AI tutor built on OpenAI's models and launched in 2023, was retired after 30 June 2025. Quizlet said it decided to retire the study mode after evaluating it and listening to customer feedback.

Quizlet's other AI features continue, including Magic Notes, which turns notes or an uploaded document into flashcards, a summary and a practice test. The [Quizlet listing](/tool/quizlet-q-chat) now covers those instead.

**What to do:** if you relied on Q-Chat for tutoring-style questions, a general assistant with your notes pasted in is the nearest substitute.

## Renamed: Wix ADI is now the Wix AI Website Builder

Wix stopped supporting sites built with ADI (Artificial Design Intelligence) on 10 November 2024. Existing ADI sites now open in the standard Wix Editor. Its replacement, the Wix AI website builder launched in March 2024, builds a site from a short conversation about your business.

The directory now lists it as [Wix AI Website Builder](/tool/wix-adi).

## Repriced: Topaz Labs ends perpetual licences

Topaz Labs used to sell its apps, including Topaz Video, as a one-time purchase with a year of updates. In October 2025 it ended perpetual licences across its apps. [Topaz Video](/tool/topaz-video-ai) is now sold only as a subscription, on its own or in the Topaz Studio bundle.

**What to do:** if you already own an older perpetual version, it keeps working. Compare the yearly cost against how often you actually upscale footage before subscribing.

## Consolidated: Magnific moves under Freepik

Freepik bought the [Magnific](/tool/magnific-ai) upscaler in 2024 and has since brought its AI tools, Magnific included, under one brand and one credit system. The upscaler itself is the same; what changes is where you buy credits and how they are shared across tools.

## Opened up: LM Studio free for work use

[LM Studio](/tool/lm-studio), the desktop app for running AI models locally, became free for commercial use in mid-2025. Before that, companies were expected to contact the team for a work licence. Its command-line tool and SDK are open source; the app itself remains closed source.

## Price pressure: DeepSeek's open models

In January 2025, DeepSeek's R1 reasoning model performed close to leading closed models while its weights were published openly and its API was priced far lower. Since then, cheaper and open models have become a normal part of choosing an AI provider. [DeepSeek's](/tool/deepseek) chat app remains free, and its models can be self-hosted.

## Credit changes: Hailuo

MiniMax, which makes the [Hailuo](/tool/hailuo-minimax) video generator, removed bonus daily credits for existing subscribers in mid-2025. Credits on its plans expire at the end of each billing month with no rollover, and failed generations can still use credits.

## How to protect yourself from changes like these

1. **Export your work regularly.** Retired features rarely come with long notice.
2. **Read the licence, not just the price.** Commercial rights and download limits matter more than the monthly fee.
3. **Watch the unit of payment.** "Credits" can be redefined; know what one generation costs.
4. **Prefer tools you can run yourself** for anything you depend on daily. Open-source tools such as [ComfyUI](/tool/comfyui) and [Ollama](/tool/ollama) cannot be retired from under you.

We update tool listings when we find changes like these. If you spot one we have missed, the [contact page](/contact) is the fastest way to tell us.`
  },
  {
    id: '12',
    slug: 'comfyui-vs-stable-diffusion-webui-forge',
    title: 'ComfyUI vs WebUI Forge: Which Local Image Generator?',
    category: 'DESIGN',
    excerpt: 'Node graphs or tabs and sliders? How ComfyUI and WebUI Forge differ, what each needs, and which suits your way of making images.',
    date: 'Oct 3, 2026',
    readTime: '6 min read',
    imageUrl: '',
    url: '/blog/comfyui-vs-stable-diffusion-webui-forge',
    content: `If you want to generate images on your own computer with open models such as Stable Diffusion XL or Flux, two free interfaces dominate: [ComfyUI](/tool/comfyui) and [Stable Diffusion WebUI Forge](/tool/webui-forge). Both are open source and both run on your own GPU, but they suit very different working styles.

## The one-line difference

- **Forge** is a classic web app with tabs, prompt boxes and sliders. You type a prompt, adjust settings and press Generate.
- **ComfyUI** is a node graph. You connect boxes (model, prompt, sampler, upscaler) with wires to build a pipeline, then run it.

## WebUI Forge: familiar and light on memory

Forge was created by lllyasviel, the developer behind ControlNet, as a faster and more memory-efficient version of the well-known AUTOMATIC1111 Stable Diffusion WebUI. If you have used AUTOMATIC1111, Forge looks almost the same, and many of its extensions work.

**Strengths**

- Easy to learn: prompt, negative prompt, steps, size, Generate.
- Good memory management, which helps on graphics cards with limited VRAM.
- Runs Flux models in compressed formats (NF4 and GGUF), including with LoRAs.

**Things to know**

- Development has moved in bursts, and community forks have appeared to keep supporting newer models. Check which version or fork is current before installing.
- Complex multi-step pipelines are harder to build and repeat than in a node graph.

## ComfyUI: flexible and repeatable

ComfyUI treats every step as a node. That looks intimidating at first, but it means a whole pipeline, including image-to-image passes, ControlNet, upscaling and video, lives in one graph you can save and share. ComfyUI also embeds the workflow in the images it saves, so dragging an image back in restores the exact setup.

**Strengths**

- New open models are usually supported quickly, often on release day.
- Handles image, video and audio models, not just still images.
- A large ecosystem of custom nodes, installable through the ComfyUI Manager.
- Workflows are easy to share and reuse exactly.

**Things to know**

- The learning curve is real. Start from a shared workflow rather than an empty canvas.
- Custom nodes come from many authors; install only what you need and keep them updated.
- Licence is GPL-3.0. There is also Comfy Cloud, a paid hosted service, if you do not have a suitable GPU.

## Hardware

Both work best with an NVIDIA graphics card. As a rough guide, 8 GB of VRAM handles SDXL comfortably, while full-size Flux models want 12 GB or more unless you use the compressed versions. Apple Silicon Macs can run both, more slowly than a strong NVIDIA card. If you have no suitable GPU, a hosted option such as Comfy Cloud or a web tool like [Leonardo.ai](/tool/leonardo-phoenix) is more practical.

## Which should you choose?

**Choose Forge if** you want to type prompts and get images with the least setup, you are coming from AUTOMATIC1111, or your GPU is short on memory.

**Choose ComfyUI if** you want to try the newest models as they come out, build repeatable multi-step pipelines, or work with video as well as images.

Many people start with Forge to learn how prompts, samplers and steps behave, then move to ComfyUI when they want more control. Both are free, so installing both and comparing them on your own hardware costs nothing but disk space.

**Related:** [ComfyUI](/tool/comfyui) · [WebUI Forge](/tool/webui-forge) · [Magnific AI](/tool/magnific-ai) · [best AI image generators](/best-ai-image-generators.html)`
  },
];

/**
 * Same defect as data/tools.ts: entries were appended in batches without an id
 * check. Ten duplicates have since been deleted at source — the file held 18
 * records for 8 posts, every extra one a byte-identical copy of a post already
 * above it.
 *
 * This filter stays as the guard that caught them. Without it a repeat means
 * React key collisions, the same card rendered two or three times in one list,
 * and duplicate-content signals aimed at detail routes that can only ever
 * resolve to a single record. First occurrence wins.
 */
const _seen_blog = new Set<string>();
export const BLOG_POSTS = _RAW_BLOG_POSTS.filter((item) => {
  if (!item || !item.id || _seen_blog.has(item.id)) return false;
  _seen_blog.add(item.id);
  return true;
});
