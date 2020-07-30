function createForm (sex, forms) {
  var svgContent = ''
  var itemsThumbsContent = document.querySelector('#content_1')

  itemsThumbsContent.innerHTML = ''

  var sex = sex || c.choices.sex
  var forms = forms || window.forms
  var sectionNames = ['Head', 'Accessories', 'Torso', 'Body', 'Legs', 'Feet']
  var sectionHtml = '<h2 class="sidebar__title"><svg class="icon"><use xlink:href="#icon-coathanger"></use></svg>Categories</h2>'

  sectionHtml += '<ul class="section__list">'

  for (var f in forms) {
    var formContainer = document.querySelector('#content_1')
    var newHtml = ''
    var selcount = 0

    sectionHtml += '<section class="accordeon__section-label"><span class="accordeon__section-title"><svg class="icon"><use xlink:href="#' + getIconId(sectionNames[f], sex) + '"></use></svg><span class="accordeon__section-title__text">' + sectionNames[f] + '</span></span><div class="accordeon__svg-container section-btn--hide"><svg width="1em" height="1em"><use xlink:href="#accordeon_btn"/></svg></div></section><div class="accordeon__content section--hide">'

    var formsLength = forms.length
    var formCounter = formsLength

    for (var x in forms[f]) {
      sectionHtml += '    <a class="section__link"><li class="sbl__option" tabindex="0">' + x + '</li></a>'
      var sectionTitle = x
      var t = sectionTitle.toLowerCase()
      newHtml += '    <div class="Row options__container options__' + t + '"><span class="svg__section__title">' + t + '</span><div class="thumbnails__container">'
      var xsel = hash.get(t)
      var options = forms[f][x].map(function (d, i) {
        var tempId = '#' + t + '_' + d
        var multiLayer = window.multiLayer
        var sections = getSectionsFromIdMultiLayer(multiLayer, tempId)

        if (t === 'emotion') {
          var sections = []
          var emotions = GetEmotionGetLayers(d)
          for (emo in emotions) {
            var newEmo = '#' + emotions[emo] + '_' + d
            sections.push(newEmo)
          };
        }

        var viewBox = getViewBox(t, d)

        // consolelog('t', t)
        // consolelog('d', d)

        if (d === '') { svgContent = '<use xlink:href="#icon-none"></use>' } else { svgContent = '' }
        newHtml += '    <div class="option__container option__' + t + '_' + d + '" tabindex="0"><svg viewBox="' + viewBox + '" class="svg__option ' + t + '_' + d + '">' + svgContent + '</svg><span class="option__label">' + d + '</span></div>'
      }).join('\n')

      var defaultValue = hash.get(x)

      if (defaultValue !== undefined) {
        var defval = 'selected="' + defaultValue + '" '
      } else {
        var defval = ''
      }

      htagc = x.toLowerCase() + 'Color'
      var hashColor = hash.get(htagc)

      if (hashColor !== undefined) {
        var colorValue = hashColor
      } else {
        var colorValue = '#ffffff'
      }
      newHtml += '    </div>'
      newHtml += '</div>'
      selcount++
      // consolelog('newHtml', newHtml)
    }
    sectionHtml += '</div>'
    var htmlObject = document.createElement('div')
    htmlObject.innerHTML = newHtml
    formContainer.appendChild(htmlObject)
  }

  sectionHtml += '</ul>'
  var sectionContainer = document.querySelector('#sidebar-left')
  var sectionList = document.createElement('div')

  sectionList.innerHTML = sectionHtml
  sectionContainer.innerHTML = ''
  sectionContainer.appendChild(sectionList)

  var sidebarLeftOptions = document.querySelectorAll('.sbl__option')
  var optionThumbnails = document.querySelectorAll('.option__container')
  var sectionButtons = document.querySelectorAll('.accordeon__section-label')
  var sectionColor = document.querySelectorAll('.section__color')

  addEventListenerList(sidebarLeftOptions, 'mouseover', showThumbOptions)
  addEventListenerList(sidebarLeftOptions, 'focus', showThumbOptions)
  addEventListenerList(sidebarLeftOptions, 'click', openThumbs)
  addEventListenerList(optionThumbnails, 'click', changeOption)
  addEventListenerList(sectionButtons, 'click', toggleSection)
  addEventListenerList(sectionColor, 'click', addColorPicker)
}

function getSectionsFromIdMultiLayer (multiLayer, tempId) {
  var sections = []
  var layerCount = isInMultiLayerArray(tempId.slice(1), multiLayer)
  if (layerCount > 0) {
    for (var i = 1; i <= layerCount; i++) {
      newLayer = tempId + '_' + i + '_of_' + layerCount
      sections.push(newLayer)
    }
  } else {
    sections = [tempId]
  }
  return sections
}

function getSectionLayersList (section) {
  var sex = c.choices.sex
  var formList
  var formCounter
  var itemList

  section = capitalizeFirstLetter(section)

  if (sex === 'm') {
    formList = window.maleFormList
  } else {
    formList = window.femaleFormList
  }

  formCounter = formList.length
  while (formCounter--) {
    if (section in formList[formCounter]) {
      itemList = formList[formCounter][section]
    }
  }
  return itemList
}

function replaceMultilayer (layersList, section) {
  var multiLayer = getMultiLayer()
  var sex = c.choices.sex
  var counter = layersList.length
  var multiLayer = getMultiLayer()
  var multiCounter
  var fullList = []
  var currentItem
  var currentQty
  var currentIndex
  var qtyCounter

  if (section != undefined) {
    while (counter--) {
      if (layersList[counter] != '') {
        fullList.push(section + '_' + layersList[counter])
      }
    }
  } else {
    counter = layersList.length
    while (counter--) {
      if (layersList[counter].slice(-1) != '_') {
        fullList.push(layersList[counter])
      }
    }
  }
  multiCounter = multiLayer.length

  while (multiCounter--) {
    currentItem = multiLayer[multiCounter][0]
    if (fullList.includes(currentItem)) {
      currentIndex = fullList.indexOf(currentItem)
      fullList.splice(currentIndex, 1)
      currentQty = multiLayer[multiCounter][1]
      qtyCounter = currentQty
      while (qtyCounter--) {
        fullList.push(currentItem + '_' + (qtyCounter + 1) + '_of_' + currentQty)
      }
    }
  }
  return fullList
}

function loadSectionLayers (section, layersList, callback, callbackLoopFlag) {
  var tempLayerList = []
  var layerCounter
  layerCounter = layersList.length

  if (section === 'emotion') {
    while (layerCounter--) {
      tempLayerList = tempLayerList.concat(fromEmotionGetLayers(layersList[layerCounter]))
    }
    layersList = tempLayerList
  } else if (section === 'pupils') {
    layersList = ['eyeballs_default']
  } else if (section === 'body') {
    while (layerCounter--) {
      tempLayerList = tempLayerList.concat(bodyTypesToLayers(layersList[layerCounter]))
    }
    layersList = tempLayerList
  } else {
    layersList = replaceMultilayer(layersList, section)
  }
  loadFilesFromList(layersList, callback, callbackLoopFlag)
}

function getPositionDir (layer) {
  // Apply the right subfolder when loading files
  var positionDir
  var sex = c.choices.sex

  if (sex === 'm' && ((window.maleBody.bodyBack && window.maleBody.bodyBack.indexOf(layer) > -1 )  || (window.maleBody.bodyMiddle && window.maleBody.bodyMiddle.indexOf(layer) > -1 )  || (window.maleBody.bodyFront && window.maleBody.bodyFront.indexOf(layer) > -1 )  || (window.maleBody.bodyOver && window.maleBody.bodyOver.indexOf(layer) > -1 ))) {
    positionDir = window.maleBodyPositionFolder + '/'
  } else if (sex === 'm' && ((window.maleHead.headBack && window.maleHead.headBack.indexOf(layer) > -1 )  || (window.maleHead.headMiddle && window.maleHead.headMiddle.indexOf(layer) > -1 ) || (window.maleHead.headFront && window.maleHead.headFront.indexOf(layer) > -1 ) || (window.maleHead.headOver && window.maleHead.headOver.indexOf(layer) > -1 ))) {
    positionDir = 'head_front_default/'
  } else if (sex === 'f' && ((window.femaleBody.bodyBack && window.femaleBody.bodyBack.indexOf(layer) > -1 ) || (window.femaleBody.bodyMiddle && window.femaleBody.bodyMiddle.indexOf(layer) > -1 ) || (window.femaleBody.bodyFront && window.femaleBody.bodyFront.indexOf(layer) > -1 ) || (window.femaleBody.bodyOver && window.femaleBody.bodyOver.indexOf(layer) > -1 ))) {
    positionDir = window.femaleBodyPositionFolder + '/'
  } else if (sex === 'f' && ((window.femaleHead.headBack && window.femaleHead.headBack.indexOf(layer) > -1 ) || (window.femaleHead.headMiddle && window.femaleHead.headMiddle.indexOf(layer) > -1 ) || (window.femaleHead.headFront && window.femaleHead.headFront.indexOf(layer) > -1 ) || (window.femaleHead.headOver && window.femaleHead.headOver.indexOf(layer) > -1 ))) {
    positionDir = 'head_front_default/'
  }
  return positionDir
}

function loadFilesFromList (layersList, callback, callbackLoopFlag) {
  var layerDirectory
  var sex = c.choices.sex
  var file
  var layerID
  var counter
  var layers
  var positionDir

  if (sex === 'm') {
    layerDirectory = 'layer/male/'
    layers = window.layersMale
  } else {
    layerDirectory = 'layer/female/'
    layers = window.layersFemale
  }

  counter = layersList.length

  while (counter--) {
    layerID = layersList[counter]

    if (layers.indexOf(layerID) === -1) {
      continue
    }

    positionDir = getPositionDir(layerID)
    console.log('positionDir', positionDir)
    file = layerDirectory + positionDir + layerID + '.svg'

    fetch(file).then(function (response) {
      return response.text()
    }).then(function (text) {
      var htmlObject = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      var svgObject
      var pupilShape
      var layerID
      var layerIDArray
      var nextLayerSibling
      var svgContainer = document.querySelector('#svg1 .character-container')
      var outline = svgContainer.querySelector('#outline')
      htmlObject.innerHTML = text
      svgObject = htmlObject.querySelector('g')

      if (callbackLoopFlag) {
        svgObject.style.opacity = 0
        svgObject.style.pointerEvents = 'none'
      }
      svgObject = colorElement(svgObject)
      layerID = svgObject.id

      if (layerID === 'eyeballs_default') {
        pupilShape = getPupilShape()
        svgObject = showPupilObject(svgObject, pupilShape)
      }
      layerIDArray = layerID.split('_')
      nextLayerSibling = findNextLayerInDom(layerID)
      if ((svgContainer.querySelector('#' + layerID)) === null) {
        if (nextLayerSibling != null) {
          nextLayerSibling.parentNode.insertBefore(svgObject, nextLayerSibling)
        } else {
          if (outline) {
            outline.parentNode.insertBefore(svgObject, outline)
          } else {
            document.querySelector('#svg1 .character-container').appendChild(svgObject)
          }
        }
      }
      return svgObject
    }).then(function (svgObject) {
      var iris
      if (callback && typeof callback === 'function' && callbackLoopFlag) {
        iris = svgObject.querySelector('#eyeball_right')
        if (iris) {
          svgObject = iris
        }
        callback(svgObject)
      }
    })
  }
}

function getPupilShape () {
  return c.choices.pupils || 'round'
}

function addEventListenerList (list, event, fn) {
  var listLength = list.length
  var listCounter = listLength
  var i
  while (listCounter--) {
    i = listLength - listCounter - 1
    list[i].addEventListener(event, fn, false)
  }
}

function closeSections (exception) {
  var sectionButtons = document.querySelectorAll('.accordeon__section-label')
  var displayButtons = document.querySelectorAll('.accordeon__svg-container')
  var i = sectionButtons.length

  while (i--) {
    var section = sectionButtons[i]

    if (section !== exception && section.parentNode.parentNode.parentNode.classList.contains('sidebar-left')) {
      var button = displayButtons[i]
      var sectionContent = section.nextSibling

      if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined) {
        sectionContent = sectionContent.nextSibling
      }
      if (!sectionContent.classList.contains('section--hide')) {
        sectionContent.classList.toggle('section--hide')
      }
      if (!button.classList.contains('section-btn--hide')) {
        button.classList.toggle('section-btn--hide')
      }
    }
  }
}

function toggleSection (ev) {
  var el = ev.target
  var sectionLabel
  var elChild
  var parent = getParent(el, '.accordeon__section-label')
  elChild = parent.querySelector('.accordeon__section-title__text')

  if (elChild != null) {
    sectionLabel = elChild.innerHTML
    sectionZoom(sectionLabel)
  }

  var _ = this

  if (this.parentNode.parentNode.parentNode.classList.contains('sidebar-left')) {
    closeSections(_)
  };
  removeAlert(_)
  showSection(_)
}

function showSection (_) {
  var sectionContent = _.nextSibling
  var maxHeight
  var displayButton

  if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined) {
    sectionContent = sectionContent.nextSibling
  }
  maxHeight = sectionContent.clientHeight
  displayButton = _.querySelector('.accordeon__svg-container')

  if (sectionContent.classList.contains('accordeon__content')) {
    if (sectionContent.classList.contains('section--hide')) {
    } else {
      sectionContent.style.maxHeight = maxHeight
    };
    sectionContent.classList.toggle('section--hide')
    displayButton.classList.toggle('section-btn--hide')
  }
}

function removeAlert (_) {
  var alert = document.querySelector('.alert')
  if (alert != null) {
    alert.classList.remove('alert')
  }
  if (_.classList.contains('alert')) {
    _.classList.remove('alert')
  };
}

function changeOption () {
  var category = this.parentNode.parentNode.firstChild.innerHTML
  var userChoice = this.lastChild.innerHTML
  var colors = document.querySelector('.colorpicker-wrapper').previousSibling
  if (colors.classList === undefined && colors.previousSibling.classList != undefined) {
    colors = colors.previousSibling
  }
  show(userChoice, category)
  colors.classList.add('alert')
}

function getIconId (sectionName, sex) {
  var iconDictMale = {
    Head: 'icon-face',
    Accessories: 'icon-glasses',
    Torso: 'icon-shirt',
    Body: 'icon-underwear',
    Legs: 'icon-pants',
    Feet: 'icon-shoes'
  }
  var iconDictFemale = {
    Head: 'icon-face',
    Accessories: 'icon-glasses',
    Torso: 'icon-shirt',
    Body: 'icon-underwear',
    Legs: 'icon-dress',
    Feet: 'icon-shoes'
  }
  if (sex === 'f') {
    return iconDictFemale[sectionName]
  } else if (sex === 'm') {
    return iconDictMale[sectionName]
  } else {
    return 'icon-face'
  }
}
