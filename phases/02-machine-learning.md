# Phase 2 — How Machine Learning Actually Works

> **Duration:** ~8 weeks · **Prerequisite:** Phase 1 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

Now that you can code, you learn the mechanism that underlies *all* modern AI,
including LLMs: **how a machine "learns" from data.** This is the conceptual heart of
your "I want to understand what's behind the scenes" goal. Once you truly understand
training, loss, and gradient descent, LLMs stop being magic and become "a very big
version of a thing I understand."

We keep the math **just-enough**: intuition and the key ideas, supported by
3Blue1Brown for visual understanding, without drowning in proofs. You do not need a
math degree to understand or build with ML. You *do* need to understand the ideas well
enough to reason about them — and we'll shore up the specific math (a little linear
algebra, a little probability, the idea of a derivative/slope) exactly where it's
needed, no more.

## Prerequisites

- Phase 1 complete: comfortable writing Python functions, loops, and using libraries.

## Concepts to Master

- **Supervised learning**: features, labels, training set vs. test set.
- **The core loop**: prediction → **loss** (how wrong we are) → adjust parameters → repeat.
- **Gradient descent** — the intuition of "roll downhill to reduce error."
- **Linear & logistic regression** — the simplest models, understood fully.
- **Overfitting vs. generalization**; train/validation/test splits; why we hold data out.
- **Evaluation metrics**: accuracy, precision/recall, and why accuracy can lie.
- **Features & data**: why data quality dominates model quality.
- Just-enough math: vectors/matrices intuition, probability basics, slope/derivative intuition.
- Intro to **unsupervised learning** (clustering) and what "no labels" means.
- The Python ML stack: **NumPy**, **pandas**, and **scikit-learn** basics.

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | What ML is; supervised learning framing; data as tables | Load a dataset with pandas; explore and summarize it |
| 2 | Linear regression + the idea of a loss function | Fit a line to data with scikit-learn; interpret it |
| 3 | Gradient descent intuition (+ 3Blue1Brown) | Implement a *tiny* gradient descent by hand on one parameter |
| 4 | Train/test split, overfitting, generalization | Show overfitting yourself: tiny data, complex model, watch it fail on test |
| 5 | Classification + logistic regression | Build a simple classifier (e.g., spam/not-spam style) |
| 6 | Evaluation metrics; why accuracy misleads | Evaluate Week 5's model with precision/recall; discuss tradeoffs |
| 7 | Unsupervised learning (clustering); feature ideas | Cluster a dataset; interpret the clusters |
| 8 | Consolidation + capstone | See below |

## Capstone Project (Week 8)

Take a dataset from one of **your domains** and build a small, honest ML project:
- e.g., a **classifier or predictor** on real estate, fitness, or content-engagement
  data (many free datasets exist on Kaggle / UCI).
- Requirements: load & clean data (pandas), train a model (scikit-learn), split
  train/test, report proper metrics, and **write a paragraph explaining what the model
  learned and where it would fail.** The explanation matters more than the accuracy.

Commit to its own repo with a README and a short "what I learned / limitations" section.

## Resources

- **Machine Learning Specialization** — Andrew Ng / DeepLearning.AI & Stanford
  (Coursera Plus). *(primary spine — the canonical foundation)*
- **3Blue1Brown** — "Gradient descent" and "neural network" videos (free). *(math intuition)*
- **scikit-learn** official tutorials/docs (free) — for the practical API.
- **Kaggle** (free) — datasets and beginner notebooks for practice.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] You can explain, in plain language, how a model "learns" — prediction, loss,
      adjust, repeat — without notes.
- [ ] You can explain what overfitting is and *demonstrate* it in code.
- [ ] You can load a dataset, train a scikit-learn model, split train/test, and report
      appropriate metrics **yourself**.
- [ ] Your capstone repo exists with an honest "what it learned / limitations" writeup.
- [ ] You understand why "accuracy = 99%" can still be a bad model.

## Common Pitfalls

- **Chasing math depth.** Get the intuition, move on. You can always deepen later
  (specialization path). Depth here is a time sink that stalls momentum.
- **Copy-pasting notebooks.** Retype and modify; predict the output before running.
- **Skipping evaluation.** The metric *is* the lesson — a model you can't evaluate is
  a model you don't understand.
