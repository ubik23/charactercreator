"use strict"

// NO GLOBALS
// USES DOM

function getParent (el, sel) {
  if ((el.matches || el.matchesSelector).call(el, sel)) {
    return el
  };
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
  return el
}

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1)

function rgb2hex (rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
  return (rgb && rgb.length === 4) ? '#' +
  ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
  ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : ''
}

function getPosition (el) {
  var x = 0
  var y = 0

  while (el) {
    if (el.tagName != 'BODY') {
      // for all other non-BODY elements
      x += (el.offsetLeft - el.scrollLeft + el.clientLeft)
      y += (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
  }
  return { x, y }
}
