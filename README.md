# slevy3686.github.io

CSC_2463
- BUG: https://slevy3686.github.io/CSC_2463/Assignment4/
- KEYBOARD: https://slevy3686.github.io/CSC_2463/Assignment6/
- EASEL: https://slevy3686.github.io/CSC_2463/Assignment8/

Table of Contents
- Website Template
- Bug-Squashing Game
- Virtual Keyboard
- Browser Canvas

Website Template
What is it?

(demo vid)

A template for a minimal website where pages function like a horizontal slideshow, presented via a retro, terminal-inspired visual language.

Strongest design points:

- Reusable geometry libraries: bodylib.js, slicelib.js, and arrowlib.js separate layout calculations from rendering.
- Responsive design: dimensions and spacing are calculated from windowWidth/windowHeight ratios rather than fixed pixel values.
- State-based navigation: pages are represented as linked State objects with explicit prev/next relationships.
- Centralized color system: palettes are represented as reusable colorpalette objects, allowing the entire interface to change palettes consistently.
- Separation of concerns: drawing, geometry, color configuration, and interaction logic are kept in separate libraries/files.

Try it Yourself: https://slevy3686.github.io/portfolio/
