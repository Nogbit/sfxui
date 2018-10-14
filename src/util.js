function init () {
  console.log('src/util.js imported with globbed export')
}

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

// Copied from  svg.js/src/helpers.js since it's not exposed via SVG
// Calculate proportional width and height values when necessary
function proportionalSize (element, width, height) {
  if (width == null || height == null) {
    let box = element.bbox()

    if (width == null) {
      width = box.width / box.height * height
    } else if (height == null) {
      height = box.height / box.width * width
    }
  }

  return {
    width: width,
    height: height
  }
}

function clamp (num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

export default {
  init,
  proportionalSize,
  polarToCartesian,
  clamp
}
