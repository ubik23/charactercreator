function random () {
  var forms = window.forms
  var formLen = forms.length
  var formRand = Math.floor((Math.random() * formLen))
  var count = 0
  var randForm = forms[formRand]
  for (k in randForm) if (randForm.hasOwnProperty(k)) count++
  var keys = []
  for (var key in forms[formRand]) {
    if (forms[formRand].hasOwnProperty(key)) {
      keys.push(key)
    }
  }
  var lenKey = keys.length
  var randKey = Math.floor((Math.random() * lenKey))
  var key = keys[randKey]
  var myKey = key
  var len = forms[formRand][myKey].length
  var rand = Math.floor((Math.random() * len))
  var layer = forms[formRand][myKey][rand].toLowerCase()
  showRandom(key.toLowerCase(), layer)
}

function showRandom (section, layer) { // Draw the SVG on screen
  hideCompetition(section)
  var selectedOption = layer
  var sections = []
  sections[0] = section
  var obj = new Array()
  var id = '#' + sections[0] + '_' + selectedOption
  obj[sections[0]] = selectedOption
  hash.add(obj)

  if (sections[0] === 'emotion') {
    modCharacter(sections[0], selectedOption)
    sections = []// Reset the sections layer so it doesn't contain 'emotion', as it isn't a layer in itself.
    var emotions = GetEmotionGetLayers(selectedOption)
    for (emo in emotions) {
      var newEmo = emotions[emo] + '_' + layer
      sections.push(newEmo)
    }
  };

  for (section in sections) {
    sectionOptions = getOptionsRandom(sections[section])
    var id = '#' + sections[section] + '_' + layer
    for (option in sectionOptions) {
      optionId = '#' + sections[section] + '_' + sectionOptions[option]
      hideId(optionId)
    }

    if (id.slice(-1) != '_') {
      showId(id)
    }
    if (sections[section] === 'brows' || sections[section] === 'eyes' || sections[section] === 'mouth' || sections[section] === 'lashes' || sections[section] === 'sockets') {
      modCharacter(sections[section], selectedOption)
    } else {
      var obj = new Array()
      obj[sections[section]] = selectedOption
      hash.add(obj)
      modCharacter(sections[section], selectedOption)
    }
  };
}

function hideCompetition (section) {
  var headPiece = ['hair', 'mask', 'veil']
  var topPiece = ['shorts', 'pants']
  var overPiece = ['jacket', 'coat']

  if (headPiece.indexOf(section) != -1) {
    hideArray(headPiece)
  } else if (topPiece.indexOf(section) != -1) {
    hideArray(topPiece)
  } else if (overPiece.indexOf(section) != -1) {
    hideArray(overPiece)
  };
}

function hideArray (competition) {
  for (section in competition) {
    sectionOptions = getOptionsRandom(competition[section])
    for (option in sectionOptions) {
      if (sectionOptions[option] != '') {
        optionId = '#' + competition[section] + '_' + sectionOptions[option]
        hideId(optionId)
        var obj = new Array()
        obj[competition[section]] = ''
        hash.add(obj)
        modCharacter(competition[section], '')
      }
    }
  }
}

function showId (id) {
  var showList = []
  //var inMuliLayer = false
  var svgContainer = document.querySelector('#svg1')
  var layerCount = isInMultiLayerArray(id.slice(1), multiLayer)
  gaga('send', 'event', 'menu', 'select', id)

  if (layerCount > 0) {
    for (var i = 1; i <= layerCount; i++) {
      idOf = id + '_' + i + '_of_' + layerCount
      showList.push(idOf.slice(1))
    }
  } else {
    showList.push(id.slice(1))
  }
  loadFilesFromList(showList)
}

function hideId (id) {
  var svgContainer = document.querySelector('#svg1')
  var layerToHide
  var layerCount = isInMultiLayerArray(id.slice(1), multiLayer)

  if (layerCount > 0) {
    for (var i = 1; i <= layerCount; i++) {
      idOf = id + '_' + i + '_of_' + layerCount
      layerToHide = svgContainer.querySelector(idOf)
      if (layerToHide != null) {
        svgContainer.removeChild(layerToHide)
      }
    }
  } else {
    layerToHide = svgContainer.querySelector(id)
    if (layerToHide != null) {
      svgContainer.removeChild(layerToHide)
    }
  }
}

function getOptionsRandom (section) {
  var sectionOptions = []
  for (form in window.forms) {
    if (capitalizeFirstLetter(section) in window.forms[form]) {
      return window.forms[form][capitalizeFirstLetter(section)]
    } else {
    }
  }
}

function smartRandomStream () {
  // TODO
  // Count the amount of options in each category of all forms.
  // Give each for that percentage of chance to its parent form.
  // Do the same for each category in that form.
  // Allow sex change option to have its share of chance to be picked.
  // Do the same for changing the skin color.
  // Cycle on a setInterval so not to overheat laptop.
}

function smartRandomSingle (ev) {
  gaga('send', 'event', { eventCategory: 'Secret function', eventAction: 'smartRandomSingle()', eventLabel: 'Secret Patreon reveal for new random function.' })
  var roll
  var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
  var obj = new Array()
  var forms
  var counter
  var formLen
  var categories
  var newColor
  var keys
  var keyLen
  var keyCounter
  var items
  var itemsLen
  var newItem
  var formCount
  var obj = new Array()
  var roll
  var catKey
  var chance
  var chanceDict = {
    // 'button' : 2,
    coat: 15,
    collar: 5,
    earings: 90,
    earpiece: 5,
    eyepatch: 10,
    glasses: 60,
    holster: 5,
    horns: 3,
    kneepads: 5,
    makeup: 80,
    mask: 5,
    necklace: 75,
    pet: 20,
    scarf: 10,
    shirt: 95,
    shoulderpads: 5,
    smoke: 20,
    suit: 5,
    tie: 15,
    veil: 5,
    vest: 5,
    warpaint: 5,
    wings: 3
  }
  var defaultChance = 50
  var bottomCovered = false
  var topCovered = false
  var headCovered = false
  var forms
  var fabColor
  var fabColorCounter = fabricPallette.length

  hash.clear()
  // First, clear the board and start from the silhouettes
  resetCharacter()
  // Choose the sex at random (50/50)
  var roll = Math.floor((Math.random() * 100))

  if (roll <= 50) {
    selectFemale()
    var form1 = femaleForm1
    var form2 = femaleForm2
    var form3 = femaleForm3
    var form4 = femaleForm4
    var form5 = femaleForm5
    var form6 = femaleForm6
  } else {
    selectMale()
    var form1 = maleForm1
    var form2 = maleForm2
    var form3 = maleForm3
    var form4 = maleForm4
    var form5 = maleForm5
    var form6 = maleForm6
  }
  forms = [form1, form2, form3, form4, form5, form6]
  // Then choose the skin color at random (1/24)
  roll = Math.floor((Math.random() * 24))
  newColor = obj.skinColor = skinTones[roll].toLowerCase()
  hash.add(obj)
  defaultEyeColor(c, newColor)
  defaultHairColor(c, newColor)
  defaultPupilShape()
  fabRoll = Math.floor((Math.random() * fabColorCounter))
  fabColor = fabricPallette[fabRoll]

  setTimeout(function () {
    counter = formLen = forms.length

    while (counter--) {
      formCount = formLen - 1 - counter
      categories = forms[formCount]
      keys = Object.keys(categories)
      keyCounter = keyLen = keys.length

      if (formCount === 0) {
        while (keyCounter--) {
          items = categories[keys[keyLen - 1 - keyCounter]]
          itemsLen = items.length
          var roll = Math.floor((Math.random() * itemsLen))
          var catKey = keys[keyLen - 1 - keyCounter].toLowerCase()
          var item = items[roll].toLowerCase()

          if (catKey === 'hair' && item != '') {
            headCovered = true
          }

          obj[catKey] = item
          hash.add(obj)
        }
      }
      if (formCount > 0) {
        while (keyCounter--) {
          newItem = ''
          items = categories[keys[keyLen - 1 - keyCounter]]
          itemsLen = items.length
          catKey = keys[keyLen - 1 - keyCounter].toLowerCase()

          // only treat the categories that have a percentage chance to be added
          // should be rewritten to test if catKey is in chanceDict
          if (catKey != 'pants' && catKey != 'underwear' && catKey != 'body' && catKey != 'cloak' && catKey != 'shoes' && catKey != 'bra' && catKey != 'mask') {
            if (chanceDict[catKey] != undefined) {
              chance = chanceDict[catKey]
            } else {
              chance = defaultChance
            }
            // // Check to see if there's a chance we choose an item from this category
            roll = Math.floor((Math.random() * 100))
            if (roll <= chance) {
              roll = Math.floor((Math.random() * (itemsLen - 1))) + 1
              newItem = items[roll].toLowerCase()
              if (headCovered) {
                if (catKey === 'hat' || catKey === 'veil') {
                  newItem = ''
                }
              }
              if (bottomCovered || topCovered) {
                if (catKey === 'suit' || catKey === 'dress' || catKey === 'coat' || catKey === 'top') {
                  newItem = ''
                }
              }
              if (bottomCovered) {
                if (catKey === 'shorts' || catKey === 'dress' || catKey === 'skirt' || catKey === 'pants') {
                  newItem = ''
                }
              }
              if (topCovered) {
                if (catKey === 'shirt' || catKey === 'top' || catKey === 'suit') {
                  newItem = ''
                }
              }
            }
            //
            if (newItem != '') {
              if (catKey === 'suit' || catKey === 'dress') {
                if (newItem != 'suit') {
                  bottomCovered = true
                }
                topCovered = true
              } else if (catKey === 'top' || catKey === 'shirt' || catKey === 'shirt' || catKey === 'jacket') {
                topCovered = true
              } else if (catKey === 'shorts' || catKey === 'skirt' || catKey === 'pants') {
                bottomCovered = true
              }
            }
          } else if (catKey === 'body') {
            roll = Math.floor((Math.random() * 100))
            if (roll < 40) {
              roll = 0
            } else if (roll < 80) {
              roll = 1
            } else if (roll < 95) {
              roll = 2
            } else {
              roll = 3
            }
            newItem = items[roll].toLowerCase()
          } else if (catKey === 'cloak' || catKey === 'bra' || catKey === 'underwear' || catKey === 'mask') {
            newItem = ''
          } else {
            roll = Math.floor((Math.random() * (itemsLen - 1))) + 1
            newItem = items[roll].toLowerCase()

            if (bottomCovered || topCovered) {
              if (catKey === 'suit' || catKey === 'dress' || catKey === 'top') {
                newItem = ''
              }
            }
            if (bottomCovered) {
              if (catKey === 'shorts' || catKey === 'dress' || catKey === 'skirt' || catKey === 'pants') {
                newItem = ''
              }
            }
            if (topCovered) {
              if (catKey === 'shirt' || catKey === 'top' || catKey === 'suit') {
                newItem = ''
              }
            }

            if (newItem != '') {
              if (catKey === 'suit' || catKey === 'dress') {
                bottomCovered = true
                topCovered = true
              } else if (catKey === 'top' || catKey === 'shirt' || catKey === 'vest' || catKey === 'shirt' || catKey === 'jacket') {
                topCovered = true
              } else if (catKey === 'shorts' || catKey === 'skirt' || catKey === 'pants') {
                bottomCovered = true
              }
            }
          } // if category requires a roll
          obj[catKey] = newItem
          if (catKey === 'jacket' || (catKey === 'vest' && newItem != 'yellow') || (catKey === 'pants' && (newItem === 'suit' || newItem === 'snowboard')) || catKey === 'shorts' || catKey === 'skirt' || catKey === 'top' || catKey === 'suit' || catKey === 'dress') {
            obj[catKey + 'Color'] = fabColor
          }
          hash.add(obj)
        } // while keycounter--
      } // if formcount > 0
    } // while counter--
    if (!bottomCovered && !topCovered) {
      if (c.choices.sex === 'f') {
        coverAll(forms)
      } else {
        coverBottom(forms)
      }
    } else if (!bottomCovered) {
      coverBottom(forms)
    } else if (c.choices.sex === 'f' && !topCovered) {
      coverTop(forms)
    }
    launch()
  }, 300)
  // Cycle through each category in the first form
  // For Mouth pass on male, change color on female (50% chance to keep the skin color)

  // In the second form, give the 'none' option a 50% chance so not to ovepopulate with items.
  // in the third, give 50% to 'none' for Tie, Vest, Holster, Shoulderpads and Scarf
  // In the Fourth, give 50% to 'none' for all
  // In the fifth, choose pants (don't accept 'none' as an option)
  // In the sixth, socks are optional but shoes are not
}

function coverAll (forms) {
  var catKeyList = ['suit', 'dress']
  var counter = formLen = forms.length
  var formCount
  var categories
  var keys
  var keyCounter
  var obj = new Array()

  // Randomly choose new catKey
  var catKey = 'dress'

  while (counter--) {
    formCount = formLen - 1 - counter
    categories = forms[formCount]
    keys = Object.keys(categories)
    keyCounter = keyLen = keys.length

    if (keys.includes(capitalizeFirstLetter(catKey))) {
      items = categories[capitalizeFirstLetter(catKey)]
      itemsLen = items.length
      roll = Math.floor((Math.random() * (itemsLen - 1))) + 1
      newItem = items[roll].toLowerCase()
      obj[catKey] = newItem
      hash.add(obj)
    }
  }
}

function coverTop (forms) {
  var catKeyList = ['top']
  var counter = formLen = forms.length
  var formCount
  var categories
  var keys
  var keyCounter
  var catKey = 'top'
  var obj = new Array()

  while (counter--) {
    formCount = formLen - 1 - counter
    categories = forms[formCount]
    keys = Object.keys(categories)
    keyCounter = keyLen = keys.length

    if (keys.includes(capitalizeFirstLetter(catKey))) {
      items = categories[capitalizeFirstLetter(catKey)]
      itemsLen = items.length
      roll = Math.floor((Math.random() * (itemsLen - 1))) + 1
      newItem = items[roll].toLowerCase()
      obj[catKey] = newItem
      hash.add(obj)
    }
  }
}

function coverBottom (forms) {
  var sex = c.choices.sex
  var catKeyList
  var counter = formLen = forms.length
  var formCount
  var categories
  var keys
  var keyCounter
  var obj = new Array()

  if (sex === 'm') {
    catKeyList = ['pants']
    var catKey = 'pants'
  } else {
    catKeyList = ['shorts', 'skirt', 'pants']
    var catKey = 'skirt'
  }

  while (counter--) {
    formCount = formLen - 1 - counter
    categories = forms[formCount]
    keys = Object.keys(categories)
    keyCounter = keyLen = keys.length

    if (keys.includes(capitalizeFirstLetter(catKey))) {
      items = categories[capitalizeFirstLetter(catKey)]
      itemsLen = items.length
      roll = Math.floor((Math.random() * (itemsLen - 1))) + 1
      newItem = items[roll].toLowerCase()
      obj[catKey] = newItem
      hash.add(obj)
    }
  }
}
