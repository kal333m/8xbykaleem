# 8x.life redesign — Research

Captured 2026-09-29. Every claim below is backed by a file in `captures/` (full-page desktop 1440 + mobile 390, HTML, text, token dumps) or `frames/` (scroll-by-scroll frames of e2.vc).

---

## 1. What 8x.life says today

**Site map:** `/` (one screen, 951px tall) → `/manifesto` (6 lines) → `/team` (2 names) → **JOBS leaves to 8x.careers**, a different domain with a different design.

### What a candidate comes away believing
> "8x is a small holding company with a list of service websites, run by two people. There are 250k 'humans managed' somewhere. I don't know what working here is like."

That isn't the site's job. The brief says its job is to **make the right people want to work here and give the wrong people a reason to self-select out.** Right now it does neither. It never talks to a candidate at all.

### The real problems (ranked by what they cost 8x)

1. **Wrong audience.** The homepage is a product directory written for buyers ("Human orchestration for business outcomes", "B2B demand, on LinkedIn"). The only thing for a candidate is `JOBS`: 12px, grey, uppercase, last in the footer row, and it sends you to another domain.
2. **The best material is buried on 8x.careers, one domain away.** None of this is on 8x.life:
   - 11 team members on video, in their own words (`/join/*`, "Meet the people who work at 8x"). 8x.life shows **2 names, no faces**.
   - Proof: **$7M+ raised**, 250k+, 50+ countries.
   - Real founder bios (Jaka: first company at 17, Slovenia → London/Singapore/India/Berlin → SF; Theo: robotic arms, ride-sharing; met at Entrepreneur First).
   - The sharpest writing 8x has, all on job pages: *"Ship with AI. A lot of it, and none of it slop."* · *"You want to work a lot."* · *"We have seen 22-year-olds outperform 30-year-olds and the other way around."* · *"You have started something before… It does not need to have worked."*
   - **How they hire.** The practical assignment is issued the moment you submit. About 15 minutes of questions, and you can save and come back. 2-week trials for interns. A CV *is* required (confirmed by applying); only the intern posts say "no CV requirements", and that inconsistency is itself a finding. This is 8x's most distinctive trait **and the self-selection filter itself**, and the life site never mentions it.
3. **"250k+ humans managed" is ambiguous to a candidate.** Am I joining the core team, or would I be one of the 250k? 8x.careers had to add a "Join the team / Join the platform" toggle, which shows the confusion is real. The life site never answers it.
4. **The manifesto is the right idea, badly staged.** Line 4 is a real worldview: *"the human in the loop becomes the most valuable and the bottlenecked resource."* It sits one click deep, opens with the most generic line possible ("ai is changing the world"), never says what it means for the person reading, and its `<h1>The 8x Manifesto</h1>` doesn't render visibly.
5. **"Not unlocked yet" is a tease that goes nowhere.** 8x Email and 8x Global are shown locked, with no explanation. There's an open **Intrapreneur** role ("Lead a project from research to revenue"). Those should be linked: *"not unlocked yet — someone here will build it."*
6. **Two brands.** 8x.life: Newsreader serif, pure white, monochrome. 8x.careers: condensed display serif + grotesk, warm grey, red-orange CTA, pill nav. The jump between them feels like leaving the company.
7. **What a candidate needs before applying, and whether it's there:**

| Need | On 8x.life? | Exists elsewhere? |
|---|---|---|
| What 8x actually does, in plain words | ✗ jargon | ✓ careers/about |
| Who I'd work with (faces) | ✗ 2 names | ✓ 11 videos |
| Pace / expectations / the bar | ✗ | ✓ scattered across job posts |
| How hiring works | ✗ | ✓ partly ("assignment on submit", "15 min"); CV rules inconsistent (interns: none; applying: required) |
| Remote? Where is everyone? | ✗ | ✓ "Remote-first, built from SF" |
| Is it funded / stable | ✗ | ✓ $7M+ |
| Who should *not* apply | ✗ | ✗ nowhere, needs writing |
| Open roles | ✗ link only | ✓ 16 roles |

### Craft issues (secondary, but real)
- Hero sentence is **`text-align: justify`**, which leaves wide rivers between words at desktop width.
- Secondary text is `rgba(0,0,0,.5)` on white = **3.95:1, which fails WCAG AA** at the 12–14px sizes it's used at.
- Flat hierarchy: almost every element is 14–16px; the only large thing is the "8x" wordmark.
- **No `og:image`**, so shared links on LinkedIn/Slack/WhatsApp (how candidates actually pass this around) show as bare text.
- ~1 MB of JavaScript to render a page of static text; DOM-ready 2.7s on a fast connection.
- Careers data hygiene: all 4 "Market Lead Intern" roles are filed under **Design**; 5 roles have no employment type. The filters can't be trusted.

---

## 2. What e2.vc's style is actually doing

Not "cream background and big type". These are the mechanisms:

| # | Mechanism | How e2 does it | Why it works |
|---|---|---|---|
| 1 | **The headline is the thesis, in their own voice** | Every page opens with a 2-line lowercase claim: *"we just have great taste in friends"*, *"founders backing founders"*, *"an extension of your team"* | It turns a VC (money) into relationships. One sentence does the positioning. |
| 2 | **People are the proof** | Faces above the fold on the home page; candid photos with oddly specific captions (*"fal's unicorn round celebration, coincidentally held on görkem's birthday party"*, *"arin smiling 32-teeth"*) | Specific details can't be faked, so they read as true. |
| 3 | **A strict system** | 1 typeface (Inter Tight), 2 surfaces (cream `#FCF7F0` / ink `#1C2121`, 15.3:1 contrast), 1 electric accent (`#3451F5`) used only for hand-drawn marks and the footer | Because so little varies, the few expressive moments stand out. |
| 4 | **The grid is visible** | 4-column hairlines run down every page; cards stagger along them | Makes structure a visual motif; order under the playfulness. |
| 5 | **Hand-made against the grid** | Rough.js circles/underlines, photos tilted ±2°, physics letters | "Serious about outcomes, not about ourselves." |
| 6 | **Motion marks chapters** | Cream columns drop like a skyline into ink as the page moves from *who we are* to *what they built*; the "group chat" letters tumble | Scroll works as narrative, not decoration. |
| 7 | **Numbers are labels, not heroes** | "RAISED $750M" is a small tab on a photo | People stay primary, metrics secondary. |
| 8 | **Rewards attention** | Live city clocks (SF/London/Istanbul = where we are), "hold space for spacejump" | Signals the culture without writing "we're fun". |
| 9 | **Every page ends in an action** | Talent form, space-booking form, NextGen apply | Belief, then a door. |

**Stack:** Webflow + GSAP (ScrollTrigger, SplitText, ScrambleText, DrawSVG, Draggable, Inertia) + Lenis + Matter.js + Rough.js.

### What we deliberately leave behind
- **Weight.** 6.7 MB, ~12 script libraries. 8x hires interns in SE Asia, LATAM, Japan, Poland, mostly on phones. Mobile-first and light is a requirement.
- **Scroll-pinned dead space on mobile.** e2's mobile home has long blank stretches where the desktop choreography doesn't translate (`captures/slices/e2_vc__mobile__full__00.png`).
- **The physics footer.** It's charming, but it does nothing for a candidate's decision. We'll keep one moment of play, not five.
- **Unrevealed grey text** (scroll-to-reveal paragraphs start at roughly `#ccc` on cream, which is unreadable until scrolled).
- **Their blue.** 8x needs its own accent. 8x.careers already uses a red-orange CTA, and unifying on that fixes problem #6.
- **The VC flex.** e2's proof is dollars raised. 8x's proof is people and work. We won't invent a metrics wall.

---

## 3. Other benchmarks (for the "self-select out" job specifically)

| Site | What to take |
|---|---|
| **PostHog /careers** | Traits written with personality (*"Grown ups. We're an international bunch of weirdos…"*); each small team shown with its people and a quirk (pineapple-on-pizza poll). Culture shown through specifics. |
| **Linear /careers** | Belief before roles: a manifesto paragraph, then 11 numbered one-line principles (*"Say it as it is"*, *"Avoid side quests"*), then long-form talks, then roles. |
| **Cursor (anysphere.inc)** | Radical brevity: one confident paragraph and a door. The confidence *is* the filter. |
| **8x's own "Builder in Residence" post** | The best writing 8x has: phase 1 / phase 2, "There is no list waiting for you. That is the point." **The homepage should sound like this.** |

---

## 4. Working hypothesis for the redesign (to challenge before we design)

**Homepage only, done properly.** Reorder it around a candidate's questions:

1. **Thesis, in 8x's voice.** Promote manifesto line 4, or use the line hiding in the `<title>` tag: *"the human company."*
2. **Faces.** The 11 team videos, tilted like prints (e2 #2, #5). Answers *"who would I work with?"*
3. **What we've built = what you'd work on.** The verticals as real work, not a link list. The locked ones become *"not unlocked yet — someone here will build it"* → Intrapreneur role.
4. **How we hire (the filter).** Assignment the moment you submit · ~15 min · 2-week trials for interns · CV required, but judged on the work. The single most distinctive thing about 8x.
5. **Who this isn't for.** Built from their own lines: *you want to work a lot · ship with AI, none of it slop · years and degrees matter less than what you've shipped.*
6. **Open roles**, live and correctly categorised → apply.
7. **Founders, with the real bios.**

System: e2's discipline (1 type family, 2 surfaces, 1 accent, visible grid, hand-drawn marks), 8x's accent and serif heritage, a mobile-first budget, and one moment of play.
