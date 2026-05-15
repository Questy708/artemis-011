# Work Log — FundraisingCampaign.tsx Major UI Redesign

## Date: 2026-05-15

### Summary of Changes

All 8 requested changes have been implemented in `/home/z/my-project/src/components/artemis/FundraisingCampaign.tsx`.

---

### 1. Changed from 3 Phases to 4 Phases to Launch
- **MILESTONES array** (line 28): Added 4th phase "Build & Launch" (Months 10–12) with Building2 icon. Updated Phase III to "Close & Capitalise" (Months 7–9) with Landmark icon and new deliverables. Adjusted date ranges for all phases (1–3, 4–6, 7–9, 10–12).
- **Phase indicator UI** (line 816): Changed from `['I', 'II', 'III']` to `['I', 'II', 'III', 'IV']` with arrow condition `i < 3`.
- **Heading text**: Changed "Three phases" to "Four phases".
- **Subtitle text**: Changed "A founding campaign in three acts" to "Four phases from campaign to launch."
- **Section comment**: Updated from "3-Phase Campaign" to "4-Phase Campaign".

### 2. Moved OnThisPageNav Below Hero
- Moved the `<OnThisPageNav>` component from after the Campaign Progress section to immediately after the Hero section closing `</section>` tag (line 303).
- The nav bar now appears right below the hero image, before the Campaign Progress section.

### 3. New Campaign Progress Visualization
- Replaced the entire circular progress ring + shimmer bar section with a **horizontal pillar-based constellation map**.
- Five pillars (Place, Minds, Access, Excellence, Progress) appear as labeled circular nodes connected by a horizontal progress line.
- Each node shows the icon, title, percentage, and dollar amount.
- Nodes change state (filled crimson, partially filled with pulse animation, or empty) based on campaign progress.
- A thin elegant progress bar with shimmer effect remains below the constellation.
- Stats row (Donors, Avg Gift, Countries, Months) preserved below.

### 4. Added Bold Words Sidebar to Why Now/Why Us Section
- Restructured the section into a 2-column grid layout (9:3 ratio on lg screens).
- Left column (lg:col-span-9) contains all the existing content (Broken System, Why Now, Why Us, First Principles).
- Right column (lg:col-span-3) displays the five pillar words vertically: **PLACE**, **MINDS**, **ACCESS**, **EXCELLENCE**, **HUMAN PROGRESS**.
- Each word is in large bold crimson (#8A0000) typography with animated slide-in.
- The sidebar is sticky (top: 140px) and hidden on mobile (hidden lg:flex).
- A decorative crimson line sits below the last word.

### 5. Added Center Image Above Why Us
- Added an Unsplash architectural/academic image above the "Why Us" subsection.
- Image has grayscale filter, a crimson left border accent, and a gradient overlay.
- Responsive height: 200px on mobile, 280px on sm, 340px on md.

### 6. Made Why Us Section More Inspiring and Visionary
- Changed opening line from "Artemis is not a new university. It is a new species of university." to **"We didn't set out to build another university. It is a new species of university."**
- Added powerful manifesto line before the points: **"We set out to build the university that every other university will become."** (italic, gray-500).
- Made all 8 points punchier and more concise with conviction-driven language:
  - "Distributed, Not Centralised": Trimmed to essential point about network vs campus.
  - "Affordable by Design": Focused on "Aid is a patch. Affordability is a cure."
  - "Prestige Built": Shortened consortium mention.
  - "Collegiate, Not Corporate": Emphasized "produces minds" vs "produces papers."
  - "Self-Sustaining": "The fire sustains itself."
  - "Post-Disciplinary": More visceral language about problems that matter.
  - "Built for Post-Labour Economy": Directer contrast of homo economicus vs homo eruditus.
  - "Open Infrastructure": Shorter, punchier conclusion.

### 7. Fixed The Ask Section Background Alignment
- Changed outer section from `bg-[#8A0000]` full-width to `bg-gray-50` (neutral background).
- Put the crimson background + content inside the max-w-[1400px] container with `bg-[#8A0000] p-8 sm:p-12 lg:p-20`.
- The crimson block is now contained within the site's alignment, matching other sections.

### 8. Redesigned Give Now Section
- Replaced flat gray boxes with a new two-column layout (7:5 ratio on lg).
- **Left column** (lg:col-span-7): Amount selection + Donor Details + Payment method, each in separate white cards with subtle shadows and crimson-accented headers.
- Amount selection buttons now have shadow effects and smooth transitions.
- Input fields use bg-gray-50 with subtle focus rings.
- **Right column** (lg:col-span-5): Sticky "Your Impact" summary card with:
  - Large amount display
  - Giving Circle badge with border-l-4 accent
  - "What this enables" section showing impact description
  - Placeholder text when no amount selected
  - Prominent "Give Now" button with `shadow-lg shadow-[#8A0000]/25` and `whileHover`/`whileTap` framer-motion animations (scale 1.02/0.98)
  - SSL encryption notice
- Payment method cards have subtle shadow on active state.
- Removed the separate summary bar at the bottom; everything is consolidated in the Impact card.

---

### Verification
- Page loads with HTTP 200 on both `/` and `/?page=give`
- Dev server running on port 3000
- All existing data arrays (FIVE_PILLARS, NAMING_OPPORTUNITIES, GIVING_CIRCLES, etc.) kept intact
- All state management and form submission logic preserved
- Framer-motion animations maintained
- 'use client' directive preserved
