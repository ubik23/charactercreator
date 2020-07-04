
function changeClipPathOnEyes (id) {
  var emotion = id.slice(1).split('_')[1]
  var svgContainer = document.querySelector('#svg1 .character-container')
  var eyeRight = svgContainer.querySelector('#eye_right')
  var eyeLeft = svgContainer.querySelector('#eye_left')
  if (eyeRight && eyeLeft) {
    eyeRight.setAttribute('clip-path', 'url(' + id + '--right)')
    eyeLeft.setAttribute('clip-path', 'url(' + id + '--left)')
  }
}

function applyClipPath () {
  setTimeout(function () {
    changeClipPathOnEyes('#eyes_' + c.choices.emotion)
  }, 150)
}
