function isLandscape () {
  var w = window
  var d = document
  var e = d.documentElement
  var g = d.getElementsByTagName('body')[0]
  var x = w.innerWidth || e.clientWidth || g.clientWidth
  var y = w.innerHeight || e.clientHeight || g.clientHeight
  var isLandscape

  if (x > y) { isLandscape = true } else { isLandscape = false }

  return isLandscape
}

// function zoomIn () {
//   var sex = c.choices.sex
//   var newViewBox
//   shape = document.getElementById(('svg1'))

//   if (sex == 'm') {
//     newViewBox = '140 73 290 290'
//   } else {
//     newViewBox = '225 86 110 110'
//   }

//   animateZoom(newViewBox)
// }

// function zoomOut () {
//   var sex = c.choices.sex
//   shape = document.getElementById(('svg1'))

//   animateZoom(newViewBox)
// }

function zoomFace () {
  var landscape = isLandscape() // TODO change newViewBox is in landscape mode.
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))

  // TODO Consider size of window where rezooming.
  if (sex == 'm') {
    newViewBox = '242.6 99 80 80'
  } else {
    newViewBox = '243 109 80 80'
  }

  animateZoom(newViewBox)
}

function zoomFeet () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))
  
  if (sex == 'm') {
    newViewBox = '230.6 470 80 80'
  } else {
    newViewBox = '237.6 470 80 80'
  }

  animateZoom(newViewBox)
}

function zoomTwoFaces () {
  // var landscape = isLandscape() // TODO change newViewBox is in landscape mode.
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))

  // TODO Consider size of window where rezooming.
  if (sex == 'm') {
    newViewBox = '242.6 90 80 80'
  } else {
    newViewBox = '243 100 80 80'
  }
  
  animateZoom(newViewBox)
}

function zoomShoulders () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))// var =  "svg1" or "lg_face", etc.

  if (sex == 'm') {
    newViewBox = '204 85 150 150'
  } else {
    newViewBox = '207 97 150 150'
  }

  animateZoom(newViewBox)
}

function zoomTorso () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))// var =  "svg1" or "lg_face", etc.

  if (sex == 'm') {
    newViewBox = '204 150 150 150'
  } else {
    newViewBox = '207 152 150 150'
  }

  animateZoom(newViewBox)
}

function zoomLegs () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))// var =  "svg1" or "lg_face", etc.

  if (sex == 'm') {
    newViewBox = '144 280 270 270'
  } else {
    newViewBox = '144 270 270 270'
  }

  animateZoom(newViewBox)
}

function zoomArms () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))// var =  "svg1" or "lg_face", etc.

  if (sex == 'm') {
    newViewBox = '144 85 270 270'
  } else {
    newViewBox = '144 167 270 270'
  }

  animateZoom(newViewBox)
}
function zoomBody () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))

  if (sex == 'm') {
    newViewBox = '136 73 290 290'
  } else {
    newViewBox = '140 84 290 290'
  }

  animateZoom(newViewBox)
}

function zoomFull () {
  // TODO replace "c" variable with currentCharacter variable
  var sex = c.choices.sex
  var newViewBox
  shape = document.getElementById(('svg1'))
  newViewBox = '10 50 540 540'

  animateZoom(newViewBox)
}

function backgroundZoomFull (ev) {
  zoomFull()
}

function viewBoxZoom (ev) {
  var zoomLevel = ev.target.value

  if (zoomLevel == 5) {
    zoomFeet()
  } else if (zoomLevel == 4) {
    zoomLegs()
  } else if (zoomLevel == 3) {
    zoomFace()
  } else if (zoomLevel == 2) {
    zoomTorso()
  } else if (zoomLevel == 1) {
    zoomArms()
  } else if (zoomLevel == 0) {
    zoomFull()
  }
}

function sectionZoom (sectionLabel) {
  var zoomInput = document.querySelector('#zoomLevel')

  if (sectionLabel === 'Head') { zoomInput.value = 3; zoomFace() }
  if (sectionLabel === 'Accessories') { zoomInput.value = 1; zoomArms() }
  if (sectionLabel === 'Torso') { zoomInput.value = 2; zoomTorso() }
  if (sectionLabel === 'Body') { zoomInput.value = 1; zoomBody() }
  if (sectionLabel === 'Legs') { zoomInput.value = 4; zoomLegs() }
  if (sectionLabel === 'Feet') { zoomInput.value = 5; zoomFeet() }
}

function animateZoom (newViewBox) {
  var characterSVG = document.querySelector('#svg1')
  var background = document.querySelector('#content')
  var currentViewBox = characterSVG.viewBox.baseVal
  var globalID
  var animationDuration = 350 // Duration of animation in milliseconds;
  var startTime = Date.now()
  var currentTime
  var timeElapsed
  var xOld = currentViewBox.x
  var yOld = currentViewBox.y
  var widthOld = currentViewBox.width
  var heightOld = currentViewBox.height
  var xDiff
  var yDiff
  var widthDiff
  var heightDiff
  var multiplyer
  var xNew
  var yNew
  var widthNew
  var heightNew
  var animateViewBox

  if (newViewBox != '10 50 540 540' && !characterSVG.classList.contains('zoomed')) {
    characterSVG.classList.add('zoomed')
    background.classList.add('zoomed')
  } else if (newViewBox === '10 50 540 540' && characterSVG.classList.contains('zoomed')) {
    characterSVG.classList.remove('zoomed')
    background.classList.remove('zoomed')
  }

  newViewBox = newViewBox.split(' ')

  xDiff = newViewBox[0] - currentViewBox.x
  yDiff = newViewBox[1] - currentViewBox.y
  widthDiff = newViewBox[2] - currentViewBox.width
  heightDiff = newViewBox[3] - currentViewBox.height

  function repeatOften () {
    currentTime = Date.now()
    timeElapsed = currentTime - startTime
    multiplyer = timeElapsed / animationDuration

    if (multiplyer > 1) { multiplyer = 1 }

    xNew = xOld + (xDiff * multiplyer)
    yNew = yOld + (yDiff * multiplyer)
    widthNew = widthOld + (widthDiff * multiplyer)
    heightNew = heightOld + (heightDiff * multiplyer)
    animateViewBox = xNew + ' ' + yNew + ' ' + widthNew + ' ' + heightNew

    characterSVG.setAttribute('viewBox', animateViewBox)

    if (timeElapsed >= animationDuration) {
      cancelAnimationFrame(globalID)

      return
    }

    globalID = requestAnimationFrame(repeatOften)
  }
  
  globalID = requestAnimationFrame(repeatOften)
}
