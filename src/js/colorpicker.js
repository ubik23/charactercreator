function addColorPicker () {
  var section = document.querySelector('.section--selected').innerHTML.toLowerCase()

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

  // OTHER TODO refresh color menu if item is clicked while color menu is open.

  var pallette = {}
  var files = []
  var counter
  var el
  var emotions
  var colorClasses = ['skin', 'lips', 'alpha', 'beta', 'gamma', 'delta', 'epsilon']
  var classCounter
  var selectedItem
  var elColor
  var rgbArray
  var testItem

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

    // null if no item clicked before reaching the color menu
    selectedItem = hash.get(sectionId)

    // undefined if no item is clicked before reaching the color menu
  
    files = getSectionLayersList(sectionId)
    files = replaceMultilayer([selectedItem], sectionId)// <<<<<< TEST MODE FOR DEV PURPOSES
    // files = replaceMultilayer(files, sectionId)
  }

  counter = files.length

  while (counter--) {
    classCounter = colorClasses.length

    while (classCounter--) {
      el = document.querySelector('#svg1 .character-container #' + files[counter] + ' .' + colorClasses[classCounter])

      if (el != null && el.style != null && el.style.fill != null) {
        elColor = el.style.fill

        if (elColor != 'none') {
          rgbArray = elColor.slice(4,-1).split(',')
          elColor = rgbToHex(Number(rgbArray[0]), Number(rgbArray[1]), Number(rgbArray[2]))
        }
        
        pallette[colorClasses[classCounter]] = elColor
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

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getColor (sectionId) {
  console.log('sectionId', sectionId)
  clearPicker()
  // TODO Change section to selectedItem
  var id = sectionId
  var slide = document.getElementById('slide')
  var picker = document.getElementById('picker')
  var section = document.querySelector('.section-id')
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
  } finally {
    textboxColor()
  }
}

function updateTextBoxColor (ev) {
  var elLabel = ev.target.value
  var elColor = ev.target.nextSibling.style.background
  var rgbArray = elColor.slice(4,-1).split(',')
  var textBoxLabel = document.querySelector('.colorpicker-textbox SPAN')
  var textBox = document.querySelector('.colorpicker-textbox INPUT')

  elColor = rgbToHex(Number(rgbArray[0]), Number(rgbArray[1]), Number(rgbArray[2]))

  textBoxLabel.innerHTML = 'Color ' + elLabel
  textBox.value = elColor

}

function updateColorFromTextbox (ev) {
  console.log('ev', ev)
  var hex = ev.target.value
  // var id = document.querySelector('.colorpicker-controls .section-id').textContent
  var formId = document.querySelector('.section--selected').textContent.toLowerCase()

  colorize (formId, hex)
}

function addEventListenerToTextbox () {
  var input = document.querySelector(".colorpicker-textbox input");

  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault()
      // Trigger the button element with a click
      // document.getElementById("myBtn").click();
      updateColorFromTextbox(event)
    }
  });
}

function addEventListenersToColorSelectors () {
  var inputs = document.querySelectorAll('.section-pallette input')
  var counter = inputs.length

  while (counter--) {
    if (inputs[counter] && typeof updateTextBoxColor === 'function') { inputs[counter].addEventListener('input', updateTextBoxColor, false) }
  }
}

function textboxColor () {
  // This is a feature reserved for the dot com version of the site
  if (!proVersion) {return}

  console.log('checkbox', document.querySelector('.section-pallette input'))
  // Get current (selected) color of (selected) item in (selected) section
  var selectedColorLabel = document.querySelector('.section-pallette input:checked').value
  var selectedColor = document.querySelector('.section-pallette input:checked').nextSibling.style.background
  var rgbArray = selectedColor.slice(4,-1).split(',')
  selectedColor = rgbToHex(Number(rgbArray[0]), Number(rgbArray[1]), Number(rgbArray[2]))

  // Setup event listener to change color when input changes
  addEventListenersToColorSelectors()

  var textboxContainer = document.querySelector('.colorpicker-wrapper')
  const newTextbox = document.createElement("div");
  const newTextboxLabel = document.createElement("span");
  const newTextboxInput = document.createElement("input");
  const newColorSample = document.createElement("div");

  newTextboxLabel.textContent = "Color " + selectedColorLabel + ":"
  newTextbox.appendChild(newTextboxLabel)

  newTextboxInput.type = "text"
  newTextboxInput.size = 7
  newTextboxInput.value = selectedColor
  newTextbox.appendChild(newTextboxInput)

  newTextbox.classList.add('colorpicker-textbox')

  textboxContainer.appendChild(newTextbox)
  
  addEventListenerToTextbox()
}

function emptyPicker () {
  var wrapper = document.querySelector('.colorpicker-wrapper')

  wrapper.innerHTML = ''
}

function clearPicker () {
  var wrapper = document.querySelector('.colorpicker-wrapper')
  
  wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span><div class="section-pallette"></div></div><div class="colorpicker-align"><div id="picker" style="background-color:rgb(255,0,0);"></div><div id="slide"></div></div>'
}
