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