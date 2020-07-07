function addColorPicker () {
  var section = document.querySelector('.section--selected').innerHTML.toLowerCase()
  getColor(section)
}

function hideColorPicker () {
  var colorPicker = document.querySelector('.colorpicker-wrapper')
  if (colorPicker && !colorPicker.classList.contains('section--hide')) {
    colorPicker.classList.add('section--hide')
  }
}

function getPallette (sectionId) {
  var pallette = {}
  var files = []
  var counter
  var el
  var emotions
  var colorClasses = ['skin', 'lips', 'alpha', 'beta', 'gamma', 'delta', 'epsilon']
  var classCounter

  if (sectionId === 'body') {
    files = getAllBodyLayers()
  } else if (sectionId === 'mouth') {
    emotions = getSectionLayersList('emotion')
    counter = emotions.length
    while (counter--) {
      files.push(sectionId + '_' + emotions[counter])
    }
  } else {
    files = getSectionLayersList(sectionId)
    files = replaceMultilayer(files, sectionId)
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
  var id = sectionId
  var slide = document.getElementById('slide')
  var picker = document.getElementById('picker')
  var section = document.querySelector('.section-id')
  // var wrapper = document.querySelector('.colorpicker-wrapper')

  section.innerHTML = id
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
