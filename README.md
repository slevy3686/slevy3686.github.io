## Table of Contents

- [Website Template](#website-template)
- [Bug-Squashing Game](#bug-squashing-game)
- [Virtual Keyboard](#virtual-keyboard)
- [Browser Canvas](#browser-canvas)

## Website Template

**Filepath:** `portfolio`

### What is it?

- A template for a minimal website where pages function like a horizontal slideshow, presented via a retro, terminal-inspired visual language.

**(Demo video)**

### Strongest Design Points

- **Reusable geometry libraries:** `bodylib.js`, `slicelib.js`, and `arrowlib.js` separate layout calculations from rendering.
- **Responsive design:** Dimensions and spacing are calculated from `windowWidth`/`windowHeight` ratios rather than fixed pixel values.
- **State-based navigation:** Pages are represented as linked `State` objects with explicit previous/next relationships.
- **Centralized color system:** Palettes are represented as reusable `ColorPalette` objects, allowing the entire interface to change palettes consistently.
- **Separation of concerns:** Drawing, geometry, color configuration, and interaction logic are kept in separate libraries/files.

### Try it Yourself

> **NOTE:** Images are linked/clickable!

https://slevy3686.github.io/portfolio/

## Bug-Squashing Game

**Filepath:** `CSC_2463/Assignment4`

### What is it?

- Browser game featuring moving bugs that can be clicked on to "squash." The player has 30 seconds to earn points, with bug speed increasing after each successful click.

**(Demo video)**

### Strongest Design Points

1. Made bugs change direction at timed intervals and reverse direction when reaching the edge of the screen.
2. Used bug animation states to switch between movement animations and a unique squashing animation when clicked.
3. Bug movement speed increases as the player squashes bugs.
4. Implemented bounding-box detection to determine when a bug is clicked.

### Try it Yourself

https://slevy3686.github.io/CSC_2463/Assignment4/

## Virtual Keyboard

**Filepath:** `CSC_2463/Assignment6`

### What is it?

- A browser-based keyboard synthesizer where computer keys correspond to musical notes. Includes adjustable delay, feedback, distortion, and reverb effects, along with a short melody to play.

**(Demo video)**

### Strongest Design Points

- Used `Tone.PolySynth` to allow multiple notes to be played at once.
- Used sliders to adjust audio effect parameters while the synthesizer is running.
- Used separate key press and key release events to control when notes begin and end.

### Try it Yourself

https://slevy3686.github.io/CSC_2463/Assignment6/

## Browser Canvas

**Filepath:** `CSC_2463/Assignment8`

### What is it?

- An interactive browser easel and color palette. Clicking a color selects the drawing color, while dragging across the canvas draws lines and changes the background noise's filter and stereo panning based on the mouse position.

**(Demo video)**

### Strongest Design Points

- Mapped the mouse position to control the music's filter frequency and stereo panning.
- Increased the music's tempo when the user interacts with the canvas.
- Used color selection to trigger sound effects while setting the drawing color, including a sound effect when clearing the canvas.

### Try it Yourself

https://slevy3686.github.io/CSC_2463/Assignment8/
