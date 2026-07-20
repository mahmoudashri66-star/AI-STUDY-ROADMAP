# Phase 1 — Python Foundations

> **Duration:** ~8 weeks · **Prerequisite:** Phase 0 · **Weekly load:** ~24 hrs

## Purpose & Design Rationale

This is the phase that removes your single biggest ceiling. You told me the honest
truth: you can't read a traceback, you've never written a program from a blank file,
and you've never made an API call. **Everything you dream of — building AI systems,
understanding agents, designing solutions — routes through the ability to code.**

The early weeks will feel slow and humbling. That is by design, and it is temporary.
We are not aiming to make you a software engineer; we are making you *code-literate*
enough to build AI things and to understand what agents are doing. You will write code
**by hand, from blank files**, and you will deliberately create and fix errors so that
tracebacks stop being scary.

We use **AI Python for Beginners (Andrew Ng)** as the spine precisely because it teaches
Python *the modern way* — with an AI assistant beside you — which matches how you'll
actually work. But there is one hard rule below to prevent the black-box trap.

## The One Hard Rule of This Phase

**You may use AI to explain and to debug, but not to write code you then can't
reproduce.** After any AI help, close it and rewrite the solution from a blank file
from memory. If you can't, you haven't learned it yet. This is how we honor your
"building things I don't understand kills my motivation" constraint.

## Prerequisites

- Phase 0 complete (Colab + GitHub working).
- Willingness to be a beginner for 8 weeks.

## Concepts to Master

- **Values & variables**, and data types (int, float, string, bool).
- **Data structures**: lists, dictionaries, tuples, sets — and *when to use which*.
- **Control flow**: `if/elif/else`, `for` and `while` loops.
- **Functions**: parameters, return values, scope, why functions matter.
- **Reading errors**: tracebacks, common exceptions, and how to debug systematically.
- **Files & data**: reading/writing text, CSV, and JSON.
- **Working with libraries**: `import`, `pip`, and using documentation.
- **Light OOP**: what a class/object/method is, enough to read library code.
- **Environments**: what a virtual environment is and why it exists (concept + basic use).

## Weekly Objectives

| Week | Focus | Build (night block) |
|---|---|---|
| 1 | Variables, types, printing, input; running notebooks | A tiny "about me" script that computes something from inputs |
| 2 | Lists & dictionaries; indexing; iteration basics | A script that stores and summarizes a small dataset (e.g., your weekly study hours) |
| 3 | Control flow (`if`, loops) | A number-guessing game and a simple menu program |
| 4 | Functions & scope | Refactor Week 3's programs into clean functions |
| 5 | **Errors & debugging** (deliberately break things) | Take a working script, introduce 5 bugs, fix each by reading the traceback |
| 6 | Files & data (text, CSV, JSON) | A script that reads a CSV of your data and writes a summary file |
| 7 | Libraries, `pip`, docs; intro to OOP | Use a library (e.g., `requests` or `pandas`) to do something small; read its docs |
| 8 | Consolidation + first "real" mini-project | See capstone below |

## Capstone Project (Week 8)

Build, from a blank file, a small **command-line tool that does something useful in one
of your domains** — for example:
- A **study-tracker**: logs hours to a CSV, then prints weekly totals and a streak.
- A **content idea organizer**: reads a JSON of ideas, filters/sorts, writes a report.

Requirements: uses variables, a data structure, at least two functions, file
read/write, and handles at least one error gracefully. Commit it to its own GitHub
repo with a README you wrote.

## Resources

- **AI Python for Beginners** — Andrew Ng / DeepLearning.AI (Coursera Plus, also free
  on deeplearning.ai). *(primary spine — built for non-coders)*
- **Python for Everybody** — Dr. Chuck / U. Michigan (free, YouTube + Coursera).
  *(use as a second explanation whenever a concept doesn't click)*
- Official **Python docs tutorial** (free) — for looking things up, not for reading cover to cover.
- Your existing AI tools — as a *tutor and debugger*, under the Hard Rule above.

> External resource descriptions are paraphrased. Content was rephrased for compliance
> with licensing restrictions.

## Exit Checkpoint (you may advance when ALL are true)

- [ ] Given a Python traceback from **your own** code, you can locate and fix the bug
      without asking AI to fix it for you.
- [ ] You can write a program with functions, a loop, and file I/O **from a blank
      file, from memory**.
- [ ] You can explain the difference between a list and a dictionary and when to use each.
- [ ] Your capstone tool runs, lives in its own GitHub repo, and has a README you wrote.
- [ ] You can read a small unfamiliar Python snippet and describe what it does.

## Common Pitfalls

- **Watching without typing.** You cannot learn to code by watching. Type every example.
- **Letting AI write everything.** The Hard Rule exists for a reason — enforce it.
- **Rushing to Week 8.** If Weeks 3–5 aren't solid, everything after wobbles.
