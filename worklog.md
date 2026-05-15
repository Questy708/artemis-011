# Worklog: FundraisingCampaign (Give) Page Updates

## Date: 2025-03-04

## Summary
Updated the FundraisingCampaign.tsx component with new founding campaign content as specified.

## Changes Made

### 1. FIVE_PILLARS data (lines 38-39)
- **p4**: Changed `Knowledge` → `Excellence`, `Centers & Projects Launch` → `Research & Inquiry`, icon `FlaskConical` → `Star`, updated desc and details
- **p5**: Changed `Endurance` → `Progress`, `Seed Endowment & Reserve` → `Innovation & Infrastructure`, icon `Landmark` → `Rocket`, updated desc and details

### 2. PILLAR_FINANCIAL_MODEL data (lines 48-49)
- Changed `Centers & Projects Startup` → `Excellence — Centers & Projects Startup`
- Changed `Seed Endowment` → `Progress — Seed Endowment & Infrastructure`

### 3. useActiveSection hook (line 205)
- Added `'ask'` to the array: `['case', 'pillars', 'ask', 'phases', 'opportunities', 'circles', 'ways', 'give', 'model']`

### 4. askAnim hook (line 232)
- Added `const askAnim = useInView(0);` after `beyondAnim`

### 5. Hero subtitle (line 283-284)
- Changed from: "The campaign is the match. Tuition is the fuel. The fire sustains itself."
- Changed to: "$100M. 12 months. The zero-to-one moment for civilization."

### 6. OnThisPageNav sections (lines 455-458)
- Changed `{ id: 'case', label: 'The Case' }` → `{ id: 'case', label: 'Why Now, Why Us' }`
- Added `{ id: 'ask', label: 'The Ask' }` after the pillars entry

### 7. THE CASE section (replaced entirely, lines 468-589)
- Replaced old "200 Million" / "Why this. Why now. Why you." section
- New "Why Now, Why Us" section with three sub-sections:
  - **A. The Broken System**: 4 stat cards ($75,000/yr, 1.5%, $200B+, 177 countries) in a grid with closing paragraph
  - **B. Why We're Different**: 3 differentiator blocks with numbered indicators, highlight tags, and bold lead statements
  - **C. The First Principles**: Financial statement table (4 rows) + closing paragraphs + emphasized line

### 8. THE ASK section (added after Five Pillars, before Timeline)
- New section with `id="ask"` and crimson background (`bg-[#8A0000]`)
- Large typography headline: "$100 million. 12 months. For Civilization."
- Descriptive paragraphs about the founding campaign
- Emphasized closing line: "You're not giving to a university. You're founding one."
- "Give Now" CTA button (white on crimson)

## Verification
- Ran `bun run lint` — no errors in source files
- Dev server compiles and serves the page successfully (200 responses in dev.log)
- FlaskConical and Landmark imports retained (used in NAMING_OPPORTUNITIES and other sections)
- Star and Rocket icons already imported and used in multiple places
