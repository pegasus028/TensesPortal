# Question review — Postcards & Plans

All 281 items read individually, plus every Hint. 15 changes made. Four suites
now pass: `verify.js` (structure), `qa.js` (new — question fairness),
`render-test.js` (all 281 items driven to their correct answer),
`e2e.js` (real browser).

---

## The item in the screenshot — s1l1-04

Two things were wrong with it, and they compounded.

**The box hints were the answer key.** They read `had, was, were, would` and
`have, is, are, will`. A student who read them could sort without thinking; a
student who ignored them and reasoned from meaning — which is what happened
here — got `would arrive` wrong, because *would arrive* points at future time
even though *would* is the past **shape** of *will*.

**The stem invited the wrong kind of reasoning.** "Is that first helper past or
non-past?" does not tell you to look at the shape rather than the meaning.

Rewritten:

> Sort each phrase by the **shape of its first word** — not by when the phrase
> happens. One of the six is a trap.
>
> Boxes: *First word is a past form* / *First word is not a past form*

and the explanation now names the trap rather than assuming you saw it:

> *Would arrive* is the trap. It points at future time, but *would* is the past
> shape of *will* — which is why *he said he would arrive* is the past version
> of *he will arrive*.

Worth knowing: **sorting is all-or-nothing.** Two chips wrong out of six scores
the item zero, which is why this one felt harsh. The engine has always worked
that way; `qa.js` now warns if any sort grows past six chips.

---

## Genuine errors found and fixed

| Item | What was wrong |
|---|---|
| **s3l2-03** | The gap had no auxiliary — *"we ___ been standing here for forty minutes"*. With the correct answer it read *"we still been standing"*. Ungrammatical whichever option you picked. Now *"we have ___ been standing"*. |
| **s2ch-2** | *"We ___ in the shop when they called the gate"* is the past simple of **be**, not the past progressive the item was tagged for, and the explanation claimed an aspect that wasn't there. Now *"We ___ looking at postcards…"*. |
| **s1l1-02**, **s1ch-6** | Both used the *spot* widget, which is captioned **"Find the mistake"** — but neither sentence contained a mistake. Students were hunting for an error that did not exist. Both converted to multiple choice. |
| **s6l3-02** | One option was garbled: *"I do not know when the coach arrives, so I will not know when will it arrive."* Half correct, half nonsense. Replaced, and the explanation now says why each distractor fails. |
| **s7l3-02** | Two of four options were ungrammatical in the gap (*"is due open"*, *"will be open"*), so the item could be solved without knowing any register. All four options are now real English that differ only in register. |
| **s5l2-04** | The error was *"We are being at the hotel by four"* — not a mistake any learner makes. Replaced with the one they do make: a present simple for a personal arrangement (*"I meet my cousin at the airport on Saturday"*). |
| **s5l2-01** | *"meet"* and *"meet with"* as two separate options — a fragment, not a form. Now *"have met"*. |
| **s7l1-06** | A True/False question, *"Is the speaker certain about this?"*, whose own explanation had to hedge ("True, reasonably so"). If the answer needs hedging the question isn't answerable. Reframed to ask what the speaker is actually doing. |
| **s3ch-1**, **v3-1**, **s7l3-04** | Stems said "click the **words**" / "the **phrase**" but the widget accepts exactly one click. |
| **s5l1-05**, **s5ch-3**, **v5-1** | Under the "Find the mistake" caption these said only "click the word that cannot use a timetable form", which does not read as error-hunting. Reworded. |

---

## Hints

The Hint button prints the `principle` line for that item's error tag. Most
pointed at the right area without answering — these five did not.

- **`time-clause`** listed every trigger word *and* the required form. For
  *"When we ___ get to the hotel"* that was the complete answer. Now: *"A future
  sentence can have two clauses, and only one of them is doing the predicting…
  work out which clause is which before you touch the verbs."*
- **`backshift`** spelled out *will → would*, which was literally the answer to
  four items. Now points at whether both halves of the sentence stand in the
  same time.
- **`since-for`** only described the result/activity split, so on the *since*
  vs *for* items the hint was about the wrong half of the lesson. Now names both
  areas without resolving either.
- **`used-to-would`** stated the rule the items test. Now: *"one of them will
  not accept every kind of verb, and one of them cannot open a paragraph on its
  own."*
- **`register-hedge`** named the offending word class outright. Now asks how
  much the sentence is claiming, and whether it is entitled to.

The teacher-facing `reteach` lines are untouched — they still carry the explicit
rule, which is what you want at the board.

---

## qa.js — the new check

`verify.js` proves the items *load*. `qa.js` proves they are *fair*. Eight
checks:

1. a *spot* item whose stem doesn't ask for a mistake (the widget says "Find the mistake")
2. a *spot* stem saying "words"/"phrase" when only one click is possible
3. a `fix` that repeats the clicked word, so feedback reads *"had → had — …"*
4. a sort box hint that contains, or shares a distinctive word with, its own chips
5. a gap that is ungrammatical once the correct option is inserted
6. duplicate or near-duplicate options
7. a True/False item whose explanation hedges, or whose stem isn't a question
8. a Hint containing the answer to any item carrying that tag

Run against the **pre-fix** file it independently reproduced 9 of the findings
above, including the screenshot item, the broken gap and all the leaking hints.

It did **not** catch four of them — the mis-tagged aspect in s2ch-2, the garbled
distractor in s6l3-02, the ungrammatical options in s7l3-02, and the implausible
error in s5l2-04. Those needed reading. A linter narrows the job; it does not
replace the read-through.

```
node verify.js      # structure
node qa.js          # question fairness   ← new
node render-test.js # all 281 items marked correctly
node e2e.js         # real browser, phone width, both themes
```

---

## One thing to clean up in your Sheet

An early run of `e2e.js` happened after the live Apps Script URL went into
`index.html`, and it registered a real account — **student ID `test-student`,
display name `Ploy`** — in your Students sheet. Delete that row.

`e2e.js` now blanks `window.PP_API_URL` as it serves the page, and aborts if it
cannot, so the suite runs entirely against browser storage and can never write
to the class sheet again.
