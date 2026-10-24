---
name: Neo-Brutalist Technical Surface
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#414751'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#717783'
  outline-variant: '#c1c7d3'
  surface-tint: '#0060ac'
  primary: '#0060ac'
  on-primary: '#ffffff'
  primary-container: '#60a5fa'
  on-primary-container: '#003a6b'
  inverse-primary: '#a4c9ff'
  secondary: '#a83639'
  on-secondary: '#ffffff'
  secondary-container: '#fe7676'
  on-secondary-container: '#720b17'
  tertiary: '#006d36'
  on-tertiary: '#ffffff'
  tertiary-container: '#0eba61'
  on-tertiary-container: '#00421e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#881d24'
  tertiary-fixed: '#6dfe9c'
  tertiary-fixed-dim: '#4de082'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005227'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  display:
    fontFamily: Chivo
    fontSize: 56px
    fontWeight: '900'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Chivo
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Chivo
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Chivo
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Chivo
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0em
  title:
    fontFamily: Chivo
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-mono:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-code:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an elevated neo-brutalist technical aesthetic built for high-throughput instrumentation, systems monitoring, and modern developer infrastructure. It balances uncompromising Swiss functionalism with unapologetic structural brutality: rigid orthogonal grids, heavy architectural borders, and crisp, stark geometry. 

The brand personality is precise, defiant, and engineering-driven. Instead of generic corporate softness, the interface communicates structural permanence and absolute tactile clarity. Content and data take front stage against a clinical, stark canvas, energized by deliberate, high-saturation electric blue accents and rigid hard-edge elevations.

## Colors

The color system operates on an uncompromising, high-contrast monochrome foundation accentuated by deliberate chromatic pulses:

- **Monochrome Foundation:** Surfaces utilize stark white (`#FFFFFF`) and architectural zinc-100 (`#F4F4F5`), bounded by high-contrast zinc-900 / black (`#09090B` / `#000000`) for structural divisions and typography.
- **Primary Electric Pulse:** Seeded by `#60A5FA` (blue-400), serving as the primary interactive locus, active selection state, and execution highlight.
- **Chromatic State Accents:** Secondary `#F87171` (red-400) for alerts and destructive events; Tertiary `#4ADE80` (green-400) for nominal operational status; complementary yellow-400 (`#FACC15`) and purple-400 (`#C084FC`) for analytical multi-variant categorical metrics.
- **Application Rule:** Colored surfaces never use soft gradients. Color is applied exclusively as flat fills, high-contrast pill tags, or active data points clamped within sharp black framing.

## Typography

The typographic hierarchy pairs the heavy structural weight of **Chivo** for display headings with the precision of **Geist** for dense analytical reading and metadata:

- **Headlines (Chivo):** Set tightly with aggressive negative tracking. Section titles and dashboard block labels leverage uppercase styling to reinforce structural tension.
- **Body & Data (Geist):** Clean, neutral, high-legibility execution across micro-tables, metrics, logs, and dense administrative surfaces.
- **Labels (`label-mono` / `label-code`):** Emphasized with uppercase transformation and letter spacing to deliver unmistakable technical clarity in status bars, pill tags, and key-value tables.

## Layout & Spacing

The layout is grounded in a rigid 12-column modular grid framed by explicit 3px outer containment lines:

- **Desktop (1024px+):** 12 columns, 1.5rem (`24px`) gutters, and 2rem (`32px`) margins. Modular widgets snap to integer column spans (3, 4, 6, 8, 12).
- **Tablet (768px - 1023px):** 6 columns with 1.25rem gutters. Cards reflow from horizontal split blocks into two-column arrangements.
- **Mobile (< 768px):** 2 or 4 columns with 1rem (`16px`) gutters and margins. Side panels fold into full-width stacked drawers.
- **Rhythm:** Spacing follows an absolute 8px module. Padding inside structural frames uses `space-md` (16px) or `space-lg` (24px) to retain structural tension without clutter.

## Elevation & Depth

This system intentionally rejects soft blur-based shadows and diffuse atmospheric lighting. Hierarchy is manifested physically through hard offsets and high-contrast structural framing:

- **Structural Outlines:** Every container, card, modal, and button uses an explicit `3px solid #000000` border.
- **Hard Offset Elevation:** Visual elevation is created via hard drop shadows with `0px` blur:
  - *Resting Card / Modal:* `box-shadow: 8px 8px 0px #000000;`
  - *Active / Hover:* `box-shadow: 4px 4px 0px #000000; translate: 4px 4px;`
  - *Pressed / Depressed:* `box-shadow: 0px 0px 0px #000000; translate: 8px 8px;`
- **Surface Layering:** Elevated drawers and overlays retain `3px` solid black borders and sit directly over the substrate with a high-contrast `#000000` overlay at 60% opacity or a dense diagonal hatch pattern.

## Shapes

All UI elements adhere to strict 90-degree geometry (`border-radius: 0px` across all selectors). 

There are no softened corners, concentric radii, or pill-shaped buttons. Every component—from full-bleed metric containers to contextual tooltips, inputs, chips, and avatars—remains an absolute rectangle. This sharp geometric envelope enforces the mechanical, blueprint-inspired aesthetic of the system.

## Components

- **Buttons:**
  - *Primary:* Solid `#60A5FA` background, 3px solid `#000000` border, `box-shadow: 4px 4px 0px #000000`. Text in Chivo bold uppercase. Hover triggers 2px translation towards the shadow origin.
  - *Secondary / Neutral:* Solid `#FFFFFF` or `#F4F4F5` background, 3px solid `#000000` border, 4px hard black shadow.
  - *Destructive:* Solid `#F87171` background with identical border and shadow behavior.
- **Cards & Data Panels:**
  - Constructed with `#FFFFFF` background, 3px solid `#000000` border, and `8px 8px 0px #000000` shadow. Panel headers feature a dedicated `3px solid #000000` bottom separator with uppercase Geist tracking for section metadata.
- **Chips & Tags:**
  - Non-interactive badges use a 2px solid `#000000` border, no shadow, zero radius, and saturated background fills (`#60A5FA`, `#4ADE80`, `#FACC15`, `#C084FC`). Typeface is Geist `label-mono` set in bold uppercase.
- **Inputs & Form Controls:**
  - Text fields use a `#FFFFFF` fill, 3px solid `#000000` border, and 0px radius. On focus, fields project an immediate `4px 4px 0px #60A5FA` hard offset shadow without glowing rings.
- **Checkboxes & Radios:**
  - Explicit square footprints (even for radio buttons, distinguished via internal inset square dots). 3px solid black border. Selected state fills solidly with `#000000` or `#60A5FA`.
- **Data Visualizations:**
  - Charts utilize zero-curvatures: stepped lines, sharp bar geometry with 2px black outlines, and flat categorical fills matching the palette accents (`#60A5FA`, `#4ADE80`, `#F87171`, `#FACC15`). Grid lines are solid `1px #000000` or `1px #D4D4D8`.