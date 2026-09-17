// COLORPALETTE CLASS

class colorpalette {
  constructor(
    bgH, bgS, bgL,                          // background color
    bodyH, bodyS, bodyL,                    // body color
    accentH, accentS, accentL,              // accent color (body text, dormant-arrows, image borders)
    highlightH, highlightS, highlightL      // highlight color (header text, arrows (when cliked), links)
  ) {

    this.background = { h: bgH, s: bgS, l: bgL };
    this.body = { h: bodyH, s: bodyS, l: bodyL };
    this.accent = { h: accentH, s: accentS, l: accentL };
    this.highlight = { h: highlightH, s: highlightS, l: highlightL };

    this.backgroundString = "hsl(" + bgH + ", " + bgS + "%, " + bgL + "%)";
    this.bodyString       = "hsl(" + bodyH + ", " + bodyS + "%, " + bodyL + "%)";
    this.accentString     = "hsl(" + accentH + ", " + accentS + "%, " + accentL + "%)";
    this.highlightString  = "hsl(" + highlightH + ", " + highlightS + "%, " + highlightL + "%)";
  }
}

//COLOR PALETTES

let orange = new colorpalette(
  0, 0, 0,
  12, 100, 50,
  0, 0, 100,
  60, 100, 50
);

// https://coolors.co/palette/2b2d42-8d99ae-edf2f4-ef233c
let navy = new colorpalette(
  218,17,62,
  197,23,94,
  235,21,21,
  353,86,54
);

// ARRAY
let colorPalettes = [navy, orange];

let paletteIndex = 0;
let current_colorpalette = colorPalettes[paletteIndex];
