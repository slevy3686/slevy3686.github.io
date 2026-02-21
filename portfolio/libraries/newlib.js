//returns dimensions of starter body based on ratios and window dimensions
function gen_startbody(windowWidth, windowHeight, leftRightRatio, topRatio, bottomRatio) {
  let rectX = windowWidth * leftRightRatio;
  let rectY = windowHeight * topRatio;
  let rectW = windowWidth * (1 - 2 * leftRightRatio);
  let rectH = windowHeight * (1 - topRatio - bottomRatio);
  let cornerRadius = min(windowWidth, windowHeight) * 0.03;

  return { x: rectX, y: rectY, w: rectW, h: rectH, cornerRadius: cornerRadius };
}

//returns padding in accordance to ratios, for any rectangle
function padding(bodyX, bodyY, bodyW, bodyH, paddingRatio) {
  let innerX = bodyX + bodyW * paddingRatio;
  let innerY = bodyY + bodyH * paddingRatio;
  let innerW = bodyW * (1 - 2 * paddingRatio);
  let innerH = bodyH * (1 - 2 * paddingRatio);

  let paddingWidthRatio = (bodyW - innerW) / bodyW;   // total padding / body width
  let paddingHeightRatio = (bodyH - innerH) / bodyH;  // total padding / body height

  return {
    x: innerX,
    y: innerY,
    w: innerW,
    h: innerH,
    paddingWidthRatio,
    paddingHeightRatio
  };
}



//returns dimensions of each slice of a horizontally-sliced body (with weighted slices)
function hslice(x, y, w, h, bottomPadding, slice1Weight) {
  let remainingHeight = h - bottomPadding;       // available height after bottom padding
  let slice1H = remainingHeight * slice1Weight; // top slice height
  let slice2H = remainingHeight * (1 - slice1Weight); // bottom slice height

  let slice1Y = y;
  let slice2Y = y + slice1H + bottomPadding; // bottom slice starts after top + padding

  return {
    slice1: { x: x, y: slice1Y, w: w, h: slice1H },
    slice2: { x: x, y: slice2Y, w: w, h: slice2H }
  };
}

//returns dimensions of each slice of a vertically-sliced body (with weighted slices)
function vslice(x, y, w, h, windowWidth, leftRightRatio, slice1Weight) {

  let slicePadding = windowWidth * leftRightRatio;      // horizontal padding between slices (same ratio as body margins)
  let remainingWidth = w - slicePadding;                // available width after padding

  // slice widths
  let slice1W = remainingWidth * slice1Weight; 
  let slice2W = remainingWidth * (1 - slice1Weight);

  // slice positions
  let slice1X = x;
  let slice2X = x + slice1W + slicePadding;

  return {
    slice1: { x: slice1X, y: y, w: slice1W, h: h },
    slice2: { x: slice2X, y: y, w: slice2W, h: h }
  };
}


//returns 'inner slice' dimensions
//for text-box purposes, and slicing that text-box and so on
function textbox(x, y, w, h, m) {

  let newX = x + w * m;
  let newY = y + h * m;
  let newW = w * (1 - 2 * m);
  let newH = h * (1 - 2 * m);

  return { x: newX, y: newY, w: newW, h: newH };
}

class State {
  constructor(name) {
    this.name = name;
    this.prev = null;
    this.next = null;
  }
}