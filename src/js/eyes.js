function initEyes () {
  // consolelog('initEyes')

  var svgContainer = document.querySelector('#svg1')
  var characterHead = document.querySelector('#body_head_default')
  var eyeSockets = document.querySelector('#eyes_neutral')
  var eyeLeftSocket = document.querySelector('#eye_left')
  var eyeRightSocket = document.querySelector('#eye_right')
  var eyeLeft = document.querySelector('#eyeball_left')
  var eyeRight = document.querySelector('#eyeball_right')
  var characterHeadCenter = {}
  var eyeRightCenter = {}
  var eyeLeftCenter = {}
  var scaleMod, focus

  // consolelog('svgContainer', svgContainer)

  init()

  function init () {
    // consolelog('svgContainer', svgContainer)
    // consolelog('characterHead', characterHead)
    var propotionalPlacement = 0.4243902439
    var svgContainerPos = getPosition(svgContainer)
    var characterHeadPos = characterHead.getBoundingClientRect()
    var eyeLeftPos = eyeLeft.getBoundingClientRect()
    var eyeRightPos = eyeRight.getBoundingClientRect()
    scaleMod = characterHeadPos.width / 41
    // alohaLogoCenter.x = logoContainerPos.x + (logoContainerPos.width/2);
    characterHeadCenter.y = svgContainerPos.y + (characterHeadPos.height * propotionalPlacement) // propotional placement of eyes.
    eyeRightCenter.x = eyeRightPos.x + (eyeRightPos.width / 2)
    eyeLeftCenter.x = eyeLeftPos.x + (eyeLeftPos.width / 2)
  }

  // Mouse movement
  document.onmousemove = handleMouseMove

  function centerGaze () {
    // consolelog('centerGaze')
    eyeRight.style.transform = 'scale(1, 1)'
    eyeLeft.style.transform = 'scale(1, 1)'
    eyeSockets.style.transform = 'translateY(0)'
    eyeLeftSocket.style.transform = 'translateX(0)'
    eyeRightSocket.style.transform = 'translateX(0)'
  }

  function handleMouseMove (event) {
    var mod = 0.08333333333
    var eventDoc, doc, body, diffXLeft, diffXRight, diffY, diffXLeftAbs, diffXRightAbs, diffYabs, newXRight, newXLeft, newY, modX, modXLeft, modXRight, modY, newWidth, newWidthLeft, newWidthRight, newHeight

    event = event || window.event // IE-ism

    // If pageX/Y aren't available and clientX/Y are, calculate pageX/Y.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0)
      event.pageY = event.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0)
    }

    // diffX = event.pageX - alohaLogoCenter.x;
    diffXRight = event.pageX - eyeRightCenter.x
    diffXLeft = event.pageX - eyeLeftCenter.x
    diffY = event.pageY - characterHeadCenter.y

    diffXLeftAbs = diffXLeft < 0 ? diffXLeft * -1 : diffXLeft
    diffXRightAbs = diffXRight < 0 ? diffXRight * -1 : diffXRight
    diffYabs = diffY < 0 ? diffY * -1 : diffY

    if (diffXRightAbs > diffYabs) {
      if (diffXRight > (3 * scaleMod)) { newXRight = 3 } else if (diffXRight < (-3 * scaleMod)) { newXRight = -3 } else { newXRight = (diffXRight / scaleMod) }
      newY = 3 * diffYabs / diffXRightAbs
      if (diffY < 0) { newY = newY * -1 }
    } else {
      if (diffY > 0) { newY = 3 } else { newY = -3 }
      newXRight = 3 * diffXRightAbs / diffYabs
      if (diffXRight < 0) { newXRight = newXRight * -1 }
    }
    //
    if (diffXLeftAbs > diffYabs) {
      if (diffXLeft > 0) { newXLeft = 3 } else { newXLeft = -3 }
      newY = 3 * diffYabs / diffXLeftAbs
      if (diffY < 0) { newY = newY * -1 }
    } else {
      if (diffY > 0) { newY = 3 } else { newY = -3 }
      newXLeft = 3 * diffXLeftAbs / diffYabs
      if (diffXLeft < 0) { newXLeft = newXLeft * -1 }
    }

    if (newXLeft < 0) { modXLeft = newXLeft * -1 } else { modXLeft = newXLeft }
    if (newXRight < 0) { modXRight = newXRight * -1 } else { modXRight = newXRight }
    if (newY < 0) { modY = newY * -1 } else { modY = newY }

    newHeight = 1 - (modY * mod)
    newWidth = 1 - (modX * mod)
    newWidthRight = 1 - (modXRight * mod)
    newWidthLeft = 1 - (modXLeft * mod)

    if (diffY < 0) {
      if (newXRight < 0) {
        newXRight = newXRight + (newY * -2 / 3)
        if (newXRight > 0) { newXRight = 0 }
      }
      if (newXLeft > 0) {
        newXLeft = newXLeft - (newY * -2 / 3)
        if (newXLeft < 0) { newXLeft = 0 }
      }
    }

    // eyeRight.style.transform = "scale(" + newWidth + ", " + newHeight + ")";
    // eyeLeft.style.transform = "scale(" + newWidth + ", " + newHeight + ")";
    // eyeSockets.style.transform = "translateY(" + newY + "px)";

    eyeLeft.style.transform = 'translateX(' + newXLeft + 'px)'
    eyeRight.style.transform = 'translateX(' + newXRight + 'px)'

    clearTimeout(focus)
    focus = setTimeout(centerGaze, 1500)
  }
}
