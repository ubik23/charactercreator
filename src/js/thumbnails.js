// Functions for the thumbnails in the right sidebar.

function openThumbs () {
  hideColorPicker()
  openThumbsLogic(this)
}

/*
function calcViewBox (svgObject) {
  // TODO Calculate the view Box automatically to make creating new items easier
  var viewBox
  // var rect = svgObject.getBoundingClientRect()

  // Figure out whether height or width is larger
  // recalculate smallest of the two to be the same size as the largest
  // take the difference between largest and smallest and divide by two
  // Take away that amount from starting point of smallest side (x or y)
  // Make the width/height the same.

  // consolelog('svgObject', svgObject)
  // consolelog('rect', rect)

  return viewBox
}
*/

function openThumbsLogic (_) {
  var section = _.innerHTML
  var layersList = getSectionLayersList(section)
  var sectionLowerCase = section.toLowerCase()
  var previousSelection = document.querySelector('.section--selected')

  if (sectionLowerCase === 'iris' || sectionLowerCase === 'pupils') {
    sectionLowerCase = 'eyeballs'
    layersList = ['default']
  }

  if (previousSelection != null) {
    purgeHiddenLayers()
    previousSelection.classList.remove('section--selected')
  };

  loadSectionLayers(sectionLowerCase, layersList, populateThumbs, true)
  showThumbOptions(_)
  _.classList.add('section--selected')

  var thumbSection = document.querySelector('.widget')
  var thumbSectionBtn = thumbSection.previousSibling
  var sidebarLeft = document.querySelector('#sidebar-left')
  var sidebarRight = document.querySelector('.sidebar-right')

  if (thumbSectionBtn.classList === undefined && thumbSectionBtn.previousSibling.classList != undefined) {
    thumbSectionBtn = thumbSectionBtn.previousSibling
  }
  thumbSectionBtn = thumbSectionBtn.querySelector('.accordeon__svg-container')

  if (thumbSectionBtn.classList.contains('section-btn--hide')) {
    thumbSectionBtn.classList.toggle('section-btn--hide')
  }

  if (thumbSection.classList.contains('section--hide')) {
    thumbSection.classList.toggle('section--hide')
  }

  if (sidebarLeft.classList.contains('cherry')) {
    sidebarLeft.classList.remove('cherry')
    sidebarRight.classList.add('visible')
  }
  sidebarRight.classList.add('visible')
}

function populateThumbs (svgObject) {
  var emotion = (document.querySelector('#content_1 .selected--option').classList[2] === 'options__emotion')
  var thumbObject = svgObject.cloneNode(true)
  var layerID = thumbObject.id
  var groupTotal
  var groupRank
  var parentEl
  var groupInPlace
  var counter
  var loopRank
  var splitArray
  var openedDrawer
  var pupilShape
  var pupilShapeList = ['round', 'feline', 'star']
  var counter = pupilShapeList.length
  // var viewBox = calcViewBox(svgObject);
  thumbObject.style.opacity = 1

  if (layerID.slice(-5, -1) === '_of_') {
    groupRank = parseInt(layerID.slice(-6, -5))

    groupTotal = parseInt(layerID.slice(-1))
    layerID = layerID.slice(0, -7)
    parentEl = document.querySelector('#content_1 .' + layerID)
    if (groupRank === groupTotal || !parentEl.firstChild) {
      parentEl.appendChild(thumbObject)
    } else if (groupTotal === 2) {
      parentEl.insertBefore(thumbObject, parentEl.firstChild)
    } else {
      groupInPlace = parentEl.childNodes
      counter = groupInPlace.length
      while (counter--) {
        loopRank = parseInt(groupInPlace[counter].id.slice(-6, -5))
        if (loopRank > groupRank) {
          parentEl.insertBefore(thumbObject, groupInPlace[counter])
        }
      }
      if (groupRank > groupInPlace[groupInPlace.length - 1].id.slice(-6, -5)) {
        document.querySelector('#content_1 .' + layerID).appendChild(thumbObject)
      }
    }
  } else if (emotion) {
    splitArray = layerID.split('_')
    if (layerID != 'eyeballs_default') {
      document.querySelector('#content_1 ' + '.emotion_' + splitArray[splitArray.length - 1]).appendChild(thumbObject)
    }
  } else if (layerID.slice(0, 4) === 'body' && layerID.slice(5, 9) != 'head') {
    // consolelog('layerID', layerID)
    if (layerID.slice(-5) === 'fault') {
      document.querySelector('#content_1 .' + 'body_default').appendChild(thumbObject)
    } else if (layerID.slice(-5) === 'letic') {
      document.querySelector('#content_1 .' + 'body_athletic').appendChild(thumbObject)
    } else if (layerID.slice(-5) === 'veiny') {
      document.querySelector('#content_1 .' + 'body_veiny').appendChild(thumbObject)
    } else if (layerID.slice(-5) === 'id-00') {
      document.querySelector('#content_1 .' + 'body_android-00').appendChild(thumbObject)
    }
  } else {
    if (layerID === 'eyeball_right') {
      openedDrawer = document.querySelector('.selected--option').classList
      if (openedDrawer.contains('options__iris')) {
        pupilShape = getPupilShape()
        thumbObject = showPupilObject(thumbObject, pupilShape)
        layerID = 'iris_default'
        document.querySelector('#content_1 .' + layerID).appendChild(thumbObject)
      }
      if (openedDrawer.contains('options__pupils')) {
        while (counter--) {
          pupilObject = showPupilObject(thumbObject, pupilShapeList[counter]).cloneNode(true)
          document.querySelector('#content_1 .pupils_' + pupilShapeList[counter]).appendChild(pupilObject)
        }
      }
    } else {
      document.querySelector('#content_1 .' + layerID).appendChild(thumbObject)
    }
  }
}

function showThumbOptions (_) {
  var _ = _.target || _
  var showOptionThumbs = document.querySelector('.options__' + _.innerHTML.toLowerCase())
  var allOptions = document.querySelectorAll('.options__container')
  var i = allOptions.length
  var sectionSelected = document.querySelector('.section--selected')
  if (sectionSelected === null) {
    while (i--) {
      allOptions[i].classList.remove('selected--option')
    }
    showOptionThumbs.classList.add('selected--option')
  };
}
