// ARROW FUNCTION LIBRARY

// LEFT TRIANGLE
function larrow(rectX, rectY, rectW, windowHeight, bottomPadding) {

  let oneSixthBodyW = rectW / 7;
  let arrowHeight = rectY - bottomPadding * 2;

  let midY = (windowHeight / 7) / 2;
  let topY = midY - arrowHeight / 2;
  let bottomY = midY + arrowHeight / 2;

  let leftArrowTipX = rectX;
  let leftArrowBaseX = rectX + oneSixthBodyW;

  return {
    tip: { x: leftArrowTipX, y: midY },
    top: { x: leftArrowBaseX, y: topY },
    bottom: { x: leftArrowBaseX, y: bottomY }
  };
}

// RIGHT TRIANGE
function rarrow(rectX, rectY, rectW, windowHeight, bottomPadding) {

  let oneSixthBodyW = rectW / 7;
  let arrowHeight = rectY - bottomPadding * 2;

  let midY = (windowHeight / 7) / 2;
  let topY = midY - arrowHeight / 2;
  let bottomY = midY + arrowHeight / 2;

  let rightArrowBaseX = rectX + rectW - oneSixthBodyW;
  let rightArrowTipX = rectX + rectW;

  return {
    tip: { x: rightArrowTipX, y: midY },
    top: { x: rightArrowBaseX, y: topY },
    bottom: { x: rightArrowBaseX, y: bottomY }
  };
}

// GENERATE HITBOX FROM TRIANGLE
function hitbox(tri) {
  let minX = Math.min(tri.tip.x, tri.top.x, tri.bottom.x);
  let maxX = Math.max(tri.tip.x, tri.top.x, tri.bottom.x);
  let minY = Math.min(tri.tip.y, tri.top.y, tri.bottom.y);
  let maxY = Math.max(tri.tip.y, tri.top.y, tri.bottom.y);

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY
  };
}