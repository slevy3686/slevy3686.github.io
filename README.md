Table of Contents
- Website Template
- Bug-Squashing Game
- Virtual Keyboard
- Browser Canvas

Website Template (filepath: portfolio)
What is it?

A template for a minimal website where pages function like a horizontal slideshow, presented via a retro, terminal-inspired visual language.

(demo vid)

Strongest design points:

- Reusable geometry libraries: bodylib.js, slicelib.js, and arrowlib.js separate layout calculations from rendering.
- Responsive design: dimensions and spacing are calculated from windowWidth/windowHeight ratios rather than fixed pixel values.
- State-based navigation: pages are represented as linked State objects with explicit prev/next relationships.
- Centralized color system: palettes are represented as reusable colorpalette objects, allowing the entire interface to change palettes consistently.
- Separation of concerns: drawing, geometry, color configuration, and interaction logic are kept in separate libraries/files.

Try it Yourself:
note: images are linked/clickable!
https://slevy3686.github.io/portfolio/

Bug-Squashing Game (filepath: CSC_2463/Assignment4)
What is it?
Browser game featuring moving bugs that can be clicked on to "squash". The player has 30 seconds to earn points, with bug speed increasing after each successful click.

(demo vid)

Strongest design points
1. Made bugs change direction at timed intervals and reverse direction when reaching the edge of the screen.
2. Used bug animation states to switch between movement animations and a unique squashing animation when clicked.
3. Bug movement speed increases as the player squashes bugs.
4. Implemented bounding-box detection to determine when a bug is clicked.


Try it yourself: https://slevy3686.github.io/CSC_2463/Assignment4/

Virtual Keyboard (filepath: CSC_2463/Assignment6)
What is it?

(demo vid)

Strongest design points

Try it yourself: https://slevy3686.github.io/CSC_2463/Assignment6/

Browser Canvas (filepath: CSC_2463/Assignment8)
What is it?

(demo vid)

Strongest design points

Try it yourself: https://slevy3686.github.io/CSC_2463/Assignment8/
