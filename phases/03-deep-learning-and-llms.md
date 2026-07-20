# Phase 3 — Deep Learning & How LLMs Actually Work

> **Duration:** ~10 weeks · **Prerequisite:** Phase 2 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

This is the phase you've been waiting for since the beginning — the "**what is actually
happening behind the scenes of ChatGPT/Claude**" phase. By the end, LLMs will no longer
be magic. You'll understand neural networks, embeddings, tokens, and the **transformer/
attention** mechanism that powers every modern LLM.

The design here is deliberate and unusual: **you will build a tiny neural network by
hand, and then follow Andrej Karpathy to build a miniature GPT from scratch.** This is
the antidote to your black-box frustration. Nothing teaches "what's under the hood"
like assembling the hood yourself. We pair Karpathy's build-it-from-scratch approach
with Andrew Ng's structured specialization and 3Blue1Brown / Jay Alammar for intuition —
covering both your theory-first and build-first sides.

This phase is longer (10 weeks) because it is the intellectual core of the whole
roadmap. Do not rush it.

## Prerequisites

- Phase 2 complete: you understand training, loss, and gradient descent, and can use
  NumPy/pandas/scikit-learn.

## Concepts to Master

- **Neural networks**: neurons, layers, weights, biases, activation functions.
- **Forward pass** (making a prediction) and **backpropagation** (learning) — intuition + mechanics.
- **Why "deep"**: how layers build up increasingly abstract representations.
- **Embeddings**: turning words/things into vectors of meaning.
- **Tokens & tokenization**: what the model actually reads (not words — tokens).
- **The transformer** and **attention**: how the model decides what to "pay attention to."
- **Pretraining vs. fine-tuning**; what "a foundation model" is.
- **Why next-token prediction produces intelligence-like behavior.**
- Practical: **PyTorch** basics (tensors, autograd, a training loop) — *after* the by-hand build.

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | Neural nets: neurons, layers, activations (DLS Course 1) | Draw + describe a 2-layer net; compute a forward pass by hand on paper |
| 2 | Forward pass + loss, gradient descent for nets | Follow Karpathy: build `micrograd`-style tiny autograd, understand each line |
| 3 | Backpropagation, deeply | Extend the by-hand net; verify gradients; explain backprop out loud |
| 4 | PyTorch basics (tensors, autograd, training loop) | Re-implement Week 2–3's net in PyTorch; compare |
| 5 | Deep nets, training in practice (DLS Course 2) | Train a small net on a real dataset; tune and observe |
| 6 | Embeddings & representing meaning as vectors | Explore word embeddings; find nearest neighbors; visualize |
| 7 | Tokens & tokenization | Tokenize text yourself; inspect how a real tokenizer splits your writing |
| 8 | **Attention & the transformer** (Illustrated Transformer + 3B1B) | Diagram attention; explain it in your own words in `PROGRESS.md` |
| 9 | Build a tiny GPT (Karpathy "Let's build GPT") | Follow along; train a char-level model; understand every block |
| 10 | Consolidation + capstone writeup | See below |

## Capstone (Weeks 9–10)

Two-part:
1. **The build:** complete Karpathy's "Let's build GPT from scratch" so you have a
   working, tiny, character-level language model *you assembled and understand*.
2. **The explanation (this is the real deliverable):** write a clear, illustrated
   `how-llms-work.md` in your journal repo explaining — in your own words, to a smart
   friend — how an LLM goes from raw text to a coherent next word: tokens → embeddings
   → attention/transformer layers → next-token prediction → training. If you can write
   this clearly, you have achieved the phase's core goal.

## Resources

- **Deep Learning Specialization** — Andrew Ng / DeepLearning.AI (Coursera Plus).
  *(structured spine; Courses 1–2 core, others optional)*
- **Neural Networks: Zero to Hero** — Andrej Karpathy (YouTube, free). *(the from-scratch
  build — the single most valuable "behind the scenes" resource)*
- **3Blue1Brown** — Neural networks + "Attention in transformers" videos (free). *(intuition)*
- **The Illustrated Transformer** — Jay Alammar (blog, free). *(clearest written explainer)*
- **Hugging Face LLM Course** (free) — hands-on with real tokenizers and transformers.
- Optional: **Practical Deep Learning for Coders** — fast.ai (free), for a top-down complement.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] You can explain forward pass and backpropagation in plain language.
- [ ] You can explain what a token, an embedding, and attention are, and why an LLM
      predicts the next token.
- [ ] You built a tiny neural network essentially by hand and re-implemented it in PyTorch.
- [ ] You completed Karpathy's tiny-GPT build and it runs.
- [ ] `how-llms-work.md` exists and is clear enough to teach a beginner.

## Common Pitfalls

- **Skipping the by-hand build for the framework.** PyTorch-first hides the exact thing
  you're trying to understand. Build by hand first (Design Rule 4).
- **Passive video-watching on Karpathy.** Code alongside, pause constantly, retype.
- **Declaring victory at "I watched it."** The checkpoint is *explaining it*, not
  finishing videos.
