// Functions for the thumbnails in the right sidebar.

function openThumbs () {
  console.log('openThumbs')
  hideColorPicker()
  openThumbsLogic(this)
}

function openThumbsLogic (_) {
  // TODO Add 'selected-item' class to default or selected item(s)
  var section = _.innerHTML
  var layersList = getSectionLayersList(section)
  console.log('openThumbsLogic layersList', layersList)
  var sectionLowerCase = section.toLowerCase()
  var previousSelection = document.querySelector('.section--selected')
  var thumbSection = document.querySelector('.widget')
  var thumbSectionBtn = thumbSection.previousSibling
  var sidebarLeft = document.querySelector('#sidebar-left')
  var sidebarRight = document.querySelector('.sidebar-right')

  setTimeout(function(){
    showTutorial('items')
  }, 500)

  if (sectionLowerCase === 'iris' || sectionLowerCase === 'pupils') {
    sectionLowerCase = 'eyeballs'
    layersList = ['default']
  }

  if (previousSelection != null) {
    purgeHiddenLayers()

    previousSelection.classList.remove('section--selected')
  }

  // Don't load items if they are already there
  loadSectionLayers(sectionLowerCase, layersList, populateThumbs, true)
  showThumbOptions(_)

  _.classList.add('section--selected')

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
  var headSize
  var layerIDParts

  if (document.querySelector('#content_1 g#' + layerID)) {
    // If item is already present, do not insert it again
    return
  }

  // var viewBox = calcViewBox(svgObject);
  thumbObject.style.opacity = 1
  // thumbObject.classList.add('selected-item')

  // TODO Add 'selected-item' className to default and selected objects.
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
    } else  if (layerID.slice(0, 5) === 'nails') {
      console.log('layerId', layerID)
      layerIDParts = layerID.split('_')
      layerID = layerIDParts[0] + '_' + layerIDParts[1]
      console.log('New layerId', layerID)
      document.querySelector('#content_1 .' + layerID).appendChild(thumbObject)
    } else {
      document.querySelector('#content_1 .' + layerID).appendChild(thumbObject)
    }
  }

  // Resize heads according to control slider's state 
  headSize = document.querySelector('#head-size-slider').value
  applyHeadResize(headSize)
}

function showThumbOptions (_) {
  console.log('showThumbOptions', _)
  var _ = _.target || _
  var sectionName = _.innerHTML.toLowerCase()
  var selectedItem = hash.get(_.innerHTML.toLowerCase())
  var selectedItemName = '.option__' + sectionName + '_' + selectedItem
  var selectedItemObject
  var showOptionThumbs = document.querySelector('.options__' + sectionName)
  var allOptions = document.querySelectorAll('.options__container')
  var i = allOptions.length
  var sectionSelected = document.querySelector('.section--selected')

  if (sectionSelected === null) {
    while (i--) {
      allOptions[i].classList.remove('selected--option')
    }

    showOptionThumbs.classList.add('selected--option')
  }
  
  selectedItemObject = document.querySelector(selectedItemName)

  if (selectedItemObject) {
    selectedItemObject.classList.add('selected--item')
  }
}
