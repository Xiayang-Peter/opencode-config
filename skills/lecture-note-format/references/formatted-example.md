# Formatted Example (Reference)

An excerpt from a fully formatted COMPSCI 760 note (`W4L1-L2 SSL`), demonstrating every rule in the skill applied in context. Use this as the gold-standard pattern.

```markdown
# W4L1-2 Self-Supervised Learning (SSL)

## Why SSL?

- Supervised learning usually needs a **large amount of labelled data** to train the model.
	![[Pasted image 20260810131501.png|517]]
- But labelling is **expensive and time-consuming** — it needs real humans (**specialists**) to label them.
- **Unsupervised learning** side-steps the labelling cost, but lacks the strong supervised training signal that makes deep networks shine.
- **SSL** = best of both worlds: *free supervision derived from the data itself*, no human labels needed.

> [!important] Key idea
> **SSL** trains a model to predict a signal **automatically derived from the data itself** — we still use supervised losses (cross-entropy, regression), but the **labels come from the data**, not from humans.

---

## SSL recipe

Two-stage recipe:

1. **Pre-train (no labels)** — train an encoder with a self-supervised objective on unlabelled data (pretext head generates the signal).
2. **Transfer (small labels)** — reuse the pre-trained encoder, add a linear classifier / fine-tune on labelled data for the downstream task.

![[Pasted image 20260810132359.png|472]]

> [!tip] Mental model
> We **don't really care about the pretext task itself** — we care that the **features learned by the encoder** transfer well to downstream tasks.

---

## SSL approaches

Two big families:

1. **Pretext-task SSL** — hand-design a task whose labels can be auto-generated (rotation, jigsaw, inpainting, colorization).
2. **Generic SSL objectives** — a single loss that works across modalities:
   - Contrastive: SimCLR, MoCo
   - Self-distillation: BYOL, DINO
   - Cross-modal contrastive: CLIP
   - Masked reconstruction: BERT-style, MAE

---

## Contrastive learning

### The contrastive principle

> [!important] The core idea
> **Pull together similar things; push apart different things.**

- **Anchor**: the reference sample.
- **Positives (x⁺)**: semantically similar samples → *attracted* to the anchor.
- **Negatives (x⁻)**: different samples → *repelled* from the anchor.

### InfoNCE loss

Given one positive and $N-1$ negatives, for a single anchor:

$$\mathcal{L} = -\mathbb{E}_x \log \frac{\exp\big(s(f(x), f(x^+))\big)}{\exp\big(s(f(x), f(x^+))\big) + \sum_{j=1}^{N-1} \exp\big(s(f(x), f(x_j^-))\big)}$$

- This is cross-entropy of an $N$-way softmax: *"find the positive among N candidates"*.
- ==More negatives (↑ N) ⇒ tighter MI bound ⇒ stronger signal==: $\mathrm{MI}\big(f(x), f(x^+)\big) \ge \log N - \mathcal{L}$.

> [!tip] How to read the loss
> **Numerator** = similarity to the positive; **denominator** = positive + all negatives. The loss is minimised when the positive similarity **dominates** the softmax.

### MoCo (Momentum Contrast)

**Motivation:** keep the InfoNCE benefit of many negatives *without* the memory cost of huge batches.

- Maintain a **queue of feature vectors** from past mini-batches, used as negatives.
- Decouple the negative-pool size $K$ from the mini-batch size $N$.
- Problem: naively-stored stale features mismatch the current encoder → solution: **momentum encoder**.

**Architecture:**
- Query encoder $f_q$ — trained by SGD (gets gradients).
- Key encoder $f_k$ — ==**no gradient!**==
- Queue of past keys = negatives.
- Momentum update: $\theta_k \leftarrow m\,\theta_k + (1-m)\,\theta_q$, ==$m \approx 0.999$==.
- Loss: InfoNCE — query $q$ as anchor, $k^+$ as positive, queue as negatives.
- Each step: enqueue current keys, dequeue oldest (rolling FIFO).

**MoCo vs end-to-end vs memory bank:**

| | Keys maintained by | Negatives |
|---|---|---|
| (a) End-to-end (SimCLR) | back-prop through both encoders | limited by batch size |
| (b) Memory bank | sampled from a stored bank | stale features |
| (c) MoCo | momentum encoder + FIFO queue | **large and consistent** ✅ |

---

> [!success] Contrastive learning takeaways
> - Contrastive learning **replaces hand-crafted pretext tasks** with a single objective that works across modalities.
> - Two key ingredients: ==**good augmentations + many negatives**==.
> - SimCLR = large-batch end-to-end; **MoCo = momentum encoder + queue** ⇒ many negatives with modest memory.
> - Strong linear-probe and transfer numbers, sometimes matching ImageNet-supervised pre-training.
```

## What to notice in this example

1. **Title**: H1 with course/week/lecture code. No H1 anywhere else in the document.
2. **Callouts**: `important` for core ideas, `tip` for mental models, `success` for end takeaways. Bold inside callout text.
3. **Highlights**: exactly 4 — the MI-bound fact, "no gradient!", the momentum value, the two key ingredients. Nothing else is highlighted.
4. **Math**: inline `$...$` and display `$$...$$` preserved.
5. **Table**: 3-way comparison with a `✅` flagging the winner row.
6. **`---`**: separates every major `##` section.
7. **Images**: `![[Pasted image ...]]` embeds untouched, kept on their own lines.
8. **Bold**: every key term bolded; bullets stay one-idea-each.

## Before / after example

**Raw user note (before):**
```markdown
supervised learning usually used a large amount of ladled data to train the model![[Pasted image 20260810131501.png|517]]
But labelling is expensive and time-consuming, they needs real human (specalist) to label them.
	Unsupervised learning side-steps the labelling cost, but lacks the strong
	supervised training signal that makes deep networks shine.
```

**Formatted (after):**
```markdown
## Why SSL?

- Supervised learning usually needs a **large amount of labelled data** to train the model.
	![[Pasted image 20260810131501.png|517]]
- But labelling is **expensive and time-consuming** — it needs real humans (**specialists**) to label them.
- **Unsupervised learning** side-steps the labelling cost, but lacks the strong supervised training signal that makes deep networks shine.
- **SSL** = best of both worlds: *free supervision derived from the data itself*, no human labels needed.
```

Note: the raw line was broken into bullets, typos fixed (`ladled`→labelled, `specalist`→specialists, `they needs`→it needs), the tab-indented fragment was merged back into a clean bullet, and the image embed was preserved exactly.
