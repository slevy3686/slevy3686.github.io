// global bc need for draw() & mousepressed()
let a, b1, b2, c, d;

// arrow hitbox, communication between draw() & mousepressed()
let lhitbox_x, lhitbox_y, lhitbox_w, lhitbox_h;
let rhitbox_x, rhitbox_y, rhitbox_w, rhitbox_h;

// ARROW COLOR GLOBALS
let leftArrowColor;
let rightArrowColor;

let leftArrowClickedTime = null;
let rightArrowClickedTime = null;

let arrowFlashDuration = 350; // ms to stay highlighted

let currentState;

function preload() {
  font = loadFont("media/consolas.ttf");
  primsec_img = loadImage("media/esa.jpeg");
  tertiary_img = loadImage("media/lsu.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);
  angleMode(DEGREES);

  // STATE
  state_welcome = new State("welcome");
  state_background = new State("background");
  state_projects = new State("projects");
  state_extras = new State("extras");

  state_welcome.next = state_background;
  state_background.next = state_projects;
  state_projects.next = state_extras;
  state_extras.next = state_welcome;

  state_welcome.prev = state_extras;
  state_extras.prev = state_projects;
  state_projects.prev = state_background;
  state_background.prev = state_welcome;
  
  currentState = state_welcome;

  // LINK - EDUCATION
  link_primsec = createA("https://www.esacadiana.com/", "primary/secondary", "_self");
  link_tertiary = createA("https://www.lsu.edu/", "tertiary", "_self");

  // LINK - EXAMPLES
  link_gallery = createA("https://slevy3686.github.io/CSC_2463/Assignment1/", "gallery", "_self");
  link_sprite = createA("https://slevy3686.github.io/CSC_2463/Assignment3/", "sprite", "_self");
  link_bug = createA("https://slevy3686.github.io/CSC_2463/Assignment4/", "bug", "_self");
  link_sampler = createA("https://slevy3686.github.io/CSC_2463/Assignment5/", "sampler", "_self");
  link_keyboard = createA("https://slevy3686.github.io/CSC_2463/Assignment6/", "keyboard", "_self");
  link_easel = createA("https://slevy3686.github.io/CSC_2463/Assignment8/", "easel", "_self");

  // INITIAL COLOR PALETTE & ARROW COLOR
  current_colorpalette = colorPalettes[paletteIndex];

  leftArrowColor = current_colorpalette.accent;
  rightArrowColor = current_colorpalette.accent;
}

function draw() {
  let leftRightRatio = 0.0417;
  let topRatio = 0.143;
  let bottomRatio = 0.0417;
  let textMarginRatio = 0.05;

  let headerTextSize = windowHeight * 0.044;
  let cornerRadius = min(windowWidth, windowHeight) * 0.03;

  let strokeWidth = 3;
  textFont(font);

  let educationlinks = [
    link_primsec, 
    link_tertiary
  ];

  let examplelinks = [
    link_gallery,
    link_sprite,
    link_bug,
    link_sampler,
    link_keyboard,
    link_easel
  ];

  let startbody = gen_startbody(windowWidth, windowHeight, leftRightRatio, topRatio, bottomRatio);
  
  //BODY
  let rectY = windowHeight * topRatio;
  let rectH = windowHeight * (1 - topRatio - bottomRatio);

  //SPACE BETWEEN BODY HEIGHT AND WINDOW HEIGHT
  let bottomPadding = windowHeight - (rectY + rectH);

  switch(currentState) {
    //WELCOME
    case state_welcome:
      background(current_colorpalette.background.h, 
        current_colorpalette.background.s, 
        current_colorpalette.background.l
      );
      
      for (let l of educationlinks) l.hide();
      for (let l of examplelinks) l.hide();

      fill(current_colorpalette.body.h, 
        current_colorpalette.body.s, 
        current_colorpalette.body.l
      );

      rect(
        startbody.x, 
        startbody.y, 
        startbody.w, 
        startbody.h, 
        startbody.cornerRadius
      );

      // HEADER
      noStroke();
      fill(current_colorpalette.accent.h, 
        current_colorpalette.accent.s, 
        current_colorpalette.accent.l
      );

      let welcome_tb = textbox(
        startbody.x, 
        startbody.y, 
        startbody.w, 
        startbody.h,  
        textMarginRatio
      );

      textSize(startbody.h/25);

      textWrap(WORD);
      textAlign(LEFT,TOP);
      text(
        `to change SLIDES:

        -> L/R arrow keys
        -> arrows at top of screen
        
        to change COLOR PALETTE:

        -> 'C' key`, 
        welcome_tb.x, welcome_tb.y, welcome_tb.w, welcome_tb.h
      );

      textAlign(RIGHT,BOTTOM);
      text(
        `© Levy 2026
        latest update: 2/20/26`, 
        welcome_tb.x, welcome_tb.y, welcome_tb.w, welcome_tb.h
      );

      textAlign(CENTER,CENTER);
      textSize(headerTextSize);
      text("welcome", windowWidth/2, (windowHeight/7)/2);
    break;

    //BACKGROUND
    case state_background: {
      background(current_colorpalette.background.h, 
        current_colorpalette.background.s, 
        current_colorpalette.background.l
      );

      for (let l of educationlinks) l.show();
      for (let l of examplelinks) l.hide();

      let BkGr_Slice = hslice(startbody.x, startbody.y, startbody.w, startbody.h, bottomPadding, 0.2);
      // BkGr_Slice.slice1 = top slice
      // BkGr_Slice.slice2 = bottom slice

      //DRAW SLICES
      fill(current_colorpalette.body.h, 
        current_colorpalette.body.s, 
        current_colorpalette.body.l
      );

      rect(
        BkGr_Slice.slice1.x, 
        BkGr_Slice.slice1.y, 
        BkGr_Slice.slice1.w, 
        BkGr_Slice.slice1.h, 
        cornerRadius
      );
      rect(
        BkGr_Slice.slice2.x, 
        BkGr_Slice.slice2.y, 
        BkGr_Slice.slice2.w, 
        BkGr_Slice.slice2.h, 
        cornerRadius
      );

      //TEXT BOX - TOP SLICE
      let TS_textbox = textbox(BkGr_Slice.slice1.x, BkGr_Slice.slice1.y, BkGr_Slice.slice1.w, BkGr_Slice.slice1.h, textMarginRatio);
      
      let h = (TS_textbox.h / 6);
      let textA_y = (TS_textbox.y + h);
      let textB_y = (TS_textbox.y + (h * 4));

      textAlign(LEFT, TOP);
      textWrap(WORD);

      noStroke();
      fill(current_colorpalette.accent.h, 
        current_colorpalette.accent.s, 
        current_colorpalette.accent.l
      );

      textSize(h/1.05);
      text("Name: S.J. Levy", TS_textbox.x, textA_y, TS_textbox.w, h);
      text("From: LAFAYETTE (LA); NEW IBERIA (LA)", TS_textbox.x, textB_y, TS_textbox.w, h);

      //TEXT BOX - BOTTOM SLICE
      let BS_textbox = textbox(BkGr_Slice.slice2.x, BkGr_Slice.slice2.y, BkGr_Slice.slice2.w, BkGr_Slice.slice2.h, textMarginRatio);

      // BOTTOM SLICE TEXT BOX - NESTED TEXT BOX CALCULATIONS
      let w = (BS_textbox.w / 12);

      let bdr_x = (BS_textbox.x + w);
      let lnk_x = (BS_textbox.x + w);

      let bdr_w = (w * 3);

      let txt_x = (BS_textbox.x + (w * 6));
      let txt_w = (w * 5);

      let n = (BS_textbox.h / 14);

      let bdr_h = (n * 3);
      let txt_h = (n * 5);

      let bdr1_y = (BS_textbox.y + n);
      let txt1_y = (BS_textbox.y + n);
      let lnk1_y = (BS_textbox.y + (n * 5));

      let bdr2_y = (BS_textbox.y + (n * 8));
      let txt2_y = (BS_textbox.y + (n * 8));
      let lnk2_y = (BS_textbox.y + (n * 12));

      //IMAGE BORDERS
      rect(bdr_x, bdr1_y, bdr_w, bdr_h);
      rect(bdr_x, bdr2_y, bdr_w, bdr_h);

      // IMAGE DIMENSIONS
      let img_x = (bdr_x - strokeWidth);
      let img1_y = (bdr1_y - strokeWidth);
      let img2_y = (bdr2_y - strokeWidth);
      let img_w = (bdr_w - strokeWidth);
      let img_h = (bdr_h - strokeWidth);

      // UPDATE IMAGE DIMENSIONS GLOBAL
      a = img_x;
      b1 = img1_y;
      b2 = img2_y;
      c = img_w;
      d = img_h;

      //IMAGES
      image(primsec_img, img_x, img1_y, img_w, img_h);
      image(tertiary_img, img_x, img2_y, img_w, img_h);

      //LINKS
      link_primsec.position(lnk_x, lnk1_y);
      link_primsec.size(bdr_w, n);
      link_primsec.style("color", current_colorpalette.highlightString);
      link_tertiary.position(lnk_x, lnk2_y);
      link_tertiary.size(bdr_w, n);
      link_tertiary.style("color", current_colorpalette.highlightString);

      // TEXT
      textSize(txt_h/10.75);
      text(
        "PRIMARY/SECONDARY EDUCATION: \n Episcopal School of Acadiana \n\n -> DEGREE: Highschool Diploma \n -> GRAD. YEAR: Spring, 2022", 
        txt_x, txt1_y, txt_w, txt_h
      );
      text(
        "TERTIARY EDUCATION: \n Louisiana State University \n\n -> DEGREE: BA in Computer Science (Software Engineering) \n -> GRAD. YEAR: Fall, 2026", 
        txt_x, txt2_y, txt_w, txt_h
      );

      // HEADER
      textAlign(CENTER,CENTER);
      textSize(headerTextSize);
      text("background", windowWidth/2, (windowHeight/7)/2);
      break;
    }

    //PROJECTS
    case state_projects: {
      background(current_colorpalette.background.h, 
        current_colorpalette.background.s, 
        current_colorpalette.background.l
      );

      for (let l of educationlinks) l.hide();
      for (let l of examplelinks) l.show();

      // SLICES
      let Proj_Slice = vslice(startbody.x, startbody.y, startbody.w, startbody.h, windowWidth, leftRightRatio, 0.8);
      // Proj_Slice.slice1 = left slice
      // Proj_Slice.slice1 = right slice

      // DRAW SLICES
      noStroke();
      fill(current_colorpalette.body.h, 
        current_colorpalette.body.s, 
        current_colorpalette.body.l
      );

      rect(
        Proj_Slice.slice1.x, 
        Proj_Slice.slice1.y, 
        Proj_Slice.slice1.w, 
        Proj_Slice.slice1.h, 
        cornerRadius
      );
      rect(
        Proj_Slice.slice2.x, 
        Proj_Slice.slice2.y, 
        Proj_Slice.slice2.w, 
        Proj_Slice.slice2.h, 
        cornerRadius
      );

      // TEXTBOX (LEFT)
      let LSlice_TB = textbox(Proj_Slice.slice1.x, Proj_Slice.slice1.y, Proj_Slice.slice1.w, Proj_Slice.slice1.h, textMarginRatio);

      let line_h = (LSlice_TB.h / 5);

      let line2_y = (LSlice_TB.y + line_h);
      let line3_y = (LSlice_TB.y + (line_h * 2));
      let line4_y = (LSlice_TB.y + (line_h * 3));
      let line5_y = (LSlice_TB.y + (line_h * 4));

      // TEXT
      fill(current_colorpalette.accent.h, 
        current_colorpalette.accent.s, 
        current_colorpalette.accent.l
      );
      textWrap(WORD);
      textAlign(LEFT, TOP);
      textSize(Proj_Slice.slice1.h/40);

      text(
        "PYTHON: higher-level math, physics, geometry, statistics etc. calculators and/or simulators",
        LSlice_TB.x, LSlice_TB.y, LSlice_TB.w, LSlice_TB.h
      );
      text(
        "SQL: creation of a database (schema & query design)",
        LSlice_TB.x, line2_y, LSlice_TB.w, LSlice_TB.h
      );
      text(
        "JAVA, JLEX: tiger compiler (lexer, parser, semantic analyzer, type-checker, register allocation)",
        LSlice_TB.x, line3_y, LSlice_TB.w, LSlice_TB.h
      );
      text(
        "JAVASCRIPT: various web-dev projects (some examples to the right), including communication between browser & external hardware (arduino)",
        LSlice_TB.x, line4_y, LSlice_TB.w, LSlice_TB.h
      );
      text(
        `C: various projects involving...

        process/thread creation, scheduling, management, error handling, library creation, dynamic linking, scripting, file permissions, etc.`,
        LSlice_TB.x, line5_y, LSlice_TB.w, LSlice_TB.h
      );

      //TEXTBOXES (RIGHT)
      let RSlice_TB = textbox(Proj_Slice.slice2.x, Proj_Slice.slice2.y, Proj_Slice.slice2.w, Proj_Slice.slice2.h, textMarginRatio);

      RSlice_LinkSpace = hslice(RSlice_TB.x, RSlice_TB.y, RSlice_TB.w, RSlice_TB.h, bottomPadding, 1/7);
      // RSlice_LinkSpace.slice1 = 1/7 of RSlice text box
      // RSlice_LinkSpace.slice2 = 6/7 of RSlice text box

      text(
        "webdev. \n examples:", 
        RSlice_LinkSpace.slice1.x, 
        RSlice_LinkSpace.slice1.y, 
        RSlice_LinkSpace.slice1.w, 
        RSlice_LinkSpace.slice1.h
      );

      // RSlice_LinkSpace.slice2.h = height of 5/6 of RSlice text box
      // (RSlice_LinkSpace.slice2.h / 5) = 1/5 of height of RSlice text box = h
      let h = (RSlice_LinkSpace.slice2.h / 6);

      // Slice_LinkSpace.slice2.y = (staring y pos of) 1st 1/6 of RSlice text box
      link_gallery.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y);
      // (Slice_LinkSpace.slice2.y + h) = (staring y pos of) 2nd 1/6 of RSlice text box
      link_sprite.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y + h);
      // (Slice_LinkSpace.slice2.y + (h * 2)) = (staring y pos of) 3rd 1/6 of RSlice text box
      link_bug.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y + (h * 2));
      // (Slice_LinkSpace.slice2.y + (h * 3)) = (staring y pos of) 4th 1/6 of RSlice text box
      link_sampler.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y + (h * 3));
      // (Slice_LinkSpace.slice2.y + (h * 4)) = (staring y pos of) 5th 1/6 of RSlice text box
      link_keyboard.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y + (h * 4));
      // (Slice_LinkSpace.slice2.y + (h * 5)) = (staring y pos of) 6th 1/6 of RSlice text box
      link_easel.position(RSlice_TB.x, RSlice_LinkSpace.slice2.y + (h * 5));

      link_gallery.style("color", current_colorpalette.highlightString);
      link_sprite.style("color", current_colorpalette.highlightString);
      link_bug.style("color", current_colorpalette.highlightString);
      link_sampler.style("color", current_colorpalette.highlightString);
      link_keyboard.style("color", current_colorpalette.highlightString);
      link_easel.style("color", current_colorpalette.highlightString);

      link_gallery.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);
      link_sprite.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);
      link_bug.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);
      link_sampler.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);
      link_keyboard.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);
      link_easel.size(RSlice_LinkSpace.slice1.w, RSlice_LinkSpace.slice1.h);

      // HEADER
      textAlign(CENTER,CENTER);
      textSize(headerTextSize);
      text("projects", windowWidth/2, (windowHeight/7)/2);
      break;
    }

    //EXTRAS
    case state_extras: {
      background(current_colorpalette.background.h, 
        current_colorpalette.background.s, 
        current_colorpalette.background.l
      );

      for (let l of educationlinks) l.hide();
      for (let l of examplelinks) l.hide();

      // SLICES
      let Ex_Slice = hslice(
        startbody.x, 
        startbody.y, 
        startbody.w, 
        startbody.h, 
        bottomPadding, 
        1/3
      );
      // Ex_Slice.slice1 = top 1/3 slice
      // Ex_Slice.slice2 = bottom 2/3 slice

      let Ex_Slice2 = hslice(
        Ex_Slice.slice2.x, 
        Ex_Slice.slice2.y, 
        Ex_Slice.slice2.w, 
        Ex_Slice.slice2.h, 
        bottomPadding, 
        1/2
      );

      // Ex_Slice2.slice1 = mid 4/3 slice
      // Ex_Slice2.slice2 = bottom 4/3 slice

      // DRAW SLICES
      noStroke();
      fill(current_colorpalette.body.h, 
        current_colorpalette.body.s, 
        current_colorpalette.body.l
      );

      rect(
      Ex_Slice.slice1.x, 
      Ex_Slice.slice1.y, 
      Ex_Slice.slice1.w, 
      Ex_Slice.slice1.h, 
      cornerRadius
      );

      rect(
      Ex_Slice2.slice1.x, 
      Ex_Slice2.slice1.y, 
      Ex_Slice2.slice1.w, 
      Ex_Slice2.slice1.h, 
      cornerRadius
      );

      rect(
      Ex_Slice2.slice2.x, 
      Ex_Slice2.slice2.y, 
      Ex_Slice2.slice2.w, 
      Ex_Slice2.slice2.h, 
      cornerRadius
      );

      // TEXT BOXES
      top_textbox = textbox(
        Ex_Slice.slice1.x, 
        Ex_Slice.slice1.y, 
        Ex_Slice.slice1.w, 
        Ex_Slice.slice1.h, 
        textMarginRatio
      );
      mid_textbox = textbox(
        Ex_Slice2.slice1.x, 
        Ex_Slice2.slice1.y, 
        Ex_Slice2.slice1.w, 
        Ex_Slice2.slice1.h, 
        textMarginRatio
      );
      bottom_textbox = textbox(
        Ex_Slice2.slice2.x, 
        Ex_Slice2.slice2.y, 
        Ex_Slice2.slice2.w, 
        Ex_Slice2.slice2.h, 
        textMarginRatio
      );

      // TEXT
      fill(current_colorpalette.accent.h, 
        current_colorpalette.accent.s, 
        current_colorpalette.accent.l
      );

      let z = 10;

      textWrap(WORD);
      textAlign(LEFT, TOP);      
      textSize(top_textbox.h/z);

      text(
        `OTHER EXPERIENCE:

        -> individually/independently produced a micro-documentary (video editing/directing)
        -> 8 months of service-industry experience (multi-tasking/pacing)`, 
        top_textbox.x, top_textbox.y, top_textbox.w, top_textbox.h
      );

      textSize(mid_textbox.h/z);
      text(
        `OTHER (CS) AREAS OF INTEREST:
        
        -> audio engineering
        -> 3d digital modeling, texturing, animation
        -> LLM training
        -> (ethical) offensive & defensive cybersecurity`, 
        mid_textbox.x, mid_textbox.y, mid_textbox.w, mid_textbox.h
      );
      text(
        `OTHER (NON-CS) AREAS OF INTEREST:
        
        -> climatology/meteorology
        -> microbiology`, 
        bottom_textbox.x, bottom_textbox.y, bottom_textbox.w, bottom_textbox.h
      );

      // HEADER
      textAlign(CENTER,CENTER);
      textSize(headerTextSize);
      text("extras", windowWidth/2, (windowHeight/7)/2);
      break;
    }
  }

  // CLICK-ABLE ARROWS

  // LEFT reset
  if (leftArrowClickedTime &&
      millis() > leftArrowClickedTime + arrowFlashDuration) {
    leftArrowColor = current_colorpalette.accent;
    leftArrowClickedTime = null;
  }

  // RIGHT reset
  if (rightArrowClickedTime &&
      millis() > rightArrowClickedTime + arrowFlashDuration) {
    rightArrowColor = current_colorpalette.accent;
    rightArrowClickedTime = null;
  }

  let left_arrow = larrow(
    startbody.x, 
    startbody.y, 
    startbody.w, 
    windowHeight, 
    bottomPadding
  );
  let right_arrow = rarrow(
    startbody.x, 
    startbody.y, 
    startbody.w, 
    windowHeight, 
    bottomPadding
  );

  fill(
    leftArrowColor.h, 
    leftArrowColor.s, 
    leftArrowColor.l
  );
  triangle(
    left_arrow.top.x,
    left_arrow.top.y,
    left_arrow.tip.x,
    left_arrow.tip.y,
    left_arrow.bottom.x,
    left_arrow.bottom.y
  );

  fill(
    rightArrowColor.h, 
    rightArrowColor.s, 
    rightArrowColor.l
  );
  triangle(
    right_arrow.top.x,
    right_arrow.top.y,
    right_arrow.tip.x,
    right_arrow.tip.y,
    right_arrow.bottom.x,
    right_arrow.bottom.y
  );

  // ARROW HIT BOXES
  let l_hitbox = hitbox(left_arrow);
  let r_hitbox = hitbox(right_arrow);

  lhitbox_x = l_hitbox.x;
  lhitbox_y = l_hitbox.y;
  lhitbox_w = l_hitbox.w;
  lhitbox_h = l_hitbox.h;

  rhitbox_x = r_hitbox.x;
  rhitbox_y = r_hitbox.y;
  rhitbox_w = r_hitbox.w;
  rhitbox_h = r_hitbox.h;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    leftArrowColor = current_colorpalette.highlight;
    leftArrowClickedTime = millis();

    currentState = currentState.prev;

    tick.start();
  }
  if (keyCode === RIGHT_ARROW) {
    rightArrowColor = current_colorpalette.highlight;
    rightArrowClickedTime = millis();

    currentState = currentState.next;

    tick.start();
  }

  if (key.toUpperCase() === 'C') {
    paletteIndex++;

    if (paletteIndex >= colorPalettes.length) paletteIndex = 0;
    current_colorpalette = colorPalettes[paletteIndex];

    leftArrowColor = current_colorpalette.accent;
    rightArrowColor = current_colorpalette.accent;
  }
}

function mouseClicked() {
  //CLICK IMAGES
  if (currentState === state_background) {
    console.log("clicked");

    if (mouseX > a && mouseX < a + c &&
        mouseY > b1 && mouseY < b1 + d) {
      window.open("https://www.esacadiana.com/", "_self");
    }

    if (mouseX > a && mouseX < a + c &&
        mouseY > b2 && mouseY < b2 + d) {
      window.open("https://www.lsu.edu/", "_self");
    }
  }

  // CLICK ARROWS
  if (mouseX > lhitbox_x && mouseX < lhitbox_x + lhitbox_w 
    && mouseY > lhitbox_y && mouseY < lhitbox_y + lhitbox_h) {
      leftArrowColor = current_colorpalette.highlight;
      leftArrowClickedTime = millis();

      currentState = currentState.prev;

      tick.start();
    }

  if (mouseX > rhitbox_x && mouseX < rhitbox_x + rhitbox_w 
    && mouseY > rhitbox_y && mouseY < rhitbox_y + rhitbox_h) {
      rightArrowColor = current_colorpalette.highlight;
      rightArrowClickedTime = millis();

      currentState = currentState.next;

      tick.start();
    }
}