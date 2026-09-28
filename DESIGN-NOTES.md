# Design notes — Life at 8x redesign

Talking points for the walkthrough, one per section, in page order. Each says what was wrong on the original and why the redesign does what it does. Evidence for every claim is in `research/RESEARCH.md`, `research/captures/` and `research/transcripts/`.

## Note 01 · The hero

Before: "Human orchestration for business outcomes", a line for buyers. A candidate needs what 8x is, why it matters now, and who the page is for. The type carries the thesis: Geist, 8x's machine face, sets the draft; Instrument Serif, its human face, sets the judgement; vermilion is the human hand.

## Note 02 · The people

Before: /team listed two names and no faces. Eleven clips already existed on 8x.careers, hover-only and buried under every job post. Here they're the first thing you meet, captioned with what each person actually said. I transcribed all eleven; quotes are lightly cleaned, never reworded.

## Note 03 · The real pitch

8x's strongest argument was hiding inside those clips: intern to team lead, sales to six verticals in a month, engineer to lead in seven. The old site never mentions it. Charted from what people said on camera. Nothing inferred.

## Note 04 · Kept, then fixed

I kept 8x.life's hairline table on purpose; it was the one part of the old page that worked. What I added is who's in each loop, so "250k humans managed" stops reading as "would I be one of them?"

## Note 05 · The buried differentiator

The most distinctive thing about 8x, that the assignment arrives the moment you apply, appeared nowhere on 8x.life. It's also the real self-selection filter, so it gets the one dark, full-attention section. One correction from applying myself: a CV is required, even though the intern posts say "no CV requirements". Worth making consistent.

## Note 06 · Self-select, literally

The brief says the site should give the wrong people a reason to opt out. So I made that the interaction, built only from 8x's own words: job posts and the team clips. Here the visitor makes the human mark. It's also the page's one moment of play, in place of e2's physics footer.

## Note 07 · Data hygiene

Re-categorised by what the job actually is: 8x.careers files all four Market Lead internships under "Design". Five roles give no employment type or location, so they show "—" rather than a guess. A candidate filtering by team should be able to trust the filter.

## Note 08 · Promoted, not rewritten

The founders' bios lived only on 8x.careers/about. The manifesto sat one click deep, and its heading never rendered. I didn't rewrite it: it's theirs, and the lowercase is deliberate. I only marked the line that explains everything else.

## Note 09 · Weight

No framework and no animation library: hand-drawn marks are plain SVG strokes. The page ships about 75 KB of its own code (measured: HTML + CSS + JS), against about 1 MB of JavaScript on the old text-only page. Videos load only when tapped. The whole system is 8x's own: two typefaces, one accent, one grid.

## Cut on purpose

- **8x Email and 8x Global ("not unlocked yet").** Unexplained locked products read as filler next to the five real ones. Left out rather than dressed up.
- **Designer's notes toggle.** Moved out of the page and into this file; the reasoning belongs in the walkthrough, and the page should be something 8x could ship as-is.
