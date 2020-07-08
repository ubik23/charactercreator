function shadeColor (color, percent) {
  var num = parseInt(color.slice(1), 16); var amt = Math.round(2.55 * percent); var R = (num >> 16) + amt; var G = (num >> 8 & 0x00FF) + amt; var B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

function ColorLuminance (hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0
  // convert to decimal and change luminosity
  var rgb = '#'; var c; var i
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }
  return rgb
}

function colorizeByClass (elClassName, color) {
  var elementList = document.querySelectorAll(('.' + elClassName))
  var elementListLength = elementList.length
  var elCounter = elementListLength
  while (elCounter--) {
    elementList[elementListLength - (elCounter + 1)].style.fill = color
  }
}

function colorSkin (color) {
  colorizeByClass('upperlip', shadeColor(color, -10))
  colorizeByClass('lowerlip', shadeColor(color, 10))
}

function colorElement (el) {
  var id = el.id.split('_')
  var section = id[0]
  var item = id[1]
  var newColor
  var newColorBeta
  var newColorGamma
  var newColorDelta
  var newColorEpsilon
  var colorPrefix = 'alpha'
  var lipstickColor

  if (section === 'eyeballs') { section = 'iris' }

  newColor = c.choices[section + 'Color']
  newColorBeta = c.choices[section + 'Color-bet']
  newColorGamma = c.choices[section + 'Color-gam']
  newColorDelta = c.choices[section + 'Color-del']
  newColorEpsilon = c.choices[section + 'Color-eps']

  if ((processSection(section, item) === 'skin' || processSection(section, item) === 'mouth') && c.choices.skinColor != undefined) {
    el = colorElementLoop(el, 'skin', c.choices.skinColor)
  } else if (processSection(section, item) === 'hair') {
    el = colorElementLoop(el, 'alpha', c.choices.hairColor)
  }

  if (newColor != undefined) {
    el = colorElementLoop(el, colorPrefix, newColor, false)
    if (section === 'mouth') {
      el = colorElementLoop(el, 'lips', newColor, true)
    }
  }

  if (newColorBeta != undefined) {
    el = colorElementLoop(el, 'beta', newColorBeta, false)
  }
  if (newColorGamma != undefined) {
    el = colorElementLoop(el, 'gamma', newColorGamma, false)
  }
  if (newColorDelta != undefined) {
    el = colorElementLoop(el, 'delta', newColorDelta, false)
  }
  if (newColorEpsilon != undefined) {
    el = colorElementLoop(el, 'epsilon', newColorEpsilon, false)
  }
  return el
}

function colorElementLoop (el, colorPrefix, newColor, lipstickFlag) {
  var colorContrasts = ['dark', 'light']
  var contrastCounter = colorContrasts.length
  var colorSuffixes = ['er', 'est']
  var suffixCounter
  var childrenList
  var counter
  var colorList = getColorList(newColor)
  var colorListIndex
  var colorPair
  var classPrefix = '.'

  if (lipstickFlag) {
    classPrefix = '.lips.'
  }

  childrenList = el.querySelectorAll('.' + colorPrefix)
  counter = childrenList.length

  if (colorPrefix === 'lips') {
    colorPrefix = 'skin'
  }

  if (counter > 0) {
    colorListIndex = 3
    colorPair = getColorPair(colorList, colorListIndex)
    while (counter--) {
      childrenList[counter] = applyColorToChild(childrenList[counter], colorPair)
    }
  }

  while (contrastCounter--) {
    childrenList = el.querySelectorAll(classPrefix + colorPrefix + '--' + colorContrasts[contrastCounter])
    counter = childrenList.length

    if (counter > 0) {
      if (colorContrasts[contrastCounter] === 'light') { colorListIndex = 4 }
      if (colorContrasts[contrastCounter] === 'dark') { colorListIndex = 2 }

      colorPair = getColorPair(colorList, colorListIndex)

      while (counter--) {
        childrenList[counter] = applyColorToChild(childrenList[counter], colorPair)
      }
    }

    suffixCounter = colorSuffixes.length

    while (suffixCounter--) {
      childrenList = el.querySelectorAll('.' + colorPrefix + '--' + colorContrasts[contrastCounter] + colorSuffixes[suffixCounter])
      counter = childrenList.length

      if (counter > 0) {
        if (colorContrasts[contrastCounter] + colorSuffixes[suffixCounter] === 'darkest') { colorListIndex = 0 }
        if (colorContrasts[contrastCounter] + colorSuffixes[suffixCounter] === 'darker') { colorListIndex = 1 }
        if (colorContrasts[contrastCounter] + colorSuffixes[suffixCounter] === 'lighter') { colorListIndex = 5 }
        if (colorContrasts[contrastCounter] + colorSuffixes[suffixCounter] === 'lightest') { colorListIndex = 6 }

        colorPair = getColorPair(colorList, colorListIndex)

        while (counter--) {
          childrenList[counter] = applyColorToChild(childrenList[counter], colorPair)
        }
      }
    }
  }
  return el
}

function applyColorToChild (child, colorPair) {
  if (child.style.fill != 'none' && child.style.fill != '') { child.style.fill = colorPair[0] }
  if (child.style.stroke != 'none' && child.style.stroke != '') { child.style.stroke = colorPair[1] }
  return child
}

function getColorPair (colorList, colorListIndex) {
  var fillColor = colorList[colorListIndex]
  var strokeColor
  var colorPair = []
  colorPair.push(fillColor)

  if (colorListIndex - 2 < 0) {
    strokeColor = colorList[0]
  } else {
    strokeColor = colorList[colorListIndex - 2]
  }
  colorPair.push(strokeColor)
  return colorPair
}

function getColorList (newColor) {
  // TODO Allow user to customize color contrast.
  var colorMultiplyer = 10 // Color contrast.
  var colorList = []
  colorList.push(shadeColor(newColor, -1 * (3 * colorMultiplyer)))
  colorList.push(shadeColor(newColor, -1 * (2 * colorMultiplyer)))
  colorList.push(shadeColor(newColor, -1 * colorMultiplyer))
  colorList.push(newColor)
  colorList.push(shadeColor(newColor, colorMultiplyer))
  colorList.push(shadeColor(newColor, (2 * colorMultiplyer)))
  colorList.push(shadeColor(newColor, (3 * colorMultiplyer)))
  return colorList
}

function getColorClassPrefix (id) {
  var prefix
  var sectionPallette = document.querySelector('.section-pallette')

  if (sectionPallette.querySelector('input:checked')) {
    prefix = sectionPallette.querySelector('input:checked').value
  } else if (id === 'body' || id === 'body_head' || id === 'ears' || id === 'nose' || id === 'age' || id === 'eyes' || id === 'freckles' || id === 'sockets') {
    prefix = 'skin'
  } else {
    prefix = 'alpha'
  }
  return prefix
}

function colorize (formId, _color) {
  var multiLayer = getMultiLayer()
  var skinLayers = getSkinLayers()
  var colorMultiplyer = 10 // Color contrast. TODO Move to user controls.
  var forms = window.forms
  var id = formId
  var affectedList = []

  var colorLight = shadeColor(_color, colorMultiplyer)
  var colorLighter = shadeColor(_color, (2 * colorMultiplyer))
  var colorLightest = shadeColor(_color, (3 * colorMultiplyer))
  var colorDark = shadeColor(_color, -1 * colorMultiplyer)
  var colorDarker = shadeColor(_color, -1 * (2 * colorMultiplyer))
  var colorDarkest = shadeColor(_color, -1 * (3 * colorMultiplyer))

  var classPrefix = getColorClassPrefix(formId)
  var palletteButton = document.querySelector('.section-pallette input[type="radio"]:checked+label')

  var classLightest = '--lightest'
  var classLighter = '--lighter'
  var classLight = '--light'
  var classDark = '--dark'
  var classDarker = '--darker'
  var classDarkest = '--darkest'

  var seperator = ' .'

  if (palletteButton) {
    palletteButton.style.background = _color
  }

  for (var f in forms) {
    var form = Object.keys(forms[f])

    for (var x in form) {
      // is x = to id?
      // if so, cycle through each element
      if (form[x].toLowerCase() === id) {
        // Figure out which form to look in to find this id
        // Cycle through each option
        var capitalId = id.replace(/^[a-z]/, function (m) { return m.toUpperCase() })
        // If the id is body, than the list will be of all 'skin' layers
        if (classPrefix === 'skin' && (id === 'body' || id === 'body_head' || id === 'ears' || id === 'nose' || id === 'age' || id === 'eyes' || id === 'freckles' || id === 'sockets')) {
          affectedList = skinLayers
          var myKey = 'skinColor'
          // classPrefix = "skin";
        } else if (id === 'facialhair' || id === 'hair') {
          affectedList = getHairLayers()
          var myKey = 'hairColor'
        } else if (id === 'iris') {
          affectedList = ['eyeballs_default']
          var myKey = 'irisColor'
        } else {
          affectedList = []
          var myKey = id + 'Color'
          if (classPrefix != 'skin' && classPrefix != 'alpha' && classPrefix != 'lips') {
            myKey = myKey + '-' + classPrefix.slice(0, 3)
          }
          if (myKey === 'irisColor' || myKey === 'browsColor' || myKey === 'lashesColor' || myKey === 'socketsColor' || myKey === 'mouthColor') {
            for (i in forms[0].Emotion) {
              var tmpId = forms[0].Emotion[i]
              if (tmpId != '') {
                affectedList.push(id + '_' + tmpId)
              }
            }
            if (myKey === 'mouthColor') {
              classPrefix = 'skin'
            }
          } else {
            for (i in forms[f][capitalId]) {
              var tmpId = forms[f][capitalId][i]
              if (tmpId != '') {
                affectedList.push(id + '_' + tmpId)
              }
            }
          }
        }
        // Look at the affected list
        // If one of those is in the multiLayer array
        // Then take it out and replace it with the layers that need to be there
        origList = affectedList
        affectedList = getAffectedListFromOrig(origList, multiLayer)
        var myValue = _color.toString()
        var obj = new Array()
        obj[myKey] = myValue
        hash.add(obj)
        modCharacter(myKey, myValue)

        for (n in affectedList) {
          fullId = '#' + affectedList[n]
          if (id === 'mouth') {
            seperator = ' .lips.'
          }
          var alphaNodes = document.querySelectorAll(fullId + seperator + classPrefix)
          var alphaLightNodes = document.querySelectorAll(fullId + seperator + classPrefix + classLight)
          var alphaLighterNodes = document.querySelectorAll(fullId + seperator + classPrefix + classLighter)
          var alphaLightestNodes = document.querySelectorAll(fullId + seperator + classPrefix + classLightest)
          var alphaDarkNodes = document.querySelectorAll(fullId + seperator + classPrefix + classDark)
          var alphaDarkerNodes = document.querySelectorAll(fullId + seperator + classPrefix + classDarker)
          var alphaDarkestNodes = document.querySelectorAll(fullId + seperator + classPrefix + classDarkest)
          var alphaNodesCounter = alphaNodes.length
          var alphaLightNodesCounter = alphaLightNodes.length
          var alphaLighterNodesCounter = alphaLighterNodes.length
          var alphaLightestNodesCounter = alphaLightestNodes.length
          var alphaDarkNodesCounter = alphaDarkNodes.length
          var alphaDarkerNodesCounter = alphaDarkerNodes.length
          var alphaDarkestNodesCounter = alphaDarkestNodes.length

          while (alphaNodesCounter--) {
            colorPaths(alphaNodes[alphaNodesCounter], _color, colorDarker)
          }
          while (alphaLightNodesCounter--) {
            colorPaths(alphaLightNodes[alphaLightNodesCounter], colorLight, colorDark)
          }
          while (alphaLighterNodesCounter--) {
            colorPaths(alphaLighterNodes[alphaLighterNodesCounter], colorLighter, _color)
          }
          while (alphaLightestNodesCounter--) {
            colorPaths(alphaLightestNodes[alphaLightestNodesCounter], colorLightest, colorLight)
          }
          while (alphaDarkNodesCounter--) {
            colorPaths(alphaDarkNodes[alphaDarkNodesCounter], colorDark, colorDarker)
          }
          while (alphaDarkerNodesCounter--) {
            colorPaths(alphaDarkerNodes[alphaDarkerNodesCounter], colorDarker, colorDarkest)
          }
          while (alphaDarkestNodesCounter--) {
            colorPaths(alphaDarkestNodes[alphaDarkestNodesCounter], colorDarkest, colorDarkest)
          }
        }
      }
    }
  }
}

function colorPaths (node, _color, colorDarker) {
  if (node.style.fill != 'none' && node.style.fill != '') {
    node.style.fill = _color
  }
  if (node.style.stroke != 'none' && node.style.stroke != '') {
    node.style.stroke = colorDarker
  }
}

function getAffectedListFromOrig (origList, multiLayer) {
  var affectedList = []
  var layerCount
  for (a in origList) {
    layerCount = isInMultiLayerArray(origList[a], multiLayer)
    if (layerCount > 0) {
        for (var i = 1; i <= layerCount; i++) {
          idOf = origList[a] + '_' + i + '_of_' + layerCount
          affectedList.push(idOf)
        }
    } else {
    affectedList.push(origList[a])
    }
  }
  return affectedList
}

function replacementStyle (json, newColor) {
  var newStyle = json.style
  var replacement = ''
  for (n in Object.keys(newStyle)) {
    var currentKey = Object.keys(newStyle)[n]

    if (currentKey === 'fill') {
      if (newStyle[currentKey] != 'none') {
        if (json.style['stroke-width'] === undefined) {
          var currentValue = ColorLuminance(newColor, -0.12)
        } else {
          var currentValue = newColor
        }
      } else {
        var currentValue = newStyle[currentKey]
      }
    } else if (currentKey === 'stroke') {
      if (newStyle[currentKey] != 'none') {
        if (json.style['stroke-width'] != undefined) {
          var currentValue = ColorLuminance(newColor, -0.2)
        }
      } else {
        var currentValue = newStyle[currentKey]
      }
    } else {
      var currentValue = newStyle[currentKey]
    }
    var keyVal = 	currentKey + ': ' + currentValue + '; '
    replacement = replacement.concat(keyVal)
  }
  return replacement
}
