function addColorPicker () {
  var section = document.querySelector('.section--selected').innerHTML.toLowerCase()

  // console.log('selected--item', section + '_' + selectedItem)
  getColor(section)
  showTutorial('random')
}

function hideColorPicker () {
  var colorPicker = document.querySelector('.colorpicker-wrapper')
  if (colorPicker && !colorPicker.classList.contains('section--hide')) {
    colorPicker.classList.add('section--hide')
  }
}

function getPallette (sectionId) {
  // TODO Replace sectionId variable to selectedItem so we know which color we're changing
  var pallette = {}
  var files = []
  var counter
  var el
  var emotions
  var colorClasses = ['skin', 'lips', 'alpha', 'beta', 'gamma', 'delta', 'epsilon']
  var classCounter
  var selectedItem

  if (sectionId === 'body') {
    files = getAllBodyLayers()
  } else if (sectionId === 'mouth') {
    emotions = getSectionLayersList('emotion')
    counter = emotions.length
    while (counter--) {
      files.push(sectionId + '_' + emotions[counter])
    }
  } else {
    // TODO Get files from only selectedItem, not from the whole section
    // files = getSelectedItemLayersList(sectionId)
    selectedItem = hash.get(sectionId)
    files = getSectionLayersList(sectionId)
    files = replaceMultilayer([selectedItem], sectionId)// <<<<<< TEST MODE FOR DEV PURPOSES
    // files = replaceMultilayer(files, sectionId)
    // console.log('files', files)
  }

  counter = files.length

  while (counter--) {
    classCounter = colorClasses.length

    while (classCounter--) {
      el = document.querySelector('#svg1 .character-container #' + files[counter] + ' .' + colorClasses[classCounter])
      if (el != null && el.style != null && el.style.fill != null) {
        pallette[colorClasses[classCounter]] = el.style.fill
      }
    }
  }
  drawPallette(pallette)
}

function drawPallette (pallette) {
  var container = document.querySelector('.section-pallette')
  var node
  var label
  var keys = Object.keys(pallette)
  var counter = keys.length

  while (counter--) {
    node = document.createElement('INPUT')
    label = document.createElement('LABEL')
    label.setAttribute('for', 'btn-' + [keys[counter]])
    node.type = 'radio'
    node.id = 'btn-' + [keys[counter]]
    node.name = 'btn-pallette'
    node.value = [keys[counter]]
    node.setAttribute('checked', 'checked')
    node.classList = [keys[counter]]
    label.style.background = pallette[keys[counter]]
    container.appendChild(node)
    container.appendChild(label)
  }

  // TODO Add event listeners to each colored div, allowing user to choose which color they edit.
  // Make sure the color refreshes when changing the colorpicker
}

function getColor (sectionId) {
  clearPicker()
  // TODO Change section to selectedItem
  var id = sectionId
  var slide = document.getElementById('slide')
  var picker = document.getElementById('picker')
  var section = document.querySelector('.section-id')
  // console.log('sectionId', sectionId)
  var selectedItem = hash.get(sectionId)
  // var wrapper = document.querySelector('.colorpicker-wrapper')

  // TODO Change from sectionId to selectedItem so we don't we focus on that one item.
  section.innerHTML = id + '_' + selectedItem
  getPallette(sectionId)

  try {
    ColorPicker(
      slide,
      picker,
      function (hex, hsv, rgb) {
        colorize(id, hex)
      })
  } catch (error) {
    console.error(error)
  }
}

function emptyPicker () {
  var wrapper = document.querySelector('.colorpicker-wrapper')
  wrapper.innerHTML = ''
}

function clearPicker () {
  var wrapper = document.querySelector('.colorpicker-wrapper')
  wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span><div class="section-pallette"></div></div><div class="colorpicker-align"><div id="picker" style="background-color:rgb(255,0,0);"></div><div id="slide"></div></div>'
}
