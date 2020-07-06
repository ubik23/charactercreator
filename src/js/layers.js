
function purgeHiddenLayers () {
  var option = document.querySelector('#content_1 .selected--option')
  if (!option) { return }
  var section = option.classList[2].slice(9)
  var thumbsSVG = document.querySelectorAll('#content_1 .selected--option svg')
  var svg = document.querySelector('#svg1 #character-container')
  var counter = thumbsSVG.length
  var currentSVG
  var layersList = []
  var mutlilayerList = []
  while (counter--) {
    layersList.push(thumbsSVG[counter].classList[1])
  }
  layersList = replaceMultilayer(layersList)
  counter = layersList.length
  while (counter--) {
    currentSVG = svg.querySelector('#' + layersList[counter])
    if (currentSVG != null && currentSVG.style.opacity === '0') {
      svg.removeChild(currentSVG)
    }
  }
}

function showPupilObject (object, shape) {
  var pupils = object.querySelectorAll('.pupil')
  var shown = object.querySelectorAll('.pupil--' + shape)
  var counter = pupils.length
  while (counter--) {
    // pupils[counter].style
    if (pupils[counter].classList.contains('pupil--' + shape)) {
      pupils[counter].style.opacity = 1
    } else {
      pupils[counter].style.opacity = 0
    }
  }
  return object
}

function clearCharacter () {
  var svgContainer = document.querySelector('#svg1 .character-container')
  // Clear only what's in .current-character
  var toBeRemovedList = document.querySelectorAll('#svg1 .character-container > g')
  var counter = toBeRemovedList.length
  while (counter--) {
    if (toBeRemovedList[counter].id != 'male_silhouette' && toBeRemovedList[counter].id != 'female_silhouette') {
      svgContainer.removeChild(toBeRemovedList[counter])
    }
  }
}

function resetCharacterTemplate () {
  var characterSVG = document.querySelector('#svg1 .character-container')
  // Reset only what's in .current-character
  var elements = characterSVG.querySelectorAll('*')
  var elementsLength = elements.length
  var elementsCounter = elementsLength
  while (elementsCounter--) {
    if (elements[elementsCounter].style.opacity !== 0) {
      elements[elementsCounter].style.opactiy = '0'
      selements[elementsCounter].style.pointerEvents = 'none'
    }
  }
}

function findNextLayerInDom (item) {
  var sex = c.choices.sex
  var svgContainer = document.querySelector('#svg1 .character-container')
  // TODO search within .current-character
  var nextLayerSibling = null
  var layers
  var amountLayers
  var itemPosition
  if (sex === 'm') {
    layers = window.layersMale
  } else {
    layers = window.layersFemale
  }
  amountLayers = layers.length
  itemPosition = layers.indexOf(item)
  while (nextLayerSibling === null) {
    nextLayerSibling = svgContainer.querySelector('#' + layers[itemPosition + 1])
    if (itemPosition > amountLayers) {
      return
    }
    ++itemPosition
  }
  return nextLayerSibling
}

function bodyTypesToLayers (type) {
  var layers = []

  layers.push('body_torso_' + type)
  layers.push('body_leg_left_' + type)
  layers.push('body_leg_right_' + type)
  layers.push('body_foot_left')
  layers.push('body_foot_right')
  layers.push('body_arm_left_' + type)
  layers.push('body_arm_right_' + type)
  layers.push('body_forearm_left_' + type)
  layers.push('body_forearm_right_' + type)
  layers.push('body_hand_left')
  layers.push('body_hand_right')

  return layers
}
