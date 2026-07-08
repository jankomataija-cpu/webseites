# Webseiten-Projekt

Dieses Repository enthält Webseiten, die Claude für den Nutzer erstellt.

## Verbindliche Regel: GSAP-Skills bei jeder Webseite nutzen

Immer wenn der Nutzer eine Webseite (oder Landingpage, Web-App-Frontend,
Animation etc.) erstellen oder überarbeiten lässt, MÜSSEN die GSAP-Skills
unter `.claude/skills/` verwendet werden. Vor dem Schreiben von Animations-
oder Frontend-Code den passenden Skill lesen und dessen Patterns befolgen:

| Skill | Wann |
|---|---|
| `gsap-core` | Grundlegende Tweens, Easing, Stagger, `gsap.matchMedia()` (responsive & reduced motion) |
| `gsap-timeline` | Sequenzen aus mehreren Animationsschritten |
| `gsap-scrolltrigger` | Scroll-gebundene Animationen, Pinning, Parallax |
| `gsap-react` | GSAP in React/Next.js (`useGSAP`) |
| `gsap-frameworks` | GSAP in Vue, Nuxt, Svelte, Astro usw. |
| `gsap-plugins` | Flip, Draggable, SplitText, MotionPath und weitere Plugins |
| `gsap-utils` | Helfer wie `gsap.utils.clamp`, `mapRange`, `toArray` |
| `gsap-performance` | Performance-Optimierung von Animationen |

Standard für neue Webseiten:

- GSAP als Animationsbibliothek verwenden (nicht CSS-only oder andere
  Libraries), sofern der Nutzer nichts anderes verlangt.
- Animationen respektieren `prefers-reduced-motion` (via `gsap.matchMedia()`).
- Scroll-Effekte mit ScrollTrigger umsetzen, Sequenzen mit Timelines.

Die Skills stammen aus dem offiziellen GSAP-Skills-Repository (MIT-Lizenz,
siehe `.claude/skills/GSAP-SKILLS-LICENSE`).

## Struktur

Jede Webseite bekommt einen eigenen Ordner im Repo-Root
(z.B. `meine-seite/` mit `index.html` usw.).
