/* ===========================================================================
   POSTCARDS & PLANS — English Tense & Aspect
   content.js — curriculum, item bank, badges, remediation map.
   Edit freely: every string here is classroom copy, not code.
   ---------------------------------------------------------------------------
   THE ARGUMENT OF THIS COURSE

   School grammar says English has twelve tenses. It has two. The verb itself
   changes for exactly one contrast — PAST vs NON-PAST (go/went, is/was) —
   and everything else is built on top of that with auxiliaries. There is no
   future ending anywhere in the language.

   So the course is organised around three questions, not twelve boxes:
     1. WHEN?      past or non-past — the only thing the verb ending marks
     2. HOW SEEN?  aspect — perfect (looking back from a point) and
                   progressive (standing inside an unfinished process)
     3. HOW SURE / ON WHAT GROUNDS?  the modal and the future system

   The future gets three of the eight legs, because it is where the real
   insight lives: English does not grammaticalise futurity. It grammaticalises
   what it is about THE PRESENT MOMENT that licenses you to speak about the
   future — visible evidence, a fixed arrangement, a published timetable, an
   official plan, or your own judgement made as you speak.
   ---------------------------------------------------------------------------
   ITEM TYPES
     choose  {stem, options[], answer}                 generic multiple choice
     equiv   {given, stem, options[], answer}          same-meaning
     judge   {given, stem, answer}                     True / False / Can't tell
     gap     {lines:[{who,text}], options[], answer}   dialogue gap-fill  ("___")
             ...or {lines, accept:[]}                  typed answer
     table   {table:{cols,rows}, stem, options[], answer}
     pick    {shop, items:[{name,price,note}], stem, answer}
     order   {stem, items[] IN CORRECT ORDER}          shuffled at render
     spot    {stem, words[], answer, fix}              click the wrong word
     build   {stem, tiles[], solution, alt[]}          assemble a sentence
     sort    {stem, bins:[{key,label,hint}], items:[{text,bin}]}
   Every item carries: id, tag (error tag), level (CEFR), why (the diagnosis).
   =========================================================================== */

const CEFR = ['A2', 'B1', 'B1+', 'B2', 'B2+', 'C1'];

/* --------------------------------------------------------------------------
   RANKS — one per leg cleared
   -------------------------------------------------------------------------- */
const RANKS = [
  { n: 0, name: 'Armchair Traveller', note: 'You have been on holiday. You cannot yet tell anyone about it.' },
  { n: 1, name: 'Postcard Writer',    note: 'You know the two tenses English actually has, and what a snapshot is for.' },
  { n: 2, name: 'Storyteller',        note: 'You can tell the story of a holiday and keep the events in order.' },
  { n: 3, name: 'Souvenir Keeper',    note: 'You can talk about a past trip in a way that is about right now.' },
  { n: 4, name: 'Scrapbooker',        note: 'You can step backwards inside a story without losing your reader.' },
  { n: 5, name: 'Trip Planner',       note: 'Timetables, arrangements and intentions — three futures, chosen on purpose.' },
  { n: 6, name: 'Forecaster',         note: 'You know what will actually means, and when English forbids it.' },
  { n: 7, name: 'Long-haul Flyer',    note: 'You can stand in next August and look back at July.' },
  { n: 8, name: 'Time Traveller',     note: 'C1. You use the past tense for things that are not past at all.' }
];

/* --------------------------------------------------------------------------
   BADGES — holiday keepsakes. `check` runs against the progress object.
   -------------------------------------------------------------------------- */
const BADGES = [
  { id: 'passport',    name: 'First Postcard',     perk: 'Sent home from leg one.',              icon: 'card',   how: 'Finish your first lesson.' },
  { id: 'streak3',     name: 'Long Weekend',       perk: 'Three days away.',                     icon: 'sun',    how: 'Study 3 days in a row.' },
  { id: 'streak7',     name: 'Full Week Off',      perk: 'A proper holiday.',                    icon: 'palm',   how: 'Study 7 days in a row.' },
  { id: 'streak14',    name: 'Grand Tour',         perk: 'Two weeks, six cities.',               icon: 'globe',  how: 'Study 14 days in a row.' },
  { id: 'upgrade',     name: 'Window Seat',        perk: 'The best view on the plane.',          icon: 'seat',   how: 'Score 100% on any checkpoint.' },
  { id: 'firstclass',  name: 'Sea View',           perk: 'The room they never give you.',        icon: 'wave',   how: 'Score 100% on three checkpoints.' },
  { id: 'solo',        name: 'Solo Traveller',     perk: 'No guidebook needed.',                 icon: 'compass',how: 'Clear a checkpoint without using a hint.' },
  { id: 'reclaim',     name: 'Found in the Case',  perk: 'It was there all along.',              icon: 'bag',    how: 'Fix 5 items in Standby that you once got wrong.' },
  { id: 'tailwind',    name: 'Clear Skies',        perk: 'Ten in a row, no turbulence.',         icon: 'wind',   how: 'Answer 10 in a row correctly.' },
  { id: 'rebooked',    name: 'Rebooked',           perk: 'A second chance, taken.',              icon: 'redo',   how: 'Pass a checkpoint you previously failed.' },
  { id: 'nonstop',     name: 'Non-stop',           perk: 'No connections.',                      icon: 'arrow',  how: 'Finish a whole leg in one session.' },
  { id: 'quickdraw',   name: 'Hand Luggage Only',  perk: 'Straight through, no waiting.',        icon: 'bolt',   how: 'Earn 25 time bonuses by answering inside 7 seconds.' },
  { id: 'frequent',    name: 'Time Traveller',     perk: 'Every tense in English is yours.',     icon: 'clock',  how: 'Clear all 8 legs.' }
];

/* --------------------------------------------------------------------------
   ERROR TAGS → what the teacher report says. One entry per tag used by items.
   `reteach` is board-ready. `activities` are things a teacher can run tomorrow.
   -------------------------------------------------------------------------- */
const REMEDIATION = {

  /* ---- LEG 1: the architecture ---- */
  'two-tenses': {
    name: 'Two tenses, not twelve',
    principle: 'The English verb changes its shape for exactly one contrast: past versus non-past. Everything else — perfect, progressive, future — is built with auxiliaries on top of that single contrast.',
    reteach: 'Write go / went, eat / ate, is / was on the board and ask for the future form. There is not one. There is no ending in English that means "future", the way -ed means past. Once students see that, "the future tense" stops being a box they have to find and becomes a choice they have to make.',
    activities: [
      'Strip the auxiliaries: give ten long verb phrases (will have been waiting, had been packing) and have students cross out everything that is not the lexical verb, then say whether the FIRST word is past or non-past. It always is one or the other.',
      'The missing ending hunt: students search a page of a travel blog for any verb ending that marks future. Finding nothing is the point of the exercise.'
    ]
  },
  'present-simple-event': {
    name: 'Why the present simple is almost never about now',
    principle: 'The present simple views a situation as a complete whole. A complete event cannot fit inside the instant of speaking — by the time you finish saying "I open my suitcase" the opening is over. So with action verbs the present simple can only mean habit, fact, or schedule.',
    reteach: 'Ask the class to describe what you are doing while you walk across the room. Nobody says "you walk". Everybody says "you are walking". That is not a rule they learned — it is the grammar refusing an impossible reading. The present simple survives for "now" only in commentary, demonstrations and performatives: "I promise", "he passes to Bunmee, he shoots".',
    activities: [
      'Live commentary: one student mimes packing while another commentates in present simple. The strangeness is the lesson — then switch to progressive and feel it fit.',
      'Three-column sort of present-simple sentences from a guidebook: habit / general fact / timetable. Students discover the fourth column ("happening now") stays empty.'
    ]
  },
  'progressive-core': {
    name: 'The progressive — standing inside an unfinished action',
    principle: 'The progressive does not mean "now". It means the situation is viewed from inside, in progress and not complete. Nowness is just the commonest case.',
    reteach: 'One meaning, four uses. In progress now ("I am packing"). Around now but not this second ("I am reading a book about Japan"). Temporary rather than permanent ("I am staying with my aunt" versus "I live with my aunt"). And an unfinished stretch of the future ("we are flying on Tuesday"). Teach the single meaning and the four uses fall out of it.',
    activities: [
      'Permanent or temporary: pairs of sentences (I work / I am working in Phuket) where students describe the different life situation each implies.',
      'Zoom in, zoom out: describe a holiday photo first in the simple (the whole event) and then in the progressive (the frozen middle of it).'
    ]
  },

  /* ---- LEG 2: past narrative ---- */
  'past-simple-definite': {
    name: 'Past simple — a finished event in finished time',
    principle: 'The past simple places a complete event inside a time that is over. That time is usually stated, but it can be understood from the conversation.',
    reteach: 'The past simple is the default tense of a holiday story and students should be pushed towards it, not away from it. Two things to drill: the irregular forms, and the fact that the question and negative hand the tense to DID and give the main verb back its base form — did you go, not did you went.',
    activities: [
      'Irregular relay in a story frame: teams complete "Last April we ___ (fly) to Hanoi, ___ (eat) too much and ___ (lose) a bag" against the clock.',
      'Timeline dictation: read a holiday anecdote once at speed; students plot the events on a line, then rebuild the story in past simple.'
    ]
  },
  'past-prog-frame': {
    name: 'Past progressive — the background, not the event',
    principle: 'The past progressive supplies the scene that was already running when something happened. The long thing takes the progressive, the short thing that lands inside it takes the simple.',
    reteach: 'Draw a long wavy line and a short arrow through it. Wavy line: "we were waiting at the gate". Arrow: "they announced the delay". Swap them and the story changes — "we waited at the gate" makes the waiting the event, which is why it sounds like the end of the story rather than the middle.',
    activities: [
      'Interruption chains: each student adds an arrow event into the previous student\'s wavy-line background.',
      'Two versions of one holiday: students write the same three incidents twice, once with all simple and once with backgrounds, then read both aloud and describe the difference in feel.'
    ]
  },
  'narrative-order': {
    name: 'when, while and as — dividing the labour',
    principle: 'These conjunctions do not choose the tense; the shape of the event does. While and as prefer the long background; when attaches comfortably to either, which is why it is the ambiguous one.',
    reteach: '"When the taxi arrived, we were eating" — the meal was already running. "When the taxi arrived, we ate" — the meal started afterwards. Same conjunction, two orders of events, and the only thing that tells them apart is the aspect. This is the single most useful thing a B1 storyteller can learn.',
    activities: [
      'Before or after: read ten when-sentences and have students hold up cards showing whether the second event started before or after the first.',
      'Comic strip captioning: three frames, and students must caption them so a reader can reconstruct the order without seeing the pictures.'
    ]
  },

  /* ---- LEG 3: present perfect ---- */
  'perfect-now': {
    name: 'The present perfect is a PRESENT tense',
    principle: 'It is not a polite past. It uses a past event to say something about the present moment, which is why the auxiliary is have and not had.',
    reteach: '"I lost my passport" is an event in past time — it may have turned up since. "I have lost my passport" is a statement about now: it is gone, and we have a problem in this room. Teach the tense as an answer to "so what is the situation now?" and half the errors disappear.',
    activities: [
      'So what now? Students convert past-simple crisis sentences into present perfect and then say the present consequence out loud.',
      'Detective desk: a scene described only in present perfect ("someone has opened my case, they have taken the charger") and students reconstruct the past-simple events.'
    ]
  },
  'perfect-adverbials': {
    name: 'Why "I have been to Japan last year" fails',
    principle: 'A present perfect claims relevance to now, so it cannot be pinned to a time that is over. Definite past-time adverbials and the present perfect are mutually exclusive.',
    reteach: 'The test is whether the time frame includes this moment. Today, this week, this year, so far, ever, never, recently — all still open, all fine. Yesterday, last year, in 2019, when I was twelve — all closed, all take the past simple. And note that "this morning" flips at lunchtime.',
    activities: [
      'Open or closed: sort twenty time expressions into frames that include now and frames that do not. Put "this morning" in the pile twice and let students argue.',
      'Just / already / yet triage on a packing checklist, with a deliberately ungrammatical sentence hidden in every three.'
    ]
  },
  'since-for': {
    name: 'since and for, and the two present perfects',
    principle: 'The simple present perfect reports a result; the progressive reports the activity that produced it. Both reach up to now, but they point at different things.',
    reteach: 'Since marks the starting point, for marks the length: since Tuesday, for three days. Then the aspect choice: "I have unpacked" — the case is empty, look at the result. "I have been unpacking" — that is why the room is a mess, look at the activity. With state verbs the simple carries the duration anyway: I have known her for years.',
    activities: [
      'Result or reason: students see a photo of a chaotic hotel room and write three have-been sentences that explain it, then three have sentences that report what is now done.',
      'Since/for auction with traps: "since three days" and "for Tuesday" hidden in the list.'
    ]
  },

  /* ---- LEG 4: past perfect and past habit ---- */
  'past-perfect-order': {
    name: 'Past perfect is not "long ago" — it is out of order',
    principle: 'The past perfect exists to signal that an event is being told out of its chronological place. If the story is already in order, English uses the past simple and expects the reader to follow.',
    reteach: 'Students overuse this tense badly. "We arrived, we had checked in, we had gone to the beach" is wrong, not just heavy. Say this: use the past perfect for the step BACKWARDS, and as soon as the narrative is moving forwards again, drop back to the past simple. One backward step usually needs the marker once, not on every verb after it.',
    activities: [
      'Reordering drill: give three events in chronological order and ask students to retell them starting with the last one. The past perfect appears where it is needed and nowhere else.',
      'Over-correction hunt: a paragraph with six past perfects, only two of which earn their place. Students delete the rest and justify.'
    ]
  },
  'used-to-would': {
    name: 'used to, would, and the past habit toolkit',
    principle: 'Both describe repeated past behaviour, but would refuses states. Used to covers everything; would covers only actions, and needs a past time frame already established.',
    reteach: '"We used to have a caravan" is fine; "we would have a caravan" is not, because having is a state. Would is the storyteller\'s form — it needs the scene set first ("Every August we went to Hua Hin. We would leave before dawn...") — which is exactly why it sounds nostalgic and used to sounds neutral.',
    activities: [
      'State or action sort, then students try each verb in both frames and hear which one breaks.',
      'Childhood holidays paragraph: open with used to, continue with would, and notice that the reverse order does not work.'
    ]
  },
  'past-perfect-prog': {
    name: 'Past perfect progressive — how long it had been going on',
    principle: 'It measures a stretch of activity running up to a point in the past, usually to explain the state of things at that point.',
    reteach: 'The giveaway is a duration plus a consequence. "We had been driving for six hours, so nobody spoke at dinner." Compare the plain past perfect — "we had driven six hours" reports the distance, not the wear. Progressive for the wearing, simple for the achievement.',
    activities: [
      'Explain the photo: a picture of exhausted travellers, and students supply the had-been-ing sentence that accounts for it.',
      'Six hours of what: pairs write a simple and a progressive version of the same past perfect and vote on which explains a consequence better.'
    ]
  },

  /* ---- LEG 5: the present-tense futures ---- */
  'timetable-future': {
    name: 'Present simple for timetables — the impersonal future',
    principle: 'A published schedule is treated as a present fact about the world, not a prediction, so English puts it in the present simple.',
    reteach: 'The test is: is this written down somewhere, outside the control of anyone in this conversation? "The ferry leaves at 07:15." "The museum opens at ten." You cannot use it for your own plans — "I fly to Osaka on Friday" only works because the airline\'s timetable says so, and "*I visit my aunt on Friday" fails because no timetable governs aunts.',
    activities: [
      'Timetable or plan: twenty future sentences to sort by whether an institution or a person decided it.',
      'Real timetable talk: hand out a genuine train schedule and ban every future form except the present simple.'
    ]
  },
  'arrangement-future': {
    name: 'Present progressive for arrangements — somebody else knows',
    principle: 'The present progressive for future time means the arrangement already exists now: a booking made, a person told, a time agreed.',
    reteach: 'The question to ask is "has anyone else been involved yet?" "We are meeting at the gate at six" means it is agreed. "We will meet at the gate at six" is you deciding as you speak. This is why the progressive sounds confident and will sounds provisional — and why a diary entry is almost always progressive.',
    activities: [
      'Diary pages: students fill next week\'s diary, then describe it, then cross one entry out and describe the change — the tense shifts the moment the arrangement dies.',
      'Who else knows? Each sentence gets a name attached, or it cannot use the progressive.'
    ]
  },
  'going-to': {
    name: 'going to — the evidence is already here',
    principle: 'Be going to says the cause of the future event exists in the present: either visible evidence, or an intention the speaker already formed before speaking.',
    reteach: 'Two jobs, one form. Evidence: "look at that sky — it is going to pour." Intention: "we are going to spend a week in Chiang Mai" (decided last month). In both, something is already true NOW. That is why "look at that sky, it will pour" sounds wrong: will offers a judgement when the speaker is plainly pointing at proof.',
    activities: [
      'Point at the proof: photos with visible causes; students must name the evidence before producing the going-to sentence.',
      'When did you decide? Students label ten future sentences "decided before" or "deciding now", then check whether the form matches.'
    ]
  },

  /* ---- LEG 6: will ---- */
  'will-modal': {
    name: 'will is a modal, not a tense',
    principle: 'Will belongs with can, may and must. Its core meaning is the speaker\'s judgement or willingness — futurity is a side effect of judging something not yet settled.',
    reteach: 'The proof is that will can be about the present. The doorbell rings: "that will be the taxi." Nothing future there at all — it is a confident inference about now. Will also carries volition ("I will carry that for you") and, with stress, insistence ("he WILL leave the window open"). Teaching will as "the future tense" hides three of its four meanings.',
    activities: [
      'Four uses dictation: prediction, instant decision, willingness, annoying habit — students label twenty lines from a holiday dialogue.',
      'Present-time will: five doorbell-and-phone scenarios where the class must produce an inference with will and then paraphrase it with "must be".'
    ]
  },
  'will-vs-going': {
    name: 'Choosing between will and going to',
    principle: 'The choice is not about certainty or distance. It is about whether the grounds for the statement exist in the present situation (going to) or in the speaker\'s judgement at the moment of speaking (will).',
    reteach: 'Two clean tests. Decision: if you decided before you opened your mouth, going to; if you are deciding as you speak, will. Evidence: if you can point at it, going to. That is the whole difference between "I am going to complain to the manager" (you have been planning it since breakfast) and "right, I will complain to the manager" (you decided just now).',
    activities: [
      'Reaction drill: teacher describes a problem, students must answer with an instant-decision will; then the same problems as pre-planned intentions.',
      'Rewrite the argument: a holiday complaint email written entirely with will, rewritten with going to, and the class describes how the writer now sounds.'
    ]
  },
  'time-clause': {
    name: 'No will in a future time clause',
    principle: 'After when, if, as soon as, before, after, until, once and by the time, English uses a present form even though the time is future. The subordinate clause supplies the reference point, and reference points are treated as given rather than predicted.',
    reteach: 'Only the main clause gets will: "When we LAND, I will call you." Then the exception students must see — if when introduces a noun clause rather than a time clause, will comes back: "I do not know when we WILL land." Test: if you can replace it with "at the time that", it is a time clause and will is banned.',
    activities: [
      'Two whens on the board and students sort ten sentences by which one they contain, before touching the verb at all.',
      'Sentence chaining: each student adds a time clause to the previous sentence, round the room, at speed. Errors are audible immediately.'
    ]
  },

  /* ---- LEG 7: looking back from the future ---- */
  'future-prog': {
    name: 'Future progressive — in progress, and the polite future',
    principle: 'Two jobs. It puts an action in the middle of a future moment, and it presents a future event as something that will simply happen anyway, with no decision involved — which makes it English\'s main politeness device for the future.',
    reteach: '"This time on Friday we will be sitting on a beach" is the in-progress use. Now the other one: "Will you be using the car tonight?" is not asking a favour. "Will you use the car tonight?" is. Stripping out the volition in will is exactly what makes the progressive tactful, and it is why hotel and airline staff speak almost entirely in it.',
    activities: [
      'Favour or fact: students hear pairs of questions and decide which one obliges them to help.',
      'Cabin crew role-play, with the rule that every request must use will you be -ing.'
    ]
  },
  'future-perfect': {
    name: 'Future perfect — standing in the future, looking back',
    principle: 'It marks completion before a stated future point. The point must be stated, which is why by is almost always present.',
    reteach: 'Always set the vantage point first, or the tense has nothing to hang on: "By the time we land, we will have been travelling for twenty hours." Then the aspect choice, exactly as in the past perfect: "we will have visited six cities" counts the achievements; "we will have been travelling for twenty hours" measures the stretch.',
    activities: [
      'By the time... students finish ten stems about a real upcoming trip, then convert three to the progressive and say what changed.',
      'Anniversary maths: work out what will have happened by a date next year, using figures from the class.'
    ]
  },
  'be-to-about': {
    name: 'be to, be about to, be due to — the arrangement ladder',
    principle: 'Beyond the four common futures sits a set of semi-modals that mark official arrangement, imminence and schedule, each with its own register.',
    reteach: 'be to is formal and official, and is the voice of news reports and instructions: "the minister is to visit Phuket"; "you are to report to the gate at six". be about to and be on the point of mean it is happening in the next moment. be due to means the schedule says so, and carries the hint that it may not happen: "the flight is due to land at nine" — which is precisely what you say when it has not.',
    activities: [
      'Headline rewrite: convert five plain future sentences into news-style be to headlines.',
      'Due to versus will: students describe a delayed departure board and discover that due to is the only honest form on it.'
    ]
  },

  /* ---- LEG 8: C1 ---- */
  'past-as-distance': {
    name: 'The past tense is about distance, not time',
    principle: 'The past form marks remoteness from present reality. Remoteness in time is only one kind. The other two are remoteness from fact (unreality) and remoteness from the listener (politeness).',
    reteach: 'This is the single idea that unifies the whole system. "If I had more time" — not past, unreal. "I wish I knew" — not past, unreal. "It is time we left", "I would rather you came on Friday", "suppose we flew instead" — all past-form, all future-facing. And "I wondered if you could help" is not a report of past wondering; the past form is simply standing further back to be polite.',
    activities: [
      'Three piles: past time, unreal, polite. Twenty past-form sentences, and no sentence may go in more than one pile.',
      'Distance dial: students say the same request four ways (can you / could you / I wonder if you could / I was wondering if you could) and rank them by how far the speaker is standing back.'
    ]
  },
  backshift: {
    name: 'Backshift and the future in the past',
    principle: 'Reporting inside a past frame pushes every tense one step back, and the future forms shift with them: will becomes would, be going to becomes was going to, the present progressive becomes the past progressive.',
    reteach: 'Backshift is a default, not a law: if the statement is still true you may keep the original tense ("she said the ferry leaves at seven"). Then the three futures-in-the-past, which students almost never produce. would = the prediction as it was then. was going to = the intention, and it usually failed ("we were going to fly, but..."). was to = destiny, the voice of hindsight: "he was to miss the last train."',
    activities: [
      'Three endings: give "we were going to take the night train" and require three continuations, all of which explain why it did not happen.',
      'Hindsight paragraph: rewrite a short holiday anecdote so that one sentence uses was to, and discuss the change in tone.'
    ]
  },
  stative: {
    name: 'State verbs, and what happens when you force them',
    principle: 'Verbs of thinking, liking, possessing and perceiving describe states rather than activities, so they resist the progressive. Forcing one changes the meaning rather than breaking the sentence.',
    reteach: 'The interesting cases are the ones that shift. "I see" means understand; "I am seeing someone" means meeting romantically. "I think it is fine" is an opinion; "I am thinking about it" is mental activity in progress. "I am loving this hotel" is not an error — the progressive coerces a temporary reading, which is exactly what the advertising wanted.',
    activities: [
      'Force it and see: students put ten state verbs in the progressive and describe the new meaning that appears.',
      'Two columns from a hotel review: states versus activities, then rewrite three states as activities and see what the reviewer now sounds like.'
    ]
  },
  'register-hedge': {
    name: 'Hedged prediction and tense in formal writing',
    principle: 'Academic and professional English rarely uses bare will for prediction. It grades confidence with semi-modals and adverbs, and it uses tense to separate reported findings from standing facts.',
    reteach: 'The ladder: is set to / is expected to / is likely to / may well / could conceivably. Note that is set to is near-certain and is likely to is a hedge — students often treat them as synonyms. And in writing about sources: the present for what a text says now ("the report argues"), the past for what researchers did ("they surveyed 400 travellers").',
    activities: [
      'Confidence ranking: eight predictions about tourism, sorted from near-certain to speculative, with the language that marks each.',
      'Ban the bare will: students rewrite a forecast paragraph with a different hedge on every sentence.'
    ]
  }
};

const STAGES = [];

/* Each leg can carry its own media.

   PODCAST — already wired up. Every leg points at audio/leg-N.mp3, so create a
   folder called `audio` next to index.html in the repo and drop in:
     audio/leg-1.mp3 … audio/leg-8.mp3
   A leg whose file is not there yet still shows its Podcast button, so upload
   them before you give students the link, or blank that leg's field until the
   episode is ready. The player resumes where a student stopped, and the teacher
   console reports plays, minutes listened and who finished.

   SLIDES and VIDEO — still empty. Fill either one on any leg and its button
   appears; leave them empty and no button is drawn.
     slides: 'slides/leg-1.pdf'          opens in a new tab
     video:  'https://youtu.be/XXXX'     opens in a player inside the app */

/* ===== LEG 1 — THE DEPARTURE BOARD ====================================
   First principles. How many tenses English really has, and what the two
   present forms are each for.
   ====================================================================== */
STAGES.push({
  id: 's1', podcast: 'audio/leg-1.mp3', slides: '', video: '', art: 'timetable', n: 1,
  name: 'Two Tenses, Not Twelve', cefr: 'A2–B1', gate: 'Leg 1',
  blurb: 'Before any holiday story or any plan: find out how many tenses English actually has, and why the present simple almost never means "now".',
  lessons: [

    {
      id: 's1l1', name: 'How many tenses does English have?', cefr: 'A2',
      theory: {
        key: 'The English verb changes for one thing only: past or not past.',
        body: [
          'Look at what the verb itself can do. <em>I travel</em> → <em>I travelled</em>. <em>I go</em> → <em>I went</em>. <em>It is</em> → <em>it was</em>. One change, one contrast: <strong>past</strong> or <strong>non-past</strong>.',
          'Now try to make a future ending. There is none. No letters you can add to <em>travel</em> to mean "later". English has no future tense at all — it has ways of <em>talking</em> about the future, and you will spend three whole legs of this course learning to choose between them.',
          'So where do the "twelve tenses" come from? They are the two real tenses combined with two <strong>aspects</strong>. Aspect is not about when something happens; it is about how you look at it. <em>Have + -ed</em> looks back from a point. <em>Be + -ing</em> stands inside something unfinished.',
          'Two tenses × two aspects gives you eight combinations for real time, and the auxiliary <em>will</em> gives you four more for future time. That is the twelve. Nothing else is hiding.',
          'This matters for a practical reason. If you think English has twelve tenses, you spend your time hunting for the right box. If you know it has two tenses and two aspects, you only ever ask three questions: <strong>past or not? looking back or not? standing inside it or not?</strong>'
        ],
        simple: [
          'English verbs change for only one thing: <strong>past</strong> or <strong>not past</strong>. Go → went. Is → was.',
          'There is <strong>no future ending</strong> in English. You cannot add letters to a verb to mean "later".',
          'The other "tenses" are made with helper words: <em>have</em> (looking back) and <em>be + -ing</em> (inside the action).',
          'Ask three questions, not twelve: past? looking back? inside it?'
        ],
        examples: [
          { s: 'We <strong>pack</strong> → we <strong>packed</strong>', g: 'THE ONLY CHANGE THE VERB ITSELF MAKES' },
          { s: 'We <strong>will</strong> pack · we <strong>are</strong> packing · we <strong>have</strong> packed', g: 'HELPER WORDS DO EVERYTHING ELSE' },
          { s: '<s>We packwill the case.</s>', g: 'NO FUTURE ENDING EXISTS — THAT IS THE POINT' }
        ]
      },
      items: [
        { id: 's1l1-01', type: 'choose', tag: 'two-tenses', level: 'A2',
          stem: 'Which pair shows the only change an English verb makes on its own?',
          options: ['fly / will fly', 'fly / flew', 'fly / am flying', 'fly / have flown'],
          answer: 1,
          why: 'Only <em>fly → flew</em> changes the verb itself. The other three add a helper word in front of it.' },

        { id: 's1l1-02', type: 'spot', tag: 'two-tenses', level: 'A2',
          stem: 'One word here is the helper that carries the tense. Click it.',
          words: ['We', 'had', 'been', 'waiting', 'at', 'the', 'airport', 'for', 'hours.'],
          answer: 1, fix: 'had — the only past-marked word in the phrase',
          why: 'Everything after <em>had</em> is fixed in shape. The first helper is where English puts its one tense contrast — <em>had</em> is the past of <em>have</em>.' },

        { id: 's1l1-03', type: 'judge', tag: 'two-tenses', level: 'B1',
          given: 'English has a future tense, in the same way it has a past tense.',
          stem: 'True, false, or impossible to say?',
          answer: 1,
          why: 'False. A tense is marked on the verb, and no English verb has a future form. <em>Will</em> is a separate word — a modal, like <em>can</em> or <em>must</em>.' },

        { id: 's1l1-04', type: 'sort', tag: 'two-tenses', level: 'B1',
          stem: 'Each phrase starts with a helper. Is that first helper past or non-past?',
          bins: [
            { key: 'past', label: 'Starts past', hint: 'had, was, were, would' },
            { key: 'now', label: 'Starts non-past', hint: 'have, is, are, will' }
          ],
          items: [
            { text: 'had booked', bin: 'past' }, { text: 'was packing', bin: 'past' },
            { text: 'would arrive', bin: 'past' }, { text: 'have booked', bin: 'now' },
            { text: 'is packing', bin: 'now' }, { text: 'will arrive', bin: 'now' }
          ],
          why: 'Even <em>would</em> and <em>will</em> are a past/non-past pair — <em>would</em> is historically the past of <em>will</em>. Every verb phrase in English begins in one column or the other.' },

        { id: 's1l1-05', type: 'choose', tag: 'two-tenses', level: 'B1',
          stem: 'What does the <em>-ing</em> in <em>we are staying</em> actually tell you?',
          options: ['That it is happening in the present', 'That the situation is unfinished and we are inside it', 'That it is temporary and nothing else', 'That it is definitely happening now, not later'],
          answer: 1,
          why: 'The <em>-ing</em> is aspect, not time. It says the situation is viewed from inside and is not complete — which is why <em>we are staying in Krabi next week</em> is perfectly good English about the future.' },

        { id: 's1l1-06', type: 'build', tag: 'two-tenses', level: 'B1',
          stem: 'Say that the passports are in your bag right now, using the looking-back aspect.',
          tiles: ['I', 'have', 'already', 'packed', 'the', 'passports.'],
          solution: 'I have already packed the passports.',
          why: '<em>Have</em> + past participle looks back at an earlier event from where you stand now. The tense is non-past; the aspect does the looking back.' }
      ]
    },

    {
      id: 's1l2', name: 'Why the present simple is not about now', cefr: 'A2',
      theory: {
        key: 'A whole event will not fit inside this instant — so the present simple means habit, fact or timetable.',
        body: [
          'Stand up and walk across the room. Ask someone to describe it. Nobody says <em>you walk</em>. Everybody says <em>you are walking</em>. That is not a rule anyone taught you — it is the grammar refusing an impossible reading.',
          'Here is why. The present simple views an event as a <strong>complete whole</strong>. But a complete event cannot fit inside the moment of speaking: by the time you have finished saying <em>I open my suitcase</em>, the opening is already over. So English quietly pushes the present simple onto the three meanings where completeness makes sense.',
          '<strong>Habit</strong> — a whole event, repeated: <em>We go to Hua Hin every April.</em> <strong>Permanent fact</strong> — something simply true: <em>The beach faces west.</em> <strong>Timetable</strong> — a schedule, which is a present fact about the world even though the event is in the future: <em>The ferry leaves at 07:15.</em>',
          'There are three small places where the present simple really is about this instant, and they are worth knowing because they are the exceptions that prove the rule: live commentary (<em>he passes to Bunmee, he shoots</em>), demonstrations (<em>now I add the chilli</em>), and performatives, where saying the words IS the action (<em>I promise</em>, <em>I apologise</em>).',
          'One more use that surprises learners: the <strong>historic present</strong>. <em>So we get to the hotel, and there is no booking.</em> That is a past story told in present forms, to make it feel live. Thai, English and most languages do this.'
        ],
        simple: [
          'The present simple is <strong>not</strong> for things happening right now.',
          'Use it for: <strong>habits</strong> (we go every year), <strong>facts</strong> (the beach faces west), <strong>timetables</strong> (the ferry leaves at 07:15).',
          'For right now, use <em>am / is / are + -ing</em>: <em>I am packing</em>.',
          'Small exceptions: sports commentary, cooking demonstrations, and <em>I promise</em> / <em>I apologise</em>.'
        ],
        examples: [
          { s: 'We <strong>go</strong> to Phuket every March.', g: 'HABIT — A WHOLE EVENT, REPEATED' },
          { s: 'The last bus <strong>leaves</strong> at 22:40.', g: 'TIMETABLE — A PRESENT FACT ABOUT A FUTURE EVENT' },
          { s: '<s>Look — it rains!</s> → Look — it <strong>is raining</strong>!', g: 'RIGHT NOW NEEDS THE PROGRESSIVE' }
        ]
      },
      items: [
        { id: 's1l2-01', type: 'gap', tag: 'present-simple-event', level: 'A2',
          lines: [
            { who: 'Ploy', text: 'Why are you standing at the window?' },
            { who: 'Nam', text: 'Because it ___ and our taxi is outside.' }
          ],
          options: ['rains', 'is raining', 'rain', 'has rain'],
          answer: 1,
          why: 'Something in progress at this moment needs the progressive. <em>It rains</em> would be a general fact about the climate, which is not what she means.' },

        { id: 's1l2-02', type: 'sort', tag: 'present-simple-event', level: 'B1',
          stem: 'Every sentence here uses the present simple. What is each one doing?',
          bins: [
            { key: 'habit', label: 'Habit', hint: 'repeated whole events' },
            { key: 'fact', label: 'Fact', hint: 'simply true' },
            { key: 'time', label: 'Timetable', hint: 'a published schedule' }
          ],
          items: [
            { text: 'We visit my grandmother every Songkran.', bin: 'habit' },
            { text: 'I always lose one sandal.', bin: 'habit' },
            { text: 'Chiang Mai lies in a valley.', bin: 'fact' },
            { text: 'The museum closes on Mondays.', bin: 'fact' },
            { text: 'Our train departs at 06:40.', bin: 'time' },
            { text: 'The tour starts at nine on Thursday.', bin: 'time' }
          ],
          why: 'Notice what is missing: no box for "happening right now". The present simple has no such use with action verbs, and that gap is the whole point of the lesson.' },

        { id: 's1l2-03', type: 'choose', tag: 'present-simple-event', level: 'B1',
          stem: 'Which sentence is the odd one out — the only one where the present simple really does describe this moment?',
          options: ['We stay at the Nara Guest House whenever we visit.', 'The bus takes forty minutes from the airport.', 'I promise I will send you a postcard.', 'The tour leaves from the north gate at ten.'],
          answer: 2,
          why: 'A performative: saying <em>I promise</em> does not describe the promising, it IS the promising. The event and the sentence take exactly the same amount of time, so for once a whole event fits inside "now".' },

        { id: 's1l2-04', type: 'spot', tag: 'present-simple-event', level: 'A2',
          stem: 'Click the wrong word.',
          words: ['Sorry,', 'I', 'cannot', 'talk', '—', 'we', 'board', 'the', 'plane', 'right', 'now.'],
          answer: 6, fix: 'are boarding',
          why: '<em>Right now</em> forces the progressive. <em>We board the plane</em> could only mean a habit, and nobody boards a plane habitually at this second.' },

        { id: 's1l2-05', type: 'judge', tag: 'present-simple-event', level: 'B1+',
          given: 'So we arrive at the hotel at midnight, and the man on the desk tells us there is no booking.',
          stem: 'Is this speaker describing something happening now?',
          answer: 1,
          why: 'No — this is the historic present. Present forms are telling a past story, to make the listener feel they are there. Very common in spoken holiday anecdotes, in English and in Thai.' },

        { id: 's1l2-06', type: 'equiv', tag: 'present-simple-event', level: 'B1',
          given: 'The hotel serves breakfast until ten.',
          stem: 'Which is closest in meaning?',
          options: ['Breakfast is being served at this moment.', 'That is the hotel\'s standing arrangement, true every day.', 'Breakfast will be served tomorrow only.', 'Breakfast finished at ten today.'],
          answer: 1,
          why: 'A present simple with an institution as subject reports a standing arrangement — a fact about how the world is set up, not an event in progress.' }
      ]
    },

    {
      id: 's1l3', name: 'The progressive: inside an unfinished thing', cefr: 'B1',
      theory: {
        key: 'The progressive does not mean "now". It means unfinished, seen from the inside.',
        body: [
          'Most textbooks say <em>be + -ing</em> is "the now tense". That definition breaks immediately: <em>I am reading a book about Tokyo</em> is true even while you are asleep, and <em>we are flying to Osaka on Tuesday</em> is about next week.',
          'One meaning explains all of it. The progressive puts you <strong>inside a situation that is not complete</strong>. From there, four uses follow naturally.',
          '<strong>In progress at this moment</strong>: <em>She is checking in.</em> <strong>In progress around now</strong>, though not this second: <em>I am learning Japanese before the trip.</em> <strong>Temporary rather than permanent</strong>: <em>We are staying with my aunt</em> means a visit; <em>we live with my aunt</em> means an address.',
          'The fourth use is future, and it belongs to Leg 5: <em>we are flying on Tuesday</em>. The arrangement already exists and is running; the flight is the part that has not happened yet.',
          'There is also an emotional use worth knowing. <em>Always</em> plus a progressive means the speaker is irritated: <em>He is always losing his boarding pass.</em> Compare <em>he always loses his boarding pass</em> — a neutral report of a habit. The progressive turns it into a complaint, because it frames an endless, unfinished nuisance.',
          'Finally: some verbs describe <strong>states</strong>, not activities — <em>know, belong, contain, seem</em>. A state has no inside to stand in, so it resists the progressive. <em>I am knowing the way</em> is not English. Leg 8 comes back to the interesting cases where forcing it changes the meaning instead of breaking the sentence.'
        ],
        simple: [
          'The progressive means <strong>unfinished</strong>, not "now".',
          'Four uses: happening now; happening around now; temporary; and a future arrangement.',
          '<em>We are staying with my aunt</em> = a visit. <em>We live with my aunt</em> = our address.',
          '<em>Always</em> + <em>-ing</em> shows you are annoyed: <em>He is always losing his ticket.</em>',
          'Some verbs (know, belong, seem) describe states and do not take <em>-ing</em>.'
        ],
        examples: [
          { s: 'We <strong>are staying</strong> at a guest house this week.', g: 'TEMPORARY — A PERMANENT HOME WOULD BE "WE LIVE"' },
          { s: 'She <strong>is always leaving</strong> her sunglasses on the bus.', g: 'ALWAYS + -ING = IRRITATION, NOT FREQUENCY' },
          { s: '<s>I am knowing the timetable.</s> → I <strong>know</strong> the timetable.', g: 'A STATE HAS NO INSIDE TO STAND IN' }
        ]
      },
      items: [
        { id: 's1l3-01', type: 'equiv', tag: 'progressive-core', level: 'B1',
          given: 'We are staying in Hua Hin.',
          stem: 'Which is the natural reading?',
          options: ['Hua Hin is our permanent home.', 'It is a temporary stay — a holiday or a visit.', 'We stay there every single year.', 'We are on our way to Hua Hin at this moment.'],
          answer: 1,
          why: 'Unfinished means temporary. To say where you permanently live, English uses the simple: <em>we live in Hua Hin</em>.' },

        { id: 's1l3-02', type: 'choose', tag: 'progressive-core', level: 'B1',
          stem: 'What is the difference between "He always forgets his charger" and "He is always forgetting his charger"?',
          options: ['The second one happens more often.', 'The second one is happening right now.', 'The second one shows the speaker is annoyed.', 'There is no difference at all.'],
          answer: 2,
          why: 'Both report the same habit. The progressive frames it as an endless unfinished nuisance, and that framing is heard as a complaint.' },

        { id: 's1l3-03', type: 'spot', tag: 'progressive-core', level: 'B1',
          stem: 'Click the wrong word.',
          words: ['I', 'am', 'not', 'believing', 'that', 'the', 'flight', 'is', 'cancelled', 'again.'],
          answer: 3, fix: 'do not believe',
          why: '<em>Believe</em> is a state. There is no activity of believing to stand inside. Native speakers do say <em>I am not believing this</em> as deliberate exaggeration, but it is a stylistic effect, not the neutral form.' },

        { id: 's1l3-04', type: 'gap', tag: 'progressive-core', level: 'B1',
          lines: [
            { who: 'Fon', text: 'You have got a lot of guidebooks out.' },
            { who: 'Ice', text: 'I ___ Japanese before we go in October.' }
          ],
          options: ['learn', 'am learning', 'have learnt', 'will learn'],
          answer: 1,
          why: 'In progress around now, not at this exact second. This is the commonest use of the progressive and the one that proves it does not mean "this instant".' },

        { id: 's1l3-05', type: 'sort', tag: 'progressive-core', level: 'B1+',
          stem: 'Which of these verbs will take <em>-ing</em> comfortably in a holiday sentence?',
          bins: [
            { key: 'yes', label: 'Takes -ing easily', hint: 'an activity you can be inside' },
            { key: 'no', label: 'Resists -ing', hint: 'a state, with no inside' }
          ],
          items: [
            { text: 'queue', bin: 'yes' }, { text: 'sunbathe', bin: 'yes' }, { text: 'argue', bin: 'yes' },
            { text: 'belong', bin: 'no' }, { text: 'contain', bin: 'no' }, { text: 'cost', bin: 'no' }
          ],
          why: 'You can stand inside queuing, sunbathing and arguing. A suitcase does not spend the afternoon busily belonging to you — states simply hold.' },

        { id: 's1l3-06', type: 'build', tag: 'progressive-core', level: 'B1',
          stem: 'Your friend rings while you are in the departure queue. Tell her what is happening at this moment.',
          tiles: ['We', 'are', 'queuing', 'for', 'security', 'at', 'the', 'moment.'],
          solution: 'We are queuing for security at the moment.',
          why: 'An activity in progress, and you are inside it. The simple would turn it into a habit, which would be an odd thing to say on the phone.' },

        { id: 's1l3-07', type: 'judge', tag: 'progressive-core', level: 'B1+',
          given: 'We are flying to Osaka on Tuesday.',
          stem: 'Is this sentence about something happening now?',
          answer: 1,
          why: 'No, it is about next Tuesday — and it is still a perfectly ordinary progressive. What is unfinished and in progress is the <em>arrangement</em>. Leg 5 takes this apart properly.' }
      ]
    }
  ]
});

/* ===== LEG 2 — THE HOLIDAY STORY ======================================
   Past simple and past progressive: the event and the scene it lands in.
   ====================================================================== */
STAGES.push({
  id: 's2', podcast: 'audio/leg-2.mp3', slides: '', video: '', art: 'suitcase', n: 2,
  name: 'The Holiday Story', cefr: 'A2–B1', gate: 'Leg 2',
  blurb: 'Last year\'s trip. The past simple carries the events; the past progressive builds the scene they happen inside.',
  lessons: [

    {
      id: 's2l1', name: 'Past simple: a finished event in finished time', cefr: 'A2',
      theory: {
        key: 'A whole event, inside a time that is over.',
        body: [
          'This is the backbone of every holiday story you will ever tell. <em>We flew to Da Nang. We found the hotel. It rained for three days.</em> Each one is complete, and each one sits in a time that has closed.',
          'The time is usually stated — <em>last April, in 2019, on the second night, when I was twelve</em> — but it does not have to be, as long as both speakers know which past time is meant.',
          'Two mechanical things cost students more marks than anything else here. First, the irregular forms; there are about a hundred common ones and no shortcut exists. Second, and more fixable: in questions and negatives the tense moves onto <strong>did</strong>, and the main verb goes back to its base form.',
          '<em>Did you go?</em> — not <em>did you went</em>. <em>We did not lose it</em> — not <em>we did not lost it</em>. English marks tense once per verb phrase. When <em>did</em> takes the job, the main verb is released.',
          'Compare the two shapes side by side and the logic is obvious: <em>we went</em> has one word, so that word is marked. <em>We did not go</em> has two, so the first one is marked. The rule is not "remember the base form" — it is "mark it once".'
        ],
        simple: [
          'Use the past simple for finished events in finished time: <em>we flew, we stayed, it rained</em>.',
          'The time is usually said: <em>last year, in March, on Monday</em>.',
          'In questions and negatives, <strong>did</strong> takes the tense: <em>Did you go?</em> not <em>Did you went?</em>',
          'Mark the tense <strong>once</strong> in each verb phrase, never twice.'
        ],
        examples: [
          { s: 'We <strong>spent</strong> a week in Hoi An last April.', g: 'FINISHED EVENT, FINISHED TIME' },
          { s: '<s>Did you visited the old town?</s> → <strong>Did</strong> you <strong>visit</strong> the old town?', g: 'DID CARRIES THE TENSE — VISIT GOES BACK TO BASE' },
          { s: 'It <strong>rained</strong> every afternoon.', g: 'REPEATED, BUT STILL A CLOSED PERIOD' }
        ]
      },
      items: [
        { id: 's2l1-01', type: 'spot', tag: 'past-simple-definite', level: 'A2',
          stem: 'Click the wrong word.',
          words: ['Did', 'you', 'went', 'to', 'the', 'night', 'market', 'in', 'Chiang', 'Mai?'],
          answer: 2, fix: 'go',
          why: '<em>Did</em> already carries the past. The main verb goes back to its base form — English marks tense once per verb phrase.' },

        { id: 's2l1-02', type: 'gap', tag: 'past-simple-definite', level: 'A2',
          lines: [
            { who: 'Mint', text: 'How was Hanoi?' },
            { who: 'Beam', text: 'Good, but we ___ our train on the second day.' }
          ],
          options: ['miss', 'missed', 'have missed', 'were missing'],
          answer: 1,
          why: 'A single finished event, inside a closed time (<em>the second day</em> of a trip that is over). The plain past simple is the default of storytelling.' },

        { id: 's2l1-03', type: 'choose', tag: 'past-simple-definite', level: 'B1',
          stem: 'Which sentence is correct?',
          options: ['We did not booked the hotel in advance.', 'We did not book the hotel in advance.', 'We not booked the hotel in advance.', 'We did not booking the hotel in advance.'],
          answer: 1,
          why: '<em>Did</em> is marked for past, so <em>book</em> stays in its base form. Marking both is the commonest A2 error in the whole topic.' },

        { id: 's2l1-04', type: 'order', tag: 'past-simple-definite', level: 'B1',
          stem: 'Put this holiday story into the order it happened.',
          items: [
            'We landed in Osaka just after midnight.',
            'A taxi took us to the hotel.',
            'We slept for eleven hours.',
            'The next morning we walked to the castle.'
          ],
          why: 'In a plain past-simple narrative, the order of the sentences IS the order of the events. That is the contract English makes with the reader — and Leg 4 is about how to break it on purpose.' },

        { id: 's2l1-05', type: 'build', tag: 'past-simple-definite', level: 'B1',
          stem: 'Ask your friend whether she ate anything unusual on her trip.',
          tiles: ['Did', 'you', 'eat', 'anything', 'strange', 'while', 'you', 'were', 'there?'],
          solution: 'Did you eat anything strange while you were there?',
          why: 'Two verbs, two jobs: <em>did</em> carries the tense for the question, and <em>were</em> carries it for the time clause.' },

        { id: 's2l1-06', type: 'table', tag: 'past-simple-definite', level: 'B1',
          table: {
            cols: ['Day', 'What we did', 'Weather'],
            rows: [
              ['Mon', 'flew to Krabi', 'clear'],
              ['Tue', 'took a boat to Railay', 'rain all day'],
              ['Wed', 'climbed to the viewpoint', 'clear'],
              ['Thu', 'flew home', 'cloudy']
            ]
          },
          stem: 'Which sentence matches the diary?',
          options: [
            'We have taken a boat to Railay on Tuesday.',
            'We took a boat to Railay on Tuesday, and it rained all day.',
            'We were taking a boat to Railay on Tuesday, and it was raining all day.',
            'We take a boat to Railay on Tuesday, and it rains all day.'
          ],
          answer: 1,
          why: 'A completed event on a named past day. Option a fails because a present perfect cannot take <em>on Tuesday</em>; option c makes both events into unfinished background with no event to land in them.' }
      ]
    },

    {
      id: 's2l2', name: 'Past progressive: the scene already running', cefr: 'B1',
      theory: {
        key: 'The long thing takes -ing. The short thing that lands inside it takes the simple.',
        body: [
          'A story needs more than a list of events. It needs a world for them to happen in, and that is what the past progressive builds.',
          '<em>We <strong>were waiting</strong> at gate 42 when they <strong>announced</strong> the delay.</em> Draw it: a long wavy line for the waiting, a short arrow landing inside it for the announcement. The waiting started before the announcement and was still going afterwards.',
          'Now swap the aspects and watch the story change. <em>We <strong>waited</strong> at gate 42 when they announced the delay</em> makes the waiting a complete event that came after — which is why it sounds wrong as a piece of scene-setting.',
          'The past progressive also does <strong>atmosphere</strong>. Openings of stories are full of it: <em>It was pouring, the coach was climbing into the hills, and nobody was speaking.</em> Nothing has happened yet; the writer is switching the scenery on.',
          'And it does <strong>simultaneous activity</strong>: <em>While I was queuing for tickets, Nam was arguing with the driver.</em> Two wavy lines, no arrow.',
          'One warning. Do not put the whole story in the progressive. Learners who discover this form sometimes use it everywhere, and the result is a narrative where nothing ever actually happens — all scenery, no events.'
        ],
        simple: [
          'Long background action = <em>was / were + -ing</em>.',
          'Short event that lands inside it = past simple.',
          '<em>We <strong>were waiting</strong> when they <strong>announced</strong> the delay.</em>',
          'Use it to set a scene: <em>It was raining and nobody was talking.</em>',
          'Do not use it for everything — a story needs events, not just scenery.'
        ],
        examples: [
          { s: 'I <strong>was swimming</strong> when the storm <strong>started</strong>.', g: 'LONG LINE, THEN A SHORT ARROW INTO IT' },
          { s: 'While Dad <strong>was checking in</strong>, we <strong>were buying</strong> snacks.', g: 'TWO LONG LINES, SIDE BY SIDE' },
          { s: 'The sun <strong>was setting</strong> as we <strong>reached</strong> the village.', g: 'SCENERY FIRST, EVENT SECOND' }
        ]
      },
      items: [
        { id: 's2l2-01', type: 'gap', tag: 'past-prog-frame', level: 'B1',
          lines: [
            { who: 'Guide', text: 'How did you lose the camera?' },
            { who: 'Tourist', text: 'We ___ along the beach and I put it down for a second.' }
          ],
          options: ['walked', 'were walking', 'have walked', 'walk'],
          answer: 1,
          why: 'The walking is the background the loss happened inside. The short event (<em>put it down</em>) takes the simple.' },

        { id: 's2l2-02', type: 'choose', tag: 'past-prog-frame', level: 'B1',
          stem: 'Which version sets a scene rather than listing events?',
          options: [
            'It rained. The bus climbed the hill. Nobody spoke.',
            'It was raining, the bus was climbing the hill, and nobody was speaking.',
            'It has rained, the bus has climbed the hill, and nobody has spoken.',
            'It rains, the bus climbs the hill, and nobody speaks.'
          ],
          answer: 1,
          why: 'Three unfinished situations, all running at once, none of them the event. That is exactly what scene-setting is.' },

        { id: 's2l2-03', type: 'spot', tag: 'past-prog-frame', level: 'B1',
          stem: 'Click the word that should be a background form.',
          words: ['I', 'slept', 'when', 'the', 'captain', 'announced', 'our', 'descent.'],
          answer: 1, fix: 'was sleeping',
          why: 'As written, the sleeping starts after the announcement — which would be a strange thing to say. The sleeping was already running, so it needs the progressive.' },

        { id: 's2l2-04', type: 'sort', tag: 'past-prog-frame', level: 'B1',
          stem: 'In a holiday story, which of these is the background and which is the event?',
          bins: [
            { key: 'bg', label: 'Background', hint: 'long, already running' },
            { key: 'ev', label: 'Event', hint: 'short, lands inside' }
          ],
          items: [
            { text: 'the ferry was crossing the bay', bin: 'bg' },
            { text: 'we were queuing for passport control', bin: 'bg' },
            { text: 'the sun was going down', bin: 'bg' },
            { text: 'my phone rang', bin: 'ev' },
            { text: 'a wave hit the side', bin: 'ev' },
            { text: 'the officer stamped it', bin: 'ev' }
          ],
          why: 'Backgrounds have duration and no clear edges; events are points. The aspect you choose tells the reader which one you mean, whatever the verb.' },

        { id: 's2l2-05', type: 'equiv', tag: 'past-prog-frame', level: 'B1+',
          given: 'When the coach arrived, we were eating breakfast.',
          stem: 'What was the order of events?',
          options: [
            'Breakfast started before the coach arrived.',
            'Breakfast started after the coach arrived.',
            'Breakfast and the coach happened at exactly the same instant.',
            'Breakfast never started.'
          ],
          answer: 0,
          why: 'The progressive means the meal was already in progress. This is the single most useful thing the aspect does for a narrator — it fixes the order without a single extra word.' },

        { id: 's2l2-06', type: 'build', tag: 'past-prog-frame', level: 'B1',
          stem: 'You were sunbathing. Then, suddenly, it started to rain. One sentence.',
          tiles: ['I', 'was', 'sunbathing', 'when', 'it', 'started', 'to', 'rain.'],
          solution: 'I was sunbathing when it started to rain.',
          why: 'Long line, short arrow. Reversing the aspects would say you began sunbathing after the rain started — possible, but not what happened.' }
      ]
    },

    {
      id: 's2l3', name: 'when, while and as: keeping the order clear', cefr: 'B1+',
      theory: {
        key: 'The conjunction does not choose the tense. The shape of the event does.',
        body: [
          'Students are often taught "while takes the progressive, when takes the simple". That is a rough guide, not a rule, and it falls apart quickly.',
          'Here is what is really happening. <strong>While</strong> and <strong>as</strong> mean "during", so they reach for something with duration — usually a progressive. <strong>When</strong> means "at the time that", and it attaches happily to either.',
          'That is why <em>when</em> is the ambiguous one, and why it is worth ten minutes of anyone\'s time. Compare: <em>When the taxi arrived, we <strong>were eating</strong></em> — the meal was already running. <em>When the taxi arrived, we <strong>ate</strong></em> — the meal began afterwards. Same conjunction, opposite orders, and the only thing that distinguishes them is the aspect.',
          '<strong>As</strong> has a use the others do not: two things developing together. <em>As the plane climbed, the city got smaller.</em> Neither one interrupts the other; they change in step.',
          'One practical point for writing. If the time clause comes first, it takes a comma — <em>While we were waiting, the rain stopped.</em> If it comes second, it usually does not — <em>The rain stopped while we were waiting.</em>',
          'And a habit worth building: when you write <em>when</em>, stop and ask yourself which event started first. If the answer is not obvious to you, it will not be obvious to your reader either.'
        ],
        simple: [
          '<strong>While</strong> and <strong>as</strong> mean "during" — they usually take <em>-ing</em>.',
          '<strong>When</strong> means "at the time that" — it takes either form.',
          '<em>When the taxi came, we <strong>were eating</strong></em> = we started first.',
          '<em>When the taxi came, we <strong>ate</strong></em> = we started after.',
          'Time clause first → use a comma. Time clause second → usually no comma.'
        ],
        examples: [
          { s: '<strong>While</strong> we were driving, the radio died.', g: 'WHILE = DURING → PROGRESSIVE' },
          { s: '<strong>As</strong> the plane climbed, the city got smaller.', g: 'AS = TWO THINGS CHANGING TOGETHER' },
          { s: '<strong>When</strong> we got there, the shop <s>was closing</s> / <strong>had closed</strong>.', g: 'WHEN IS THE AMBIGUOUS ONE — CHOOSE ON PURPOSE' }
        ]
      },
      items: [
        { id: 's2l3-01', type: 'equiv', tag: 'narrative-order', level: 'B1+',
          given: 'When we reached the temple, the guide explained the history.',
          stem: 'When did the explaining start?',
          options: ['Before we reached the temple.', 'After we reached the temple.', 'At the same moment, by coincidence.', 'It is impossible to tell.'],
          answer: 1,
          why: 'Two past simples in a <em>when</em> sentence are read in sequence: first one, then the other. To say the explaining was already running you would need <em>was explaining</em>.' },

        { id: 's2l3-02', type: 'choose', tag: 'narrative-order', level: 'B1+',
          stem: 'Which sentence says the two things changed together, step by step?',
          options: [
            'When the ferry left the harbour, the wind dropped.',
            'While the ferry left the harbour, the wind dropped.',
            'As the ferry moved out of the harbour, the wind dropped.',
            'The ferry left the harbour when the wind dropped.'
          ],
          answer: 2,
          why: '<em>As</em> is the conjunction of parallel change — one thing developing in step with another. <em>When</em> would make it a sequence; <em>while</em> would just mean "during".' },

        { id: 's2l3-03', type: 'spot', tag: 'narrative-order', level: 'B1+',
          stem: 'Click the word that makes this sentence say the wrong thing.',
          words: ['While', 'we', 'boarded', 'the', 'ferry,', 'I', 'dropped', 'my', 'ticket.'],
          answer: 2, fix: 'were boarding',
          why: '<em>While</em> means "during", so it needs something with duration. A bare past simple gives it a point event to sit in, which is why the sentence feels off even though every word is a real word.' },

        { id: 's2l3-04', type: 'gap', tag: 'narrative-order', level: 'B1+',
          lines: [
            { who: 'Ohm', text: 'Did you see the fireworks?' },
            { who: 'Praew', text: 'No — we were still on the bus ___ they started.' }
          ],
          options: ['while', 'when', 'as soon as', 'during'],
          answer: 1,
          why: '<em>When</em> pins a point in time to the running background. <em>During</em> is a preposition and cannot take a clause at all.' },

        { id: 's2l3-05', type: 'order', tag: 'narrative-order', level: 'B2',
          stem: 'Put the four sentences in the order the events actually happened.',
          items: [
            'While we were checking in, the storm warning came through.',
            'They cancelled the evening flight an hour later.',
            'We spent the night on the terminal floor.',
            'In the morning they put us on the first plane out.'
          ],
          why: 'The first sentence sets a running scene and drops an event into it; each one after that moves forward in past simple. That alternation is what a well-told story looks like.' },

        { id: 's2l3-06', type: 'build', tag: 'narrative-order', level: 'B1+',
          stem: 'You were queuing for the cable car. That is when you realised you had no cash. One sentence, time clause first.',
          tiles: ['While', 'we', 'were', 'queuing', 'for', 'the', 'cable', 'car,', 'I', 'realised', 'I', 'had', 'no', 'cash.'],
          solution: 'While we were queuing for the cable car, I realised I had no cash.',
          why: 'Background with <em>while</em> + progressive, event in the past simple, and a comma because the time clause came first.' }
      ]
    }
  ]
});

/* ===== LEG 3 — WHAT THE TRIP LEFT BEHIND =============================
   The present perfect: a present tense that uses a past event.
   ====================================================================== */
STAGES.push({
  id: 's3', podcast: 'audio/leg-3.mp3', slides: '', video: '', art: 'tags', n: 3,
  name: 'What the Trip Left Behind', cefr: 'B1', gate: 'Leg 3',
  blurb: 'The hardest tense in English, because it is not a past tense at all. Old luggage tags still on the handle: past events, present meaning.',
  lessons: [

    {
      id: 's3l1', name: 'The present perfect is a present tense', cefr: 'B1',
      theory: {
        key: 'It uses a past event to say something about right now. That is why the helper is HAVE, not HAD.',
        body: [
          'Look at the form before the meaning. <em>I <strong>have</strong> lost my passport.</em> The tense-carrying word is <em>have</em> — present. Every present perfect in English is grammatically a present tense. The past participle behind it is only doing aspect: looking back.',
          'So what does it mean? It answers the question <strong>"what is the situation now?"</strong> using something that happened earlier.',
          'Compare the pair everyone should have on their wall. <em>I lost my passport</em> — an event in past time. It may have turned up since; the sentence does not say. <em>I have lost my passport</em> — a statement about this moment: it is gone, and we have a problem in this room right now.',
          'That is why the present perfect is the tense of <strong>news</strong>. <em>The airline has cancelled our flight.</em> You are not telling a story about yesterday; you are telling someone what their situation is. The moment the story starts — <em>they cancelled it at six, so we queued for two hours</em> — English drops into the past simple, because now it is narrative.',
          'This gives you a clean working test. If the point is the <strong>present consequence</strong>, use the present perfect. If the point is <strong>what happened</strong>, use the past simple.',
          'Many languages, Thai included, have no grammatical equivalent, which is why this tense takes longer than any other. It is not difficult in itself — it is difficult because you have to notice something about the present that your first language does not make you notice.'
        ],
        simple: [
          'The present perfect is about <strong>now</strong>, not about the past.',
          '<em>I lost my passport</em> = it happened. <em>I have lost my passport</em> = it is gone and I need it now.',
          'Use it to give <strong>news</strong>: <em>They have cancelled our flight.</em>',
          'When you start telling the story, switch to the past simple.'
        ],
        examples: [
          { s: 'They <strong>have cancelled</strong> the ferry.', g: 'NEWS — HERE IS YOUR SITUATION' },
          { s: 'They <strong>cancelled</strong> it at six and we <strong>waited</strong> all evening.', g: 'NOW IT IS A STORY — PAST SIMPLE' },
          { s: 'I <strong>have booked</strong> the hotel.', g: 'THE BOOKING EXISTS NOW — THAT IS THE POINT' }
        ]
      },
      items: [
        { id: 's3l1-01', type: 'equiv', tag: 'perfect-now', level: 'B1',
          given: 'I have lost my boarding pass.',
          stem: 'What does this tell the person you are speaking to?',
          options: [
            'That at some point in the past, a loss occurred.',
            'That it is missing right now and that is our problem.',
            'That I lost it but I have since found it.',
            'That I lose boarding passes regularly.'
          ],
          answer: 1,
          why: 'The present perfect reports a present situation. That is the whole reason it exists alongside the past simple.' },

        { id: 's3l1-02', type: 'gap', tag: 'perfect-now', level: 'B1',
          lines: [
            { who: 'Gate agent', text: 'Any news about the 14:20?' },
            { who: 'Colleague', text: 'Yes — they ___ it. Nobody is flying to Phuket tonight.' }
          ],
          options: ['cancelled', 'have cancelled', 'were cancelling', 'cancel'],
          answer: 1,
          why: 'This is news: the announcement matters because of what it means for tonight. The past simple would be the start of a story, not a bulletin.' },

        { id: 's3l1-03', type: 'choose', tag: 'perfect-now', level: 'B1',
          stem: 'Which pair of sentences is used correctly?',
          options: [
            'Our bags have arrived. They have come on the later flight and we have collected them at nine.',
            'Our bags have arrived. They came on the later flight and we collected them at nine.',
            'Our bags arrived. They have come on the later flight and we have collected them at nine.',
            'Our bags are arriving. They come on the later flight and we collect them at nine.'
          ],
          answer: 1,
          why: 'News first in the present perfect, then the story in the past simple. English switches the moment you stop reporting a situation and start recounting events.' },

        { id: 's3l1-04', type: 'spot', tag: 'perfect-now', level: 'B1',
          stem: 'Click the word that is wrong for a piece of news.',
          words: ['Good', 'news', '—', 'the', 'airline', 'had', 'found', 'your', 'suitcase.'],
          answer: 5, fix: 'has',
          why: '<em>Had</em> is a past tense and would put the finding inside a past story. News about the present situation needs the present helper <em>has</em>.' },

        { id: 's3l1-05', type: 'judge', tag: 'perfect-now', level: 'B1+',
          given: 'She has been to Japan three times.',
          stem: 'Is she in Japan now?',
          answer: 1,
          why: 'No. <em>Has been to</em> means she went and came back; the present relevance is her experience, not her location. <em>Has gone to</em> would mean she is there or on her way — a distinction worth learning in one go.' },

        { id: 's3l1-06', type: 'build', tag: 'perfect-now', level: 'B1',
          stem: 'Tell your travel companion that the hotel booking is now done, without saying when you did it.',
          tiles: ['I', 'have', 'booked', 'the', 'hotel', 'for', 'three', 'nights.'],
          solution: 'I have booked the hotel for three nights.',
          why: 'The present perfect reports the state of the arrangements now. Adding <em>yesterday</em> would force a past simple.' }
      ]
    },

    {
      id: 's3l2', name: 'Open time and closed time', cefr: 'B1',
      theory: {
        key: 'A present perfect cannot be pinned to a time that is over.',
        body: [
          '<em>I have been to Japan last year</em> is one of the most common errors at B1, and once you see why it fails you will never make it again.',
          'A present perfect claims relevance to <strong>now</strong>. A definite past-time expression closes the door on now. You cannot do both in one sentence, so English refuses the combination outright.',
          'The test is simple. Does the time frame <strong>include this moment</strong>? <em>today, this week, this month, this year, so far, recently, lately, ever, never, up to now</em> — all still open, all fine with the present perfect. <em>yesterday, last night, last year, in 2019, when I was twelve, two summers ago</em> — all closed, all take the past simple.',
          'The clever part is that the same words can change sides. <em>This morning</em> takes a present perfect at nine o\'clock and a past simple at four in the afternoon, because by then the morning is over. The grammar is tracking reality, not memorising a list.',
          'Then the four small adverbs that live with this tense. <strong>Just</strong> — a moment ago, still hanging in the air: <em>we have just landed</em>. <strong>Already</strong> — sooner than expected: <em>they have already boarded</em>. <strong>Yet</strong> — expected but missing, and only in questions and negatives: <em>the bags have not come yet</em>. <strong>Still</strong> with a negative — impatience: <em>they still have not called our row</em>.',
          'A note for the exam room: American English increasingly allows <em>I just landed</em> and <em>did you eat yet</em>. British and international exam English does not. Know the difference and write for your marker.'
        ],
        simple: [
          'Do not use the present perfect with a <strong>finished</strong> time: <s>I have been there last year</s>.',
          'Open time (still now): <em>today, this week, this year, so far, ever, never</em> → present perfect.',
          'Closed time (over): <em>yesterday, last year, in 2019</em> → past simple.',
          '<em>This morning</em> changes sides at lunchtime.',
          '<em>just</em> = a moment ago · <em>already</em> = sooner than expected · <em>yet</em> = expected, not here.'
        ],
        examples: [
          { s: 'We <strong>have visited</strong> three temples <strong>this week</strong>.', g: 'THE WEEK IS STILL RUNNING' },
          { s: 'We <strong>visited</strong> three temples <strong>last week</strong>.', g: 'THE WEEK IS CLOSED' },
          { s: '<s>I have been to Osaka in 2019.</s> → I <strong>went</strong> to Osaka in 2019.', g: 'A DATE SHUTS THE DOOR ON NOW' }
        ]
      },
      items: [
        { id: 's3l2-01', type: 'spot', tag: 'perfect-adverbials', level: 'B1',
          stem: 'Click the word that cannot stay in this sentence.',
          words: ['We', 'have', 'stayed', 'at', 'that', 'resort', 'last', 'summer.'],
          answer: 6, fix: 'delete "last summer", or change "have stayed" to "stayed"',
          why: '<em>Last summer</em> is closed time. Either drop it, or use the past simple — but the two cannot share a sentence.' },

        { id: 's3l2-02', type: 'sort', tag: 'perfect-adverbials', level: 'B1',
          stem: 'Does the time frame include this moment?',
          bins: [
            { key: 'open', label: 'Still open → present perfect', hint: 'includes now' },
            { key: 'shut', label: 'Closed → past simple', hint: 'over and done' }
          ],
          items: [
            { text: 'so far this trip', bin: 'open' }, { text: 'this year', bin: 'open' },
            { text: 'never', bin: 'open' }, { text: 'in 2019', bin: 'shut' },
            { text: 'last Songkran', bin: 'shut' }, { text: 'when I was ten', bin: 'shut' }
          ],
          why: 'Nothing here is about how long ago it was. <em>Never</em> reaches back across your whole life and still includes this second; <em>last Songkran</em> was months ago and is shut.' },

        { id: 's3l2-03', type: 'gap', tag: 'perfect-adverbials', level: 'B1',
          lines: [
            { who: 'Nan', text: 'Have the bags come round yet?' },
            { who: 'Ton', text: 'No, and we ___ been standing here for forty minutes.' }
          ],
          options: ['yet', 'still', 'already', 'just'],
          answer: 1,
          why: '<em>Still</em> in a complaint marks a situation that has gone on too long. <em>Yet</em> cannot appear in the middle of an affirmative clause like this.' },

        { id: 's3l2-04', type: 'choose', tag: 'perfect-adverbials', level: 'B1+',
          stem: 'It is four in the afternoon. Which sentence is correct?',
          options: [
            'I have had a huge breakfast this morning.',
            'I had a huge breakfast this morning.',
            'I have a huge breakfast this morning.',
            'I am having a huge breakfast this morning.'
          ],
          answer: 1,
          why: 'By four o\'clock the morning is over, so it is closed time. At nine o\'clock the first option would have been the natural one — the grammar follows the clock.' },

        { id: 's3l2-05', type: 'equiv', tag: 'perfect-adverbials', level: 'B1',
          given: 'They have already boarded.',
          stem: 'What does <em>already</em> add?',
          options: [
            'That it happened a very long time ago.',
            'That it happened sooner than the speaker expected.',
            'That it has not happened but is expected.',
            'That it happens every time.'
          ],
          answer: 1,
          why: '<em>Already</em> is about expectation, not timing. Its opposite in this system is <em>yet</em>: expected but still missing.' },

        { id: 's3l2-06', type: 'build', tag: 'perfect-adverbials', level: 'B1',
          stem: 'Your plane touched down two minutes ago. Text your family.',
          tiles: ['We', 'have', 'just', 'landed', 'in', 'Fukuoka.'],
          solution: 'We have just landed in Fukuoka.',
          why: '<em>Just</em> + present perfect is the standard international form. American English also allows <em>we just landed</em>, but exam English wants this one.' },

        { id: 's3l2-07', type: 'judge', tag: 'perfect-adverbials', level: 'B2',
          given: 'Have you been to the floating market yet?',
          stem: 'Does the speaker expect the answer to be yes eventually?',
          answer: 0,
          why: 'True. <em>Yet</em> presupposes that the thing is on the agenda. Replace it with <em>ever</em> and that expectation disappears — <em>have you ever been</em> asks about a whole lifetime with no plan attached.' }
      ]
    },

    {
      id: 's3l3', name: 'since, for, and the two present perfects', cefr: 'B1+',
      theory: {
        key: 'The simple reports the result. The progressive reports the activity that caused it.',
        body: [
          'First the easy half. <strong>Since</strong> marks the <strong>starting point</strong>: <em>since Tuesday, since we landed, since 2019</em>. <strong>For</strong> marks the <strong>length</strong>: <em>for three days, for an hour, for years</em>. Mixing them (<em>since three days</em>) is a small error that marks a paper instantly.',
          'Now the interesting half. English gives you two present perfects, and the choice tells the listener what to look at.',
          '<em>I <strong>have unpacked</strong>.</em> Look at the result: the case is empty, the job is done. <em>I <strong>have been unpacking</strong>.</em> Look at the activity: that is why there are clothes all over the bed, and it may not even be finished.',
          'The pair that makes it click: <em>Who has eaten my sandwich?</em> (it is gone — result) versus <em>Who has been eating my sandwich?</em> (someone has been at it — activity, and there is some left). Goldilocks, and the whole of aspect, in two sentences.',
          'With <strong>state verbs</strong> the progressive is usually unavailable, and the simple carries the duration on its own: <em>I have known her since primary school</em>, <em>we have had this suitcase for ten years</em>. Never <em>I have been knowing</em>.',
          'And a small point of style that matters in writing: the simple counts things, the progressive measures time. <em>We have visited six cities</em> — six, countable, complete. <em>We have been travelling for three weeks</em> — three weeks of continuous wear. Ask yourself whether you are counting or measuring, and the aspect chooses itself.'
        ],
        simple: [
          '<strong>Since</strong> = the start point (<em>since Monday</em>). <strong>For</strong> = the length (<em>for three days</em>).',
          '<em>I have unpacked</em> = finished, look at the result.',
          '<em>I have been unpacking</em> = look at the activity, and the mess it made.',
          'State verbs (<em>know, have, be</em>) do not take <em>-ing</em>: <em>I have known her for years</em>.',
          'Counting things → simple. Measuring time → progressive.'
        ],
        examples: [
          { s: 'We <strong>have been driving since</strong> six this morning.', g: 'ACTIVITY + START POINT' },
          { s: 'We <strong>have driven</strong> four hundred kilometres.', g: 'RESULT — A COUNTABLE ACHIEVEMENT' },
          { s: '<s>We have been here since three days.</s> → <strong>for</strong> three days', g: 'SINCE NEEDS A POINT, NOT A LENGTH' }
        ]
      },
      items: [
        { id: 's3l3-01', type: 'spot', tag: 'since-for', level: 'B1',
          stem: 'Click the wrong word.',
          words: ['We', 'have', 'been', 'in', 'Vietnam', 'since', 'two', 'weeks.'],
          answer: 5, fix: 'for',
          why: '<em>Two weeks</em> is a length, so it needs <em>for</em>. <em>Since</em> would require a point: <em>since the 3rd</em>, <em>since we landed</em>.' },

        { id: 's3l3-02', type: 'choose', tag: 'since-for', level: 'B1+',
          stem: 'Your friend comes in covered in sand and sunburn. What do you say?',
          options: [
            'You have been to the beach.',
            'You have been lying on the beach all day.',
            'You went to the beach.',
            'You have gone to the beach.'
          ],
          answer: 1,
          why: 'The visible evidence points at the activity, not at a finished achievement — and that is exactly what the progressive is for.' },

        { id: 's3l3-03', type: 'equiv', tag: 'since-for', level: 'B1+',
          given: 'Someone has been eating the snacks.',
          stem: 'What does this suggest that "someone has eaten the snacks" does not?',
          options: [
            'That the snacks are completely gone.',
            'That there are probably some left, but the packet has been got at.',
            'That nobody touched the snacks.',
            'That the eating happened long ago.'
          ],
          answer: 1,
          why: 'Progressive = activity, and an activity need not be finished. The simple reports the completed result: the snacks are gone.' },

        { id: 's3l3-04', type: 'gap', tag: 'since-for', level: 'B1+',
          lines: [
            { who: 'Bee', text: 'You look exhausted.' },
            { who: 'Fah', text: 'We ___ since four this morning and we still have two hours to go.' }
          ],
          options: ['have travelled', 'have been travelling', 'travelled', 'are travelling'],
          answer: 1,
          why: 'Unfinished activity, measured from a starting point, offered as the explanation for how she looks. That is the progressive\'s core job.' },

        { id: 's3l3-05', type: 'sort', tag: 'since-for', level: 'B1+',
          stem: 'Which helper does each one need?',
          bins: [
            { key: 'since', label: 'since', hint: 'a point in time' },
            { key: 'for', label: 'for', hint: 'a length of time' }
          ],
          items: [
            { text: 'we landed', bin: 'since' }, { text: 'Tuesday', bin: 'since' }, { text: '2019', bin: 'since' },
            { text: 'six hours', bin: 'for' }, { text: 'a fortnight', bin: 'for' }, { text: 'ages', bin: 'for' }
          ],
          why: 'The test is whether you could put it after "at" or "on" (a point → since) or after "it lasted" (a length → for).' },

        { id: 's3l3-06', type: 'spot', tag: 'since-for', level: 'B1+',
          stem: 'Click the wrong word.',
          words: ['I', 'have', 'been', 'knowing', 'this', 'guide', 'since', 'my', 'first', 'trip.'],
          answer: 3, fix: 'known',
          why: '<em>Know</em> is a state, so there is no activity to be inside. The simple present perfect already carries the duration on its own.' },

        { id: 's3l3-07', type: 'build', tag: 'since-for', level: 'B2',
          stem: 'Count what you have achieved on this trip so far: six cities.',
          tiles: ['We', 'have', 'visited', 'six', 'cities', 'so', 'far.'],
          solution: 'We have visited six cities so far.',
          why: 'Counting completed achievements takes the simple. Switch to <em>we have been visiting cities</em> and the number becomes impossible — you cannot count an unfinished activity.' }
      ]
    }
  ]
});

/* ===== LEG 4 — THE NIGHT BEFORE ======================================
   Past perfect, past perfect progressive, and the past-habit toolkit.
   ====================================================================== */
STAGES.push({
  id: 's4', podcast: 'audio/leg-4.mp3', slides: '', video: '', art: 'nightflight', n: 4,
  name: 'The Night Before', cefr: 'B1+–B2', gate: 'Leg 4',
  blurb: 'How to step backwards inside a story without losing your reader — and how English talks about the holidays you used to take.',
  lessons: [

    {
      id: 's4l1', name: 'Past perfect: the step backwards', cefr: 'B1+',
      theory: {
        key: 'The past perfect is not "a long time ago". It means you are telling something out of order.',
        body: [
          'In a plain past-simple narrative, English makes a promise to the reader: the order of the sentences is the order of the events. <em>We landed. We found the hotel. We slept.</em>',
          'The past perfect is how you <strong>break that promise on purpose</strong>. It tells the reader: this next thing happened earlier than the thing I just told you about.',
          '<em>We got to the hotel at midnight. They <strong>had given</strong> our room away.</em> The giving away happened first; you are told about it second, and <em>had</em> is the signal.',
          'Now the part that costs students marks. They over-use it badly. <em>We arrived, we had checked in, we had gone to the beach</em> is not just heavy — it is wrong, because nothing is out of order.',
          'Here is the working rule. Use the past perfect for the <strong>step backwards</strong>, and as soon as the story is moving forwards again, drop back to the past simple. Usually you need <em>had</em> once, to mark the jump, and then the past simple can carry the rest of the flashback.',
          'One genuine ambiguity worth showing advanced students: <em>When we arrived, they left</em> means they left after we got there. <em>When we arrived, they <strong>had</strong> left</em> means we missed them. Same conjunction, same events, opposite holiday.',
          'And note that <em>after</em> and <em>before</em> already state the order, so the past perfect becomes optional with them: <em>after we checked in, we went out</em> is perfectly good. The tense is there for when nothing else does the job.'
        ],
        simple: [
          'Past perfect = <em>had</em> + past participle: <em>had booked, had gone, had eaten</em>.',
          'Use it when you tell something <strong>out of order</strong> — a step backwards.',
          '<em>We got there. They <strong>had given</strong> our room away.</em> (The giving happened first.)',
          'Do <strong>not</strong> use it for every past verb. Use it once, then go back to the past simple.',
          'With <em>after</em> and <em>before</em> you often do not need it — those words already show the order.'
        ],
        examples: [
          { s: 'The beach was empty. Everyone <strong>had gone</strong> home.', g: 'STEP BACKWARDS — THE SIGNAL IS "HAD"' },
          { s: 'When we arrived, they <strong>had left</strong>.', g: 'WE MISSED THEM' },
          { s: 'When we arrived, they <strong>left</strong>.', g: 'THEY LEFT AFTER WE GOT THERE' }
        ]
      },
      items: [
        { id: 's4l1-01', type: 'equiv', tag: 'past-perfect-order', level: 'B1+',
          given: 'When we reached the station, the last bus had gone.',
          stem: 'Which is true?',
          options: ['We caught the bus.', 'The bus left before we got there.', 'The bus left after we got there.', 'The bus never came at all.'],
          answer: 1,
          why: '<em>Had gone</em> puts the departure before our arrival. Change it to <em>went</em> and we would have watched it pull out — a different kind of bad evening.' },

        { id: 's4l1-02', type: 'spot', tag: 'past-perfect-order', level: 'B2',
          stem: 'One past perfect here is doing no work. Click it.',
          words: ['We', 'landed', 'at', 'six,', 'and', 'then', 'we', 'had', 'collected', 'our', 'bags.'],
          answer: 7, fix: 'delete "had" — the events are already in order',
          why: '<em>And then</em> states that the story is moving forwards. There is no step backwards, so there is nothing for the past perfect to mark.' },

        { id: 's4l1-03', type: 'choose', tag: 'past-perfect-order', level: 'B2',
          stem: 'Which paragraph uses the past perfect correctly?',
          options: [
            'We had arrived at the villa. We had unpacked. We had swum before dinner.',
            'We arrived at the villa. The owner had left the key under a pot, so we let ourselves in.',
            'We had arrived at the villa and the owner left the key under a pot.',
            'We arrived at the villa. The owner had left the key under a pot, and then we had let ourselves in.'
          ],
          answer: 1,
          why: 'One backward step (the key was left before we arrived), marked once, and then the story carries on in the past simple. The others either mark everything or mark the wrong verb.' },

        { id: 's4l1-04', type: 'gap', tag: 'past-perfect-order', level: 'B1+',
          lines: [
            { who: 'Kan', text: 'Why did you not eat at the hotel?' },
            { who: 'Ploy', text: 'The kitchen ___ by the time we got back from the temple.' }
          ],
          options: ['closed', 'had closed', 'was closing', 'has closed'],
          answer: 1,
          why: '<em>By the time</em> sets a past reference point and asks what was already true before it. That is precisely the past perfect\'s job.' },

        { id: 's4l1-05', type: 'order', tag: 'past-perfect-order', level: 'B2',
          stem: 'These sentences are in the order a writer would tell them. Put them in the order the events actually happened.',
          items: [
            'Someone had cancelled the booking three weeks earlier.',
            'We drove four hours to the guest house.',
            'The owner told us there was no room.',
            'We slept in the car.'
          ],
          why: 'The first sentence is the flashback — told second by the writer, but first in time. Being able to separate story order from event order is what the past perfect is for.' },

        { id: 's4l1-06', type: 'judge', tag: 'past-perfect-order', level: 'B2',
          given: 'After we had checked in, we went to find dinner.',
          stem: 'Would "After we checked in, we went to find dinner" also be correct?',
          answer: 0,
          why: 'True — both are correct. <em>After</em> already states the order, so the past perfect is optional here. It is compulsory only when nothing else tells the reader which came first.' }
      ]
    },

    {
      id: 's4l2', name: 'How long it had been going on', cefr: 'B2',
      theory: {
        key: 'Past perfect progressive: a stretch of activity running up to a moment in the past, usually to explain it.',
        body: [
          'Everything you learned about the two present perfects applies one step further back. <em>Have been -ing</em> becomes <em>had been -ing</em>, and it does the same job at a past reference point.',
          '<em>We <strong>had been driving</strong> for six hours, so nobody said much at dinner.</em> The driving is over by dinner time, but the six hours of it are what explains the silence.',
          'That is the giveaway: a <strong>duration plus a consequence</strong>. If you can put <em>so</em> or <em>that was why</em> after it, you almost certainly want this form.',
          'Compare the plain past perfect. <em>We had driven six hundred kilometres</em> reports the achievement — countable, complete. <em>We had been driving for six hours</em> measures the wear. Progressive for the wearing, simple for the achievement, exactly as in Leg 3.',
          'It also handles the evidence-at-a-past-moment case. <em>Her hair was wet; she <strong>had been swimming</strong>.</em> You are reasoning backwards from what you could see.',
          'Two things to avoid. State verbs still refuse it — <em>we had been knowing</em> is not English, <em>we had known each other for years</em> is. And it needs a past reference point somewhere in the context; without one it floats and the reader cannot place it.'
        ],
        simple: [
          'Form: <em>had been</em> + <em>-ing</em>.',
          'Use it for <strong>how long</strong> something went on before a past moment.',
          '<em>We had been waiting for two hours when they finally called the flight.</em>',
          'It often explains something: <em>We had been walking all day, so we slept early.</em>',
          'State verbs do not use it: <em>we had known them for years</em>, not <s>had been knowing</s>.'
        ],
        examples: [
          { s: 'We <strong>had been waiting</strong> three hours when they cancelled it.', g: 'DURATION UP TO A PAST POINT' },
          { s: 'The path was muddy — it <strong>had been raining</strong> all night.', g: 'REASONING BACK FROM EVIDENCE' },
          { s: 'We <strong>had walked</strong> twenty kilometres.', g: 'COUNTABLE ACHIEVEMENT — SIMPLE, NOT PROGRESSIVE' }
        ]
      },
      items: [
        { id: 's4l2-01', type: 'gap', tag: 'past-perfect-prog', level: 'B2',
          lines: [
            { who: 'Ann', text: 'Why was everyone so quiet at dinner?' },
            { who: 'Tor', text: 'We ___ since five that morning. Nobody had the energy to talk.' }
          ],
          options: ['travelled', 'had travelled', 'had been travelling', 'were travelling'],
          answer: 2,
          why: 'A duration running up to the past moment, offered as the explanation for it. Duration plus consequence is the signature of this form.' },

        { id: 's4l2-02', type: 'choose', tag: 'past-perfect-prog', level: 'B2',
          stem: 'Which sentence counts an achievement rather than measuring wear?',
          options: [
            'By Friday we had been cycling for five days.',
            'By Friday we had cycled four hundred kilometres.',
            'By Friday we had been cycling and we were exhausted.',
            'By Friday we had been cycling since Monday morning.'
          ],
          answer: 1,
          why: 'Four hundred kilometres is countable and complete, so it takes the simple. The other three measure a stretch of activity, which is the progressive\'s job.' },

        { id: 's4l2-03', type: 'spot', tag: 'past-perfect-prog', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['We', 'had', 'been', 'knowing', 'the', 'owner', 'for', 'years', 'before', 'we', 'stayed', 'there.'],
          answer: 3, fix: 'known',
          why: '<em>Know</em> is a state. The simple past perfect carries the duration by itself: <em>we had known the owner for years</em>.' },

        { id: 's4l2-04', type: 'equiv', tag: 'past-perfect-prog', level: 'B2',
          given: 'His shoes were covered in sand. He had been walking on the beach.',
          stem: 'What is the speaker doing in the second sentence?',
          options: [
            'Stating a fact she watched happen.',
            'Working backwards from evidence she can see.',
            'Predicting what he will do next.',
            'Reporting what he told her.'
          ],
          answer: 1,
          why: 'The sandy shoes are the present evidence; the past perfect progressive supplies the activity that must have produced them. Detective grammar.' },

        { id: 's4l2-05', type: 'sort', tag: 'past-perfect-prog', level: 'B2',
          stem: 'Simple or progressive after <em>had</em>?',
          bins: [
            { key: 'simp', label: 'had + participle', hint: 'countable, completed' },
            { key: 'prog', label: 'had been + -ing', hint: 'a stretch, often explaining' }
          ],
          items: [
            { text: 'visited eleven temples', bin: 'simp' },
            { text: 'lost three bags in one week', bin: 'simp' },
            { text: 'read the whole guidebook', bin: 'simp' },
            { text: 'queued since dawn', bin: 'prog' },
            { text: 'argued about it all week', bin: 'prog' },
            { text: 'sat on that bus for nine hours', bin: 'prog' }
          ],
          why: 'Ask whether you could put a number on it. Eleven temples, three bags, one guidebook — countable. Since dawn, all week, nine hours — measured.' },

        { id: 's4l2-06', type: 'build', tag: 'past-perfect-prog', level: 'B2',
          stem: 'Explain why you fell asleep on the coach: you had been up since four.',
          tiles: ['I', 'had', 'been', 'awake', 'since', 'four,', 'so', 'I', 'slept', 'the', 'whole', 'way.'],
          solution: 'I had been awake since four, so I slept the whole way.',
          why: 'Duration up to the past moment, then <em>so</em> and the consequence in the past simple. That two-part shape is worth memorising as a unit.' }
      ]
    },

    {
      id: 's4l3', name: 'The holidays we used to take', cefr: 'B2',
      theory: {
        key: 'used to covers habits AND states. would covers habits only — and needs the scene set first.',
        body: [
          'English has three ways to talk about repeated past behaviour, and they are not interchangeable.',
          '<strong>Past simple</strong> with a frequency word: <em>Every August we went to Hua Hin.</em> Neutral, and always available.',
          '<strong>used to</strong>: <em>We used to go to Hua Hin every August.</em> This adds a clear implication — <strong>we do not any more</strong>. It handles both actions and states: <em>we used to have a caravan</em>, <em>I used to be frightened of flying</em>.',
          '<strong>would</strong>: <em>We would leave before dawn to beat the traffic.</em> This is the storyteller\'s form, and it has two restrictions students rarely learn. It refuses <strong>states</strong> — <em>we would have a caravan</em> is not English — and it needs the past time frame <strong>already established</strong>. You cannot open a paragraph with it.',
          'So the natural shape of a nostalgic paragraph is fixed: open with <em>used to</em> or a past simple to set the frame, then switch to <em>would</em> and let it run. Reverse the order and it collapses.',
          'One more thing to keep separate. <em>used to + verb</em> (a past habit) is a different structure from <em>be used to + -ing</em> (be accustomed to). <em>I used to fly alone</em> means I did it then and no longer do. <em>I am used to flying alone</em> means it is normal for me now. Learners collide these constantly, and the difference is a whole different sentence.'
        ],
        simple: [
          '<em>Every August we <strong>went</strong> to Hua Hin</em> — neutral.',
          '<em>We <strong>used to</strong> go to Hua Hin</em> — and we do not now.',
          '<em>We <strong>would</strong> leave before dawn</em> — storytelling, but only for actions.',
          '<s>We would have a caravan</s> — <em>have</em> is a state, so use <em>used to</em>.',
          'Different structure: <em>I am <strong>used to</strong> flying</em> = it feels normal to me now.'
        ],
        examples: [
          { s: 'We <strong>used to</strong> spend every Songkran at my grandmother\'s.', g: 'PAST HABIT — AND IT HAS STOPPED' },
          { s: 'She <strong>would</strong> wake us at four and pack the car herself.', g: 'ACTION, WITH THE SCENE ALREADY SET' },
          { s: '<s>She would be a nervous driver.</s> → She <strong>used to be</strong> a nervous driver.', g: 'WOULD REFUSES STATES' }
        ]
      },
      items: [
        { id: 's4l3-01', type: 'spot', tag: 'used-to-would', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['We', 'would', 'have', 'a', 'small', 'cottage', 'near', 'the', 'sea.'],
          answer: 1, fix: 'used to',
          why: '<em>Have</em> here is a state of ownership, and <em>would</em> only takes repeated actions. <em>We used to have a cottage</em> is the form English offers.' },

        { id: 's4l3-02', type: 'choose', tag: 'used-to-would', level: 'B2',
          stem: 'Which paragraph opening works?',
          options: [
            'We would drive to Rayong every April. My father would load the car the night before.',
            'We used to drive to Rayong every April. My father would load the car the night before.',
            'We are used to drive to Rayong every April. My father would load the car.',
            'We would be driving to Rayong every April, and my father used to be loading the car.'
          ],
          answer: 1,
          why: '<em>Would</em> cannot set up its own past frame. Open with <em>used to</em> or a past simple, and then <em>would</em> can carry the rest of the paragraph.' },

        { id: 's4l3-03', type: 'equiv', tag: 'used-to-would', level: 'B2',
          given: 'I used to be scared of flying.',
          stem: 'What does this tell you about now?',
          options: ['I am still scared of flying.', 'I am no longer scared of flying.', 'I have never flown.', 'It says nothing about now.'],
          answer: 1,
          why: '<em>Used to</em> carries a built-in contrast with the present. That implication is the main reason to choose it over a plain past simple.' },

        { id: 's4l3-04', type: 'gap', tag: 'used-to-would', level: 'B2',
          lines: [
            { who: 'Interviewer', text: 'Is long-haul travel hard for you?' },
            { who: 'Guide', text: 'Not really. I ___ spending twelve hours on a plane — I do it every month.' }
          ],
          options: ['used to', 'am used to', 'would', 'was used to'],
          answer: 1,
          why: '<em>Be used to + -ing</em> means accustomed, and it is about now. <em>Used to spend</em> would mean she stopped, which contradicts the second half of her answer.' },

        { id: 's4l3-05', type: 'sort', tag: 'used-to-would', level: 'B2',
          stem: 'Which of these can take <em>would</em> for a past habit, and which need <em>used to</em>?',
          bins: [
            { key: 'both', label: 'would is fine', hint: 'a repeated action' },
            { key: 'usedto', label: 'needs used to', hint: 'a state' }
          ],
          items: [
            { text: 'swim before breakfast', bin: 'both' }, { text: 'complain about the heat', bin: 'both' },
            { text: 'buy the same postcards', bin: 'both' }, { text: 'own a beach hut', bin: 'usedto' },
            { text: 'live in Phuket', bin: 'usedto' }, { text: 'believe in ghosts', bin: 'usedto' }
          ],
          why: 'Owning, living and believing are not things you do on Tuesdays — they simply hold. <em>Would</em> needs something repeatable.' },

        { id: 's4l3-06', type: 'build', tag: 'used-to-would', level: 'B2',
          stem: 'Say that your family took the same holiday every year, and no longer does.',
          tiles: ['We', 'used', 'to', 'go', 'to', 'the', 'same', 'beach', 'every', 'single', 'year.'],
          solution: 'We used to go to the same beach every single year.',
          why: 'The habit plus the implication that it has stopped. A past simple would report the habit without saying anything about now.' },

        { id: 's4l3-07', type: 'judge', tag: 'backshift', level: 'B2+',
          given: 'We were going to fly to Hanoi, but the fares doubled.',
          stem: 'Did they fly to Hanoi?',
          answer: 1,
          why: 'Almost certainly not. <em>Was/were going to</em> reports an intention held in the past, and it carries a strong implication that it came to nothing. Leg 8 comes back to this as the future in the past.' }
      ]
    }
  ]
});

/* ===== LEG 5 — PLANNING THE NEXT TRIP ================================
   THE FUTURE, PART 1. The three present-tense futures: timetable,
   arrangement, intention. All three are grounded in the present.
   ====================================================================== */
STAGES.push({
  id: 's5', podcast: 'audio/leg-5.mp3', slides: '', video: '', art: 'desk', n: 5,
  name: 'Planning the Next Trip', cefr: 'B1+–B2', gate: 'Leg 5',
  blurb: 'English has no future tense — so it uses present forms instead. The question is never "is this future?" but "what is already true now?"',
  lessons: [

    {
      id: 's5l1', name: 'The big idea: futures are grounded in now', cefr: 'B1+',
      theory: {
        key: 'English does not mark futurity. It marks what makes you entitled to speak about the future.',
        body: [
          'This is the single most useful page in the course, so read it twice.',
          'English has no future tense, but it has at least six common ways of talking about future time. Learners are usually taught these as a list of forms with a list of rules. They are not a list. They are an <strong>evidence system</strong>.',
          'Every one of them answers the same question: <em>what is true in the present moment that entitles me to say this?</em>',
          '<strong>The timetable is published</strong> → present simple. <em>The ferry leaves at 07:15.</em> <strong>The arrangement is already made</strong> → present progressive. <em>We are meeting Ploy at the gate.</em> <strong>The cause is already visible, or the intention is already formed</strong> → be going to. <em>Look at that sky — it is going to pour.</em> <strong>The plan is official</strong> → be to. <em>The minister is to visit Phuket.</em> <strong>It is on the point of happening</strong> → be about to. <em>The doors are about to close.</em> <strong>I am judging it right now, from my own head</strong> → will. <em>I think you will love it.</em>',
          'Notice what falls out of this. Five of those six are <strong>present forms</strong> — and the sixth, <em>will</em>, is not a tense at all but a modal verb, exactly like <em>can</em> and <em>must</em>. English is not being disorganised. It genuinely has no future, and it has built a rich system on top of the present instead.',
          'So when you choose a future form in English, you are not answering "how far away is it?" or "how certain am I?" You are answering: <strong>where does the evidence live?</strong> Get that question into your head and the next two legs are mostly bookkeeping.'
        ],
        simple: [
          'English has <strong>no future tense</strong>. It uses present forms to talk about the future.',
          'Choose the form by asking: <strong>what is already true now?</strong>',
          'Timetable printed → <em>The ferry <strong>leaves</strong> at 07:15.</em>',
          'Arrangement made → <em>We <strong>are meeting</strong> at the gate.</em>',
          'Evidence you can see, or a plan you already had → <em>It <strong>is going to</strong> rain.</em>',
          'Just your opinion, right now → <em>I think you <strong>will</strong> love it.</em>'
        ],
        examples: [
          { s: 'The train <strong>gets in</strong> at 6:40.', g: 'A TIMETABLE EXISTS — PRESENT SIMPLE' },
          { s: 'We <strong>are having</strong> dinner with Nam on Friday.', g: 'AN ARRANGEMENT EXISTS — PRESENT PROGRESSIVE' },
          { s: 'Those clouds mean it <strong>is going to</strong> rain.', g: 'THE EVIDENCE EXISTS — GOING TO' }
        ]
      },
      items: [
        { id: 's5l1-01', type: 'sort', tag: 'timetable-future', level: 'B2',
          stem: 'Each of these is about the future. Where does the evidence live?',
          bins: [
            { key: 'pub', label: 'Published schedule', hint: 'someone printed it' },
            { key: 'arr', label: 'Agreed arrangement', hint: 'a person was involved' },
            { key: 'see', label: 'Visible evidence', hint: 'you can point at it' }
          ],
          items: [
            { text: 'the museum opens at nine', bin: 'pub' },
            { text: 'the last ferry is at 18:30', bin: 'pub' },
            { text: 'we said we would meet Ploy at six', bin: 'arr' },
            { text: 'the dentist wrote it in her book', bin: 'arr' },
            { text: 'the sky has gone completely black', bin: 'see' },
            { text: 'the fuel light just came on', bin: 'see' }
          ],
          why: 'Before you choose a form, identify the evidence. Published → present simple. Agreed → present progressive. Visible → going to. The grammar follows from the situation.' },

        { id: 's5l1-02', type: 'choose', tag: 'will-modal', level: 'B2',
          stem: 'Why do grammarians say English has no future tense?',
          options: [
            'Because English speakers rarely talk about the future.',
            'Because no English verb has a future ending — futurity is carried by separate words.',
            'Because the future is always uncertain.',
            'Because <em>will</em> is irregular.'
          ],
          answer: 1,
          why: 'A tense is marked on the verb itself. <em>Walk / walked</em> is a tense contrast; <em>walk / will walk</em> is a verb plus a modal, which is a different kind of thing entirely.' },

        { id: 's5l1-03', type: 'judge', tag: 'will-modal', level: 'B2',
          given: 'That will be the taxi driver at the door.',
          stem: 'Is this sentence about the future?',
          answer: 1,
          why: 'No — it is about this second. <em>Will</em> is making a confident inference about the present. That is the proof that <em>will</em> is a modal of judgement, not a future marker.' },

        { id: 's5l1-04', type: 'equiv', tag: 'timetable-future', level: 'B2',
          given: 'The coach leaves at 05:40.',
          stem: 'What does the choice of the present simple tell you?',
          options: [
            'That the speaker has just decided this.',
            'That a timetable says so, and nobody in this conversation controls it.',
            'That the coach is leaving at this moment.',
            'That the speaker is not sure about the time.'
          ],
          answer: 1,
          why: 'The present simple treats a schedule as a present fact about the world. It is the most impersonal of all the futures — nobody\'s choice, nobody\'s prediction.' },

        { id: 's5l1-05', type: 'spot', tag: 'timetable-future', level: 'B2',
          stem: 'Click the word that cannot use a timetable form.',
          words: ['The', 'flight', 'departs', 'at', 'nine', 'and', 'my', 'aunt', 'cooks', 'us', 'dinner', 'tomorrow.'],
          answer: 8, fix: 'is cooking',
          why: 'Airlines publish timetables; aunts do not. A personal arrangement needs the present progressive, however fixed it feels.' },

        { id: 's5l1-06', type: 'gap', tag: 'timetable-future', level: 'B1+',
          lines: [
            { who: 'Tourist', text: 'What time should we be at the pier?' },
            { who: 'Host', text: 'The boat ___ at 07:15 and it does not wait.' }
          ],
          options: ['will go', 'is going to go', 'goes', 'is going'],
          answer: 2,
          why: 'A published departure time, outside anyone\'s control. <em>And it does not wait</em> confirms it: this is an institution\'s schedule, not a plan.' }
      ]
    },

    {
      id: 's5l2', name: 'Arrangements: somebody else already knows', cefr: 'B1+',
      theory: {
        key: 'The present progressive for the future means the arrangement exists now.',
        body: [
          'You met this form in Leg 1 as "unfinished, seen from the inside". For the future, what is unfinished is the <strong>arrangement</strong>. It has been set up; the event is the part that has not happened yet.',
          '<em>We <strong>are meeting</strong> Nam at the gate at six.</em> That means it is agreed. A message was sent, or a conversation happened, or a booking was made.',
          'Here is the test that settles almost every case: <strong>has anyone else been involved yet?</strong> If another person, a booking system or a diary knows about it, the progressive is natural. If it is still only in your head, it is not.',
          'That is exactly why this is the tense of diaries and itineraries. Look at any travel itinerary and it will be wall-to-wall progressive: <em>Tuesday — we are flying to Hue. Wednesday — we are taking the boat.</em>',
          'It pairs with time expressions that fix the slot: <em>on Friday, at six, next week, tomorrow morning</em>. Without one, the sentence usually slides back into meaning "right now", which is why <em>we are having dinner with Nam</em> is ambiguous and <em>we are having dinner with Nam on Friday</em> is not.',
          'And the contrast with <em>will</em> is sharp. <em>We are meeting at six</em> = it is fixed. <em>We will meet at six</em> = I am proposing it as I speak. One reports; the other decides. Choose the wrong one in a work email and you will sound either presumptuous or vague.'
        ],
        simple: [
          'Present progressive = the arrangement is already made.',
          'Test: <strong>does someone else know?</strong> If yes, use <em>am / is / are + -ing</em>.',
          '<em>We <strong>are meeting</strong> Nam at six.</em> (Agreed.)',
          '<em>We <strong>will meet</strong> Nam at six.</em> (I am deciding as I speak.)',
          'Add a time word so it does not sound like "right now": <em>on Friday, tomorrow, next week</em>.'
        ],
        examples: [
          { s: 'We <strong>are flying</strong> to Hue on Tuesday.', g: 'TICKETS BOOKED — THE AIRLINE KNOWS' },
          { s: 'I <strong>am seeing</strong> the doctor before we travel.', g: 'AN APPOINTMENT EXISTS IN SOMEONE\'S DIARY' },
          { s: '<s>I am being tired tomorrow.</s>', g: 'YOU CANNOT ARRANGE A STATE' }
        ]
      },
      items: [
        { id: 's5l2-01', type: 'gap', tag: 'arrangement-future', level: 'B1+',
          lines: [
            { who: 'Ice', text: 'Are you free on Saturday?' },
            { who: 'Praew', text: 'Sorry, I ___ my cousin at the airport — her flight lands at eight.' }
          ],
          options: ['will meet', 'meet', 'am meeting', 'meet with'],
          answer: 2,
          why: 'It is arranged: the cousin knows, and the flight time is fixed. The progressive is how English declines an invitation without sounding like it is inventing an excuse.' },

        { id: 's5l2-02', type: 'choose', tag: 'arrangement-future', level: 'B2',
          stem: 'Which sentence tells you the plan is already agreed with another person?',
          options: [
            'I will have lunch with Nok on Thursday.',
            'I am having lunch with Nok on Thursday.',
            'I have lunch with Nok on Thursday.',
            'I would have lunch with Nok on Thursday.'
          ],
          answer: 1,
          why: 'The progressive reports an existing arrangement. <em>Will</em> would sound as if you were deciding at that moment, which is an odd thing to say about a lunch with a named friend.' },

        { id: 's5l2-03', type: 'table', tag: 'arrangement-future', level: 'B2',
          table: {
            cols: ['Day', 'Plan', 'Booked?'],
            rows: [
              ['Mon', 'fly to Da Nang', 'yes — flight VN162'],
              ['Tue', 'boat to the caves', 'yes — paid'],
              ['Wed', 'maybe the museum', 'no'],
              ['Thu', 'fly home', 'yes — flight VN163']
            ]
          },
          stem: 'Which sentence about Wednesday is right?',
          options: [
            'We are going to the museum on Wednesday.',
            'We might go to the museum on Wednesday.',
            'We go to the museum on Wednesday.',
            'We are visiting the museum on Wednesday.'
          ],
          answer: 1,
          why: 'Nothing is booked for Wednesday, so there is no arrangement to report. The progressive would claim a fixed plan the table says does not exist.' },

        { id: 's5l2-04', type: 'spot', tag: 'arrangement-future', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['We', 'are', 'being', 'at', 'the', 'hotel', 'by', 'four', 'on', 'Sunday.'],
          answer: 2, fix: 'will be',
          why: 'You can arrange an activity, but <em>be</em> here describes a state. States do not take the arrangement progressive — use <em>will be</em> or <em>we are getting there by four</em>.' },

        { id: 's5l2-05', type: 'equiv', tag: 'arrangement-future', level: 'B2',
          given: 'What are you doing at the weekend?',
          stem: 'What is the speaker actually asking?',
          options: [
            'What is happening at this moment?',
            'What have you already arranged?',
            'What do you usually do at weekends?',
            'What do you predict will happen?'
          ],
          answer: 1,
          why: 'This is the standard English way of asking about existing plans. <em>What will you do at the weekend?</em> asks for a prediction and sounds oddly formal between friends.' },

        { id: 's5l2-06', type: 'build', tag: 'arrangement-future', level: 'B1+',
          stem: 'Tell your class that your family has booked flights to Chiang Rai for next month.',
          tiles: ['We', 'are', 'flying', 'to', 'Chiang', 'Rai', 'next', 'month.'],
          solution: 'We are flying to Chiang Rai next month.',
          why: 'Booked flights are the clearest kind of arrangement there is, and the time phrase stops the sentence sounding like it is happening now.' },

        { id: 's5l2-07', type: 'judge', tag: 'arrangement-future', level: 'B2',
          given: 'I am taking my driving test on the 14th.',
          stem: 'Has the speaker arranged this with someone?',
          answer: 0,
          why: 'True — a test date exists in an official diary. That is exactly the condition the arrangement progressive reports, and it is why the form feels so confident.' }
      ]
    },

    {
      id: 's5l3', name: 'going to: the evidence is already here', cefr: 'B2',
      theory: {
        key: 'be going to says the cause exists NOW — either something you can see, or a decision you already took.',
        body: [
          '<em>Be going to</em> has two jobs, and they look different until you notice what they share.',
          '<strong>Job one: present evidence.</strong> <em>Look at that sky — it is going to pour.</em> <em>She is going to be sick.</em> <em>The fuel light is on; we are going to run out.</em> In each case you can point at the cause, and the prediction is really a report of something already in motion.',
          '<strong>Job two: an intention already formed.</strong> <em>We are going to spend a week in Chiang Mai this year.</em> You decided that last month; you are reporting the decision, not making it.',
          'What they share is the thing that matters: in both, <strong>something is already true in the present</strong>. Either the cause is visible, or the decision is already in your head. The future event has, in a sense, already started.',
          'This explains a fact that puzzles learners. Why is <em>look at those clouds — it will rain</em> odd? Because <em>will</em> offers your personal judgement at exactly the moment you are pointing at physical proof. The form and the situation contradict each other.',
          'Two practical notes. In fast speech, <em>going to</em> becomes <em>gonna</em> — fine to hear and to say, never to write in an exam. And <em>I am going to go</em> is grammatical but clumsy; most speakers say <em>I am going to Phuket</em> and let the progressive do the work.'
        ],
        simple: [
          '<em>Be going to</em> = the cause is already here.',
          'You can see it: <em>Look at those clouds — it <strong>is going to</strong> rain.</em>',
          'You already decided: <em>We <strong>are going to</strong> spend a week in Chiang Mai.</em>',
          'Do not use <em>will</em> when you are pointing at evidence.',
          '<em>Gonna</em> is fine in speech, never in writing.'
        ],
        examples: [
          { s: 'The fuel light is on — we <strong>are going to</strong> run out.', g: 'THE CAUSE IS VISIBLE RIGHT NOW' },
          { s: 'We <strong>are going to</strong> take the sleeper this time.', g: 'DECIDED BEFORE THIS CONVERSATION' },
          { s: '<s>Look at that queue — it will take an hour.</s>', g: 'DO NOT PREDICT WHEN YOU CAN POINT' }
        ]
      },
      items: [
        { id: 's5l3-01', type: 'gap', tag: 'going-to', level: 'B2',
          lines: [
            { who: 'Min', text: 'Why are you pulling over?' },
            { who: 'Ben', text: 'Look at the gauge — we ___ out of petrol before the next town.' }
          ],
          options: ['will run', 'run', 'are going to run', 'are running'],
          answer: 2,
          why: 'He is pointing at a gauge. Visible present evidence is the clearest possible case for <em>going to</em>.' },

        { id: 's5l3-02', type: 'choose', tag: 'going-to', level: 'B2',
          stem: 'Which sentence reports a decision taken before this conversation started?',
          options: [
            'Fine — I will book the hostel tonight.',
            'We are going to book the hostel tonight; we agreed last week.',
            'I book the hostel tonight.',
            'I would book the hostel tonight.'
          ],
          answer: 1,
          why: '<em>Going to</em> reports an existing intention. <em>Will</em> in the first option is the mark of a decision being made at the moment of speaking.' },

        { id: 's5l3-03', type: 'spot', tag: 'going-to', level: 'B2',
          stem: 'Click the word that does not fit a sentence pointing at evidence.',
          words: ['Those', 'clouds', 'are', 'very', 'black', '—', 'it', 'will', 'pour', 'tonight.'],
          answer: 7, fix: 'is going to',
          why: 'You cannot offer a personal opinion while pointing at proof. The evidence is present, so the form must be <em>going to</em>.' },

        { id: 's5l3-04', type: 'sort', tag: 'going-to', level: 'B2',
          stem: 'Which job is <em>going to</em> doing in each case?',
          bins: [
            { key: 'ev', label: 'Present evidence', hint: 'you can point at it' },
            { key: 'int', label: 'Existing intention', hint: 'you decided earlier' }
          ],
          items: [
            { text: 'she has gone very pale', bin: 'ev' },
            { text: 'the queue goes round the building', bin: 'ev' },
            { text: 'the departure board says DELAYED', bin: 'ev' },
            { text: 'we booked leave for October', bin: 'int' },
            { text: 'we have been saving since March', bin: 'int' },
            { text: 'I promised my mother I would visit', bin: 'int' }
          ],
          why: 'Two kinds of present fact — one out in the world, one in your head — and the same form covers both, because both are already true now.' },

        { id: 's5l3-05', type: 'equiv', tag: 'going-to', level: 'B2',
          given: 'I am going to complain to the manager.',
          stem: 'What does this suggest about when the speaker decided?',
          options: [
            'They decided at this exact moment.',
            'They have been planning it for a while.',
            'They have not decided yet.',
            'Someone else decided for them.'
          ],
          answer: 1,
          why: 'Compare <em>right, I will complain to the manager</em>, said the instant something goes wrong. The two forms place the decision on different sides of the conversation.' },

        { id: 's5l3-06', type: 'build', tag: 'going-to', level: 'B2',
          stem: 'Your suitcase is bulging and the zip is straining. Warn your friend.',
          tiles: ['That', 'zip', 'is', 'going', 'to', 'break', 'before', 'we', 'get', 'there.'],
          solution: 'That zip is going to break before we get there.',
          why: 'A straining zip is visible evidence, so <em>going to</em> is the form. Note the second clause has no <em>will</em> — that is Leg 6.' },

        { id: 's5l3-07', type: 'judge', tag: 'going-to', level: 'B2+',
          given: 'We are going to fly, but we have not booked anything yet.',
          stem: 'Is this a contradiction?',
          answer: 1,
          why: 'No. <em>Going to</em> reports an intention, not an arrangement — that is exactly the line between it and the present progressive. <em>We are flying on Tuesday</em> would be the contradiction.' }
      ]
    }
  ]
});

/* ===== LEG 6 — WHAT "WILL" REALLY MEANS ==============================
   THE FUTURE, PART 2. will as a modal; choosing against going to; and
   the clause where English forbids will altogether.
   ====================================================================== */
STAGES.push({
  id: 's6', podcast: 'audio/leg-6.mp3', slides: '', video: '', art: 'board', n: 6,
  name: 'What "will" Really Means', cefr: 'B2', gate: 'Leg 6',
  blurb: 'Everyone learns will on day one and nobody is told what it means. It is a modal of judgement — and there is one clause where English bans it outright.',
  lessons: [

    {
      id: 's6l1', name: 'will is a modal, not a tense', cefr: 'B2',
      theory: {
        key: 'will belongs with can, may and must. Its meaning is judgement and willingness — the future is a side effect.',
        body: [
          'Put <em>will</em> in a line with the other modals and it behaves identically: no <em>-s</em> in the third person (<em>he will</em>, not <em>he wills</em>), no <em>to</em> after it, question by inversion (<em>will you?</em>), negative with <em>not</em>. It is a modal verb. It has never been a tense.',
          'The proof that finishes the argument: <em>will</em> can be about the present. The doorbell rings and you say <em>that will be the taxi</em>. Nothing future there at all — it is a confident inference about right now, and you could replace it with <em>that must be the taxi</em>.',
          'So <em>will</em> has four jobs in everyday English. <strong>Prediction</strong> from your own judgement: <em>You will love Hoi An.</em> <strong>Instant decision</strong>, made as you speak: <em>Right, I will take the later train.</em> <strong>Willingness and offers</strong>: <em>I will carry that for you.</em> <em>Will you hold this?</em> <strong>Refusal</strong> in the negative: <em>The lock will not open.</em>',
          'That last one is worth pausing on. <em>The door will not shut</em> does not predict anything about the future — it says the door is refusing, now. English routinely treats objects as if they had willpower, and <em>will not</em> is how it does it.',
          'And with heavy stress, <em>will</em> marks an exasperating habit: <em>He WILL leave his passport in the room.</em> Same word, and the meaning has gone from prediction to complaint, because the core has always been about volition rather than time.',
          'If you were taught "will = future", you learned one of four meanings and none of the reasoning. Learn it as <strong>the speaker\'s judgement or willingness, right now</strong>, and every use falls into place.'
        ],
        simple: [
          '<em>Will</em> is a modal, like <em>can</em> and <em>must</em> — not a tense.',
          'It can even be about now: <em>That <strong>will</strong> be the taxi.</em> (= that must be)',
          'Four jobs: prediction (<em>you will love it</em>), instant decision (<em>I will take the bus</em>), offers (<em>I will help you</em>), refusal (<em>the lock will not open</em>).',
          '<em>Will not</em> often means "refuses to": <em>The window will not close.</em>'
        ],
        examples: [
          { s: 'Someone is at the door — that <strong>will</strong> be our driver.', g: 'PRESENT INFERENCE, NOT FUTURE' },
          { s: 'This bag is heavy — I <strong>will</strong> take it for you.', g: 'AN OFFER, DECIDED AS I SPEAK' },
          { s: 'The safe <strong>will not</strong> open.', g: 'REFUSAL, HAPPENING RIGHT NOW' }
        ]
      },
      items: [
        { id: 's6l1-01', type: 'judge', tag: 'will-modal', level: 'B2',
          given: 'The phone is ringing — that will be the tour company.',
          stem: 'Is the speaker talking about the future?',
          answer: 1,
          why: 'No. This is a confident guess about who is calling right now. <em>Will</em> is expressing judgement, which is what modals do.' },

        { id: 's6l1-02', type: 'sort', tag: 'will-modal', level: 'B2',
          stem: 'Which job is <em>will</em> doing in each sentence?',
          bins: [
            { key: 'pred', label: 'Prediction', hint: 'my judgement about what happens' },
            { key: 'dec', label: 'Decision or offer', hint: 'made as I speak' },
            { key: 'ref', label: 'Refusal', hint: 'it is not co-operating' }
          ],
          items: [
            { text: 'You will enjoy the night market.', bin: 'pred' },
            { text: 'The queue will be shorter after nine.', bin: 'pred' },
            { text: 'Fine, I will pay the extra baggage fee.', bin: 'dec' },
            { text: 'I will carry the small case.', bin: 'dec' },
            { text: 'The boot will not shut.', bin: 'ref' },
            { text: 'My phone will not connect to their wifi.', bin: 'ref' }
          ],
          why: 'One word, three jobs, and only the first is about the future at all. That is the argument for calling <em>will</em> a modal.' },

        { id: 's6l1-03', type: 'gap', tag: 'will-modal', level: 'B2',
          lines: [
            { who: 'Fon', text: 'This case is far too heavy for you.' },
            { who: 'Ake', text: 'Do not worry — I ___ it.' }
          ],
          options: ['am going to take', 'am taking', 'will take', 'take'],
          answer: 2,
          why: 'An offer, made in response to what was just said. <em>Going to</em> would claim a plan he cannot have had before she spoke.' },

        { id: 's6l1-04', type: 'choose', tag: 'will-modal', level: 'B2+',
          stem: 'What does "He WILL leave the balcony door open" mean, said with heavy stress on <em>will</em>?',
          options: [
            'A prediction about tomorrow.',
            'A complaint about an annoying habit he has.',
            'A promise he has made.',
            'Permission for him to do it.'
          ],
          answer: 1,
          why: 'Stressed <em>will</em> marks a repeated, irritating act of volition. The core meaning has always been willingness, so complaint is a short step from it.' },

        { id: 's6l1-05', type: 'spot', tag: 'will-modal', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['My', 'brother', 'wills', 'meet', 'us', 'at', 'the', 'airport.'],
          answer: 2, fix: 'will',
          why: 'Modals take no <em>-s</em> in the third person. <em>Wills</em> is as impossible as <em>he cans</em> — and that behaviour is exactly what identifies <em>will</em> as a modal.' },

        { id: 's6l1-06', type: 'equiv', tag: 'will-modal', level: 'B2',
          given: 'The window will not close properly.',
          stem: 'Which is closest in meaning?',
          options: [
            'The window is going to stay open tomorrow.',
            'The window is refusing to close — right now.',
            'Somebody will close the window later.',
            'The window closed badly yesterday.'
          ],
          answer: 1,
          why: 'Negative <em>will</em> with an object is refusal in the present. English treats objects as having a will of their own, and this is the grammar of that habit.' }
      ]
    },

    {
      id: 's6l2', name: 'will or going to: where does the evidence live?', cefr: 'B2',
      theory: {
        key: 'Not certainty. Not distance. Just: is the ground for this statement out in the world, or inside my head at this instant?',
        body: [
          'Students are often told <em>going to</em> is "more certain" or "nearer". Both are wrong, and both produce mistakes.',
          'The real line is this. <strong>Going to</strong> points at something that already exists in the present — visible evidence, or a decision taken earlier. <strong>Will</strong> offers your judgement, formed at the moment you speak.',
          'Two clean tests will handle almost every case a student meets.',
          '<strong>The decision test.</strong> Did you decide before you opened your mouth, or as you opened it? <em>We are going to take the sleeper train</em> — decided last week. <em>Actually, I will take the sleeper</em> — decided just now, probably in response to what somebody said.',
          '<strong>The evidence test.</strong> Can you point at the reason? If yes, <em>going to</em>. <em>She has gone white — she is going to faint.</em> If the reason is only your experience or opinion, <em>will</em>. <em>You will love Hoi An</em> — there is no visible proof of that anywhere; it is a judgement.',
          'Watch what happens in a real conversation, because the forms alternate naturally: <em>"What are you doing about dinner?" "We are going to try that place by the river."</em> (planned) <em>"It is fully booked." "Oh. Then we will just eat at the hotel."</em> (decided on the spot).',
          'One place where <em>will</em> is simply the right choice regardless: <strong>offers, promises and requests</strong>, because those are acts of will by definition. <em>I will send you a photo.</em> <em>Will you keep an eye on my bag?</em> You cannot make a promise with <em>going to</em> — <em>I am going to send you a photo</em> reports a plan, and reporting a plan is not promising anything.'
        ],
        simple: [
          'Not about certainty. About <strong>where the reason is</strong>.',
          'Decided <strong>before</strong> you spoke → <em>going to</em>. Deciding <strong>as</strong> you speak → <em>will</em>.',
          'Can you <strong>point</strong> at the reason → <em>going to</em>. Only your opinion → <em>will</em>.',
          'Offers, promises and requests always use <em>will</em>: <em>I will help you.</em>',
          '<em>"It is fully booked." "Then we <strong>will</strong> eat at the hotel."</em> — decided on the spot.'
        ],
        examples: [
          { s: 'We <strong>are going to</strong> hire a scooter — we booked it online.', g: 'DECIDED BEFORE SPEAKING' },
          { s: 'No taxis? Right, we <strong>will</strong> walk.', g: 'DECIDED THIS SECOND' },
          { s: 'I <strong>will</strong> text you when we land.', g: 'A PROMISE — ONLY WILL CAN DO THIS' }
        ]
      },
      items: [
        { id: 's6l2-01', type: 'gap', tag: 'will-vs-going', level: 'B2',
          lines: [
            { who: 'Desk clerk', text: 'I am afraid the restaurant is closed this evening.' },
            { who: 'Guest', text: 'Oh. Then we ___ something in the convenience store.' }
          ],
          options: ['are going to get', 'will get', 'get', 'are getting'],
          answer: 1,
          why: 'The decision is being made in direct response to what was just said. That is the instant-decision <em>will</em>, and no other form fits.' },

        { id: 's6l2-02', type: 'choose', tag: 'will-vs-going', level: 'B2',
          stem: 'Which one is a promise rather than a report of a plan?',
          options: [
            'I am going to send you the photos.',
            'I will send you the photos, I promise.',
            'I am sending you the photos.',
            'I send you the photos.'
          ],
          answer: 1,
          why: 'A promise is an act of will, so it takes <em>will</em>. <em>Going to</em> only tells the listener what you intend, which commits you to nothing.' },

        { id: 's6l2-03', type: 'spot', tag: 'will-vs-going', level: 'B2',
          stem: 'Click the word that is wrong when you are pointing at proof.',
          words: ['Look', 'at', 'the', 'departure', 'board', '—', 'we', 'will', 'miss', 'the', 'connection.'],
          answer: 7, fix: 'are going to',
          why: '<em>Look at</em> announces visible evidence. Offering an opinion while pointing at proof is the contradiction that makes the sentence sound wrong.' },

        { id: 's6l2-04', type: 'sort', tag: 'will-vs-going', level: 'B2+',
          stem: 'Which form does each situation call for?',
          bins: [
            { key: 'will', label: 'will', hint: 'judgement or decision, right now' },
            { key: 'gt', label: 'going to', hint: 'evidence or an existing plan' }
          ],
          items: [
            { text: 'offering to carry a bag', bin: 'will' },
            { text: 'guessing that your friend will enjoy Kyoto', bin: 'will' },
            { text: 'choosing a dish as the waiter waits', bin: 'will' },
            { text: 'the sky has gone black', bin: 'gt' },
            { text: 'the leave was booked in March', bin: 'gt' },
            { text: 'the tyre is completely flat', bin: 'gt' }
          ],
          why: 'The top three exist only in the speaker\'s head at the moment of speaking. The bottom three are already true out in the world.' },

        { id: 's6l2-05', type: 'equiv', tag: 'will-vs-going', level: 'B2+',
          given: 'I am going to tell the manager exactly what I think of this room.',
          stem: 'How does this differ from "I will tell the manager..."?',
          options: [
            'It is less certain.',
            'It is further in the future.',
            'It shows the speaker had already resolved to do it before speaking.',
            'It is more polite.'
          ],
          answer: 2,
          why: 'And that is why it sounds more menacing. A plan someone has been nursing since check-in is a worse sign than a decision taken in the heat of the moment.' },

        { id: 's6l2-06', type: 'build', tag: 'will-vs-going', level: 'B2',
          stem: 'Your friend says the last bus has gone. Decide, right now, to walk.',
          tiles: ['Never', 'mind', '—', 'we', 'will', 'walk', 'back', 'to', 'the', 'hotel.'],
          solution: 'Never mind — we will walk back to the hotel.',
          why: 'A decision made in response to new information. <em>Going to</em> would falsely claim you had planned to walk all along.' },

        { id: 's6l2-07', type: 'judge', tag: 'will-vs-going', level: 'B2+',
          given: 'going to is used for events that are closer in time than will.',
          stem: 'Is this a reliable rule?',
          answer: 1,
          why: 'No. <em>We are going to retire to the coast one day</em> is decades away, and <em>that will be the taxi</em> is happening this second. Distance is not what the two forms encode.' }
      ]
    },

    {
      id: 's6l3', name: 'The clause where will is forbidden', cefr: 'B2',
      theory: {
        key: 'After when, if, as soon as, until, before, after and once, English uses a present form — even for the future.',
        body: [
          '<em>When we <strong>land</strong>, I <strong>will</strong> call you.</em> Both halves are about the future. Only the main clause gets <em>will</em>.',
          'This is not an arbitrary rule. The subordinate clause is not making a prediction — it is <strong>setting the reference point</strong> for the one that is. English treats that anchor as given, so it does not mark it for prediction.',
          'The conjunctions that do this: <em>when, if, as soon as, until, till, before, after, once, by the time, unless, the moment, whenever</em>. Same behaviour in all of them.',
          'The present perfect is also available in these clauses and is useful when you need completion: <em>As soon as we <strong>have checked in</strong>, we can explore.</em> Slightly more precise than <em>check in</em>, and it makes clear the second event waits for the first to finish.',
          'Now the exception that decides B2 exam questions. If <em>when</em> introduces a <strong>noun clause</strong> rather than a time clause, <em>will</em> comes straight back: <em>I do not know when we <strong>will</strong> land.</em> <em>Could you tell me when the coach <strong>will</strong> leave?</em>',
          'The test takes two seconds. If you can replace it with <strong>"at the time that"</strong>, it is a time clause and <em>will</em> is banned. If it means <strong>"what time"</strong>, it is a noun clause and <em>will</em> is fine. <em>I will ring you when we arrive</em> — at the time that we arrive. <em>I do not know when we will arrive</em> — what time we will arrive.',
          'And keep <em>if</em> separate from <em>whether</em>. <em>If it rains, we will stay in</em> is a condition, present form. <em>I do not know if it will rain</em> is really <em>whether</em>, a noun clause, so <em>will</em> is correct.'
        ],
        simple: [
          'No <em>will</em> after: <em>when, if, as soon as, until, before, after, once, by the time</em>.',
          '<em>When we <strong>land</strong>, I <strong>will</strong> call you.</em> Only the main clause gets <em>will</em>.',
          'You can use the present perfect there too: <em>As soon as we <strong>have eaten</strong>, we will go.</em>',
          '<strong>But</strong>: <em>I do not know when we <strong>will</strong> land.</em> Here <em>when</em> means "what time", so <em>will</em> is right.',
          'Test: can you say "at the time that"? Then no <em>will</em>.'
        ],
        examples: [
          { s: 'As soon as we <strong>get</strong> there, we <strong>will</strong> send a photo.', g: 'TIME CLAUSE — PRESENT FORM ONLY' },
          { s: 'I do not know when the ferry <strong>will</strong> leave.', g: 'NOUN CLAUSE — WILL IS CORRECT' },
          { s: '<s>When we will arrive, we will eat.</s>', g: 'THE COMMONEST B2 ERROR IN THE TOPIC' }
        ]
      },
      items: [
        { id: 's6l3-01', type: 'spot', tag: 'time-clause', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['When', 'we', 'will', 'get', 'to', 'the', 'hotel,', 'I', 'will', 'have', 'a', 'shower.'],
          answer: 2, fix: 'delete "will"',
          why: 'The <em>when</em> clause sets the reference point, so it takes a present form. The main clause keeps its <em>will</em>.' },

        { id: 's6l3-02', type: 'choose', tag: 'time-clause', level: 'B2',
          stem: 'Which sentence is correct?',
          options: [
            'I do not know when the coach will arrive.',
            'I do not know when the coach arrives, so I will not know when will it arrive.',
            'When the coach will arrive, we will board it.',
            'I will tell you when will the coach arrive.'
          ],
          answer: 0,
          why: 'Here <em>when</em> means "what time" — a noun clause, so <em>will</em> is correct and the word order stays statement order.' },

        { id: 's6l3-03', type: 'sort', tag: 'time-clause', level: 'B2+',
          stem: 'Is <em>when</em> a time clause (no will) or a noun clause (will is fine)?',
          bins: [
            { key: 'time', label: 'Time clause — no will', hint: '= at the time that' },
            { key: 'noun', label: 'Noun clause — will is fine', hint: '= what time' }
          ],
          items: [
            { text: 'Call me when you land.', bin: 'time' },
            { text: 'We will eat when the others get here.', bin: 'time' },
            { text: 'Wait here when it rains.', bin: 'time' },
            { text: 'Nobody knows when the strike will end.', bin: 'noun' },
            { text: 'Can you tell me when the tour will finish?', bin: 'noun' },
            { text: 'The board shows when the flight will board.', bin: 'noun' }
          ],
          why: 'Try substituting "at the time that" into each one. Where it works, <em>will</em> is banned; where you need "what time", <em>will</em> belongs.' },

        { id: 's6l3-04', type: 'gap', tag: 'time-clause', level: 'B2',
          lines: [
            { who: 'Mae', text: 'Shall we book the tour now?' },
            { who: 'Pim', text: 'Let us wait until we ___ what the weather is doing.' }
          ],
          options: ['will see', 'see', 'are seeing', 'will have seen'],
          answer: 1,
          why: '<em>Until</em> is a time conjunction, so the clause takes a present form even though the seeing is in the future.' },

        { id: 's6l3-05', type: 'build', tag: 'time-clause', level: 'B2',
          stem: 'Promise to message your mother the moment you have cleared customs.',
          tiles: ['I', 'will', 'message', 'you', 'as', 'soon', 'as', 'we', 'have', 'cleared', 'customs.'],
          solution: 'I will message you as soon as we have cleared customs.',
          why: 'The main clause carries <em>will</em>; the time clause uses the present perfect to make clear that the messaging waits for customs to finish.' },

        { id: 's6l3-06', type: 'equiv', tag: 'time-clause', level: 'B2+',
          given: 'I do not know if the flight will be delayed.',
          stem: 'Why is <em>will</em> correct here, when "if it rains, we will stay in" forbids it?',
          options: [
            'Because the speaker is uncertain.',
            'Because this <em>if</em> means "whether" — it is a noun clause, not a condition.',
            'Because flights are not conditions.',
            'Because the sentence is negative.'
          ],
          answer: 1,
          why: 'Two different <em>ifs</em>. The conditional <em>if</em> sets a reference point and refuses <em>will</em>; the <em>if</em> that means <em>whether</em> introduces a noun clause and takes it happily.' },

        { id: 's6l3-07', type: 'spot', tag: 'time-clause', level: 'B2',
          stem: 'Click the wrong word.',
          words: ['By', 'the', 'time', 'you', 'will', 'read', 'this,', 'we', 'will', 'be', 'in', 'Osaka.'],
          answer: 4, fix: 'delete "will"',
          why: '<em>By the time</em> is a time conjunction like any other. The main clause keeps its <em>will</em>; the anchoring clause does not get one.' }
      ]
    }
  ]
});

/* ===== LEG 7 — STANDING IN NEXT AUGUST ===============================
   THE FUTURE, PART 3. Future progressive (and its politeness use),
   future perfect, and the semi-modal arrangement ladder.
   ====================================================================== */
STAGES.push({
  id: 's7', podcast: 'audio/leg-7.mp3', slides: '', video: '', art: 'lounge', n: 7,
  name: 'Standing in Next August', cefr: 'B2+', gate: 'Leg 7',
  blurb: 'Put yourself at a point in the future and look around — or look back. This is also where English keeps its politest way of asking for anything.',
  lessons: [

    {
      id: 's7l1', name: 'Future progressive, and the polite future', cefr: 'B2+',
      theory: {
        key: 'Two jobs: in progress at a future moment — and a future with the decision taken out of it.',
        body: [
          '<strong>Job one</strong> is the one everybody is taught. <em>This time on Friday we <strong>will be sitting</strong> on a beach in Krabi.</em> Pick a future moment, stand in it, and describe what is going on around you. Same aspect as always: unfinished, seen from inside.',
          '<strong>Job two</strong> is the one almost nobody is taught, and it is the more useful of the two.',
          'Compare these. <em>Will you use the car tonight?</em> and <em>Will you be using the car tonight?</em> The first asks about your intention — and because <em>will</em> carries volition, it sounds like the opening move in a request for a favour. The second asks only what is going to be happening anyway.',
          'That is the mechanism. The progressive <strong>strips the volition out of will</strong>, and what is left is a plain enquiry about the shape of the future. This is why it feels so much more tactful.',
          'This makes the future progressive English\'s main politeness device for future time, and once you notice it you will hear it constantly in hotels, on planes and in offices: <em>Will you be joining us for dinner? Will you be checking any bags today? When will you be leaving?</em> None of those are requests. They are all deliberately free of pressure.',
          'It also gives a clean way to ask about someone\'s plans without seeming to angle for an invitation: <em>Will you be going to the market on Sunday?</em> asks; <em>will you go to the market on Sunday?</em> can sound like you want a lift.',
          'A third, minor use: a confident assumption about what is happening at a future point in a routine. <em>Do not ring at seven — they will be eating.</em>'
        ],
        simple: [
          'Form: <em>will be</em> + <em>-ing</em>.',
          'Use 1 — in progress later: <em>This time tomorrow we <strong>will be flying</strong> over the sea.</em>',
          'Use 2 — <strong>polite</strong> questions: <em>Will you <strong>be using</strong> the car tonight?</em> (no pressure)',
          '<em>Will you use the car tonight?</em> sounds like you want to borrow it.',
          'Hotel and airline staff use this form constantly: <em>Will you be checking any bags?</em>'
        ],
        examples: [
          { s: 'This time next week we <strong>will be lying</strong> on a beach.', g: 'IN PROGRESS AT A FUTURE MOMENT' },
          { s: '<strong>Will you be having</strong> breakfast in the hotel?', g: 'A NEUTRAL ENQUIRY — NO FAVOUR IMPLIED' },
          { s: 'Will you have breakfast in the hotel?', g: 'SOUNDS LIKE AN INVITATION OR A REQUEST' }
        ]
      },
      items: [
        { id: 's7l1-01', type: 'choose', tag: 'future-prog', level: 'B2+',
          stem: 'Which question does NOT sound like the speaker wants to borrow the car?',
          options: [
            'Will you use the car tonight?',
            'Will you be using the car tonight?',
            'Are you going to use the car tonight?',
            'Do you want to use the car tonight?'
          ],
          answer: 1,
          why: 'The future progressive removes the volition from <em>will</em>, so the question asks only what will be going on — not what you have decided, and not whether you would mind.' },

        { id: 's7l1-02', type: 'gap', tag: 'future-prog', level: 'B2+',
          lines: [
            { who: 'Receptionist', text: 'Good evening. ___ with us for dinner this evening?' },
            { who: 'Guest', text: 'No, we have booked somewhere in town, thank you.' }
          ],
          options: ['Will you join', 'Do you join', 'Will you be joining', 'Are you joining'],
          answer: 2,
          why: 'Hotel English, almost word for word. <em>Will you join us?</em> would be an invitation; the progressive keeps it a neutral question about the evening.' },

        { id: 's7l1-03', type: 'build', tag: 'future-prog', level: 'B2+',
          stem: 'Text your friend from the airport: at this time tomorrow, you are in the air over the Andaman Sea.',
          tiles: ['This', 'time', 'tomorrow', 'we', 'will', 'be', 'flying', 'over', 'the', 'Andaman', 'Sea.'],
          solution: 'This time tomorrow we will be flying over the Andaman Sea.',
          why: 'A future vantage point plus an action in progress inside it. <em>We will fly</em> would report the whole flight as an event, which is not what you mean.' },

        { id: 's7l1-04', type: 'equiv', tag: 'future-prog', level: 'B2+',
          given: 'Will you be checking any bags today?',
          stem: 'What is the check-in agent doing?',
          options: [
            'Offering to check your bags for you.',
            'Asking neutrally what is going to happen, with no pressure either way.',
            'Telling you that you must check a bag.',
            'Guessing that you have no bags.'
          ],
          answer: 1,
          why: 'Service English lives in this form precisely because it asks without implying anything about what the customer should choose.' },

        { id: 's7l1-05', type: 'spot', tag: 'future-prog', level: 'B2+',
          stem: 'Click the word that makes this too blunt for a hotel.',
          words: ['Will', 'you', 'leave', 'your', 'key', 'at', 'the', 'desk', 'tomorrow?'],
          answer: 2, fix: 'be leaving',
          why: 'As written it reads as a request, almost an instruction. <em>Will you be leaving your key?</em> asks about the arrangement instead of asking the guest to do something.' },

        { id: 's7l1-06', type: 'judge', tag: 'future-prog', level: 'B2+',
          given: 'Do not call them at eight — they will be eating.',
          stem: 'Is the speaker certain about this?',
          answer: 0,
          why: 'True, reasonably so. This is the assumption use: at that point in their routine, this is what will be going on. It is a confident inference rather than a prediction of an event.' }
      ]
    },

    {
      id: 's7l2', name: 'Future perfect: looking back from the future', cefr: 'B2+',
      theory: {
        key: 'Stand at a future point and report what is already finished when you get there.',
        body: [
          'The future perfect needs a <strong>vantage point</strong>, and it must be stated or the tense has nothing to hang on. That is why <em>by</em> appears in almost every example: <em>by Friday, by the time we land, by the end of the trip</em>.',
          '<em>By the time we reach Sapporo, we <strong>will have changed</strong> trains four times.</em> Put yourself in Sapporo. The changes are behind you. That is all the tense is doing.',
          'The aspect choice works exactly as it did with <em>have</em> and <em>had</em> — you have now met this pattern three times, which is the point of teaching them in this order.',
          '<strong>Simple</strong> counts completed achievements: <em>we will have visited six countries</em>. <strong>Progressive</strong> measures a stretch: <em>we will have been travelling for twenty hours</em>. Ask whether you can put a number on it.',
          'It is also the natural tense of anniversaries and milestones, which makes it easy to practise with real facts: <em>By next April, my grandmother will have lived in that house for fifty years.</em>',
          'One nuance worth having. The future perfect can also express a confident inference about the present, exactly as <em>will</em> did in Leg 6: <em>They will have landed by now.</em> That is not about the future at all — it is a deduction about what has already happened, and it is extremely common in speech.',
          'And the same time-clause rule applies: <em>by the time we <strong>land</strong></em>, never <em>by the time we will land</em>. The anchor clause never takes <em>will</em>.'
        ],
        simple: [
          'Form: <em>will have</em> + past participle.',
          'Always set the point first: <em><strong>By Friday</strong>, we will have visited six temples.</em>',
          'Counting things → simple. Measuring time → <em>will have been + -ing</em>.',
          '<em>By the time we land, we will have been travelling for twenty hours.</em>',
          'It can also mean "surely by now": <em>They will have landed by now.</em>'
        ],
        examples: [
          { s: 'By Sunday we <strong>will have driven</strong> the whole coast.', g: 'COUNTABLE, COMPLETE — SIMPLE' },
          { s: 'By tonight we <strong>will have been travelling</strong> for a full day.', g: 'A MEASURED STRETCH — PROGRESSIVE' },
          { s: 'Do not worry — they <strong>will have arrived</strong> by now.', g: 'AN INFERENCE ABOUT THE PRESENT' }
        ]
      },
      items: [
        { id: 's7l2-01', type: 'gap', tag: 'future-perfect', level: 'B2+',
          lines: [
            { who: 'Ann', text: 'Twenty hours of flying seems impossible.' },
            { who: 'Sim', text: 'By the time we land in Reykjavik, we ___ for nearly a full day.' }
          ],
          options: ['will travel', 'will have travelled', 'will have been travelling', 'are travelling'],
          answer: 2,
          why: 'A measured stretch of activity running up to a future point. The simple would count achievements instead, and "nearly a full day" is a measurement.' },

        { id: 's7l2-02', type: 'choose', tag: 'future-perfect', level: 'B2+',
          stem: 'Which sentence counts achievements rather than measuring time?',
          options: [
            'By Friday we will have been walking for a week.',
            'By Friday we will have walked three hundred kilometres.',
            'By Friday we will have been walking every day.',
            'By Friday we will be walking again.'
          ],
          answer: 1,
          why: 'Three hundred kilometres is countable and complete. This is the same simple-versus-progressive choice you met with the present perfect and the past perfect.' },

        { id: 's7l2-03', type: 'spot', tag: 'future-perfect', level: 'B2+',
          stem: 'Click the wrong word.',
          words: ['By', 'the', 'time', 'you', 'will', 'get', 'this', 'postcard,', 'we', 'will', 'have', 'flown', 'home.'],
          answer: 4, fix: 'delete "will"',
          why: '<em>By the time</em> is a time conjunction, so the anchoring clause stays in a present form. The main clause keeps its future perfect.' },

        { id: 's7l2-04', type: 'equiv', tag: 'future-perfect', level: 'B2+',
          given: 'They will have checked in by now.',
          stem: 'What is the speaker doing?',
          options: [
            'Predicting something for tomorrow.',
            'Making a confident deduction about what has already happened.',
            'Giving an instruction.',
            'Describing a regular habit.'
          ],
          answer: 1,
          why: '<em>By now</em> gives it away — this is a deduction about the present, exactly like <em>that will be the taxi</em> in Leg 6. <em>Will</em> is judging, not predicting.' },

        { id: 's7l2-05', type: 'build', tag: 'future-perfect', level: 'B2+',
          stem: 'Your grandmother moved into her house in 1976. Say what is true next year.',
          tiles: ['By', 'next', 'year', 'she', 'will', 'have', 'lived', 'there', 'for', 'fifty', 'years.'],
          solution: 'By next year she will have lived there for fifty years.',
          why: 'A milestone seen from a future vantage point. With the state verb <em>live</em>, the simple carries the duration by itself.' },

        { id: 's7l2-06', type: 'sort', tag: 'future-perfect', level: 'C1',
          stem: 'Which form does each one need?',
          bins: [
            { key: 'fp', label: 'will have + participle', hint: 'counted, completed' },
            { key: 'fpp', label: 'will have been + -ing', hint: 'measured stretch' }
          ],
          items: [
            { text: 'crossed four borders', bin: 'fp' },
            { text: 'spent all our cash', bin: 'fp' },
            { text: 'lost two umbrellas', bin: 'fp' },
            { text: 'been on the road for a month', bin: 'fpp' },
            { text: 'been queuing since dawn', bin: 'fpp' },
            { text: 'been driving for nine hours', bin: 'fpp' }
          ],
          why: 'Four borders, all our cash, two umbrellas — countable outcomes. A month, since dawn, nine hours — measured stretches.' },

        { id: 's7l2-07', type: 'judge', tag: 'future-perfect', level: 'C1',
          given: 'We will have been to Japan three times by next spring.',
          stem: 'Does this say the third visit has already happened?',
          answer: 1,
          why: 'No. The vantage point is next spring; from there, three visits will be complete. Right now some of them are still ahead. Reading the tense means standing where it puts you.' }
      ]
    },

    {
      id: 's7l3', name: 'be to, be about to, be due to', cefr: 'C1',
      theory: {
        key: 'Beyond the four common futures sits a ladder of semi-modals, each with its own register.',
        body: [
          'These are the forms that separate a B2 writer from a C1 one, because they carry information that the ordinary futures cannot.',
          '<strong>be to</strong> — official arrangement, and the voice of news and instructions. <em>The Prime Minister <strong>is to</strong> visit Phuket in October.</em> <em>Passengers <strong>are to</strong> remain seated.</em> It is formal, slightly impersonal, and it implies authority behind the plan. In headlines the verb is often dropped altogether: <em>PM to visit Phuket</em>.',
          'It has a second, darker use in the past, which Leg 8 develops: <em>He was to miss the last train</em> — the voice of hindsight.',
          '<strong>be about to</strong> — the very next moment. <em>The doors <strong>are about to</strong> close.</em> <em>We were about to give up when the bus came.</em> That past form is particularly useful: it names the thing that nearly happened.',
          '<strong>be on the point of + -ing</strong> — the same meaning, one register higher and rather literary: <em>We were on the point of leaving.</em>',
          '<strong>be due to</strong> — the schedule says so, and this is the honest one. <em>The flight <strong>is due to</strong> land at nine.</em> It reports what is scheduled without promising it will happen — which is precisely why it is the language of every departure board and every apology in an airport. When the airline says <em>due to land</em>, it has quietly told you it may not.',
          '<strong>be set to</strong> — near-certain and slightly journalistic: <em>Tourist numbers <strong>are set to</strong> pass ten million.</em> Do not confuse it with <em>likely to</em>, which is a genuine hedge. <em>Set to</em> is confident; <em>likely to</em> is not.'
        ],
        simple: [
          '<em>be to</em> = official plan or instruction: <em>The minister <strong>is to</strong> visit.</em> (formal, news)',
          '<em>be about to</em> = in the next moment: <em>The doors <strong>are about to</strong> close.</em>',
          '<em>be due to</em> = the schedule says so, but it might not happen: <em>due to land at nine</em>.',
          '<em>be set to</em> = almost certain: <em>numbers <strong>are set to</strong> rise</em>.',
          '<em>be likely to</em> = probably, but not certain.'
        ],
        examples: [
          { s: 'The ferry <strong>is due to</strong> leave at six.', g: 'SCHEDULED — AND POSSIBLY NOT' },
          { s: 'Passengers <strong>are to</strong> remain in their seats.', g: 'OFFICIAL INSTRUCTION' },
          { s: 'We <strong>were about to</strong> leave when the taxi finally came.', g: 'THE THING THAT NEARLY HAPPENED' }
        ]
      },
      items: [
        { id: 's7l3-01', type: 'choose', tag: 'be-to-about', level: 'C1',
          stem: 'The departure board says the 18:40 is "due to depart 19:25". What is the airline telling you?',
          options: [
            'It will definitely depart at 19:25.',
            'That is the scheduled time, and they are not promising it.',
            'It departed at 19:25.',
            'It is departing at this moment.'
          ],
          answer: 1,
          why: '<em>Due to</em> reports a schedule without guaranteeing it. That gap is exactly why airports use it and why <em>will depart</em> never appears on a board.' },

        { id: 's7l3-02', type: 'gap', tag: 'be-to-about', level: 'C1',
          lines: [
            { who: 'Newsreader', text: 'In travel news: the Transport Minister ___ open the new terminal next Tuesday.' },
            { who: 'Reporter', text: 'Yes, and flights begin the following week.' }
          ],
          options: ['is about to', 'is due', 'is to', 'will be'],
          answer: 2,
          why: '<em>Be to</em> is the register of news and official arrangement. In a headline it would be compressed further: <em>Minister to open new terminal</em>.' },

        { id: 's7l3-03', type: 'sort', tag: 'be-to-about', level: 'C1',
          stem: 'Which semi-modal does each situation call for?',
          bins: [
            { key: 'beto', label: 'be to', hint: 'official, formal' },
            { key: 'about', label: 'be about to', hint: 'the next moment' },
            { key: 'due', label: 'be due to', hint: 'scheduled, not promised' }
          ],
          items: [
            { text: 'a government announcement', bin: 'beto' },
            { text: 'a written instruction to passengers', bin: 'beto' },
            { text: 'the doors closing as you run', bin: 'about' },
            { text: 'the engines starting up now', bin: 'about' },
            { text: 'an arrival time on a board', bin: 'due' },
            { text: 'a train the timetable promises at 9:04', bin: 'due' }
          ],
          why: 'Three registers, three jobs. Choosing between them is one of the clearest signals of a C1 writer.' },

        { id: 's7l3-04', type: 'spot', tag: 'be-to-about', level: 'C1',
          stem: 'Click the phrase that overstates the case.',
          words: ['Heavy', 'rain', 'is', 'set', 'to', 'affect', 'the', 'islands,', 'forecasters', 'suggest.'],
          answer: 3, fix: 'likely to',
          why: '<em>Set to</em> is near-certain, but <em>forecasters suggest</em> is a hedge. The two halves of the sentence disagree about how confident the writer is.' },

        { id: 's7l3-05', type: 'equiv', tag: 'be-to-about', level: 'C1',
          given: 'We were about to cancel the whole trip.',
          stem: 'What does this tell you?',
          options: [
            'They cancelled the trip.',
            'They came very close to cancelling, but something changed.',
            'They will cancel the trip.',
            'They wanted to cancel but were not allowed.'
          ],
          answer: 1,
          why: '<em>Was/were about to</em> names the thing that very nearly happened and then did not. It is one of the most useful narrative structures in English.' },

        { id: 's7l3-06', type: 'build', tag: 'be-to-about', level: 'C1',
          stem: 'Write the announcement telling passengers the gate is closing in a moment.',
          tiles: ['The', 'gate', 'is', 'about', 'to', 'close', 'for', 'flight', 'TG', '104.'],
          solution: 'The gate is about to close for flight TG 104.',
          why: '<em>About to</em> is the form for imminence. <em>Will close</em> would give no sense of urgency, which is the only reason the announcement exists.' }
      ]
    }
  ]
});

/* ===== LEG 8 — THE TRAVELLER'S TOOLKIT ===============================
   C1. The idea that unifies the whole system, the future in the past,
   and tense management across a whole piece of writing.
   ====================================================================== */
STAGES.push({
  id: 's8', podcast: 'audio/leg-8.mp3', slides: '', video: '', art: 'arrivals', n: 8,
  name: 'The Traveller\'s Toolkit', cefr: 'C1', gate: 'Leg 8',
  blurb: 'Why English uses the past tense for things that are not past at all — and how a C1 writer manages tense across a whole text.',
  lessons: [

    {
      id: 's8l1', name: 'The past tense is about distance', cefr: 'C1',
      theory: {
        key: 'The past form marks remoteness. Remoteness in time is only one of the three kinds.',
        body: [
          'This is the idea that ties the whole course together, and it is rarely taught explicitly even to advanced students.',
          'The English past form does not really mean "earlier". It means <strong>remote from present reality</strong>. There are three kinds of remoteness, and the grammar treats them identically.',
          '<strong>Remote in time</strong> — the ordinary case: <em>We went to Krabi last year.</em>',
          '<strong>Remote from fact</strong> — unreality. <em>If I <strong>had</strong> more time, I would stay another week.</em> <em>I wish I <strong>knew</strong> the way.</em> <em>Suppose we <strong>flew</strong> instead.</em> <em>It is time we <strong>left</strong>.</em> <em>I would rather you <strong>came</strong> on Friday.</em> Every one of those is past in form and present or future in meaning. The past form is signalling "this is not the real world".',
          '<strong>Remote from the listener</strong> — politeness. <em>I <strong>wondered</strong> if you could change our room.</em> <em>I was <strong>hoping</strong> to check in early.</em> <em>Did you <strong>want</strong> the window seat?</em> Nobody is reporting past wondering or past hoping. The speaker is stepping back to make the request easier to refuse — and in English, stepping back is done with a past form.',
          'Once you see this, a whole set of unrelated-looking structures becomes one structure. And it explains something learners find baffling: why <em>if I was</em> and <em>if I were</em> both exist. <em>Were</em> is the last surviving fragment of an old subjunctive, kept alive precisely because unreality is such a common job for the past form to do.',
          'Notice too that the further back you go, the more remote the meaning. <em>If I had more time</em> is unlikely; <em>if I had had more time</em> is impossible, because it is over. Two past markers, two steps away from reality.'
        ],
        simple: [
          'The past form means <strong>distant</strong> — not always distant in time.',
          'Distant in <strong>time</strong>: <em>We went last year.</em>',
          'Distant from <strong>reality</strong>: <em>If I <strong>had</strong> more money…</em> <em>I wish I <strong>knew</strong>.</em> <em>It is time we <strong>left</strong>.</em>',
          'Distant from the <strong>listener</strong> (polite): <em>I <strong>wondered</strong> if you could help.</em>',
          'Two past markers = even more impossible: <em>If I <strong>had had</strong> more time…</em>'
        ],
        examples: [
          { s: 'I wish we <strong>had</strong> another week here.', g: 'PAST FORM, PRESENT MEANING — UNREAL' },
          { s: 'I <strong>was wondering</strong> if you had a quieter room.', g: 'PAST FORM, PRESENT REQUEST — POLITE' },
          { s: 'It is time we <strong>booked</strong> the flights.', g: 'PAST FORM, FUTURE MEANING — MILD REPROACH' }
        ]
      },
      items: [
        { id: 's8l1-01', type: 'sort', tag: 'past-as-distance', level: 'C1',
          stem: 'Every sentence uses a past form. What kind of distance is it marking?',
          bins: [
            { key: 't', label: 'Distant in time', hint: 'it really happened' },
            { key: 'u', label: 'Distant from reality', hint: 'unreal or wished for' },
            { key: 'p', label: 'Distant from the listener', hint: 'politeness' }
          ],
          items: [
            { text: 'We flew to Hanoi in March.', bin: 't' },
            { text: 'The hotel closed for repairs last year.', bin: 't' },
            { text: 'I wish we had more time here.', bin: 'u' },
            { text: 'If I spoke Japanese, this would be easier.', bin: 'u' },
            { text: 'I wondered if you could move our booking.', bin: 'p' },
            { text: 'I was hoping for a room with a view.', bin: 'p' }
          ],
          why: 'One form, three jobs. Seeing that they are the same form doing the same thing — standing back — is what makes the whole system coherent.' },

        { id: 's8l1-02', type: 'equiv', tag: 'past-as-distance', level: 'C1',
          given: 'I was wondering whether you had anything on a higher floor.',
          stem: 'When is the speaker wondering?',
          options: [
            'Earlier today, before they arrived.',
            'Right now — the past form is doing politeness, not time.',
            'They wondered yesterday and have stopped.',
            'They will wonder later.'
          ],
          answer: 1,
          why: 'Both the past tense and the progressive are stepping back. Each layer of distance adds politeness, which is why this is about the most tactful way to ask for anything in English.' },

        { id: 's8l1-03', type: 'choose', tag: 'past-as-distance', level: 'C1',
          stem: 'Which sentence means the speaker thinks it is already too late?',
          options: [
            'If we had more time, we would visit Hue.',
            'If we had had more time, we would have visited Hue.',
            'If we have more time, we will visit Hue.',
            'If we had time, we visit Hue.'
          ],
          answer: 1,
          why: 'Two past markers, two steps from reality. One step is unlikely; two steps is impossible, because the trip is over.' },

        { id: 's8l1-04', type: 'spot', tag: 'past-as-distance', level: 'C1',
          stem: 'Click the word that should be a past form.',
          words: ['It', 'is', 'time', 'we', 'book', 'the', 'flights', 'for', 'April.'],
          answer: 4, fix: 'booked',
          why: '<em>It is time</em> takes a past form for something that has not happened yet. The pastness marks the gap between what is and what should be — and that gap is heard as mild reproach.' },

        { id: 's8l1-05', type: 'gap', tag: 'past-as-distance', level: 'C1',
          lines: [
            { who: 'Guest', text: 'Could we move the booking?' },
            { who: 'Manager', text: 'Of course. I would rather you ___ on the Friday, if that suits — Saturday is full.' }
          ],
          options: ['come', 'will come', 'came', 'are coming'],
          answer: 2,
          why: '<em>Would rather</em> plus a subject takes a past form for a present or future preference. Same mechanism as <em>it is time</em> and <em>I wish</em>.' },

        { id: 's8l1-06', type: 'build', tag: 'past-as-distance', level: 'C1',
          stem: 'You are at the desk. Ask, as tactfully as you can, whether an early check-in is possible.',
          tiles: ['I', 'was', 'wondering', 'if', 'it', 'might', 'be', 'possible', 'to', 'check', 'in', 'early.'],
          solution: 'I was wondering if it might be possible to check in early.',
          why: 'Three layers of distance stacked up: past tense, progressive aspect and a remote modal. Each one makes the request easier to refuse, which is what English politeness is built on.' },

        { id: 's8l1-07', type: 'judge', tag: 'past-as-distance', level: 'C1',
          given: 'If I were you, I would book the earlier flight.',
          stem: 'Is <em>were</em> an error for <em>was</em> here?',
          answer: 1,
          why: 'No — it is the surviving fragment of the old subjunctive, kept alive in exactly this job: marking something as unreal. <em>If I was you</em> is common in speech, but <em>were</em> is what examiners expect.' }
      ]
    },

    {
      id: 's8l2', name: 'The future in the past', cefr: 'C1',
      theory: {
        key: 'Move your whole viewpoint back, and every future form moves back with it.',
        body: [
          'Reporting inside a past frame pushes everything one step back. <em>Will</em> becomes <em>would</em>. <em>Am going to</em> becomes <em>was going to</em>. <em>Is arriving</em> becomes <em>was arriving</em>. <em>Have booked</em> becomes <em>had booked</em>.',
          'Backshift is a <strong>default, not a law</strong>. If what was said is still true, you may leave the tense alone: <em>She said the ferry <strong>leaves</strong> at seven</em> is perfectly good if it still does. Shifting it to <em>left</em> would quietly suggest the timetable may have changed.',
          'Now the part that separates C1 from B2 — the three futures in the past, which students understand when they read them and almost never produce.',
          '<strong>would</strong> — the prediction as it stood then. <em>We knew the coast road <strong>would</strong> be slow.</em>',
          '<strong>was going to</strong> — an intention held then, and it comes with a strong smell of failure. <em>We <strong>were going to</strong> take the sleeper…</em> and every English reader is already waiting for the word <em>but</em>. If the plan actually happened you would usually just say what happened.',
          '<strong>was to</strong> — destiny, the voice of hindsight, and one of the most powerful sentences in English narrative. <em>He waved from the platform. It <strong>was to</strong> be the last time we saw him.</em> The writer is standing in the present, looking back at a past that did not yet know what was coming. There is no other structure that does this.',
          'And <em>was to have</em> marks a plan that failed: <em>We <strong>were to have flown</strong> on the Tuesday, but the airline collapsed.</em>'
        ],
        simple: [
          'Reporting in the past shifts everything back: <em>will → would</em>, <em>am going to → was going to</em>.',
          'If it is still true, you can leave it: <em>She said the ferry <strong>leaves</strong> at seven.</em>',
          '<em>would</em> = what we predicted then: <em>We knew it <strong>would</strong> rain.</em>',
          '<em>was going to</em> = we intended to, and usually did not: <em>We <strong>were going to</strong> fly, but…</em>',
          '<em>was to</em> = looking back at fate: <em>It <strong>was to</strong> be our last trip together.</em>'
        ],
        examples: [
          { s: 'We <strong>were going to</strong> hire a car, but nothing was available.', g: 'INTENTION THAT CAME TO NOTHING' },
          { s: 'Nobody knew the storm <strong>would</strong> last three days.', g: 'THE PREDICTION AS IT STOOD THEN' },
          { s: 'That August <strong>was to be</strong> the last time we all travelled together.', g: 'HINDSIGHT — THE WRITER KNOWS, THEY DID NOT' }
        ]
      },
      items: [
        { id: 's8l2-01', type: 'judge', tag: 'backshift', level: 'C1',
          given: 'We were going to spend a fortnight in Hokkaido.',
          stem: 'Did they spend a fortnight in Hokkaido?',
          answer: 1,
          why: 'Almost certainly not. <em>Was/were going to</em> reports an intention from a past standpoint and strongly implies it failed. If it had happened, a speaker would simply say <em>we spent a fortnight there</em>.' },

        { id: 's8l2-02', type: 'choose', tag: 'backshift', level: 'C1',
          stem: 'Which sentence uses the hindsight form — the writer knowing something the people in the story did not?',
          options: [
            'We were going to take the night train.',
            'That evening was to be the last time the old ferry ran.',
            'We knew the ferry would be crowded.',
            'The ferry was running late that evening.'
          ],
          answer: 1,
          why: '<em>Was to be</em> looks back from a present that knows how things turned out. It is the grammar of "little did we know", and it is almost purely literary.' },

        { id: 's8l2-03', type: 'gap', tag: 'backshift', level: 'C1',
          lines: [
            { who: 'Reporter', text: 'What did the airline tell passengers?' },
            { who: 'Passenger', text: 'They said the flight ___ leave within the hour. That was at nine. We left at four.' }
          ],
          options: ['will', 'would', 'is going to', 'was going'],
          answer: 1,
          why: 'Reporting inside a past frame: <em>will</em> shifts to <em>would</em>. And since the statement turned out to be false, keeping the present <em>will</em> would be odd.' },

        { id: 's8l2-04', type: 'sort', tag: 'backshift', level: 'C1',
          stem: 'Which future-in-the-past is each one?',
          bins: [
            { key: 'pred', label: 'would', hint: 'the prediction, as it stood then' },
            { key: 'int', label: 'was going to', hint: 'an intention that usually failed' },
            { key: 'fate', label: 'was to', hint: 'hindsight, destiny' }
          ],
          items: [
            { text: 'We were sure the pass would be closed.', bin: 'pred' },
            { text: 'Everyone said the rains would come early.', bin: 'pred' },
            { text: 'We were going to camp, but the ground was soaked.', bin: 'int' },
            { text: 'I was going to call you from the airport.', bin: 'int' },
            { text: 'It was to be her last summer in the village.', bin: 'fate' },
            { text: 'That photograph was to become the only one we kept.', bin: 'fate' }
          ],
          why: 'Three quite different attitudes to a past future: what we expected, what we meant to do, and what turned out to be waiting.' },

        { id: 's8l2-05', type: 'equiv', tag: 'backshift', level: 'C1',
          given: 'She said the last bus leaves at eleven.',
          stem: 'Why has the speaker not backshifted to <em>left</em>?',
          options: [
            'Because backshift is ungrammatical here.',
            'Because the timetable is still true now, so the present form is honest.',
            'Because <em>leave</em> is irregular.',
            'Because the speaker is quoting word for word.'
          ],
          answer: 1,
          why: 'Backshift is optional when the reported fact still holds. Shifting it anyway would hint that it may no longer be true — a small piece of meaning most learners never notice they are creating.' },

        { id: 's8l2-06', type: 'build', tag: 'backshift', level: 'C1',
          stem: 'You meant to take the sleeper train, but the tickets had sold out. Say it in one sentence.',
          tiles: ['We', 'were', 'going', 'to', 'take', 'the', 'sleeper,', 'but', 'it', 'had', 'sold', 'out.'],
          solution: 'We were going to take the sleeper, but it had sold out.',
          why: 'A failed intention, and the past perfect for the step backwards — the selling out happened before the plan collapsed. Two things from two different legs in one sentence.' },

        { id: 's8l2-07', type: 'spot', tag: 'backshift', level: 'C1',
          stem: 'Click the word that breaks the past viewpoint.',
          words: ['We', 'had', 'no', 'idea', 'the', 'road', 'will', 'be', 'closed', 'for', 'three', 'days.'],
          answer: 6, fix: 'would',
          why: 'The main clause is past, so the prediction inside it has to shift back. <em>Will</em> drags the sentence into the present and the two halves no longer agree.' }
      ]
    },

    {
      id: 's8l3', name: 'Managing tense across a whole text', cefr: 'C1',
      theory: {
        key: 'At C1 the skill is no longer choosing a tense. It is keeping a hundred of them consistent.',
        body: [
          'Three things separate a C1 text from a B2 one, and none of them is a new tense.',
          '<strong>1. A stable narrative spine.</strong> Pick your main past tense and stay on it. Use the past perfect only for genuine steps backwards, and the past progressive only where you are really building scenery. A common B2 fault is drifting between past simple and present perfect from paragraph to paragraph.',
          '<strong>2. Graded prediction instead of bare <em>will</em>.</strong> Professional and academic English almost never predicts with a bare <em>will</em>. It grades its confidence: <em>is set to</em> (near-certain) → <em>is expected to</em> → <em>is likely to</em> → <em>may well</em> → <em>could conceivably</em>. Note that <em>set to</em> and <em>likely to</em> are not synonyms, though students use them as if they were.',
          '<strong>3. Using state verbs deliberately.</strong> States normally refuse the progressive, but forcing one does not break the sentence — it <strong>changes the meaning</strong>, and a C1 writer does this on purpose.',
          '<em>I see</em> = I understand; <em>I am seeing someone</em> = I am in a relationship. <em>I think it is fine</em> = my opinion; <em>I am thinking about it</em> = mental activity in progress. <em>She is difficult</em> = permanently; <em>she is being difficult</em> = today, deliberately. <em>I am loving this hotel</em> is not an error either: the progressive coerces a temporary, involved reading, which is exactly why advertising uses it.',
          'And in writing about sources, tense separates two different things. The <strong>present</strong> for what a text says now: <em>the report argues that tourism has peaked</em>. The <strong>past</strong> for what researchers actually did: <em>they surveyed four hundred travellers in 2023</em>. Mixing them is one of the most visible weaknesses in an academic paragraph.'
        ],
        simple: [
          'Keep one main past tense through a story. Do not drift.',
          'Do not predict with bare <em>will</em> in formal writing. Grade it: <em>is set to</em> (very likely) → <em>is expected to</em> → <em>is likely to</em> → <em>may well</em>.',
          'Forcing <em>-ing</em> on a state verb changes the meaning: <em>she <strong>is being</strong> difficult</em> = today, on purpose.',
          'Writing about sources: present for what a text says, past for what researchers did.'
        ],
        examples: [
          { s: 'Visitor numbers <strong>are expected to</strong> exceed ten million.', g: 'GRADED PREDICTION — NOT BARE "WILL"' },
          { s: 'He <strong>is being</strong> unusually patient about the delay.', g: 'FORCED PROGRESSIVE = TEMPORARY BEHAVIOUR' },
          { s: 'The study <strong>surveyed</strong> 400 travellers and <strong>concludes</strong> that…', g: 'PAST FOR THE METHOD, PRESENT FOR THE ARGUMENT' }
        ]
      },
      items: [
        { id: 's8l3-01', type: 'equiv', tag: 'stative', level: 'C1',
          given: 'She is being very difficult about the seating.',
          stem: 'What does the progressive add?',
          options: [
            'That she is a difficult person by nature.',
            'That this is how she is behaving right now, and possibly on purpose.',
            'That she was difficult in the past.',
            'That she will be difficult later.'
          ],
          answer: 1,
          why: 'Forcing a state verb into the progressive produces a temporary, behavioural reading. <em>She is difficult</em> would be a character judgement; <em>she is being difficult</em> is about today.' },

        { id: 's8l3-02', type: 'sort', tag: 'register-hedge', level: 'C1',
          stem: 'How confident is each prediction?',
          bins: [
            { key: 'hi', label: 'Near-certain', hint: 'the writer is committed' },
            { key: 'mid', label: 'Probable', hint: 'a real hedge' },
            { key: 'lo', label: 'Speculative', hint: 'barely committed' }
          ],
          items: [
            { text: 'is set to overtake', bin: 'hi' },
            { text: 'will almost certainly rise', bin: 'hi' },
            { text: 'is likely to increase', bin: 'mid' },
            { text: 'is expected to recover', bin: 'mid' },
            { text: 'could conceivably double', bin: 'lo' },
            { text: 'might, in principle, fall', bin: 'lo' }
          ],
          why: 'Students routinely treat <em>set to</em> and <em>likely to</em> as synonyms. They are two rungs apart, and an examiner reading a Task 2 essay notices.' },

        { id: 's8l3-03', type: 'spot', tag: 'register-hedge', level: 'C1',
          stem: 'Click the word that is too blunt for an academic paragraph.',
          words: ['Tourist', 'numbers', 'will', 'recover', 'fully', 'within', 'two', 'years.'],
          answer: 2, fix: 'are expected to',
          why: 'A bare <em>will</em> claims certainty the writer cannot have. Formal English grades its predictions, and an ungraded one reads as naive rather than confident.' },

        { id: 's8l3-04', type: 'choose', tag: 'register-hedge', level: 'C1',
          stem: 'Which sentence handles the tenses of a source correctly?',
          options: [
            'The report surveyed 400 travellers and argued that costs had risen.',
            'The report surveyed 400 travellers and argues that costs have risen.',
            'The report surveys 400 travellers and argues that costs have risen.',
            'The report has surveyed 400 travellers and will argue that costs rise.'
          ],
          answer: 1,
          why: 'Past for what the researchers did, present for what the text says now. The report is still arguing every time someone opens it.' },

        { id: 's8l3-05', type: 'equiv', tag: 'stative', level: 'C1',
          given: 'I am seeing the tour operator on Thursday.',
          stem: 'What does <em>see</em> mean here?',
          options: ['Perceive with the eyes.', 'Understand.', 'Meet by appointment.', 'Believe.'],
          answer: 2,
          why: 'In the progressive, <em>see</em> shifts from a state of perception to an activity: meeting. The progressive is not just allowed here — it is what creates the meaning.' },

        { id: 's8l3-06', type: 'spot', tag: 'register-hedge', level: 'C1',
          stem: 'This paragraph is in the past simple. Click the verb that breaks the spine.',
          words: ['We', 'landed', 'at', 'dawn,', 'found', 'the', 'guest', 'house,', 'and', 'have', 'slept', 'until', 'noon.'],
          answer: 9, fix: 'slept',
          why: 'A present perfect inside a past-simple narrative drags the reader back to now for no reason. Pick a spine and hold it.' },

        { id: 's8l3-07', type: 'build', tag: 'register-hedge', level: 'C1',
          stem: 'Write a hedged prediction for an essay: visitor numbers, ten million, next year, probable but not certain.',
          tiles: ['Visitor', 'numbers', 'are', 'likely', 'to', 'exceed', 'ten', 'million', 'next', 'year.'],
          solution: 'Visitor numbers are likely to exceed ten million next year.',
          why: 'A real hedge. <em>Are set to</em> would claim near-certainty, and a bare <em>will</em> would claim more than any writer can know.' }
      ]
    }
  ]
});

/* ===== CHECKPOINTS =====================================================
   8 items each. Items mix every lesson in the leg, and from Leg 3 on they
   interleave one or two items from earlier legs — interleaving is what
   makes a review test diagnostic rather than decorative.
   ======================================================================= */
const CHALLENGES = {

  s1: { id: 's1ch', name: 'Checkpoint 1', items: [
    { id: 's1ch-1', type: 'choose', tag: 'two-tenses', level: 'B1',
      stem: 'How many tenses does the English verb actually mark?',
      options: ['Twelve', 'Three: past, present and future', 'Two: past and non-past', 'One'],
      answer: 2, why: 'Only past and non-past are marked on the verb. Everything else is built with auxiliaries.' },
    { id: 's1ch-2', type: 'spot', tag: 'present-simple-event', level: 'A2',
      stem: 'Click the wrong word.',
      words: ['Be', 'quiet', '—', 'the', 'guide', 'speaks', 'at', 'the', 'moment.'],
      answer: 5, fix: 'is speaking',
      why: '<em>At the moment</em> forces the progressive. A present simple with an action verb can only mean a habit.' },
    { id: 's1ch-3', type: 'gap', tag: 'progressive-core', level: 'B1',
      lines: [{ who: 'Nan', text: 'Where are you living now?' }, { who: 'Ohm', text: 'I ___ with my cousin while I look for a flat.' }],
      options: ['stay', 'am staying', 'have stayed', 'will stay'], answer: 1,
      why: 'Temporary rather than permanent. That reading comes straight from "unfinished, seen from inside".' },
    { id: 's1ch-4', type: 'equiv', tag: 'present-simple-event', level: 'B1',
      given: 'The last ferry leaves at 18:30.',
      stem: 'Which is true?',
      options: ['A timetable says so.', 'The speaker has just decided this.', 'The ferry is leaving now.', 'The ferry left at 18:30.'],
      answer: 0, why: 'A present simple with a transport subject reports a published schedule — a present fact about the world.' },
    { id: 's1ch-5', type: 'sort', tag: 'progressive-core', level: 'B1',
      stem: 'Which verbs take <em>-ing</em> comfortably?',
      bins: [
        { key: 'yes', label: 'Takes -ing', hint: 'an activity' },
        { key: 'no', label: 'Resists -ing', hint: 'a state' }
      ],
      items: [
        { text: 'pack', bin: 'yes' }, { text: 'wait', bin: 'yes' }, { text: 'complain', bin: 'yes' },
        { text: 'own', bin: 'no' }, { text: 'seem', bin: 'no' }, { text: 'prefer', bin: 'no' }
      ],
      why: 'Activities have an inside to stand in. States simply hold, so there is nothing to be in the middle of.' },
    { id: 's1ch-6', type: 'spot', tag: 'two-tenses', level: 'B1',
      stem: 'Click the word that carries the tense in this phrase.',
      words: ['They', 'have', 'been', 'waiting', 'since', 'six.'],
      answer: 1, fix: 'have — the first auxiliary always carries it',
      why: 'The first auxiliary is the only word marked for past or non-past. Everything after it is fixed in form.' },
    { id: 's1ch-7', type: 'choose', tag: 'progressive-core', level: 'B1+',
      stem: 'What does "He is always losing his boarding pass" tell you about the speaker?',
      options: ['That she is impressed.', 'That she is irritated.', 'That it happened once.', 'That it is happening now.'],
      answer: 1, why: '<em>Always</em> plus a progressive frames a habit as an endless nuisance, and that framing is heard as a complaint.' },
    { id: 's1ch-8', type: 'build', tag: 'present-simple-event', level: 'B1',
      stem: 'Tell a friend what your family does every April.',
      tiles: ['We', 'go', 'to', 'the', 'same', 'beach', 'every', 'April.'],
      solution: 'We go to the same beach every April.',
      why: 'A repeated whole event — the present simple\'s core job with action verbs.' }
  ]},

  s2: { id: 's2ch', name: 'Checkpoint 2', items: [
    { id: 's2ch-1', type: 'spot', tag: 'past-simple-definite', level: 'A2',
      stem: 'Click the wrong word.',
      words: ['Did', 'you', 'saw', 'the', 'temple', 'at', 'sunrise?'],
      answer: 2, fix: 'see', why: '<em>Did</em> carries the past, so the main verb returns to its base form.' },
    { id: 's2ch-2', type: 'gap', tag: 'past-prog-frame', level: 'B1',
      lines: [{ who: 'Pim', text: 'How did you miss the announcement?' }, { who: 'Kan', text: 'We ___ in the shop when they called the gate.' }],
      options: ['were', 'was', 'have been', 'are'], answer: 0,
      why: 'The background was already running when the short event landed in it.' },
    { id: 's2ch-3', type: 'equiv', tag: 'narrative-order', level: 'B1+',
      given: 'When the rain started, we were walking back to the hotel.',
      stem: 'Which started first?',
      options: ['The walking.', 'The rain.', 'Both at once.', 'Impossible to say.'],
      answer: 0, why: 'The progressive marks the walking as already in progress. Switch it to <em>we walked</em> and the order reverses.' },
    { id: 's2ch-4', type: 'spot', tag: 'past-prog-frame', level: 'B1',
      stem: 'Click the verb that should be a background form.',
      words: ['I', 'read', 'my', 'book', 'when', 'the', 'turbulence', 'started.'],
      answer: 1, fix: 'was reading',
      why: 'As written, the reading begins after the turbulence — an odd thing to claim. The scene needs the progressive.' },
    { id: 's2ch-5', type: 'order', tag: 'past-simple-definite', level: 'B1',
      stem: 'Put the story in the order it happened.',
      items: [
        'We got to the airport three hours early.',
        'The check-in desk opened at eleven.',
        'Security took nearly an hour.',
        'We ate breakfast at the gate.'
      ],
      why: 'In a plain past-simple narrative the sentence order is the event order. That is the contract with the reader.' },
    { id: 's2ch-6', type: 'choose', tag: 'narrative-order', level: 'B1+',
      stem: 'Which conjunction describes two things changing together, step by step?',
      options: ['when', 'as', 'because', 'until'],
      answer: 1, why: '<em>As</em> is the conjunction of parallel change: <em>as the plane climbed, the city got smaller</em>.' },
    { id: 's2ch-7', type: 'sort', tag: 'past-prog-frame', level: 'B1',
      stem: 'Background or event?',
      bins: [
        { key: 'bg', label: 'Background', hint: 'long, already running' },
        { key: 'ev', label: 'Event', hint: 'short, lands inside' }
      ],
      items: [
        { text: 'the coach was climbing the hill', bin: 'bg' },
        { text: 'we were waiting for our bags', bin: 'bg' },
        { text: 'it was getting dark', bin: 'bg' },
        { text: 'the driver stopped', bin: 'ev' },
        { text: 'my phone buzzed', bin: 'ev' },
        { text: 'she dropped her ticket', bin: 'ev' }
      ],
      why: 'Backgrounds have duration and blurred edges. Events are points. The aspect tells the reader which one you mean.' },
    { id: 's2ch-8', type: 'build', tag: 'past-prog-frame', level: 'B1',
      stem: 'You were queuing for tickets. That is when you noticed your wallet was gone.',
      tiles: ['I', 'was', 'queuing', 'for', 'tickets', 'when', 'I', 'noticed', 'my', 'wallet', 'was', 'gone.'],
      solution: 'I was queuing for tickets when I noticed my wallet was gone.',
      why: 'Long line, short arrow — the basic shape of every anecdote in English.' }
  ]},

  s3: { id: 's3ch', name: 'Checkpoint 3', items: [
    { id: 's3ch-1', type: 'spot', tag: 'perfect-adverbials', level: 'B1',
      stem: 'Click the words that cannot stay.',
      words: ['We', 'have', 'visited', 'Kyoto', 'in', '2019.'],
      answer: 4, fix: 'delete "in 2019", or use "we visited"',
      why: 'A closed date and a present perfect cannot share a sentence.' },
    { id: 's3ch-2', type: 'gap', tag: 'perfect-now', level: 'B1',
      lines: [{ who: 'Staff', text: 'Any update?' }, { who: 'Manager', text: 'Yes — the airline ___ the flight. Nobody is going anywhere tonight.' }],
      options: ['cancelled', 'has cancelled', 'was cancelling', 'had cancelled'], answer: 1,
      why: 'News about the present situation. The past simple would be the opening of a story instead.' },
    { id: 's3ch-3', type: 'choose', tag: 'since-for', level: 'B1+',
      stem: 'Your friend comes in filthy and exhausted. Which fits best?',
      options: ['You have climbed the mountain.', 'You have been climbing all day.', 'You climbed the mountain.', 'You climb the mountain.'],
      answer: 1, why: 'Visible evidence points at the activity, not at a finished achievement. That is what the progressive is for.' },
    { id: 's3ch-4', type: 'spot', tag: 'since-for', level: 'B1',
      stem: 'Click the wrong word.',
      words: ['We', 'have', 'been', 'here', 'since', 'five', 'days.'],
      answer: 4, fix: 'for', why: '<em>Since</em> needs a point in time; <em>five days</em> is a length, so it takes <em>for</em>.' },
    { id: 's3ch-5', type: 'sort', tag: 'perfect-adverbials', level: 'B1+',
      stem: 'Does the time frame still include this moment?',
      bins: [
        { key: 'open', label: 'Open → present perfect', hint: 'includes now' },
        { key: 'shut', label: 'Closed → past simple', hint: 'over' }
      ],
      items: [
        { text: 'so far', bin: 'open' }, { text: 'this month', bin: 'open' }, { text: 'never', bin: 'open' },
        { text: 'yesterday', bin: 'shut' }, { text: 'in 2019', bin: 'shut' }, { text: 'last Songkran', bin: 'shut' }
      ],
      why: 'It is not about how long ago. <em>Never</em> reaches across a lifetime and still includes this second.' },
    { id: 's3ch-6', type: 'equiv', tag: 'perfect-now', level: 'B1+',
      given: 'She has gone to Osaka.',
      stem: 'Where is she?',
      options: ['Back home.', 'In Osaka or on her way there.', 'Nobody knows.', 'She has never been.'],
      answer: 1, why: '<em>Has gone to</em> means she is still away. <em>Has been to</em> would mean she went and came back.' },
    { id: 's3ch-7', type: 'spot', tag: 'past-prog-frame', level: 'B1',
      stem: 'Click the verb that should be a background form.',
      words: ['We', 'swam', 'when', 'the', 'lifeguard', 'blew', 'his', 'whistle.'],
      answer: 1, fix: 'were swimming',
      why: 'Interleaved from Leg 2. The swimming was already running when the whistle went.' },
    { id: 's3ch-8', type: 'build', tag: 'perfect-adverbials', level: 'B1',
      stem: 'Your plane touched down two minutes ago. Message home.',
      tiles: ['We', 'have', 'just', 'landed', 'in', 'Hanoi.'],
      solution: 'We have just landed in Hanoi.',
      why: '<em>Just</em> plus the present perfect is the standard international form for news a moment old.' }
  ]},

  s4: { id: 's4ch', name: 'Checkpoint 4', items: [
    { id: 's4ch-1', type: 'equiv', tag: 'past-perfect-order', level: 'B1+',
      given: 'When we got to the restaurant, they had given our table away.',
      stem: 'Which happened first?',
      options: ['We arrived.', 'They gave the table away.', 'Both at once.', 'Impossible to say.'],
      answer: 1, why: '<em>Had</em> marks the step backwards: the table went before we walked in.' },
    { id: 's4ch-2', type: 'spot', tag: 'past-perfect-order', level: 'B2',
      stem: 'Click the past perfect that is doing no work.',
      words: ['We', 'checked', 'in,', 'and', 'then', 'we', 'had', 'gone', 'straight', 'to', 'bed.'],
      answer: 6, fix: 'delete "had"',
      why: '<em>And then</em> already says the story is moving forwards. There is no step backwards to mark.' },
    { id: 's4ch-3', type: 'gap', tag: 'past-perfect-prog', level: 'B2',
      lines: [{ who: 'Bee', text: 'Why was everyone asleep by eight?' }, { who: 'Ton', text: 'We ___ since five that morning.' }],
      options: ['travelled', 'had travelled', 'had been travelling', 'were travelling'], answer: 2,
      why: 'A measured stretch running up to a past point, offered as the explanation for it.' },
    { id: 's4ch-4', type: 'spot', tag: 'used-to-would', level: 'B2',
      stem: 'Click the wrong word.',
      words: ['We', 'would', 'own', 'a', 'little', 'boat', 'when', 'I', 'was', 'young.'],
      answer: 1, fix: 'used to', why: '<em>Own</em> is a state, and <em>would</em> only takes repeated actions.' },
    { id: 's4ch-5', type: 'choose', tag: 'used-to-would', level: 'B2',
      stem: 'Which paragraph opening works?',
      options: [
        'We would spend every August in Rayong. My mother would pack the car at dawn.',
        'We used to spend every August in Rayong. My mother would pack the car at dawn.',
        'We are used to spend every August in Rayong.',
        'We would be spending every August in Rayong.'
      ],
      answer: 1, why: '<em>Would</em> cannot set up its own past frame — something has to establish it first.' },
    { id: 's4ch-6', type: 'sort', tag: 'past-perfect-prog', level: 'B2',
      stem: 'Simple or progressive after <em>had</em>?',
      bins: [
        { key: 'simp', label: 'had + participle', hint: 'countable' },
        { key: 'prog', label: 'had been + -ing', hint: 'measured' }
      ],
      items: [
        { text: 'seen nine temples', bin: 'simp' }, { text: 'missed two connections', bin: 'simp' }, { text: 'read the whole guide', bin: 'simp' },
        { text: 'sat on that bus for hours', bin: 'prog' }, { text: 'queued since dawn', bin: 'prog' }, { text: 'walked all morning', bin: 'prog' }
      ],
      why: 'Ask whether you could put a number on it. If yes, the simple; if you are measuring, the progressive.' },
    { id: 's4ch-7', type: 'judge', tag: 'backshift', level: 'B2+',
      given: 'We were going to drive up the coast.',
      stem: 'Did they drive up the coast?',
      answer: 1, why: 'Almost certainly not. <em>Was/were going to</em> reports an intention and strongly implies it failed.' },
    { id: 's4ch-8', type: 'build', tag: 'past-perfect-order', level: 'B2',
      stem: 'The beach was deserted because everyone had left. One sentence, flashback second.',
      tiles: ['The', 'beach', 'was', 'empty', '—', 'everyone', 'had', 'gone', 'home.'],
      solution: 'The beach was empty — everyone had gone home.',
      why: 'The scene first, then one step backwards to explain it. That is the past perfect\'s whole job.' }
  ]},

  s5: { id: 's5ch', name: 'Checkpoint 5', items: [
    { id: 's5ch-1', type: 'sort', tag: 'timetable-future', level: 'B2',
      stem: 'Where does the evidence for each future statement live?',
      bins: [
        { key: 'pub', label: 'Published schedule', hint: 'present simple' },
        { key: 'arr', label: 'Agreed arrangement', hint: 'present progressive' },
        { key: 'see', label: 'Visible evidence', hint: 'going to' }
      ],
      items: [
        { text: 'the ferry timetable', bin: 'pub' }, { text: 'the museum\'s opening hours', bin: 'pub' },
        { text: 'a dinner Nam agreed to', bin: 'arr' }, { text: 'a dentist\'s appointment', bin: 'arr' },
        { text: 'a completely black sky', bin: 'see' }, { text: 'a flat tyre', bin: 'see' }
      ],
      why: 'Identify the evidence first and the form chooses itself. This is the organising idea of the whole future system.' },
    { id: 's5ch-2', type: 'gap', tag: 'arrangement-future', level: 'B1+',
      lines: [{ who: 'Ice', text: 'Free on Saturday?' }, { who: 'Praew', text: 'Sorry — I ___ my cousin at the airport. Her flight lands at eight.' }],
      options: ['will meet', 'meet', 'am meeting', 'would meet'], answer: 2,
      why: 'Arranged, and another person knows about it. That is the condition the progressive reports.' },
    { id: 's5ch-3', type: 'spot', tag: 'timetable-future', level: 'B2',
      stem: 'Click the word that cannot take a timetable form.',
      words: ['The', 'train', 'leaves', 'at', 'six', 'and', 'my', 'uncle', 'collects', 'us', 'tomorrow.'],
      answer: 8, fix: 'is collecting',
      why: 'Railways publish timetables; uncles do not. A personal arrangement needs the progressive.' },
    { id: 's5ch-4', type: 'spot', tag: 'going-to', level: 'B2',
      stem: 'Click the word that is wrong when you are pointing at evidence.',
      words: ['Look', 'at', 'that', 'queue', '—', 'we', 'will', 'miss', 'the', 'boat.'],
      answer: 6, fix: 'are going to',
      why: '<em>Look at</em> announces visible proof, and you cannot offer a personal judgement while pointing at proof.' },
    { id: 's5ch-5', type: 'equiv', tag: 'going-to', level: 'B2',
      given: 'We are going to hire a scooter.',
      stem: 'When was this decided?',
      options: ['At this moment.', 'Before this conversation.', 'It has not been decided.', 'Someone else decided.'],
      answer: 1, why: '<em>Going to</em> reports an intention that already existed. <em>Will</em> would mark a decision made as you speak.' },
    { id: 's5ch-6', type: 'choose', tag: 'arrangement-future', level: 'B2',
      stem: 'Which question asks about existing plans?',
      options: ['What will you do at the weekend?', 'What are you doing at the weekend?', 'What do you do at the weekend?', 'What would you do at the weekend?'],
      answer: 1, why: 'The progressive asks what has already been arranged. The others ask for a prediction, a habit and a hypothesis.' },
    { id: 's5ch-7', type: 'judge', tag: 'going-to', level: 'B2+',
      given: 'We are going to fly, but we have not booked anything yet.',
      stem: 'Is this a contradiction?',
      answer: 1, why: 'No. <em>Going to</em> reports an intention; only the present progressive would claim an arrangement.' },
    { id: 's5ch-8', type: 'gap', tag: 'perfect-adverbials', level: 'B1',
      lines: [{ who: 'Nan', text: 'Have the bags arrived?' }, { who: 'Ton', text: 'Not ___. We have been standing here forty minutes.' }],
      options: ['already', 'still', 'yet', 'just'], answer: 2,
      why: 'Interleaved from Leg 3. <em>Yet</em> marks something expected but still missing, and lives in negatives and questions.' }
  ]},

  s6: { id: 's6ch', name: 'Checkpoint 6', items: [
    { id: 's6ch-1', type: 'spot', tag: 'time-clause', level: 'B2',
      stem: 'Click the wrong word.',
      words: ['When', 'we', 'will', 'arrive,', 'I', 'will', 'send', 'you', 'a', 'photo.'],
      answer: 2, fix: 'delete "will"',
      why: 'A time clause sets the reference point and takes a present form. Only the main clause gets <em>will</em>.' },
    { id: 's6ch-2', type: 'choose', tag: 'time-clause', level: 'B2',
      stem: 'Which sentence is correct?',
      options: [
        'I do not know when the coach will leave.',
        'When the coach will leave, we will board.',
        'I will tell you when will the coach leave.',
        'Until we will arrive, we cannot check in.'
      ],
      answer: 0, why: 'Here <em>when</em> means "what time" — a noun clause, so <em>will</em> belongs and the word order stays as a statement.' },
    { id: 's6ch-3', type: 'gap', tag: 'will-vs-going', level: 'B2',
      lines: [{ who: 'Clerk', text: 'I am afraid the kitchen has closed.' }, { who: 'Guest', text: 'Oh. Then we ___ something from the shop.' }],
      options: ['are going to get', 'will get', 'get', 'are getting'], answer: 1,
      why: 'A decision made in direct response to new information — the instant-decision <em>will</em>.' },
    { id: 's6ch-4', type: 'judge', tag: 'will-modal', level: 'B2',
      given: 'The phone is ringing — that will be the tour office.',
      stem: 'Is the speaker talking about the future?',
      answer: 1, why: 'No. <em>Will</em> is making a confident inference about right now, which is what modals do.' },
    { id: 's6ch-5', type: 'sort', tag: 'will-modal', level: 'B2',
      stem: 'What job is <em>will</em> doing?',
      bins: [
        { key: 'pred', label: 'Prediction', hint: 'my judgement' },
        { key: 'dec', label: 'Decision or offer', hint: 'made as I speak' },
        { key: 'ref', label: 'Refusal', hint: 'not co-operating' }
      ],
      items: [
        { text: 'You will love the old quarter.', bin: 'pred' }, { text: 'The queues will be shorter later.', bin: 'pred' },
        { text: 'Fine, I will pay the extra.', bin: 'dec' }, { text: 'I will take the heavy bag.', bin: 'dec' },
        { text: 'The safe will not open.', bin: 'ref' }, { text: 'My card will not work here.', bin: 'ref' }
      ],
      why: 'Only the first pair is about the future at all. That is the argument for treating <em>will</em> as a modal of judgement.' },
    { id: 's6ch-6', type: 'spot', tag: 'time-clause', level: 'B2',
      stem: 'Click the wrong word.',
      words: ['By', 'the', 'time', 'you', 'will', 'read', 'this,', 'we', 'will', 'be', 'home.'],
      answer: 4, fix: 'delete "will"',
      why: '<em>By the time</em> is a time conjunction like <em>when</em> or <em>until</em>. The anchor clause never takes <em>will</em>.' },
    { id: 's6ch-7', type: 'equiv', tag: 'will-vs-going', level: 'B2+',
      given: 'I am going to speak to the manager about this room.',
      stem: 'How does it differ from "I will speak to the manager"?',
      options: ['It is less certain.', 'It is further away.', 'The speaker had already resolved to do it.', 'It is more polite.'],
      answer: 2, why: 'And that is why it sounds more serious — a plan someone has been nursing is worse news than a decision taken on the spot.' },
    { id: 's6ch-8', type: 'build', tag: 'time-clause', level: 'B2',
      stem: 'Promise to message the moment you have cleared customs.',
      tiles: ['I', 'will', 'message', 'you', 'as', 'soon', 'as', 'we', 'have', 'cleared', 'customs.'],
      solution: 'I will message you as soon as we have cleared customs.',
      why: '<em>Will</em> in the main clause, a present perfect in the time clause to show the messaging waits for customs to finish.' }
  ]},

  s7: { id: 's7ch', name: 'Checkpoint 7', items: [
    { id: 's7ch-1', type: 'choose', tag: 'future-prog', level: 'B2+',
      stem: 'Which question does NOT imply that the speaker wants to borrow the car?',
      options: ['Will you use the car tonight?', 'Will you be using the car tonight?', 'Are you going to use the car tonight?', 'Do you need the car tonight?'],
      answer: 1, why: 'The progressive strips the volition out of <em>will</em>, leaving a neutral enquiry about what will be happening.' },
    { id: 's7ch-2', type: 'gap', tag: 'future-perfect', level: 'B2+',
      lines: [{ who: 'Ann', text: 'Twenty hours in the air sounds brutal.' }, { who: 'Sim', text: 'By the time we land, we ___ for nearly a full day.' }],
      options: ['will travel', 'will have travelled', 'will have been travelling', 'are travelling'], answer: 2,
      why: 'A measured stretch running up to a future vantage point.' },
    { id: 's7ch-3', type: 'spot', tag: 'future-prog', level: 'B2+',
      stem: 'Click the word that makes this too blunt for a hotel.',
      words: ['Will', 'you', 'leave', 'your', 'key', 'at', 'reception', 'tomorrow?'],
      answer: 2, fix: 'be leaving',
      why: 'As written it is a request. The progressive turns it into a question about the arrangement instead.' },
    { id: 's7ch-4', type: 'choose', tag: 'be-to-about', level: 'C1',
      stem: 'The board says the flight is "due to depart 19:25". What does that mean?',
      options: ['It will definitely go then.', 'That is the schedule, and nothing is promised.', 'It already left.', 'It is departing now.'],
      answer: 1, why: '<em>Due to</em> reports a schedule without guaranteeing it — which is exactly why departure boards use it.' },
    { id: 's7ch-5', type: 'sort', tag: 'be-to-about', level: 'C1',
      stem: 'Which semi-modal fits each situation?',
      bins: [
        { key: 'beto', label: 'be to', hint: 'official' },
        { key: 'about', label: 'be about to', hint: 'next moment' },
        { key: 'due', label: 'be due to', hint: 'scheduled' }
      ],
      items: [
        { text: 'a ministerial announcement', bin: 'beto' }, { text: 'a written instruction to passengers', bin: 'beto' },
        { text: 'the doors closing as you run', bin: 'about' }, { text: 'the engines starting now', bin: 'about' },
        { text: 'an arrival time on a board', bin: 'due' }, { text: 'a 09:04 the timetable promises', bin: 'due' }
      ],
      why: 'Three registers, three jobs. Choosing correctly between them is a clear C1 signal.' },
    { id: 's7ch-6', type: 'equiv', tag: 'future-perfect', level: 'B2+',
      given: 'They will have checked in by now.',
      stem: 'What is the speaker doing?',
      options: ['Predicting tomorrow.', 'Deducing what has already happened.', 'Giving an order.', 'Describing a routine.'],
      answer: 1, why: '<em>By now</em> gives it away: a confident deduction about the present, exactly like <em>that will be the taxi</em>.' },
    { id: 's7ch-7', type: 'spot', tag: 'future-perfect', level: 'B2+',
      stem: 'Click the wrong word.',
      words: ['By', 'the', 'time', 'you', 'will', 'get', 'this,', 'we', 'will', 'have', 'flown', 'home.'],
      answer: 4, fix: 'delete "will"',
      why: 'The anchoring time clause stays in a present form; the main clause keeps its future perfect.' },
    { id: 's7ch-8', type: 'build', tag: 'future-prog', level: 'B2+',
      stem: 'Text from the airport: at this time tomorrow you are over the sea.',
      tiles: ['This', 'time', 'tomorrow', 'we', 'will', 'be', 'flying', 'over', 'the', 'sea.'],
      solution: 'This time tomorrow we will be flying over the sea.',
      why: 'A future vantage point plus an action in progress inside it.' }
  ]},

  s8: { id: 's8ch', name: 'Checkpoint 8', items: [
    { id: 's8ch-1', type: 'sort', tag: 'past-as-distance', level: 'C1',
      stem: 'Each uses a past form. What kind of distance?',
      bins: [
        { key: 't', label: 'Distant in time', hint: 'it happened' },
        { key: 'u', label: 'Distant from reality', hint: 'unreal' },
        { key: 'p', label: 'Distant from the listener', hint: 'polite' }
      ],
      items: [
        { text: 'We flew to Hue in March.', bin: 't' }, { text: 'The café closed last year.', bin: 't' },
        { text: 'I wish we had another week.', bin: 'u' }, { text: 'It is time we booked the flights.', bin: 'u' },
        { text: 'I wondered if you could help.', bin: 'p' }, { text: 'I was hoping for a sea view.', bin: 'p' }
      ],
      why: 'One form, three jobs — and all three are the same move: standing back.' },
    { id: 's8ch-2', type: 'spot', tag: 'past-as-distance', level: 'C1',
      stem: 'Click the word that should be a past form.',
      words: ['It', 'is', 'time', 'we', 'book', 'the', 'flights', 'for', 'April.'],
      answer: 4, fix: 'booked',
      why: '<em>It is time</em> takes a past form for something not yet done. The pastness marks the gap between what is and what should be.' },
    { id: 's8ch-3', type: 'choose', tag: 'backshift', level: 'C1',
      stem: 'Which sentence uses the hindsight form?',
      options: ['We were going to take the night train.', 'That evening was to be the last time the ferry ran.', 'We knew the ferry would be full.', 'The ferry was running late.'],
      answer: 1, why: '<em>Was to be</em> looks back from a present that knows how things turned out — the grammar of "little did we know".' },
    { id: 's8ch-4', type: 'spot', tag: 'backshift', level: 'C1',
      stem: 'Click the word that breaks the past viewpoint.',
      words: ['Nobody', 'told', 'us', 'the', 'road', 'will', 'be', 'closed', 'for', 'three', 'days.'],
      answer: 5, fix: 'would',
      why: 'The main clause is past, so the prediction inside it has to shift back with it.' },
    { id: 's8ch-5', type: 'equiv', tag: 'stative', level: 'C1',
      given: 'She is being very difficult about the seating.',
      stem: 'What does the progressive add?',
      options: ['That she is difficult by nature.', 'That this is how she is behaving right now.', 'That she was difficult before.', 'That she will be difficult later.'],
      answer: 1, why: 'Forcing a state verb into the progressive produces a temporary, behavioural reading.' },
    { id: 's8ch-6', type: 'spot', tag: 'register-hedge', level: 'C1',
      stem: 'Click the word that is too blunt for an academic paragraph.',
      words: ['Visitor', 'numbers', 'will', 'recover', 'fully', 'within', 'two', 'years.'],
      answer: 2, fix: 'are expected to',
      why: 'Formal English grades its predictions. A bare <em>will</em> claims a certainty no writer has.' },
    { id: 's8ch-7', type: 'sort', tag: 'register-hedge', level: 'C1',
      stem: 'How confident is each prediction?',
      bins: [
        { key: 'hi', label: 'Near-certain', hint: 'committed' },
        { key: 'lo', label: 'Hedged', hint: 'not committed' }
      ],
      items: [
        { text: 'is set to overtake', bin: 'hi' }, { text: 'will almost certainly rise', bin: 'hi' }, { text: 'is bound to happen', bin: 'hi' },
        { text: 'is likely to increase', bin: 'lo' }, { text: 'may well fall', bin: 'lo' }, { text: 'could conceivably double', bin: 'lo' }
      ],
      why: '<em>Set to</em> and <em>likely to</em> are two rungs apart, though students routinely use them as synonyms.' },
    { id: 's8ch-8', type: 'build', tag: 'past-as-distance', level: 'C1',
      stem: 'At the desk, ask as tactfully as you can about an early check-in.',
      tiles: ['I', 'was', 'wondering', 'if', 'it', 'might', 'be', 'possible', 'to', 'check', 'in', 'early.'],
      solution: 'I was wondering if it might be possible to check in early.',
      why: 'Past tense, progressive aspect and a remote modal, stacked. Each layer makes the request easier to refuse.' }
  ]}
};

STAGES.forEach(function (st) { st.challenge = CHALLENGES[st.id]; });

/* ===== HELD-OUT VERIFICATION BANK ======================================
   Students NEVER see these in the roadmap. The teacher console draws on
   them to build a level-check paper that independently verifies the level
   a student's roadmap claims. Keyed by leg number.
   ======================================================================= */
const VERIFY = {

  1: [
    { id: 'v1-1', type: 'choose', tag: 'two-tenses', level: 'A2',
      stem: 'Which pair is a real tense contrast, marked on the verb itself?',
      options: ['swim / will swim', 'swim / swam', 'swim / am swimming', 'swim / have swum'],
      answer: 1, why: 'Only <em>swim / swam</em> changes the verb. The rest add helper words.' },
    { id: 'v1-2', type: 'spot', tag: 'present-simple-event', level: 'A2',
      stem: 'Click the wrong word.',
      words: ['Do', 'not', 'interrupt', '—', 'she', 'packs', 'right', 'now.'],
      answer: 5, fix: 'is packing', why: '<em>Right now</em> forces the progressive.' },
    { id: 'v1-3', type: 'gap', tag: 'progressive-core', level: 'B1',
      lines: [{ who: 'A', text: 'Where are you living at the moment?' }, { who: 'B', text: 'I ___ with friends until the new flat is ready.' }],
      options: ['live', 'am living', 'have lived', 'will live'], answer: 1,
      why: 'Temporary, not permanent — the progressive\'s core reading.' },
    { id: 'v1-4', type: 'choose', tag: 'present-simple-event', level: 'B1',
      stem: 'Which is a timetable use of the present simple?',
      options: ['We swim every morning on holiday.', 'The coach leaves at 05:40.', 'The sea is warm in April.', 'I promise to write.'],
      answer: 1, why: 'A published schedule, outside anyone in the conversation\'s control.' },
    { id: 'v1-5', type: 'sort', tag: 'progressive-core', level: 'B1',
      stem: 'Sort by whether the verb takes <em>-ing</em> comfortably.',
      bins: [
        { key: 'yes', label: 'Takes -ing', hint: 'activity' },
        { key: 'no', label: 'Resists -ing', hint: 'state' }
      ],
      items: [
        { text: 'unpack', bin: 'yes' }, { text: 'argue', bin: 'yes' }, { text: 'queue', bin: 'yes' },
        { text: 'belong', bin: 'no' }, { text: 'cost', bin: 'no' }, { text: 'contain', bin: 'no' }
      ],
      why: 'States have no inside to stand in.' },
    { id: 'v1-6', type: 'judge', tag: 'two-tenses', level: 'B1',
      given: 'English marks the future on the verb, the way it marks the past with -ed.',
      stem: 'True or false?',
      answer: 1, why: 'False. No English verb has a future ending; <em>will</em> is a separate modal word.' },
    { id: 'v1-7', type: 'build', tag: 'progressive-core', level: 'B1',
      stem: 'Your friend rings while you are in the security queue. Tell her what is happening.',
      tiles: ['We', 'are', 'queuing', 'for', 'security', 'at', 'the', 'moment.'],
      solution: 'We are queuing for security at the moment.',
      why: 'An activity in progress, and you are inside it.' }
  ],

  2: [
    { id: 'v2-1', type: 'spot', tag: 'past-simple-definite', level: 'A2',
      stem: 'Click the wrong word.',
      words: ['Did', 'you', 'ate', 'anything', 'unusual', 'there?'],
      answer: 2, fix: 'eat', why: '<em>Did</em> carries the tense; the main verb returns to base form.' },
    { id: 'v2-2', type: 'gap', tag: 'past-prog-frame', level: 'B1',
      lines: [{ who: 'A', text: 'How did you lose the hat?' }, { who: 'B', text: 'We ___ along the pier and the wind took it.' }],
      options: ['walked', 'were walking', 'have walked', 'walk'], answer: 1,
      why: 'The walking was the background the loss landed in.' },
    { id: 'v2-3', type: 'equiv', tag: 'narrative-order', level: 'B1+',
      given: 'When the guide arrived, we were having breakfast.',
      stem: 'Which started first?',
      options: ['Breakfast.', 'The guide\'s arrival.', 'Both at once.', 'Impossible to say.'],
      answer: 0, why: 'The progressive marks breakfast as already running.' },
    { id: 'v2-4', type: 'spot', tag: 'past-prog-frame', level: 'B1',
      stem: 'Click the verb that should be a background form.',
      words: ['I', 'showered', 'when', 'the', 'fire', 'alarm', 'went', 'off.'],
      answer: 1, fix: 'was showering', why: 'As written, the shower begins after the alarm.' },
    { id: 'v2-5', type: 'choose', tag: 'narrative-order', level: 'B1+',
      stem: 'Which conjunction shows two things changing together?',
      options: ['when', 'as', 'until', 'because'],
      answer: 1, why: '<em>As</em> is the conjunction of parallel change.' },
    { id: 'v2-6', type: 'order', tag: 'past-simple-definite', level: 'B1',
      stem: 'Put the events in the order they happened.',
      items: [
        'We caught the overnight bus from Bangkok.',
        'We arrived in Chiang Mai at dawn.',
        'We found a guest house near the moat.',
        'We slept until the afternoon.'
      ],
      why: 'In a plain past-simple narrative, sentence order is event order.' },
    { id: 'v2-7', type: 'build', tag: 'past-prog-frame', level: 'B1',
      stem: 'You were sunbathing. Then it started to rain. One sentence.',
      tiles: ['I', 'was', 'sunbathing', 'when', 'it', 'started', 'to', 'rain.'],
      solution: 'I was sunbathing when it started to rain.',
      why: 'Long line, short arrow.' }
  ],

  3: [
    { id: 'v3-1', type: 'spot', tag: 'perfect-adverbials', level: 'B1',
      stem: 'Click the words that cannot stay.',
      words: ['I', 'have', 'been', 'to', 'Laos', 'last', 'year.'],
      answer: 5, fix: 'delete "last year", or use "I went"',
      why: 'A closed past time cannot sit in a present perfect.' },
    { id: 'v3-2', type: 'gap', tag: 'perfect-now', level: 'B1',
      lines: [{ who: 'A', text: 'Any news?' }, { who: 'B', text: 'Yes — they ___ the tour. We are getting a refund.' }],
      options: ['cancelled', 'have cancelled', 'had cancelled', 'cancel'], answer: 1,
      why: 'News about the present situation takes the present perfect.' },
    { id: 'v3-3', type: 'spot', tag: 'since-for', level: 'B1',
      stem: 'Click the wrong word.',
      words: ['We', 'have', 'been', 'waiting', 'since', 'two', 'hours.'],
      answer: 4, fix: 'for', why: '<em>Since</em> needs a point; a length takes <em>for</em>.' },
    { id: 'v3-4', type: 'choose', tag: 'since-for', level: 'B1+',
      stem: 'Your friend walks in soaked and muddy. Which fits?',
      options: ['You have walked the coast path.', 'You have been walking in that storm.', 'You walked in the storm.', 'You walk in storms.'],
      answer: 1, why: 'Visible evidence points at the activity, not a finished achievement.' },
    { id: 'v3-5', type: 'equiv', tag: 'perfect-now', level: 'B1+',
      given: 'He has gone to the airport.',
      stem: 'Where is he?',
      options: ['Back home.', 'At the airport or on his way.', 'Nobody knows.', 'He has never been.'],
      answer: 1, why: '<em>Has gone to</em> means he is still away; <em>has been to</em> means he returned.' },
    { id: 'v3-6', type: 'sort', tag: 'perfect-adverbials', level: 'B1+',
      stem: 'Does the time frame include this moment?',
      bins: [
        { key: 'open', label: 'Open → present perfect', hint: 'includes now' },
        { key: 'shut', label: 'Closed → past simple', hint: 'over' }
      ],
      items: [
        { text: 'this week', bin: 'open' }, { text: 'ever', bin: 'open' }, { text: 'up to now', bin: 'open' },
        { text: 'last night', bin: 'shut' }, { text: 'in 2018', bin: 'shut' }, { text: 'when I was ten', bin: 'shut' }
      ],
      why: 'Not about how long ago — about whether the frame is still running.' },
    { id: 'v3-7', type: 'build', tag: 'since-for', level: 'B2',
      stem: 'Count what you have achieved so far: six cities.',
      tiles: ['We', 'have', 'visited', 'six', 'cities', 'so', 'far.'],
      solution: 'We have visited six cities so far.',
      why: 'Counting completed achievements takes the simple.' }
  ],

  4: [
    { id: 'v4-1', type: 'equiv', tag: 'past-perfect-order', level: 'B1+',
      given: 'When we got to the pier, the boat had left.',
      stem: 'Did they catch the boat?',
      options: ['Yes.', 'No — it went before they arrived.', 'It left as they arrived.', 'Impossible to say.'],
      answer: 1, why: '<em>Had left</em> puts the departure before the arrival.' },
    { id: 'v4-2', type: 'spot', tag: 'past-perfect-order', level: 'B2',
      stem: 'Click the past perfect that is doing no work.',
      words: ['We', 'landed,', 'and', 'then', 'we', 'had', 'taken', 'a', 'taxi.'],
      answer: 5, fix: 'delete "had"', why: '<em>And then</em> already says the story moves forwards.' },
    { id: 'v4-3', type: 'gap', tag: 'past-perfect-prog', level: 'B2',
      lines: [{ who: 'A', text: 'Why were you all so quiet?' }, { who: 'B', text: 'We ___ since four in the morning.' }],
      options: ['drove', 'had driven', 'had been driving', 'were driving'], answer: 2,
      why: 'Duration running up to a past point, explaining the state of things there.' },
    { id: 'v4-4', type: 'spot', tag: 'used-to-would', level: 'B2',
      stem: 'Click the wrong word.',
      words: ['We', 'would', 'have', 'a', 'caravan', 'in', 'those', 'days.'],
      answer: 1, fix: 'used to', why: '<em>Have</em> here is a state, and <em>would</em> only takes repeated actions.' },
    { id: 'v4-5', type: 'choose', tag: 'used-to-would', level: 'B2',
      stem: 'Which opening works?',
      options: [
        'We would drive to the coast each August. My father would pack at dawn.',
        'We used to drive to the coast each August. My father would pack at dawn.',
        'We are used to drive to the coast each August.',
        'We would be driving to the coast each August.'
      ],
      answer: 1, why: '<em>Would</em> cannot establish its own past frame.' },
    { id: 'v4-6', type: 'sort', tag: 'past-perfect-prog', level: 'B2',
      stem: 'Simple or progressive after <em>had</em>?',
      bins: [
        { key: 'simp', label: 'had + participle', hint: 'countable' },
        { key: 'prog', label: 'had been + -ing', hint: 'measured' }
      ],
      items: [
        { text: 'crossed three borders', bin: 'simp' }, { text: 'lost two phones', bin: 'simp' }, { text: 'finished the guidebook', bin: 'simp' },
        { text: 'walked since sunrise', bin: 'prog' }, { text: 'sat there for hours', bin: 'prog' }, { text: 'argued all week', bin: 'prog' }
      ],
      why: 'Can you put a number on it? Then the simple.' },
    { id: 'v4-7', type: 'build', tag: 'past-perfect-order', level: 'B2',
      stem: 'The square was deserted because everyone had gone home.',
      tiles: ['The', 'square', 'was', 'empty', '—', 'everyone', 'had', 'gone', 'home.'],
      solution: 'The square was empty — everyone had gone home.',
      why: 'Scene first, one step backwards to explain it.' }
  ],

  5: [
    { id: 'v5-1', type: 'spot', tag: 'timetable-future', level: 'B2',
      stem: 'Click the word that cannot take a timetable form.',
      words: ['The', 'boat', 'sails', 'at', 'seven', 'and', 'my', 'sister', 'drives', 'us', 'there.'],
      answer: 8, fix: 'is driving', why: 'Ferries publish timetables; sisters do not.' },
    { id: 'v5-2', type: 'gap', tag: 'arrangement-future', level: 'B1+',
      lines: [{ who: 'A', text: 'Are you around on Sunday?' }, { who: 'B', text: 'No — I ___ my parents at the station at nine.' }],
      options: ['will meet', 'meet', 'am meeting', 'would meet'], answer: 2,
      why: 'Arranged, and someone else knows about it.' },
    { id: 'v5-3', type: 'spot', tag: 'going-to', level: 'B2',
      stem: 'Click the word that is wrong when you are pointing at evidence.',
      words: ['Look', 'at', 'those', 'clouds', '—', 'it', 'will', 'pour', 'in', 'a', 'minute.'],
      answer: 6, fix: 'is going to', why: 'You cannot offer an opinion while pointing at proof.' },
    { id: 'v5-4', type: 'sort', tag: 'going-to', level: 'B2',
      stem: 'Where does the evidence live?',
      bins: [
        { key: 'ev', label: 'Visible evidence', hint: 'point at it' },
        { key: 'int', label: 'Existing intention', hint: 'decided earlier' }
      ],
      items: [
        { text: 'the fuel light is on', bin: 'ev' }, { text: 'she has gone pale', bin: 'ev' }, { text: 'the queue is enormous', bin: 'ev' },
        { text: 'we booked leave in March', bin: 'int' }, { text: 'we have been saving all year', bin: 'int' }, { text: 'I promised my mother', bin: 'int' }
      ],
      why: 'Two kinds of present fact, one form — because both are already true now.' },
    { id: 'v5-5', type: 'equiv', tag: 'arrangement-future', level: 'B2',
      given: 'What are you doing at the weekend?',
      stem: 'What is being asked?',
      options: ['What is happening now?', 'What have you arranged?', 'What do you usually do?', 'What do you predict?'],
      answer: 1, why: 'The standard English way of asking about existing plans.' },
    { id: 'v5-6', type: 'pick', tag: 'arrangement-future', level: 'B2',
      shop: 'Four lines from a friend\'s message',
      stem: 'Which line reports something already arranged with another person?',
      items: [
        { name: '"The ferry leaves at seven."', price: '', note: 'a published timetable' },
        { name: '"We are having dinner with Nok on Friday."', price: '', note: 'she replied yesterday' },
        { name: '"It is going to be hot all week."', price: '', note: 'she has seen the forecast' },
        { name: '"I will probably swim before breakfast."', price: '', note: 'just her own idea' }
      ],
      answer: 1,
      why: 'Only the second reports an arrangement someone else knows about — the exact condition the present progressive encodes.' },
    { id: 'v5-7', type: 'build', tag: 'going-to', level: 'B2',
      stem: 'The zip on the case is straining. Warn your friend.',
      tiles: ['That', 'zip', 'is', 'going', 'to', 'break.'],
      solution: 'That zip is going to break.',
      why: 'Visible evidence, so <em>going to</em>.' }
  ],

  6: [
    { id: 'v6-1', type: 'spot', tag: 'time-clause', level: 'B2',
      stem: 'Click the wrong word.',
      words: ['When', 'we', 'will', 'get', 'there,', 'I', 'will', 'call', 'you.'],
      answer: 2, fix: 'delete "will"', why: 'The time clause takes a present form; only the main clause gets <em>will</em>.' },
    { id: 'v6-2', type: 'choose', tag: 'time-clause', level: 'B2',
      stem: 'Which is correct?',
      options: [
        'Nobody knows when the strike will end.',
        'When the strike will end, we will travel.',
        'Tell me when will the strike end.',
        'Until we will know, we cannot book.'
      ],
      answer: 0, why: 'Here <em>when</em> means "what time" — a noun clause, so <em>will</em> belongs.' },
    { id: 'v6-3', type: 'gap', tag: 'will-vs-going', level: 'B2',
      lines: [{ who: 'A', text: 'The restaurant is fully booked.' }, { who: 'B', text: 'Oh well — we ___ at the hotel then.' }],
      options: ['are going to eat', 'will eat', 'eat', 'are eating'], answer: 1,
      why: 'A decision made in response to what was just said.' },
    { id: 'v6-4', type: 'judge', tag: 'will-modal', level: 'B2',
      given: 'Someone is knocking — that will be the driver.',
      stem: 'Is this about the future?',
      answer: 1, why: 'No. A confident inference about right now, which is what modals do.' },
    { id: 'v6-5', type: 'sort', tag: 'will-modal', level: 'B2',
      stem: 'What job is <em>will</em> doing?',
      bins: [
        { key: 'pred', label: 'Prediction', hint: 'judgement' },
        { key: 'dec', label: 'Decision or offer', hint: 'right now' },
        { key: 'ref', label: 'Refusal', hint: 'not co-operating' }
      ],
      items: [
        { text: 'You will love the islands.', bin: 'pred' }, { text: 'It will be quieter after nine.', bin: 'pred' },
        { text: 'I will take that bag for you.', bin: 'dec' }, { text: 'Fine, I will pay the fee.', bin: 'dec' },
        { text: 'The door will not lock.', bin: 'ref' }, { text: 'The engine will not start.', bin: 'ref' }
      ],
      why: 'Only the first pair is about the future at all.' },
    { id: 'v6-6', type: 'equiv', tag: 'will-vs-going', level: 'B2+',
      given: 'I am going to complain about this room.',
      stem: 'How does this differ from "I will complain"?',
      options: ['Less certain.', 'Further away.', 'Already resolved before speaking.', 'More polite.'],
      answer: 2, why: 'A plan nursed since check-in, not a decision taken in the heat of the moment.' },
    { id: 'v6-7', type: 'build', tag: 'time-clause', level: 'B2',
      stem: 'Promise to ring the moment the plane lands.',
      tiles: ['I', 'will', 'ring', 'you', 'as', 'soon', 'as', 'we', 'land.'],
      solution: 'I will ring you as soon as we land.',
      why: '<em>Will</em> in the main clause, present form in the time clause.' }
  ],

  7: [
    { id: 'v7-1', type: 'choose', tag: 'future-prog', level: 'B2+',
      stem: 'Which question implies no request at all?',
      options: ['Will you take the car tonight?', 'Will you be taking the car tonight?', 'Are you going to take the car tonight?', 'Can you take the car tonight?'],
      answer: 1, why: 'The progressive removes the volition from <em>will</em>, leaving a neutral enquiry.' },
    { id: 'v7-2', type: 'gap', tag: 'future-perfect', level: 'B2+',
      lines: [{ who: 'A', text: 'How long is the whole journey?' }, { who: 'B', text: 'By the time we arrive, we ___ for eighteen hours.' }],
      options: ['will travel', 'will have travelled', 'will have been travelling', 'are travelling'], answer: 2,
      why: 'A measured stretch running up to a future vantage point.' },
    { id: 'v7-3', type: 'spot', tag: 'future-perfect', level: 'B2+',
      stem: 'Click the wrong word.',
      words: ['By', 'the', 'time', 'you', 'will', 'arrive,', 'we', 'will', 'have', 'eaten.'],
      answer: 4, fix: 'delete "will"', why: 'The anchoring time clause never takes <em>will</em>.' },
    { id: 'v7-4', type: 'choose', tag: 'be-to-about', level: 'C1',
      stem: '"Due to land at nine" — what is the airline saying?',
      options: ['It will definitely land then.', 'That is the schedule, with nothing promised.', 'It landed at nine.', 'It is landing now.'],
      answer: 1, why: '<em>Due to</em> reports a schedule without guaranteeing it.' },
    { id: 'v7-5', type: 'sort', tag: 'be-to-about', level: 'C1',
      stem: 'Which semi-modal fits?',
      bins: [
        { key: 'beto', label: 'be to', hint: 'official' },
        { key: 'about', label: 'be about to', hint: 'next moment' },
        { key: 'due', label: 'be due to', hint: 'scheduled' }
      ],
      items: [
        { text: 'a government statement', bin: 'beto' }, { text: 'an instruction to passengers', bin: 'beto' },
        { text: 'the gate closing now', bin: 'about' }, { text: 'the ferry pulling away', bin: 'about' },
        { text: 'a time printed on a board', bin: 'due' }, { text: 'a 14:05 in the timetable', bin: 'due' }
      ],
      why: 'Three registers, three jobs.' },
    { id: 'v7-6', type: 'equiv', tag: 'future-perfect', level: 'B2+',
      given: 'They will have landed by now.',
      stem: 'What is the speaker doing?',
      options: ['Predicting tomorrow.', 'Deducing what has already happened.', 'Giving an order.', 'Describing a habit.'],
      answer: 1, why: '<em>By now</em> marks it as a deduction about the present.' },
    { id: 'v7-7', type: 'build', tag: 'future-prog', level: 'B2+',
      stem: 'Tell your friend where you will be at this time tomorrow: on a beach in Krabi.',
      tiles: ['This', 'time', 'tomorrow', 'we', 'will', 'be', 'lying', 'on', 'a', 'beach', 'in', 'Krabi.'],
      solution: 'This time tomorrow we will be lying on a beach in Krabi.',
      why: 'A future vantage point with an action in progress inside it.' }
  ],

  8: [
    { id: 'v8-1', type: 'sort', tag: 'past-as-distance', level: 'C1',
      stem: 'What kind of distance is the past form marking?',
      bins: [
        { key: 't', label: 'Time', hint: 'it happened' },
        { key: 'u', label: 'Unreality', hint: 'not the real world' },
        { key: 'p', label: 'Politeness', hint: 'standing back' }
      ],
      items: [
        { text: 'We sailed from Phuket in May.', bin: 't' }, { text: 'The hotel shut two years ago.', bin: 't' },
        { text: 'If I spoke Japanese, this would be easy.', bin: 'u' }, { text: 'I wish we had longer here.', bin: 'u' },
        { text: 'I wondered if you had a quieter room.', bin: 'p' }, { text: 'Did you want the aisle seat?', bin: 'p' }
      ],
      why: 'One form, three jobs — all of them the same move: standing back.' },
    { id: 'v8-2', type: 'spot', tag: 'past-as-distance', level: 'C1',
      stem: 'Click the word that should be a past form.',
      words: ['It', 'is', 'high', 'time', 'we', 'book', 'the', 'tickets.'],
      answer: 5, fix: 'booked', why: '<em>It is time</em> takes a past form for something not yet done.' },
    { id: 'v8-3', type: 'choose', tag: 'backshift', level: 'C1',
      stem: 'Which uses the hindsight form?',
      options: ['We were going to fly.', 'It was to be the last summer we all went together.', 'We knew the flight would be full.', 'The flight was boarding.'],
      answer: 1, why: '<em>Was to be</em> looks back from a present that knows how it turned out.' },
    { id: 'v8-4', type: 'spot', tag: 'backshift', level: 'C1',
      stem: 'Click the word that breaks the past viewpoint.',
      words: ['They', 'assured', 'us', 'the', 'pass', 'will', 'be', 'open', 'by', 'Friday.'],
      answer: 5, fix: 'would', why: 'A past reporting verb pushes the prediction back with it.' },
    { id: 'v8-5', type: 'equiv', tag: 'stative', level: 'C1',
      given: 'I am seeing the tour operator on Thursday.',
      stem: 'What does <em>see</em> mean here?',
      options: ['Perceive.', 'Understand.', 'Meet by appointment.', 'Believe.'],
      answer: 2, why: 'The progressive shifts <em>see</em> from a state of perception to an activity.' },
    { id: 'v8-6', type: 'spot', tag: 'register-hedge', level: 'C1',
      stem: 'Click the word that is too blunt for an academic paragraph.',
      words: ['Arrivals', 'will', 'double', 'within', 'five', 'years.'],
      answer: 1, fix: 'are likely to', why: 'A bare <em>will</em> claims a certainty no writer can have.' },
    { id: 'v8-7', type: 'build', tag: 'past-as-distance', level: 'C1',
      stem: 'Ask the hotel, as tactfully as you can, for a later checkout.',
      tiles: ['I', 'was', 'wondering', 'if', 'we', 'might', 'check', 'out', 'a', 'little', 'later.'],
      solution: 'I was wondering if we might check out a little later.',
      why: 'Past tense, progressive aspect and a remote modal, stacked for politeness.' }
  ]
};

/* ===== "FOLLOW THE INSTRUCTION" ITEMS ==================================
   The student reads a real-world message and picks the option that satisfies
   it. Injected into the lessons where the grammar they test already lives,
   so they are practice, not a separate mode.
   ======================================================================= */
const EXTRA_PICK = {

  s1l2: [
    { id: 's1l2-07', type: 'pick', tag: 'present-simple-event', level: 'B1',
      shop: 'Four lines from a hotel website',
      art: 'hotel',
      stem: 'Which line is a timetable rather than a habit or a fact?',
      items: [
        { name: '"Our guests usually eat on the terrace."', price: '', note: 'what people tend to do' },
        { name: '"Breakfast is served from 06:30 to 10:00."', price: '', note: 'printed on the door' },
        { name: '"The bay faces west."', price: '', note: 'geography' },
        { name: '"We welcome families."', price: '', note: 'a standing policy' }
      ],
      answer: 1,
      why: 'A published schedule with clock times. The others are a habit, a permanent fact and a policy — all present simple, none of them a timetable.' }
  ],

  s3l1: [
    { id: 's3l1-07', type: 'pick', tag: 'perfect-now', level: 'B1+',
      shop: 'Four messages on the family group chat',
      stem: 'Which one is giving news about the situation right now?',
      items: [
        { name: '"We landed at six and got a taxi straight away."', price: '', note: 'told as a story' },
        { name: '"The airline has lost one of our bags."', price: '', note: 'sent from the carousel' },
        { name: '"We stayed at the same place last year."', price: '', note: 'background' },
        { name: '"We were waiting for ages at passport control."', price: '', note: 'scene-setting' }
      ],
      answer: 1,
      why: 'Present perfect, present consequence: a bag is missing and something has to be done about it now. The other three are all narrative.' }
  ],

  s5l2: [
    { id: 's5l2-08', type: 'pick', tag: 'arrangement-future', level: 'B2',
      shop: 'Next week in your diary',
      art: 'desk',
      stem: 'Your teacher asks which of these you can describe with "I am -ing". Which one?',
      items: [
        { name: 'Maybe go to the market', price: '', note: 'nothing booked, just an idea' },
        { name: 'Dentist, Tuesday 10:00', price: '', note: 'appointment card in your bag' },
        { name: 'Probably rain on Thursday', price: '', note: 'from the forecast' },
        { name: 'Museum opens at nine', price: '', note: 'from their website' }
      ],
      answer: 1,
      why: 'An appointment exists in someone else\'s diary, which is exactly what the arrangement progressive reports. The others need <em>might</em>, <em>going to</em> and the present simple.' }
  ],

  s6l2: [
    { id: 's6l2-08', type: 'pick', tag: 'will-vs-going', level: 'B2+',
      shop: 'Four things you could say at the car hire desk',
      stem: 'The clerk has just told you the automatic is unavailable. Which reply is the instant decision?',
      items: [
        { name: '"We are going to take the manual."', price: '', note: 'implies you planned this all along' },
        { name: '"Fine — we will take the manual then."', price: '', note: 'said the moment you heard' },
        { name: '"We take the manual."', price: '', note: 'sounds like a habit' },
        { name: '"We are taking the manual."', price: '', note: 'implies it was already booked' }
      ],
      answer: 1,
      why: 'A decision made in response to new information. Each of the other three claims something about your plans that is not true.' }
  ],

  s7l3: [
    { id: 's7l3-07', type: 'pick', tag: 'be-to-about', level: 'C1',
      shop: 'Four ways the same airline could word one notice',
      art: 'board',
      stem: 'Which wording commits the airline to the least?',
      items: [
        { name: '"Flight TG104 will depart at 19:25."', price: '', note: 'a flat promise' },
        { name: '"Flight TG104 is due to depart at 19:25."', price: '', note: 'the schedule says so' },
        { name: '"Flight TG104 is about to depart."', price: '', note: 'any second now' },
        { name: '"Flight TG104 departs at 19:25."', price: '', note: 'the timetable' }
      ],
      answer: 1,
      why: '<em>Due to</em> reports the schedule and quietly declines to guarantee it. That is precisely why it is the language of every departure board in the world.' }
  ]
};

STAGES.forEach(function (st) {
  st.lessons.forEach(function (ls) {
    if (EXTRA_PICK[ls.id]) ls.items = ls.items.concat(EXTRA_PICK[ls.id]);
  });
});

/* --------------------------------------------------------------------------
   EXPORTS
   -------------------------------------------------------------------------- */
const CONTENT = { CEFR, RANKS, BADGES, REMEDIATION, STAGES, VERIFY };
if (typeof window !== 'undefined') { window.CONTENT = CONTENT; }
if (typeof module !== 'undefined') { module.exports = CONTENT; }
