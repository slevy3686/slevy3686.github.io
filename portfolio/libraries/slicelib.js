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