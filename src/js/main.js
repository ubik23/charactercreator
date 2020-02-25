  window.onload = function() {
    var c; //Main variable to hold user choices and preferences
    var aboutBtn = document.querySelector("#aboutButton");
    var faqBtn = document.querySelector("#faqButton");
    var shopBtn = document.querySelector("#shopButton");
    var whoBtn = document.querySelector("#whoButton");
    var logoutBtn = document.querySelector("#logoutButton");
    var loginBtn = document.querySelector("#loginButton");
    var registerBtn = document.querySelector("#registerButton");
    var registerLink = document.querySelector(".js-register-link");
    var creditsBtn = document.querySelector("#creditsButton");
    var hamburgerBtn = document.querySelector(".hamburger-btn");
    var zoomBtn = document.querySelector("#zoomLevel");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var rightSidebar = document.querySelector('#sidebar');
    var rightSidebarClone = rightSidebar.cloneNode(true);
    var svgContainer = document.querySelector('#svg1');
    var patreonLink = document.querySelector('#patreonButton');
    var patreonBtn = document.querySelector('#patreon-btn');
    var newCharBtn = document.querySelector('#new-char-btn');
    var saveCharToCloudBtn = document.querySelector('#save-char-to-cloud-btn');
    var loadCharBtn = document.querySelector('#load-char-btn');
    var nightModeBtn = document.querySelector('#nightModeButton');
    var bigRedBtn = document.querySelector('#bigRedButton');
    // var downloadBtn = document.querySelector('#downloadButton');

    if (aboutBtn && typeof showAbout === 'function') { aboutBtn.addEventListener("click", showAbout, false) }
    if (faqBtn && typeof showFAQ === 'function') { faqBtn.addEventListener("click", showFAQ, false) }
    if (shopBtn && typeof showShop === 'function') { shopBtn.addEventListener("click", showShop, false) }
    if (whoBtn && typeof whoami === 'function') { whoBtn.addEventListener("click", whoami, false) }
    if (logoutBtn && typeof logout === 'function') { logoutBtn.addEventListener("click", logout, false) }
    if (loginBtn && typeof loginMenu === 'function') { loginBtn.addEventListener("click", loginMenu, false) }
    if (registerBtn && typeof registerMenu === 'function') { registerBtn.addEventListener("click", registerMenu, false) }
    if (registerLink && typeof registerMenu === 'function') { registerLink.addEventListener("click", registerMenu, false) }
    if (creditsBtn && typeof rollCredits === 'function') { creditsBtn.addEventListener("click", rollCredits, false) }
    if (hamburgerBtn && typeof hamburger === 'function') { hamburgerBtn.addEventListener("click", hamburger, false) }
    if (zoomBtn && typeof viewBoxZoom === 'function') { zoomBtn.addEventListener("change", viewBoxZoom, false) }
    if (maleSilhouette && typeof selectMale === 'function') {maleSilhouette.addEventListener('click', selectMale, false)}
    if (femaleSilhouette && typeof selectFemale === 'function') {femaleSilhouette.addEventListener('click', selectFemale, false)}
    if (svgContainer && typeof clickSelect === 'function') {svgContainer.addEventListener('click', clickSelect, false)}
    if (svgContainer && typeof layerHighlight === 'function') {svgContainer.addEventListener('mouseover', layerHighlight, false)}
    if (patreonLink && typeof tattle === 'function') {patreonLink.addEventListener('click', tattle, false)}
    if (patreonBtn && typeof gotoPatreon === 'function') {patreonBtn.addEventListener('click', gotoPatreon, false)}
    if (newCharBtn && typeof gotoNewChar === 'function') {newCharBtn.addEventListener('click', gotoNewChar, false)}
    if (saveCharToCloudBtn && typeof saveCharToCloud === 'function') {saveCharToCloudBtn.addEventListener('click', saveCharToCloud, false)}
    if (loadCharBtn && typeof gotoLoadChar === 'function') {loadCharBtn.addEventListener('click', gotoLoadChar, false)}
    if (nightModeBtn && typeof switchNightMode === 'function') {nightModeBtn.addEventListener('click', switchNightMode, false)}
    if (bigRedBtn && typeof smartRandomSingle === 'function') {bigRedBtn.addEventListener('click', smartRandomSingle, false)}
    // if (downloadBtn && typeof download === 'function') {downloadBtn.addEventListener('click', download, false)}

    // checkNightMode()
    startup();
}

function saveCharToCloud(ev) {
  preventDefault(ev);
  console.log('saveCharToCloud');
  // Close current modal
  // Check if user is logged in
  // Check if this character already exists in the cast
  // If not, prompt to name the character in the cast modal
}

function checkNightMode() {
  var body = document.querySelector('BODY');
  var checkBox = document.querySelector('#nightModeBox');

  if (checkBox.checked && !body.classList.contains('night')) {
    body.classList.toggle('night');
  }
}

function switchNightMode(ev) {
  // document.documentElement.setAttribute('data-theme', 'lighttheme');
  ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Dark/Light', eventLabel: 'Switch between Dark mode and Light mode'});
  ev.preventDefault();
  var body = document.querySelector('BODY');
  hamburger();

  if (body.classList === '') {
    document.documentElement.setAttribute('data-theme', 'darktheme');
  } else if (body.classList === 'night') {
    document.documentElement.setAttribute('data-theme', 'lighttheme');
  }
  body.classList.toggle('night');
}

function tattle() {
  ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Navbar | Patreon', eventLabel: 'Open Patreon page from the Navbar/Hamburger menu.'});
}

function gotoPatreon(evt) {
  if (evt) {
      evt.preventDefault()
  }
 ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | Patreon', eventLabel: 'Open Patreon page from Caboose modal.'});
 closeAllOverlays();
 setTimeout(function(){ window.open("https://www.patreon.com/charactercreator");}, 500);
}

function gotoNewChar(evt) {
  if (evt) {
      evt.preventDefault()
  }
 ga('send', 'event', { eventCategory: 'Conversion', eventAction: 'Caboose | New character', eventLabel: 'Reset to new character from Caboose.'});
 closeAllOverlays();
 setTimeout(function(){
   resetCharacter();
 }, 500);
}

function resetCharacter() {
  var choices = [];
  // Hide menus.
  hideMenus();
  // Fade out SVG.
  fadeOutSVG();
  // Remove all groups.
  removeGroups();
  // Zoom out in case we were zoomed in.
  zoomFull();
  // reset silhouettes
  resetSilhouettes();
  // Clean hash.
  // Fade in SVG.
  // Clear 'c' variable.
  c = new Character(choices);
  setTimeout(function(){fadeInSVG();}, 300);
  // launch anew.
  relaunch();
}

function relaunch() {
  male = document.querySelector('#male_silhouette');
  female = document.querySelector('#female_silhouette');
  male.style.opacity = '1';
  female.style.opacity = '1';

}

function removeGroups() {
  var svgContainer = document.querySelector('#svg1');
  var groups = svgContainer.querySelectorAll('#svg1 > g');
  var counter = groups.length;

  while (counter--) {
    if (groups[counter].id != 'female_silhouette' && groups[counter].id != 'male_silhouette'){
      svgContainer.removeChild(groups[counter]);
    }
  }
}

function hideMenus() {
  var menus = document.querySelectorAll('.sidebar.visible');
  var counter = menus.length;

  while(counter--) {
    menus[counter].classList.remove('visible');
  }
}

function fadeOutSVG() {
  var svgContainer = document.querySelector('#svg1');
  var characterShadow = svgContainer.querySelector('.character-shadow.shine');
  var downloadBtn = document.querySelector('#downloadButton.enabled');

  if (characterShadow) {
    characterShadow.classList.remove('shine');
  }

  if (downloadBtn) {
    downloadBtn.classList.remove('enabled');
    downloadBtn.removeEventListener('click', download);
  }
  svgContainer.classList.add('character--hide');
}

function fadeInSVG() {
  var svgContainer = document.querySelector('#svg1');
  svgContainer.classList.remove('character--hide');
}

function resetSilhouettes() {
  var defaultColor = '#e35a4e';
  var svgContainer = document.querySelector('#svg1');
  var maleSilhouette = svgContainer.querySelector('#path_male');
  var femaleSilhouette = svgContainer.querySelector('#path_female');
  var silhouetteRemaining;

  if (svgContainer.classList.contains('select-female')) {
    silhouette = svgContainer.querySelector('#female_silhouette');
    silhouetteRemaining = svgContainer.querySelector('#male_silhouette');
  } else if (svgContainer.classList.contains('select-male')) {
    silhouette = svgContainer.querySelector('#male_silhouette');
    silhouetteRemaining = svgContainer.querySelector('#female_silhouette');
  }
  svgContainer.classList = '';
  maleSilhouette.style.fill = defaultColor;
  femaleSilhouette.style.fill = defaultColor;

  if (maleSilhouette && typeof selectMale === 'function') {maleSilhouette.addEventListener('click', selectMale, false)}
  if (femaleSilhouette && typeof selectFemale === 'function') {femaleSilhouette.addEventListener('click', selectFemale, false)}
}

function gotoLoadChar(evt) {
  if (evt) {
      evt.preventDefault()
  }
 closeAllOverlays();
}

// The 'caboose' is the modal at the end of the character creation process.
function caboose() {
  var overlay = document.querySelector('.js-caboose');
  var closeBtn = overlay.querySelector('.close-btn');

  closeAllOverlays();

  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', closeOverlay, true);
  closeBtn.addEventListener('click', closeOverlay, false);
}

function layerHighlight(ev) {
  var el = ev.target;
  var el = getGroupParent(el);
  var masks = document.querySelectorAll("#contour use");
  var masksLen = masks.length;

  if (masks[0].getAttribute("xlink:href") === el.id) {
    return
  } else if (el.id === "svg1") {
    while (masksLen--) {
      masks[masksLen].setAttribute("xlink:href", '');
    }
  } else {
    while (masksLen--) {
      masks[masksLen].setAttribute("xlink:href", "#" + el.id);
    }
  }
}

function clickSelect(ev) {
  var el = ev.target;
  var el = getGroupParent(el);
  var formSection;
  var sidebarLeft = document.querySelector('#sidebar-left');
  var sectionList = document.querySelectorAll('section.accordeon__section-label');
  var isClosed;
  var sectionLabel;
  var prefix;
  var prefixIndex;
  var itemButtonList;
  var itemButton;

  if (c.choices.sex === undefined) {return}

  prefix = fromItemGetPrefix(el.id);
  formSection = fromPrefixGetFormSection(prefix);

  if (prefix === 'svg1') {
    zoomFull();
    return;
  }

  // toggleSection
  // Check to see if the section is already open in sidebarRight
  // If not open, close all sections and open it.
  // Same thing for item thumbnails, if not open, open them.
  if (formSection > -1) {
    sectionLabel = sectionList[formSection].querySelector('.accordeon__section-title__text').innerHTML;
    sectionZoom(sectionLabel);
    isClosed = sectionList[formSection].nextSibling.classList.contains('section--hide');
    closeSections(sectionList[formSection]);

    if (isClosed) {
      showSection(sectionList[formSection]);
    }
    // Get Prefix Index;
    prefixIndex = getSectionButton(formSection, prefix);

    if (prefixIndex > -1) {
      itemButtonList = sectionList[formSection].nextSibling.querySelectorAll('li.sbl__option');
      itemButton = itemButtonList[prefixIndex];
      hideColorPicker();
      openThumbsLogic(itemButton);
    }
  }
}

function getSectionButton(formSection, prefix) {
  var keyCounter = 0;
  if (c.choices.sex ==='m') {
    formList = window.maleFormList;
  } else {
    formList = window.femaleFormList;
  }
  for (key in formList[formSection]) {
    if (prefix === key.toLowerCase()) {
      return keyCounter;
    }
    ++keyCounter;
  }
  return -1;
}

function getGroupParent(el) {
  if (c.choices.sex === 'm') {
    layers = window.layersMale;
  } else if (c.choices.sex === 'f') {
    layers = window.layersFemale;
  } else {
    return document.querySelector('#svg1');
  }
  while (layers.indexOf(el.id) === -1 && el.tagName != 'svg') {
    el = el.parentNode;
  }
  return el;
}

function fromItemGetPrefix(id) {
  var idList = id.split('_');
  var prefix;

  if (idList[0] === 'body' && idList[1] === 'head') {
    prefix = 'body_head';
  } else {
    prefix = idList[0];
  }
  return prefix
}

function fromPrefixGetFormSection(prefix) {
  console.log('prefix', prefix);
  var item;
  var formSection;
  var counterForm;
  var counterSection;
  var formList;

  if (c.choices.sex === 'm') {
    formList = window.maleFormList;
  } else {
    formList = window.femaleFormList;
  }
  console.log('formList', formList);

  while (formSection === undefined) {
    counterForm = formList.length;

    while (counterForm--) {
      for (key in formList[counterForm]) {
        if (key.toLowerCase() === prefix) {formSection = counterForm}
      }
    }
    if (formSection === undefined) {formSection = -1;}
  }
  return formSection;
}

function startup() {
    var choices;

    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
        choices = currentUser.cc.personnages[currentUser.cc.personnageActuel];
    }
    window.c = new Character(choices);
    interpretHash();
}

function launch() {
    c.choices.sex  = hash.get('sex');
    var sex = c.choices.sex;

    if (sex ==='m') {
        var form1 = maleForm1;
        var form2 = maleForm2;
        var form3 = maleForm3;
        var form4 = maleForm4;
        var form5 = maleForm5;
        var form6 = maleForm6;
        var layerDirectory = layerDirectoryMale;
        multiLayer = multiLayerMale;

    } else {
        var form1 = femaleForm1;
        var form2 = femaleForm2;
        var form3 = femaleForm3;
        var form4 = femaleForm4;
        var form5 = femaleForm5;
        var form6 = femaleForm6;
        var layerDirectory = layerDirectoryFemale;
        multiLayer = multiLayerFemale;
    }
    window.forms = [form1, form2, form3, form4, form5,form6];
    // Get all the hash key/value pairs and include them in the c.choices object
    // Go through all the forms
    parseHash(c, forms, skinLayers, hairLayers);  //Hashed elements are added in the character object
    choicesToList(c);
    toBeShown = choicesToLayers(c, multiLayer);
    Promise.resolve().then(function(){loadFilesFromList(toBeShown);}).then(function(){onAllLoaded();}).then(function(){applyClipPath();});
}

function displayPallette() {
    var hashSkinColor = hash.get("skinColor");

    if (hashSkinColor != undefined){
         // launch();
         console.log('hashSkinColor', hashSkinColor);
         colorCutout(hashSkinColor);
         // presentFaceStyles();
    } else {
      chooseSkinColor();
    }
}

function chooseSkinColor() {
    var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var gmenu = document.querySelector(".skin-color__container");

    if (!gmenu.firstChild) {
      for (color in skinTones) {
          var newColor = skinTones[color];
          var node = document.createElement("LI");
          node.className = "skin-tone";
          node.style.cssText = "background-color:" + newColor + ";";
          gmenu.appendChild(node);
          node.onclick = colorCutout;
          node.onmouseover = colorOnHover;
      };
    }
    gmenu.classList.add('skin-color__container--show');
}

function defaultPupilShape() {
  c.choices['pupils'] = 'round';
  hash.add({ pupils: 'round' });
}

function colorOnHover() {
    var malePath = document.getElementById("path_male");
    var femalePath = document.getElementById("path_female");
    var newTone = this.style.backgroundColor;
    femalePath.style.fill = newTone;
    malePath.style.fill = newTone;
}

function colorCutout(newColor) {
    var rgb = this.style.backgroundColor;
    var newColor = rgb2hex(rgb);
    var colorCards = document.getElementsByClassName(".skin-tone");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var lg = document.getElementsByClassName("lg");
    var obj = new Array();
    obj['skinColor'] =  newColor;
    var gmenu = document.querySelector(".skin-color__container");

    gmenu.classList.remove('skin-color__container--show');
    hash.add(obj);
    defaultEyeColor(newColor);
    defaultHairColor(newColor);
    defaultPupilShape();

    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Color', eventLabel: 'Select color' });

    addDecency();
    addTopicalItem();

    // Uncomment the following for prod
    setTimeout(function(){
        launch();
    }, 300);
    // Uncomment the following to work on anime style
    // presentFaceStyles();
}

function selectMale(event) {
    c.choices.sex = "m";
    var maleRadioBtn = document.querySelector('#mButton');
    var mainSVG = document.querySelector('#svg1');
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    var shadow = document.querySelector('.character-shadow');
    //Remove event listener to female silhouette.
    femaleSilhouette.removeEventListener('click', selectFemale);

    if (maleRadioBtn) {
        maleRadioBtn.checked = true;
    }
    if (maleSilhouette) {
        maleSilhouette.removeEventListener('click', selectMale, false);
    }
    hash.add({ sex: 'm' });
    var malePath = document.getElementById("path_male");

    mainSVG.classList.add('select-male');
    shadow.classList.add('shine');

    if (event) {
      ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Male', eventLabel: 'Select male template'});
    }

      setTimeout(function(){
          displayPallette();
      }, 350);
}

function addTopicalItem() {
  // hash.add({ hat: 'xmas' });
}

function addDecency() {
  var sex = c.choices.sex;
  if (sex === 'm') {
    // TODO add underwear here.
  } else if (sex === 'f') {
    // TODO add underwear here.
    hash.add({ bra: 'bow' });
  }
}

function selectFemale(event) {
    c.choices.sex = "f";
    var femaleRadioBtn = document.querySelector('#fButton');
    var mainSVG = document.querySelector('#svg1');
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    var shadow = document.querySelector('.character-shadow');

    maleSilhouette.removeEventListener('click', selectMale);

    if (femaleRadioBtn) {
        femaleRadioBtn.checked = true;
    }
    if (femaleSilhouette) {
        femaleSilhouette.removeEventListener('click', selectFemale, false);
    }
    hash.add({ sex: 'f' });
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female")
    mainSVG.classList.add('select-female');
    shadow.classList.add('shine');

    if (event) {
      ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Female', eventLabel: 'Select female template'});
    }

    setTimeout(function(){
        displayPallette();
    }, 350);
}

function presentFaceStyles() {
  var sex = c.choices.sex;
  console.log('sex', sex);
  console.log('presentFaceStyles');
  var faceWestern;
  var faceAnime;
  var faceContainer = document.querySelector('.face-styles');

//   if (c.choices.faceStyle) {
//     launch();
//     return;
//   }
//
  zoomTwoFaces();
//
  if (sex === 'm') {
    faceWestern = document.querySelector('.male-face-western-style');
    faceAnime = document.querySelector('.male-face-anime-style');
  } else {
    faceWestern = document.querySelector('.female-face-western-style');
    faceAnime = document.querySelector('.female-face-anime-style');
  }
// female-face-anime-style
  // TODO Color the eyes and eyebrows to fit with the skin tone.

  // TODO Transform Translate horizontaly to make both styles visible.

  faceWestern.style.opacity = 1;
  faceAnime.style.opacity = 1;
  faceWestern.style.transform = 'translateX(-23px)';
  faceAnime.style.transform = 'translateX(23px)';
  faceContainer.style.opacity = 1;

  // TODO: Add event listener to both face styles;

  // launch();
}

function selectStyleWestern() {
  console.log('selectStyleWestern');

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}

function selectStyleAnime() {
  console.log('selectStyleAnime');

  // TODO Transform Translate horizontaly to match face on head;

  // launch();
}
