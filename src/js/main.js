"use strict"

window.maleBodyPositionFolder = 'body_front_swaying'
window.femaleBodyPositionFolder = 'body_front_hand-on-hip'

const femaleHead = fetch('/layer/female/head_front_default/layers.json')
.then(function (res) {
  return res.json()
})
.catch(console.error)

const femaleBody = fetch('/layer/female/' + window.femaleBodyPositionFolder + '/layers.json')
.then(function (res) {
  return res.json()
})
.catch(console.error)

const maleHead = fetch('/layer/male/head_front_default/layers.json')
.then(function (res) {
  return res.json()
})
.catch(console.error)

const maleBody = fetch('/layer/male/' + window.maleBodyPositionFolder + '/layers.json')
.then(function (res) {
  return res.json()
})
.catch(console.error)

Promise.all([maleHead, maleBody])
  .then(function([maleHead, maleBody]) {
    window.layersMale = assembleLayers(maleBody, maleHead, window.maleBodyPositionFolder, 'head_front_default')
    window.maleHead = maleHead
    window.maleBody = maleBody
  })

Promise.all([femaleHead, femaleBody])
  .then(function([femaleHead, femaleBody]) {
    window.layersFemale  = assembleLayers(femaleBody, femaleHead, window.femaleBodyPositionFolder, 'head_front_default')
    window.femaleHead = femaleHead
    window.femaleBody = femaleBody
  })

function assembleLayers (bodyObject, headObject, bodyPosition, headPosition) {
  var layers = []
  var sourceLayers =[]
  var counter
  if (bodyObject.bodyBack) {
    counter = bodyObject.bodyBack.length
    total = counter
    while (counter--) {
      layers.push(bodyObject.bodyBack[total - (counter + 1)])
    }
  }
  if (headObject.headBack) {
    counter = headObject.headBack.length
    total = counter
    while (counter--) {
      layers.push(headObject.headBack[total - (counter + 1)])
    }
  }
  if (bodyObject.bodyMiddle) {
    counter = bodyObject.bodyMiddle.length
    total = counter
    while (counter--) {
      layers.push(bodyObject.bodyMiddle[total - (counter + 1)])
    }
  }
  if (headObject.headMiddle) {
    counter = headObject.headMiddle.length
    total = counter
    while (counter--) {
      layers.push(headObject.headMiddle[total - (counter + 1)])
    }
  }
  if (bodyObject.bodyFront) {
    counter = bodyObject.bodyFront.length
    total = counter
    while (counter--) {
      layers.push(bodyObject.bodyFront[total - (counter + 1)])
    }
  }
  if (headObject.headFront) {
    counter = headObject.headFront.length
    total = counter
    while (counter--) {
      layers.push(headObject.headFront[total - (counter + 1)])
    }
  }
  if (bodyObject.bodyOver) {
    counter = bodyObject.bodyOver.length
    total = counter
    while (counter--) {
      layers.push(bodyObject.bodyOver[total - (counter + 1)])
    }
  }
  if (headObject.headOver) {
    counter = headObject.headOver.length
    total = counter
    while (counter--) {
      layers.push(headObject.headOver[total - (counter + 1)])
    }
  }
  return layers
}

window.onload = function () {
  var c // Main variable to hold user choices and preferences
  var aboutBtn = document.querySelector('#aboutButton')
  var faqBtn = document.querySelector('#faqButton')
  var shopBtn = document.querySelector('#shopButton')
  var whoBtn = document.querySelector('#whoButton')
  var logoutBtn = document.querySelector('#logoutButton')
  var loginBtn = document.querySelector('#loginButton')
  var registerBtn = document.querySelector('#registerButton')
  var registerLink = document.querySelector('.js-register-link')
  var creditsBtn = document.querySelector('#creditsButton')
  var hamburgerBtn = document.querySelector('.hamburger-btn')
  var zoomBtn = document.querySelector('#zoomLevel')
  var maleSilhouette = document.getElementById('male_silhouette')
  var femaleSilhouette = document.getElementById('female_silhouette')
  var rightSidebar = document.querySelector('#sidebar')
  var rightSidebarClone = rightSidebar.cloneNode(true)
  var svgContainer = document.querySelector('#svg1')
  var patreonLink = document.querySelector('#patreonButton')
  var patreonBtn = document.querySelector('#patreon-btn')
  var braveAffiliateBtn = document.querySelector('#brave-affiliate-btn')
  var newCharBtn = document.querySelector('#new-char-btn')
  // var saveCharToCloudBtn = document.querySelector('#save-char-to-cloud-btn')
  var loadCharBtn = document.querySelector('#load-char-btn')
  var nightModeBtn = document.querySelector('#nightModeButton')
  var bigRedBtn = document.querySelector('#bigRedButton')
  var downloadBtn = document.querySelector('#proceed-download')
  var homeBtn = document.querySelector('.site-title')

  if (homeBtn && typeof gotoNewChar === 'function') { homeBtn.addEventListener('click', gotoNewChar, false) }
  if (aboutBtn && typeof showAbout === 'function') { aboutBtn.addEventListener('click', showAbout, false) }
  if (faqBtn && typeof showFAQ === 'function') { faqBtn.addEventListener('click', showFAQ, false) }
  if (shopBtn && typeof showShop === 'function') { shopBtn.addEventListener('click', showShop, false) }
  if (whoBtn && typeof whoami === 'function') { whoBtn.addEventListener('click', whoami, false) }
  if (logoutBtn && typeof logout === 'function') { logoutBtn.addEventListener('click', logout, false) }
  if (loginBtn && typeof loginMenu === 'function') { loginBtn.addEventListener('click', loginMenu, false) }
  if (registerBtn && typeof registerMenu === 'function') { registerBtn.addEventListener('click', registerMenu, false) }
  if (registerLink && typeof registerMenu === 'function') { registerLink.addEventListener('click', registerMenu, false) }
  if (creditsBtn && typeof rollCredits === 'function') { creditsBtn.addEventListener('click', rollCredits, false) }
  if (hamburgerBtn && typeof hamburger === 'function') { hamburgerBtn.addEventListener('click', hamburger, false) }
  if (zoomBtn && typeof viewBoxZoom === 'function') { zoomBtn.addEventListener('change', viewBoxZoom, false) }
  if (maleSilhouette && typeof selectMale === 'function') { maleSilhouette.addEventListener('click', selectMale, false) }
  if (femaleSilhouette && typeof selectFemale === 'function') { femaleSilhouette.addEventListener('click', selectFemale, false) }
  if (svgContainer && typeof clickSelect === 'function') { svgContainer.addEventListener('click', clickSelect, false) }
  if (svgContainer && typeof layerHighlight === 'function') { svgContainer.addEventListener('mouseover', layerHighlight, false) }
  if (patreonLink && typeof tattle === 'function') { patreonLink.addEventListener('click', tattle, false) }
  if (patreonBtn && typeof gotoPatreon === 'function') { patreonBtn.addEventListener('click', gotoPatreon, false) }
  if (braveAffiliateBtn && typeof gotoBrave === 'function') { braveAffiliateBtn.addEventListener('click', gotoBrave, false) }
  if (newCharBtn && typeof gotoNewChar === 'function') { newCharBtn.addEventListener('click', gotoNewChar, false) }
  // if (saveCharToCloudBtn && typeof saveCharToCloud === 'function') { saveCharToCloudBtn.addEventListener('click', saveCharToCloud, false) }
  if (loadCharBtn && typeof gotoLoadChar === 'function') { loadCharBtn.addEventListener('click', gotoLoadChar, false) }
  if (nightModeBtn && typeof switchNightMode === 'function') { nightModeBtn.addEventListener('click', switchNightMode, false) }
  if (bigRedBtn && typeof smartRandomSingle === 'function') { bigRedBtn.addEventListener('click', smartRandomSingle, false) }
  if (downloadBtn && typeof download === 'function') { downloadBtn.addEventListener('click', download, false) }

  // checkNightMode()
  startup()
}

/*
function saveCharToCloud (ev) {
  preventDefault(ev)
  // consolelog('saveCharToCloud')
  // Close current modal
  // Check if user is logged in
  // Check if this character already exists in the cast
  // If not, prompt to name the character in the cast modal
}
*/

function checkNightMode () {
  var body = document.querySelector('BODY')
  var checkBox = document.querySelector('#nightModeBox')

  if (checkBox.checked && !body.classList.contains('night')) {
    body.classList.toggle('night')
  }
}

function switchNightMode (ev) {
  // document.documentElement.setAttribute('data-theme', 'lighttheme');
  gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Dark/Light', eventLabel: 'Switch between Dark mode and Light mode' })
  ev.preventDefault()
  var body = document.querySelector('BODY')
  hamburger()

  if (body.classList === '') {
    document.documentElement.setAttribute('data-theme', 'darktheme')
  } else if (body.classList === 'night') {
    document.documentElement.setAttribute('data-theme', 'lighttheme')
  }
  body.classList.toggle('night')
}

function tattle () {
  gaga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Navbar | Patreon', eventLabel: 'Open Patreon page from the Navbar/Hamburger menu.' })
}

function gotoPatreon (evt) {
  if (evt) {
    evt.preventDefault()
  }
  gaga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | Patreon', eventLabel: 'Open Patreon page from Caboose modal.' })
  closeAllOverlays()
  setTimeout(function () { window.open('https://www.patreon.com/charactercreator') }, 500)
}

function gotoBrave (evt) {
  if (evt) {
    evt.preventDefault()
  }
  gaga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | Brave', eventLabel: 'Open Brave Browser page from Caboose modal.' })
  closeAllOverlays()
  // consolelog('brave')
  setTimeout(function () { window.open('https://brave.com/cha553') }, 500)
}

function gotoNewChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  gaga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | New character', eventLabel: 'Reset to new character from Caboose.' })
  closeAllOverlays()
  window.location.hash ='';
  setTimeout(function () {
    resetCharacter()
  }, 500)
}

function resetCharacter () {
  var choices = []
  // Hide menus.
  hideMenus()
  // Fade out SVG.
  fadeOutSVG()
  // Remove all groups.
  removeGroups()
  // Zoom out in case we were zoomed in.
  zoomFull()
  // reset silhouettes
  resetSilhouettes()
  // Clean hash.
  // Fade in SVG.
  // Clear 'c' variable.
  c = new Character(choices)
  setTimeout(function () { fadeInSVG() }, 300)
  // launch anew.
  relaunch()
}

function relaunch () {
  male = document.querySelector('#male_silhouette')
  female = document.querySelector('#female_silhouette')
  male.style.opacity = '1'
  female.style.opacity = '1'
}

function removeGroups () {
  var svgContainer = document.querySelector('#svg1 #character-container')
  var groups = svgContainer.querySelectorAll('#svg1 #character-container > g')
  var counter = groups.length

  while (counter--) {
    if (groups[counter].id != 'female_silhouette' && groups[counter].id != 'male_silhouette') {
      svgContainer.removeChild(groups[counter])
    }
  }
}

function hideMenus () {
  var menus = document.querySelectorAll('.sidebar.visible')
  var counter = menus.length

  while (counter--) {
    menus[counter].classList.remove('visible')
  }
}

function fadeOutSVG () {
  var svgContainer = document.querySelector('#svg1')
  var characterShadow = svgContainer.querySelector('.character-shadow.shine')
  var downloadBtn = document.querySelector('#downloadButton.enabled')

  if (characterShadow) {
    characterShadow.classList.remove('shine')
  }

  if (downloadBtn) {
    downloadBtn.classList.remove('enabled')
    downloadBtn.removeEventListener('click', download)
  }
  svgContainer.classList.add('character--hide')
}

function fadeInSVG () {
  var svgContainer = document.querySelector('#svg1')
  svgContainer.classList.remove('character--hide')
}

function resetSilhouettes () {
  var defaultColor = 'currentColor'
  var svgContainer = document.querySelector('#svg1')
  var maleSilhouette = svgContainer.querySelector('#path_male')
  var femaleSilhouette = svgContainer.querySelector('#path_female')
  var silhouetteRemaining

  if (svgContainer.classList.contains('select-female')) {
    silhouette = svgContainer.querySelector('#female_silhouette')
    silhouetteRemaining = svgContainer.querySelector('#male_silhouette')
  } else if (svgContainer.classList.contains('select-male')) {
    silhouette = svgContainer.querySelector('#male_silhouette')
    silhouetteRemaining = svgContainer.querySelector('#female_silhouette')
  }
  svgContainer.classList = ''
  maleSilhouette.style.fill = defaultColor
  femaleSilhouette.style.fill = defaultColor

  if (maleSilhouette && typeof selectMale === 'function') { maleSilhouette.addEventListener('click', selectMale, false) }
  if (femaleSilhouette && typeof selectFemale === 'function') { femaleSilhouette.addEventListener('click', selectFemale, false) }
}

function gotoLoadChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  closeAllOverlays()
}

// The 'caboose' is the modal at the end of the character creation process.
function caboose () {
  var overlay = document.querySelector('.js-caboose')
  var closeBtn = overlay.querySelector('.close-btn')

  closeAllOverlays()

  overlay.classList.add('overlay--show')
  overlay.addEventListener('click', closeOverlay, true)
  closeBtn.addEventListener('click', closeOverlay, false)
}

function layerHighlight (ev) {
  var el = getGroupParent(ev.target)
  if (!el) return
  var masks = document.querySelectorAll('#contour use')
  var masksLen = masks.length

  if (masks[0].getAttribute('xlink:href') === el.id) {

  } else if (el.id === 'svg1') {
    while (masksLen--) {
      masks[masksLen].setAttribute('xlink:href', '')
    }
  } else {
    while (masksLen--) {
      masks[masksLen].setAttribute('xlink:href', '#' + el.id)
    }
  }
}

/*
function getViewBoxOnClick () {
  // return '10 50 540 540'
  var viewBox = '10 50 540 540'
  var svgContainer = document.querySelector('#svg1')
  // consolelog('SVG1', svgContainer.viewBox)
  // consolelog('SVG1', svgContainer.viewBox.baseVal)
  // consolelog(el.getBoundingClientRect())
  return viewBox
}
*/

function clickSelect (ev) {
  var el = getGroupParent(ev.target)
  // TODO check if style selection screen, return
  var formSection
  var sectionList = document.querySelectorAll('section.accordeon__section-label')
  var isClosed
  var sectionLabel
  var prefix
  var prefixIndex
  var itemButtonList
  var itemButton
  // var faceContainer = document.querySelector('.face-styles');

  // Don't take the click while in the style selection screen.
  // if (faceContainer.style.opacity === '1') {return}

  if (c.choices.sex === undefined) { return }

  prefix = fromItemGetPrefix(el.id)
  formSection = fromPrefixGetFormSection(prefix)

  if (prefix === 'svg1') {
    zoomFull()
    return
  }

  // toggleSection
  // Check to see if the section is already open in sidebarRight
  // If not open, close all sections and open it.
  // Same thing for item thumbnails, if not open, open them.
  if (formSection > -1) {
    sectionLabel = sectionList[formSection].querySelector('.accordeon__section-title__text').innerHTML
    sectionZoom(sectionLabel)
    isClosed = sectionList[formSection].nextSibling.classList.contains('section--hide')
    closeSections(sectionList[formSection])

    if (isClosed) {
      showSection(sectionList[formSection])
    }
    // Get Prefix Index;
    prefixIndex = getSectionButton(formSection, prefix)

    if (prefixIndex > -1) {
      itemButtonList = sectionList[formSection].nextSibling.querySelectorAll('li.sbl__option')
      itemButton = itemButtonList[prefixIndex]
      hideColorPicker()
      openThumbsLogic(itemButton)
    }
  }
}

function getSectionButton (formSection, prefix) {
  var keyCounter = 0
  if (c.choices.sex === 'm') {
    formList = window.maleFormList
  } else {
    formList = window.femaleFormList
  }
  for (key in formList[formSection]) {
    if (prefix === key.toLowerCase()) {
      return keyCounter
    }
    ++keyCounter
  }
  return -1
}

function getLayers () {
  var layers

  if (c.choices.sex === 'm') {
    layers = window.layersMale
  } else if (c.choices.sex === 'f') {
    layers = window.layersFemale
  } else {
    return document.querySelector('#svg1 #character-container')
  }

  return layers
}

function getGroupParent (el) {
  var layers = getLayers()
  if (!layers.indexOf) return
  while (layers.indexOf(el.id) === -1 && el.tagName != 'svg') {
    el = el.parentNode
  }
  return el
}

function getMultiLayer () {
  var multiLayer = []
  var layers = getLayers()
  var counter = layers.length
  var singleArray
  var layerCount

  while (counter--) {
    layerCount = isMultiLayer(layers[counter])
    if (layerCount > 0) {
      singleArray = []
      singleArray.push(layers[counter].slice(0, -7))
      singleArray.push(layerCount)
      multiLayer.push(singleArray)
    }
  }
  return multiLayer
}

function isMultiLayer (layer) {
  if (layer.slice(-6, -1) === '1_of_') {
    return parseInt(layer.slice(-1), 10)
  } else {
    return 0
  }
}

function isInMultiLayerArray (id, multiLayer) {
  for (entry in multiLayer) {
      if (id === multiLayer[entry][0]) {
        return multiLayer[entry][1]
      }
  }
  return 0
}

function getHairLayers () {
  var hairLayers = []
  var layers = getLayers()
  var counter = layers.length

  while (counter--) {
    if (layers[counter].slice(0, 5) === 'hair_' || layers[counter].slice(0, 11) === 'facialhair_' || layers[counter].slice(0, 6) === 'brows_' || layers[counter].slice(0, 7) === 'lashes_') {
      hairLayers.push(layers[counter])
    }
  }
  return hairLayers
}

function getSkinLayers () {
  var skinLayers = []
  var layers = getLayers()
  var counter = layers.length

  while (counter--) {
    if (layers[counter].slice(0, 5) === 'body_' || layers[counter].slice(0, 5) === 'ears_' || layers[counter].slice(0, 5) === 'nose_' || layers[counter].slice(0, 9) === 'freckles_' || layers[counter].slice(0, 5) === 'scar_' || layers[counter].slice(0, 11) === 'wings_devil' || layers[counter].slice(0, 6) === 'mouth_' || layers[counter].slice(0, 8) === 'sockets_') {
      skinLayers.push(layers[counter])
    }
  }

  return skinLayers
}

function fromItemGetPrefix (id) {
  // consolelog('fromItemGetPrefix', id)
  var idList = id.split('_')
  var prefix

  if (idList[0] === 'body' && idList[1] === 'head') {
    prefix = 'body_head'
  } else {
    prefix = idList[0]
  }
  return prefix
}

function fromPrefixGetFormSection (prefix) {
  // consolelog('prefix', prefix)
  // var item
  var formSection
  var counterForm
  // var counterSection
  var formList

  if (c.choices.sex === 'm') {
    formList = window.maleFormList
  } else {
    formList = window.femaleFormList
  }
  // consolelog('formList', formList)

  while (formSection === undefined) {
    counterForm = formList.length

    while (counterForm--) {
      for (key in formList[counterForm]) {
        if (key.toLowerCase() === prefix) { formSection = counterForm }
      }
    }
    if (formSection === undefined) { formSection = -1 }
  }
  return formSection
}

function startup () {
  var choices

  if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
    choices = currentUser.cc.personnages[currentUser.cc.personnageActuel]
  }
  window.c = new Character(choices)
  interpretHash()
}

function launch () {
  c.choices.sex = hash.get('sex')
  var sex = c.choices.sex
  var multiLayer = getMultiLayer()
  var hairLayers = getHairLayers()
  var skinLayers = getSkinLayers()

  if (sex === 'm') {
    var form1 = maleForm1
    var form2 = maleForm2
    var form3 = maleForm3
    var form4 = maleForm4
    var form5 = maleForm5
    var form6 = maleForm6
    var layerDirectory = layerDirectoryMale
  } else {
    var form1 = femaleForm1
    var form2 = femaleForm2
    var form3 = femaleForm3
    var form4 = femaleForm4
    var form5 = femaleForm5
    var form6 = femaleForm6
    var layerDirectory = layerDirectoryFemale
  }
  window.forms = [form1, form2, form3, form4, form5, form6]
  // Get all the hash key/value pairs and include them in the c.choices object
  // Go through all the forms
  parseHash(forms, skinLayers, hairLayers) // Hashed elements are added in the character object
  choicesToList(c)

  const toBeShown = choicesToLayers(c, multiLayer)
  Promise.resolve().then(function () { loadFilesFromList(toBeShown) }).then(function () { onAllLoaded() }).then(function () { applyClipPath(c) })
}

function displayPallette () {
  var hashSkinColor = hash.get('skinColor')

  if (hashSkinColor != undefined) {
    launch()
    // consolelog('hashSkinColor', hashSkinColor);
    // colorCutout(hashSkinColor);
    // presentFaceStyles();
  } else {
    chooseSkinColor()
  }
}

function chooseSkinColor () {
  // find 'skinTones' in global.js
  var gmenu = document.querySelector('.skin-color__container')

  if (!gmenu.firstChild) {
    for (color in skinTones) {
      var newColor = skinTones[color]
      var node = document.createElement('LI')
      node.className = 'skin-tone'
      node.style.cssText = 'background-color:' + newColor + ';'
      gmenu.appendChild(node)
      node.onclick = colorCutout
      node.onmouseover = colorOnHover
    };
  }
  gmenu.classList.add('skin-color__container--show')
}

function defaultPupilShape () {
  c.choices.pupils = 'round'
  hash.add({ pupils: 'round' })
}

function colorOnHover () {
  var malePath = document.getElementById('path_male')
  var femalePath = document.getElementById('path_female')
  var newTone = this.style.backgroundColor
  femalePath.style.fill = newTone
  malePath.style.fill = newTone
}

function colorSilhouette () {
  var malePath = document.getElementById('path_male')
  var femalePath = document.getElementById('path_female')
  var newTone = hash.get('skinColor')
  femalePath.style.fill = newTone
  malePath.style.fill = newTone
  femalePath.style.pointerEvents = 'none'
  malePath.style.pointerEvents = 'none'
}

function colorCutout (newColor) {
  var rgb = this.style.backgroundColor
  var newColor = rgb2hex(rgb)
  var colorCards = document.getElementsByClassName('.skin-tone')
  var maleSilhouette = document.getElementById('male_silhouette')
  var femaleSilhouette = document.getElementById('female_silhouette')
  var lg = document.getElementsByClassName('lg')
  var obj = new Array()
  obj.skinColor = newColor
  var gmenu = document.querySelector('.skin-color__container')

  gmenu.classList.remove('skin-color__container--show')
  hash.add(obj)
  defaultEyeColor(c, newColor)
  defaultHairColor(c, newColor)
  defaultPupilShape()

  gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Color', eventLabel: 'Select color' })

  addDecency()
  addTopicalItem()

  // Uncomment the following for prod
  setTimeout(function () {
    launch()
  }, 300)
  // Uncomment the following to work on anime style
  // presentFaceStyles();
}

function selectMale (event) {
  c.choices.sex = 'm'
  var maleRadioBtn = document.querySelector('#mButton')
  var mainSVG = document.querySelector('#svg1')
  var maleSilhouette = document.querySelector('#male_silhouette')
  var femaleSilhouette = document.querySelector('#female_silhouette')
  var shadow = document.querySelector('.character-shadow')
  // Remove event listener to female silhouette.
  femaleSilhouette.removeEventListener('click', selectFemale)

  if (maleRadioBtn) {
    maleRadioBtn.checked = true
  }
  if (maleSilhouette) {
    maleSilhouette.removeEventListener('click', selectMale, false)
  }
  hash.add({ sex: 'm' })
  var malePath = document.getElementById('path_male')

  mainSVG.classList.add('select-male')
  shadow.classList.add('shine')

  if (event) {
    gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Male', eventLabel: 'Select male template' })
  }

  setTimeout(function () {
    displayPallette()
  }, 350)
}

function addTopicalItem () {
  // hash.add({ mask: 'hospital' });
}

function addDecency () {
  var sex = c.choices.sex
  if (sex === 'm') {
    // TODO add underwear here.
  } else if (sex === 'f') {
    // TODO add underwear here.
    hash.add({ bra: 'bow' })
  }
}

function selectFemale (event) {
  c.choices.sex = 'f'
  var femaleRadioBtn = document.querySelector('#fButton')
  var mainSVG = document.querySelector('#svg1')
  var maleSilhouette = document.querySelector('#male_silhouette')
  var femaleSilhouette = document.querySelector('#female_silhouette')
  var shadow = document.querySelector('.character-shadow')

  maleSilhouette.removeEventListener('click', selectMale)

  if (femaleRadioBtn) {
    femaleRadioBtn.checked = true
  }
  if (femaleSilhouette) {
    femaleSilhouette.removeEventListener('click', selectFemale, false)
  }
  hash.add({ sex: 'f' })
  var femaleSilhouette = document.getElementById('female_silhouette')
  var femalePath = document.getElementById('path_female')
  mainSVG.classList.add('select-female')
  shadow.classList.add('shine')

  if (event) {
    gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Female', eventLabel: 'Select female template' })
  }

  setTimeout(function () {
    displayPallette()
  }, 350)
}

function presentFaceStyles () {
  var sex = c.choices.sex
  // consolelog('sex', sex)
  // consolelog('presentFaceStyles')
  var faceWestern
  var faceAnime
  var faceContainer = document.querySelector('.face-styles')
  // var faceStyle = faceContainer.querySelector('STYLE')
  // consolelog('faceContainer', faceStyle)

  //   if (c.choices.faceStyle) {
  //     launch();
  //     return;
  //   }

  colorSilhouette()
  zoomTwoFaces()

  var hideWestern
  var hideAnime

  if (sex === 'm') {
    faceWestern = document.querySelector('.male-face-western-style')
    faceAnime = document.querySelector('.male-face-anime-style')
    hideWestern = document.querySelector('.female-face-anime-style')
    hideAnime = document.querySelector('.female-face-anime-style')
  } else {
    faceWestern = document.querySelector('.female-face-western-style')
    faceAnime = document.querySelector('.female-face-anime-style')
    hideWestern = document.querySelector('.male-face-western-style')
    hideAnime = document.querySelector('.male-face-anime-style')
  }
  // female-face-anime-style
  // TODO Color the eyes and eyebrows to fit with the skin tone.

  // TODO Transform Translate horizontaly to make both styles visible.

  hideWestern.classList.add('inactive-vector')
  hideAnime.classList.add('inactive-vector')
  faceWestern.classList.add('active-vector')
  faceAnime.classList.add('active-vector')
  faceWestern.style.opacity = 1
  faceAnime.style.opacity = 1
  faceWestern.style.transform = 'translateX(-23px)'
  faceAnime.style.transform = 'translateX(23px)'
  faceContainer.style.opacity = 1

  // TODO: Add event listener to both face styles;

  // launch();
}

function selectStyleWestern () {
  // consolelog('selectStyleWestern')

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}

function selectStyleAnime () {
  // consolelog('selectStyleAnime')

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}
