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
    var layerDirectoryFemale = 'layer/female/';
    var layerDirectoryMale = 'layer/male/';
    var multiLayerFemale = [['bracelet_band_right', 2], ['bracelet_band_left', 2], ['bracelet_ornamental_left', 2], ['bracelet_ornamental_right', 2], ['bracelet_perl_left', 2], ['bracelet_perl_right', 2], ['coat_lab', 3], ['hair_pigtails', 2], ['hair_manga', 2], ['hair_down', 3], ['hat_beach', 2], ['hat_country', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['headband_medium', 2], ['coat_winter_furcollar', 3], ['coat_winter_tubecollar', 3], ['holster_revolver_thigh', 2], ['nails_short', 2], ['nails_long', 2], ['nails_claws', 2], ['nose_default', 2], ['nose_pointed', 2], ['nose_roman', 2], ['nose_strong', 2], ['nose_syrid', 2], ['pants_yoga_torn', 3], ['shoulderpads_plated', 2], ['shoulderpads_spikes', 2], ['veil_al-amira', 2], ['veil_khimar', 2], ['veil_shayla', 2], ['shoes_flip-flops', 2]];
    var multiLayerMale = [['cloak_default', 4], ['coat_lab', 2], ['coat_fall_long', 3], ['coat_trench', 4], ['hair_pigtails', 2], ['hair_manga', 2], ['hair_down', 3], ['hat_fedora', 2], ['hat_country', 2], ['headband_medium', 2], ['jacket_suit', 2], ['shirt_colar', 2], ['shirt_tanktop', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['nose_default', 2], ['nose_pointed', 2], ['nose_roman', 2], ['nose_strong', 2], ['nose_syrid', 2], ['pants_jeans', 2], ['pants_jeans_rolled', 2], ['pants_suit', 2], ['pants_snowboard', 2],  ['tie_bow', 2], ['shoes_flip-flops', 2], ['shoulderpads_plated', 2], ['shoulderpads_spikes', 2]];
    var size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    skinLayers = [
      'eyes_neutral',
      'body_torso_default', 'body_torso_athletic', 'body_torso_veiny', 'body_torso_android-00',
      'body_leg_right_default', 'body_leg_left_default', 'body_leg_right_athletic', 'body_leg_left_athletic', 'body_leg_right_veiny', 'body_leg_left_veiny', 'body_leg_right_android-00', 'body_leg_left_android-00',
      'body_foot_right', 'body_foot_left',
      'body_arm_right_default', 'body_arm_left_default', 'body_arm_right_athletic', 'body_arm_left_athletic', 'body_arm_right_veiny', 'body_arm_left_veiny', 'body_arm_right_android-00', 'body_arm_left_android-00',
      'body_forearm_right_default', 'body_forearm_left_default', 'body_forearm_right_athletic', 'body_forearm_left_athletic', 'body_forearm_right_veiny', 'body_forearm_left_veiny', 'body_forearm_right_android-00', 'body_forearm_left_android-00',
      'body_hand_right', 'body_hand_left',
      'age_lines', 'body_head_default', 'body_head_diamond', 'body_head_heart', 'body_head_oblong', 'body_head_oval', 'body_head_round', 'body_head_square', 'body_head_triangle', 'body_hand',
      'ears_default', 'ears_elven', 'ears_pointed', 'ears_plugged', 'ears_unplugged', 'ears_outstretched',
      'nose_default',
      'nose_default_1_of_2', 'nose_pointed_1_of_2', 'nose_roman_1_of_2', 'nose_strong_1_of_2', 'nose_syrid_1_of_2',
      'nose_default_2_of_2', 'nose_pointed_2_of_2', 'nose_roman_2_of_2', 'nose_strong_2_of_2', 'nose_syrid_2_of_2',
      'mouth_shadow', 'freckles_medium',
      'scar_horizontal_neck', 'scar_horizontal_nose', 'scar_vertical_heart', 'scar_vertical_left', 'scar_vertical_right',
      'age_lines', 'wings_devil',
      'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_aversion', 'mouth_betrayal', 'mouth_caged', 'mouth_concern', 'mouth_cruel', 'mouth_dejection', 'mouth_desperation', 'mouth_disdain', 'mouth_disgust', 'mouth_eeww', 'mouth_fear', 'mouth_grief', 'mouth_horror', 'mouth_indignation', 'mouth_joy', 'mouth_laughing', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage', 'mouth_pain', 'mouth_rage', 'mouth_revulsion', 'mouth_sadness', 'mouth_satisfaction', 'mouth_shock', 'mouth_sterness', 'mouth_surprise', 'mouth_terror', 'mouth_wonder', 'mouth_wtf',
      'sockets_neutral', 'sockets_amusement', 'sockets_anger', 'sockets_alertness', 'sockets_anxiety', 'sockets_aversion', 'sockets_betrayal', 'sockets_caged', 'sockets_concern', 'sockets_cruel', 'sockets_dejection', 'sockets_desperation', 'sockets_disdain', 'sockets_disgust', 'sockets_eeww', 'sockets_fear', 'sockets_grief', 'sockets_horror', 'sockets_indignation', 'sockets_joy', 'sockets_laughing', 'sockets_melancholy', 'sockets_omg', 'sockets_outrage', 'sockets_pain', 'sockets_rage', 'sockets_revulsion', 'sockets_sadness', 'sockets_satisfaction', 'sockets_shock', 'sockets_sterness', 'sockets_surprise', 'sockets_terror', 'mouth_wonder', 'mouth_wtf'
    ];
    hairLayers = [
      'facialhair_beard_boxed', 'facialhair_beard_ducktail', 'facialhair_beard_guru', 'facialhair_beard_intelectual', 'facialhair_beard_rap', 'facialhair_beard_raw', 'facialhair_chinpuff', 'facialhair_goatee', 'facialhair_goatee_raw', 'facialhair_moustache', 'facialhair_moustache_dali', 'facialhair_moustache_thick', 'facialhair_muttonchops', 'facialhair_muttonchops_friendly', 'facialhair_soulpatch', 'facialhair_winnfield',
      'hair_balding', 'hair_balding_crazy', 'hair_balding_crown', 'hair_short', 'hair_short_slick', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_pigtails_1_of_2', 'hair_pigtails_2_of_2', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'hair_bangs', 'hair_odango', 'hair_emo', 'hair_spider', 'hair_wreckingball', 'hair_crewcut', 'hair_wild',
      'lashes_neutral', 'lashes_alertness', 'lashes_amusement', 'lashes_anger', 'lashes_anxiety', 'lashes_aversion', 'lashes_betrayal', 'lashes_caged', 'lashes_concern', 'lashes_cruel', 'lashes_dejection', 'lashes_desperation', 'lashes_disdain', 'lashes_disgust', 'lashes_eeww', 'lashes_fear', 'lashes_grief', 'lashes_horror', 'lashes_indignation', 'lashes_joy', 'lashes_laughing', 'lashes_melancholy', 'lashes_omg', 'lashes_outrage', 'lashes_pain', 'lashes_rage', 'lashes_revulsion', 'lashes_sadness', 'lashes_satisfaction', 'lashes_shock', 'lashes_sterness', 'lashes_surprise', 'lashes_terror', 'lashes_wonder', 'lashes_wtf',
      'brows_neutral', 'brows_alertness', 'brows_amusement', 'brows_anger', 'brows_anxiety', 'brows_aversion', 'brows_betrayal', 'brows_caged', 'brows_concern', 'brows_cruel', 'brows_dejection', 'brows_desperation', 'brows_disdain', 'brows_disgust', 'brows_eeww', 'brows_fear', 'brows_grief', 'brows_horror', 'brows_indignation', 'brows_joy', 'brows_laughing', 'brows_melancholy', 'brows_omg', 'brows_outrage', 'brows_pain', 'brows_rage', 'brows_revulsion', 'brows_sadness', 'brows_satisfaction', 'brows_shock', 'brows_sterness', 'brows_surprise', 'brows_terror', 'brows_wonder', 'brows_wtf'
    ];

    c.choices.sex  = hash.get('sex');
    var sex = c.choices.sex;
    window.maleFormList = [maleForm1, maleForm2, maleForm3, maleForm4, maleForm5, maleForm6];
    window.femaleFormList = [femaleForm1, femaleForm2, femaleForm3, femaleForm4, femaleForm5, femaleForm6];
    window.layersFemale = layersFemale;
    window.layersMale = layersMale;
    window.multiLayerMale = multiLayerMale;
    window.multiLayerFemale = multiLayerFemale;

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

function displayPallette () {
    var hashSkinColor = hash.get("skinColor");

    if (hashSkinColor != undefined){
         launch();
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

    setTimeout(function(){
        launch();
    }, 300);
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
