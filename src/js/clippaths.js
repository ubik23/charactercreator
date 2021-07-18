"use strict"

// NO GLOBALS
// USES DOM

function changeClipPathOnEyes (id) {
  var svgContainer = document.querySelector('#svg1 .character-container')
  var eyeRight = svgContainer.querySelector('#eye_right')
  var eyeLeft = svgContainer.querySelector('#eye_left')
  if (eyeRight && eyeLeft) {
    eyeRight.setAttribute('clip-path', 'url(' + id + '--right)')
    eyeLeft.setAttribute('clip-path', 'url(' + id + '--left)')
  }
}

function applyClipPath () {
  changeClipPathOnEyes('#eyes_' + window.c.choices.emotion)
  // setTimeout(function () {
  //   console.log('clipping eyes on ', window.c.choices.emotion)
  //   changeClipPathOnEyes('#eyes_' + window.c.choices.emotion)
  // }, 1500)
}
