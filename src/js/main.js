  window.onload = function() {
    var aboutBtn = document.querySelector("#aboutButton");
    var whoBtn = document.querySelector("#whoButton");
    var logoutBtn = document.querySelector("#logoutButton");
    var loginBtn = document.querySelector("#loginButton");
    var registerBtn = document.querySelector("#registerButton");
    var registerLink = document.querySelector(".js-register-link");
    var hamburgerBtn = document.querySelector(".hamburger-btn");
    var zoomBtn = document.querySelector("#zoomLevel");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var rightSidebar = document.querySelector('#sidebar');
    var rightSidebarClone = rightSidebar.cloneNode(true);
    var svgContainer = document.querySelector('#svg1');

    if (aboutBtn && typeof showAbout === 'function') { aboutBtn.addEventListener("click", showAbout, false) }
    if (whoBtn && typeof whoami === 'function') { whoBtn.addEventListener("click", whoami, false) }
    if (logoutBtn && typeof logout === 'function') { logoutBtn.addEventListener("click", logout, false) }
    if (loginBtn && typeof loginMenu === 'function') { loginBtn.addEventListener("click", loginMenu, false) }
    if (registerBtn && typeof registerMenu === 'function') { registerBtn.addEventListener("click", registerMenu, false) }
    if (registerLink && typeof registerMenu === 'function') { registerLink.addEventListener("click", registerMenu, false) }
    if (hamburgerBtn && typeof hamburger === 'function') { hamburgerBtn.addEventListener("click", hamburger, false) }
    if (zoomBtn && typeof viewBoxZoom === 'function') { zoomBtn.addEventListener("change", viewBoxZoom, false) }
    if (maleSilhouette && typeof selectMale === 'function') {maleSilhouette.addEventListener('click', selectMale, false)}
    if (femaleSilhouette && typeof selectFemale === 'function') {femaleSilhouette.addEventListener('click', selectFemale, false)}
    if (svgContainer && typeof clickSelect === 'function') {svgContainer.addEventListener('click', clickSelect, false)}
    if (svgContainer && typeof clickSelect === 'function') {svgContainer.addEventListener('mouseover', layerHighlight, false)}
    startup();
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
  if (c.sex === undefined) {return}

  prefix = fromItemGetPrefix(el.id);
  formSection = fromPrefixGetFormSection(prefix)
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
  if (c.sex ==='m') {
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
  if (c.sex === 'm') {
    layers = window.layersMale;
  } else if (c.sex === 'f') {
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
  if (c.sex === 'm') {
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


function hamburger() {
    var menu = document.querySelector("#horizontal");
    menu.classList.toggle('hide');
}

function startup() {
    var choices;
    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
        choices = currentUser.cc.personnages[currentUser.cc.personnageActuel];
    }
    window.c = new Character(choices);
    interpretHash();
}

function interpretHash() {
    var hashSex = hash.get("sex");
    if (hashSex === "m") {
        selectMale();
    } else if (hashSex === "f") {
        selectFemale();
    }
}

function launch() {
    var maleForm1 = {
      'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
      'Ears' : ['default', 'elven', 'pointed', 'outstretched', 'plugged', 'unplugged'],
      'Iris' : ['default'],
      'Pupils' : ['round', 'feline', 'star'],
      'Nose' : ['default', 'pointed', 'roman', 'strong', 'syrid'],
      'Facialhair': ['','beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'beard_raw', 'chinpuff', 'goatee', 'goatee_raw', 'moustache', 'moustache_dali', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
      'Hair': ['', 'balding', 'balding_crazy', 'balding_crown', 'short', 'gelled', 'wavy', 'manga', 'mohawk', 'crewcut'],
      'Freckles': ['', 'medium'],
      'Age' : ['', 'lines'],
      'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf']
    };
    var maleForm2 = {
      'Pipe' : ['', 'subgenius'],
      'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
      'Hat': ['','baseball','berret', 'berret_badge', 'cap', 'cowboy', 'fedora', 'jester', 'top','motorcycle', 'police', 'scumbag', 'helmet_vietnam', 'tuque', 'strainer', 'magritte'],
      'Horns': ['', 'devil', 'large'],
      'Mask': ['', 'guy_fawkes', 'robin', 'horse', 'stormtrooper', 'jason', 'cat'],
      'Glasses': ['', 'alien', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
      'Eyepatch': ['', 'left', 'right'],
      'Headband': ['', 'medium'],
      'Jewelry': ['', 'chain'],
      'Warpaint': ['', 'football'],
      'Earpiece': ['', 'microphone']
    };
    var maleForm3 = {
      'Shirt': ['', 'tanktop', 'colar', 'tshirt', 'turtleneck'],
      'Tie': ['', 'neck', 'bolo', 'bow'],
      'Vest': ['', 'vest', 'lined'],
      'Holster' : ['', 'revolver_chest', 'revolver_hip'],
      'Shoulderpads' : ['', 'general', 'artillery'],
      'Scarf' : ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'chest_warmer', 'overhand', 'once_around', 'drape']
    };
    var maleForm4 = {
      'Body': ['athletic'],
      'Scar': ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart' , 'vertical_left', 'vertical_right'],
      'Tatoo': ['', 'aum_chest', 'aum_left', 'aum_right', 'chaos_chest', 'chaos_left', 'chaos_right'],
      'Suit': ['', 'wetsuit'],
      'Jacket': ['', 'suit'],
      'Coat': ['', 'fall_long', 'lab', 'trench', 'snowboard'],
      'Cloak': ['', 'default'],
      'Watch': ['', 'generic'],
      'Gloves': ['', 'lab', 'motorcycle'],
      'Wings' : ['', 'angel', 'devil'],
      'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge']
    };
    var maleForm5 = {
      'Underwear': ['plain', 'boxers'],
      'Pants': ['', 'suit', 'jeans', 'leather', 'snowboard'],
      'Belt': ['', 'default', 'bullet', 'straps', 'utility', 'leather']
    };
    var maleForm6 = {
      'Socks': ['','socks'],
      'Shoes': ['','hightops', 'leather', 'flip-flops']
    };
    var layersMale = [
      'wings_angel', 'wings_devil',
      'cloak_default_4_of_4',
      'coat_trench_4_of_4',
      'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
      'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2','hat_fedora_2_of_2',
      'headband_medium_2_of_2',
      'hair_manga_2_of_2',
      'coat_fall_long_3_of_3',
      'coat_trench_3_of_4',
      'coat_lab_2_of_2',
      'jacket_suit_2_of_2',
      'shoes_flip-flops_2_of_2',
      'body_athletic_2_of_2',
      'tatoo_aum_chest','tatoo_chaos_chest',
      'scar_vertical_heart', 'scar_horizontal_neck',
      'underwear_plain','underwear_boxers',
      'shirt_tanktop_2_of_2',
      'body_athletic_1_of_2',
      'tatoo_aum_left','tatoo_aum_right','tatoo_chaos_left','tatoo_chaos_right',
      'shirt_tanktop_1_of_2',
      'suit_wetsuit',
      'socks_socks',
      'shoes_hightops','shoes_leather', 'shoes_flip-flops_1_of_2',
      'watch_generic',
      'shirt_colar_2_of_2','shirt_turtleneck',
      'tie_bolo','tie_bow_2_of_2','tie_neck',
      'shirt_colar_1_of_2',
      'pants_jeans_1_of_2','pants_leather','pants_suit_1_of_2','pants_snowboard',
      'belt_leather', 'belt_default',
      'pants_jeans_2_of_2', 'pants_suit_2_of_2',
      'shirt_tshirt',
      'vest_vest', 'vest_lined',
      'tie_bow_1_of_2',
      'jewelry_chain',
      'belt_straps',
      'holster_revolver_chest', 'holster_revolver_hip',
      'gloves_lab','gloves_motorcycle',
      'jacket_suit_1_of_2',
      'coat_fall_long_2_of_3',
      'coat_fall_long_1_of_3', 'coat_lab_1_of_2', 'coat_trench_2_of_4','coat_snowboard',
      'belt_utility', 'belt_bullet',
      'cloak_default_3_of_4',
      'cloak_default_2_of_4',
      'shoulderpads_general',
      'coat_trench_1_of_4',
      'shoulderpads_artillery',
      'scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_chest_warmer','scarf_overhand','scarf_once_around','scarf_drape',
      'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
      'hair_wavy',
      'ears_default', 'ears_elven', 'ears_outstretched', 'ears_pointed', 'ears_plugged', 'ears_unplugged',
      'earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right',
      'sockets_neutral', 'sockets_alertness', 'sockets_amusement', 'sockets_anger', 'sockets_anxiety', 'sockets_aversion', 'sockets_betrayal', 'sockets_caged', 'sockets_concern', 'sockets_cruel', 'sockets_dejection', 'sockets_desperation', 'sockets_disdain', 'sockets_disgust', 'sockets_eeww', 'sockets_fear', 'sockets_grief', 'sockets_horror', 'sockets_indignation', 'sockets_joy', 'sockets_laughing', 'sockets_melancholy', 'sockets_omg', 'sockets_outrage', 'sockets_pain', 'sockets_rage', 'sockets_revulsion', 'sockets_sadness', 'sockets_satisfaction', 'sockets_shock', 'sockets_sterness', 'sockets_surprise', 'sockets_terror', 'sockets_wonder', 'sockets_wtf',
      'age_lines',
      'freckles_medium',
      'scar_vertical_left','scar_vertical_right',
      'eyes_neutral', 'eyes_alertness', 'eyes_amusement', 'eyes_anger', 'eyes_anxiety', 'eyes_aversion', 'eyes_betrayal', 'eyes_caged', 'eyes_concern', 'eyes_cruel', 'eyes_dejection', 'eyes_desperation', 'eyes_disdain', 'eyes_disgust', 'eyes_eeww', 'eyes_fear', 'eyes_grief', 'eyes_horror', 'eyes_indignation', 'eyes_joy', 'eyes_laughing', 'eyes_melancholy', 'eyes_omg', 'eyes_outrage', 'eyes_pain', 'eyes_rage', 'eyes_revulsion', 'eyes_sadness', 'eyes_satisfaction', 'eyes_shock',  'eyes_sterness', 'eyes_surprise', 'eyes_terror', 'eyes_wonder', 'eyes_wtf',
      'eyeballs_default',
      'lashes_neutral', 'lashes_alertness', 'lashes_amusement', 'lashes_anger', 'lashes_anxiety', 'lashes_aversion', 'lashes_betrayal', 'lashes_caged', 'lashes_concern', 'lashes_cruel', 'lashes_dejection', 'lashes_desperation', 'lashes_disdain', 'lashes_disgust', 'lashes_eeww', 'lashes_fear', 'lashes_grief', 'lashes_horror', 'lashes_indignation', 'lashes_joy', 'lashes_laughing', 'lashes_melancholy', 'lashes_omg', 'lashes_outrage', 'lashes_pain', 'lashes_rage', 'lashes_revulsion', 'lashes_sadness', 'lashes_satisfaction', 'lashes_shock', 'lashes_sterness', 'lashes_surprise', 'lashes_terror', 'lashes_wonder', 'lashes_wtf',
      'brows_neutral', 'brows_alertness', 'brows_amusement', 'brows_anger', 'brows_anxiety', 'brows_aversion', 'brows_betrayal', 'brows_caged', 'brows_concern', 'brows_cruel', 'brows_dejection', 'brows_desperation', 'brows_disdain', 'brows_disgust', 'brows_eeww', 'brows_fear', 'brows_grief', 'brows_horror', 'brows_indignation', 'brows_joy', 'brows_laughing', 'brows_melancholy', 'brows_omg', 'brows_outrage', 'brows_pain', 'brows_rage', 'brows_revulsion', 'brows_sadness', 'brows_satisfaction', 'brows_shock', 'brows_sterness', 'brows_surprise', 'brows_terror', 'brows_wonder', 'brows_wtf',
      'nose_default_2_of_2', 'nose_pointed_2_of_2', 'nose_roman_2_of_2', 'nose_syrid_2_of_2', 'nose_strong_2_of_2',
      'mouth_neutral', 'mouth_alertness', 'mouth_amusement', 'mouth_anger', 'mouth_anxiety', 'mouth_aversion', 'mouth_betrayal', 'mouth_caged', 'mouth_concern', 'mouth_cruel', 'mouth_dejection', 'mouth_desperation', 'mouth_disdain', 'mouth_disgust', 'mouth_eeww', 'mouth_fear', 'mouth_grief', 'mouth_horror', 'mouth_indignation', 'mouth_joy', 'mouth_laughing', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage', 'mouth_pain', 'mouth_rage', 'mouth_revulsion', 'mouth_sadness', 'mouth_satisfaction', 'mouth_shock', 'mouth_sterness', 'mouth_surprise', 'mouth_terror', 'mouth_wonder', 'mouth_wtf',
      'nose_default_1_of_2', 'nose_strong_1_of_2',
      'warpaint_football',
      'facialhair_beard_boxed','facialhair_beard_ducktail','facialhair_beard_guru','facialhair_beard_intelectual','facialhair_beard_rap', 'facialhair_beard_raw',
      'facialhair_chinpuff',
      'facialhair_goatee', 'facialhair_goatee_raw',
      'facialhair_moustache','facialhair_moustache_dali','facialhair_moustache_thick','facialhair_muttonchops','facialhair_muttonchops_friendly','facialhair_soulpatch','facialhair_winnfield',
      'nose_pointed_1_of_2', 'nose_roman_1_of_2', 'nose_syrid_1_of_2',
      'scar_horizontal_nose',
      'mask_robin',
      'eyepatch_left','eyepatch_right',
      'hair_balding','hair_balding_crazy','hair_balding_crown', 'hair_gelled','hair_manga_1_of_2','hair_mohawk','hair_short','hair_crewcut',
      'headband_medium_1_of_2',
      'mask_guy_fawkes',
      'glasses_alien','glasses_designer','glasses_fpv','glasses_goggles','glasses_google','glasses_hipster','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer',
      'hat_baseball','hat_berret','hat_berret_badge','hat_cap','hat_tuque','hat_cowboy','hat_fedora_1_of_2','hat_jester','hat_top','hat_magritte','hat_police','hat_scumbag','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_motorcycle',
      'jewelry_earings','jewelry_nosering','jewelry_watch',
      'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
      'horns_devil',
      'cloak_default_1_of_4',
      'horns_large',
      'pipe_subgenius',
      'earpiece_microphone'
    ];
    var femaleForm1 = {
      'Body_head' : ['default', 'heart', 'oblong', 'oval', 'round', 'square', 'diamond', 'triangle'],
      'Ears' : ['default', 'elven', 'pointed', 'outstretched', 'plugged', 'unplugged'],
      'Iris' : ['default'],
      'Pupils' : ['round', 'feline', 'star'],
      'Nose' : ['default', 'pointed', 'roman', 'strong', 'syrid'],
      'Hair': ['','afro', 'down', 'manga', 'mohawk', 'pigtails', 'ponytail', 'short', 'bangs', 'odango', 'emo', 'spider', 'wreckingball'],
      'Freckles': ['', 'medium'],
      'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'aversion', 'dejection', 'disdain', 'disgust', 'grief', 'indignation', 'joy', 'laughter', 'melancholy', 'rage', 'sadness', 'sterness', 'surprise', 'shock', 'wonder']
    };
    var femaleForm2 = {
      'Pipe' : ['', 'subgenius'],
      'Makeup': ['', 'blush', 'gothic_eyeliner', 'warpaint'],
      'Earings': ['', 'bells','death_drop','double-drop','gold_rings', 'gold_ring_right', 'gold_ring_left','lightning','triangle_mobile'],
      'Eyepatch': ['', 'left', 'right'],
      'Glasses': ['', 'alien', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
      'Headband': ['', 'medium'],
      'Hat': ['', 'baseball', 'beach', 'berret_badge', 'top', 'waitress', 'cowboy', 'police', 'scumbag', 'helmet_vietnam', 'tiara', 'strainer', 'magritte', 'motorcycle', 'tuque', 'cap'],
      'Mask': ['', 'guy_fawkes', 'horse', 'stormtrooper', 'jason', 'cat'],
      'Horns': ['', 'devil'],
      'Earpiece': ['', 'microphone'],
      'Veil': ['', 'al-amira', 'hijab', 'khimar', 'niqab', 'shayla']
    };
    var femaleForm3 = {
      'Collar' : ['', 'metal'],
      'Necklace' : ['', 'perl', 'princess'],
      'Bra': ['', 'bow', 'grid'],
      'Top': ['', 'asymetric', 'loop', 'tank'],
      'Shoulderpads' : ['', 'artillery', 'general'],
      'Scarf' : ['', 'chest_warmer', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape','overhand', 'once_around', 'drape']
    };
    var femaleForm4 = {
      'Body': ['athletic'],
      'Tatoo': ['', 'chaos_chest', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
      'Nails': ['short', 'long', 'claws'],
      'Holster': ['', 'revolver_chest', 'revolver_hip', 'revolver_thigh'],
      'Suit': ['', 'asymetric', 'bands', 'onepiece', 'wetsuit'],
      'Dress': ['', 'accolade', 'bobafett', 'casual', 'corset', 'suit', 'waitress', 'short', 'cheerleader', 'japanese_pleat', 'parisian_fall', 'german_expression'],
      'Coat' : ['', 'lab', 'winter_furcollar', 'winter_tubecollar'],
      'Bracelet' : ['','rings', 'wonder'],
      'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
      'Wings' : ['', 'devil', 'angel']
    };
    var femaleForm5 = {
      'Underwear': ['', 'plain', 'string'],
      'Shorts' : ['', 'bikini', 'short'],
      'Skirt' : ['', 'school'],
      'Leggings': ['', 'regular', 'torn'],
      'Pants' : ['','yoga', 'yoga_torn', 'jeans', 'jeans_torn', 'jeans_bellbottoms'],
      'Belt' : ['', 'bullet', 'utility', 'satchel']
    };
    var femaleForm6 = {
      'Shoes': ['','hightops', 'highheels', 'sandals_roman', 'plateforms', 'flip-flops']
    };
    var layersFemale = [
      'wings_devil', 'wings_angel',
      'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
      'coat_lab_3_of_3', 'coat_winter_furcollar_3_of_3', 'coat_winter_tubecollar_3_of_3',
      'hat_beach_2_of_2', 'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2',
      'headband_medium_2_of_2',
      'veil_shayla_2_of_2',
      'hair_down_3_of_3','hair_manga_2_of_2', 'hair_pigtails_2_of_2',
      'shoes_flip-flops_2_of_2',
      'holster_revolver_thigh_2_of_2',
      'body_athletic',
      'nails_short_2_of_2','nails_long_2_of_2','nails_claws_2_of_2',
      'tatoo_chaos_chest','tatoo_chaos_left','tatoo_chaos_right','tatoo_archeopteryx_left',
      'underwear_plain','underwear_string',
      'leggings_regular', 'leggings_torn',
      'bra_bow', 'bra_grid',
      'suit_asymetric', 'suit_bands', 'suit_onepiece', 'suit_wetsuit',
      'shoes_hightops','shoes_highheels','shoes_plateforms','shoes_sandals_roman', 'shoes_flip-flops_1_of_2',
      'pants_yoga', 'pants_yoga_torn', 'pants_jeans', 'pants_jeans_torn','pants_jeans_bellbottoms',
      'shorts_bikini', 'shorts_short',
      'holster_revolver_thigh_1_of_2',
      'skirt_school',
      'holster_revolver_hip',
      'necklace_perl','necklace_princess',
      'top_asymetric', 'top_loop', 'top_tank',
      'dress_accolade', 'dress_bobafett', 'dress_casual','dress_corset','dress_suit','dress_short','dress_waitress','dress_cheerleader','dress_japanese_pleat','dress_german_expression','dress_parisian_fall',
      'holster_revolver_chest',
      'belt_satchel', 'belt_bullet',
      'collar_metal',
      'veil_al-amira_2_of_2', 'veil_khimar_2_of_2',
      'bracelet_rings', 'bracelet_wonder',
      'coat_lab_2_of_3', 'coat_winter_furcollar_2_of_3', 'coat_winter_tubecollar_2_of_3', 'coat_winter_tubecollar_1_of_3',
      'coat_lab_1_of_3',
      'shoulderpads_general',
      'scarf_chest_warmer','scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_overhand','scarf_once_around','scarf_drape',
      'hair_down_2_of_3',
      'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
      'ears_default', 'ears_elven', 'ears_outstretched', 'ears_pointed', 'ears_plugged', 'ears_unplugged',
      'tatoo_tribal_face',
      'earings_bells','earings_death_drop','earings_double-drop','earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right','earings_lightning','earings_perl','earings_triangle_mobile',
      'sockets_neutral', 'sockets_sterness', 'sockets_indignation', 'sockets_anger', 'sockets_rage', 'sockets_disdain', 'sockets_aversion', 'sockets_disgust', 'sockets_amusement', 'sockets_joy', 'sockets_laughter', 'sockets_dejection', 'sockets_melancholy', 'sockets_sadness', 'sockets_grief', 'sockets_alertness', 'sockets_wonder', 'sockets_surprise', 'sockets_shock',
      'nose_default_2_of_2', 'nose_pointed_2_of_2', 'nose_roman_2_of_2', 'nose_syrid_2_of_2', 'nose_strong_2_of_2',
      'mouth_neutral', 'mouth_sterness', 'mouth_indignation', 'mouth_anger', 'mouth_rage', 'mouth_disdain', 'mouth_aversion', 'mouth_disgust', 'mouth_amusement', 'mouth_joy', 'mouth_laughter', 'mouth_dejection', 'mouth_melancholy', 'mouth_sadness', 'mouth_grief', 'mouth_alertness', 'mouth_wonder', 'mouth_surprise', 'mouth_shock',
      'nose_default_1_of_2', 'nose_pointed_1_of_2', 'nose_roman_1_of_2', 'nose_syrid_1_of_2', 'nose_strong_1_of_2',
      'freckles_medium',
      'makeup_blush', 'makeup_warpaint','makeup_gothic_eyeliner',
      'eyes_neutral', 'eyes_sterness', 'eyes_indignation', 'eyes_anger', 'eyes_rage', 'eyes_disdain', 'eyes_aversion', 'eyes_disgust', 'eyes_amusement', 'eyes_joy', 'eyes_laughter', 'eyes_dejection', 'eyes_melancholy', 'eyes_sadness', 'eyes_grief', 'eyes_alertness', 'eyes_wonder', 'eyes_surprise', 'eyes_shock',
      'eyeballs_default',
      'lashes_neutral', 'lashes_sterness', 'lashes_indignation', 'lashes_anger', 'lashes_rage', 'lashes_disdain', 'lashes_aversion', 'lashes_disgust', 'lashes_amusement', 'lashes_joy', 'lashes_laughter', 'lashes_dejection', 'lashes_melancholy', 'lashes_sadness', 'lashes_grief', 'lashes_alertness', 'lashes_wonder', 'lashes_surprise', 'lashes_shock',
      'brows_neutral', 'brows_sterness', 'brows_indignation', 'brows_anger', 'brows_rage', 'brows_disdain', 'brows_aversion', 'brows_disgust', 'brows_amusement', 'brows_joy', 'brows_laughter', 'brows_dejection', 'brows_melancholy', 'brows_sadness', 'brows_grief', 'brows_alertness', 'brows_wonder', 'brows_surprise', 'brows_shock',
      'eyepatch_left','eyepatch_right',
      'mask_guy_fawkes',
      'tie_bow',
      'glasses_alien','glasses_hipster','glasses_fpv','glasses_google','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer','glasses_designer','glasses_goggles',
      'hair_short','hair_afro','hair_mohawk','hair_bangs','hair_ponytail','hair_odango','hair_emo','hair_spider','hair_wreckingball','hair_down_1_of_3','hair_manga_1_of_2', 'hair_pigtails_1_of_2',
      'veil_al-amira_1_of_2', 'veil_hijab', 'veil_khimar_1_of_2', 'veil_niqab', 'veil_shayla_1_of_2',
      'headband_medium_1_of_2',
      'hat_baseball', 'hat_beach_1_of_2', 'hat_berret_badge', 'hat_waitress','hat_police','hat_cowboy','hat_top','hat_scumbag','hat_tiara','hat_magritte','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_tuque','hat_cap','hat_motorcycle',
      'body_hand',
      'nails_short_1_of_2','nails_long_1_of_2','nails_claws_1_of_2',
      'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
      'horns_devil',
      'coat_winter_furcollar_1_of_3',
      'shoulderpads_artillery',
      'belt_utility',
      'pipe_subgenius',
      'earpiece_microphone'
    ];

    var layerDirectoryFemale = 'layer/female/';
    var layerDirectoryMale = 'layer/male/';
    var multiLayerFemale = [['coat_lab', 3], ['hair_pigtails', 2], ['hair_manga', 2], ['hair_down', 3], ['hat_beach', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['headband_medium', 2], ['coat_winter_furcollar', 3], ['coat_winter_tubecollar', 3], ['holster_revolver_thigh', 2], ['nails_short', 2], ['nails_long', 2], ['nails_claws', 2], ['nose_default', 2], ['nose_pointed', 2], ['nose_roman', 2], ['nose_strong', 2], ['nose_syrid', 2], ['veil_al-amira', 2], ['veil_khimar', 2], ['veil_shayla', 2], ['shoes_flip-flops', 2]];
    var multiLayerMale = [['body_athletic', 2],['hair_manga', 2], ['cloak_default', 4], ['coat_lab', 2], ['coat_fall_long', 3], ['coat_trench', 4], ['hat_fedora', 2], ['headband_medium', 2], ['jacket_suit', 2], ['shirt_colar', 2], ['shirt_tanktop', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['nose_default', 2], ['nose_pointed', 2], ['nose_roman', 2], ['nose_strong', 2], ['nose_syrid', 2], ['pants_jeans', 2], ['pants_suit', 2], ['tie_bow', 2], ['shoes_flip-flops', 2]];
    var size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    skinLayers = [
      'eyes_neutral',
      'age_lines', 'body_athletic', 'body_head_default', 'body_head_diamond', 'body_head_heart', 'body_head_oblong', 'body_head_oval', 'body_head_round', 'body_head_square', 'body_head_triangle', 'body_hand',
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
      'hair_balding', 'hair_balding_crazy', 'hair_balding_crown', 'hair_short', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_pigtails_1_of_2', 'hair_pigtails_2_of_2', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'hair_bangs', 'hair_odango', 'hair_emo', 'hair_spider', 'hair_wreckingball', 'hair_crewcut',
      'lashes_neutral', 'lashes_alertness', 'lashes_amusement', 'lashes_anger', 'lashes_anxiety', 'lashes_aversion', 'lashes_betrayal', 'lashes_caged', 'lashes_concern', 'lashes_cruel', 'lashes_dejection', 'lashes_desperation', 'lashes_disdain', 'lashes_disgust', 'lashes_eeww', 'lashes_fear', 'lashes_grief', 'lashes_horror', 'lashes_indignation', 'lashes_joy', 'lashes_laughing', 'lashes_melancholy', 'lashes_omg', 'lashes_outrage', 'lashes_pain', 'lashes_rage', 'lashes_revulsion', 'lashes_sadness', 'lashes_satisfaction', 'lashes_shock', 'lashes_sterness', 'lashes_surprise', 'lashes_terror', 'lashes_wonder', 'lashes_wtf',
      'brows_neutral', 'brows_alertness', 'brows_amusement', 'brows_anger', 'brows_anxiety', 'brows_aversion', 'brows_betrayal', 'brows_caged', 'brows_concern', 'brows_cruel', 'brows_dejection', 'brows_desperation', 'brows_disdain', 'brows_disgust', 'brows_eeww', 'brows_fear', 'brows_grief', 'brows_horror', 'brows_indignation', 'brows_joy', 'brows_laughing', 'brows_melancholy', 'brows_omg', 'brows_outrage', 'brows_pain', 'brows_rage', 'brows_revulsion', 'brows_sadness', 'brows_satisfaction', 'brows_shock', 'brows_sterness', 'brows_surprise', 'brows_terror', 'brows_wonder', 'brows_wtf'
    ];
    c.sex  = hash.get('sex');
    var sex = c.sex;
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
    //var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var gmenu = document.querySelector(".skin-color__container");
    gmenu.classList.add('skin-color__container--show');
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

function defaultPupilShape() {
  c.choices['pupils'] = 'round';
  hash.add({ pupils: 'round' });
}

function defaultEyeColor(skinColor){
    var eyeColorDict = {
        '#ffdfc4' : "#6F918A", // Grey
        '#f0d5be' : "#FF6600", // Amber
        '#eeceb3' : "#A0892C", // Hazel
        '#e1b899' : "#784421", // Light Brown
        '#e5c298' : "#784421", // Light Brown
        '#ffdcb2' : "#784421", // Light Brown
        '#e5b887' : "#784421", // Light Brown
        '#e5a073' : "#784421", // Light Brown
        '#e79e6d' : "#784421", // Light Brown
        '#db9065' : "#784421", // Light Brown
        '#ce967c' : "#784421", // Light Brown
        '#c67856' : "#784421", // Light Brown
        '#ba6c49' : "#784421", // Light Brown
        '#a57257' : "#784421", // Light Brown
        '#f0c8c9' : "#37ABC8", // Blue
        '#dda8a0' : "#AAD400", // Green
        '#b97c6d' : "#552200", // Brown
        '#a8756c' : "#552200", // Brown
        '#ad6452' : "#552200", // Brown
        '#5c3836' : "#552200", // Brown
        '#cb8442' : "#552200", // Brown
        '#bd723c' : "#552200", // Brown
        '#704139' : "#552200", // Brown
        '#a3866a' : "#552200"  // Brown
    };
    var eyeColor = eyeColorDict[skinColor];
    c.choices['irisColor'] = eyeColor;
    hash.add({ irisColor: eyeColor });
}

function defaultHairColor(skinColor){
    var hairColorDict = {
        '#ffdfc4' : "#803300", // Light brown
        '#f0d5be' : "#803300", // Light brown
        '#eeceb3' : "#803300", // Light brown
        '#e1b899' : "#1a1a1a", // Black
        '#e5c298' : "#1a1a1a", // Black
        '#ffdcb2' : "#1a1a1a", // Black
        '#e5b887' : "#1a1a1a", // Black
        '#e5a073' : "#1a1a1a", // Black
        '#e79e6d' : "#1a1a1a", // Black
        '#db9065' : "#1a1a1a", // Black
        '#ce967c' : "#1a1a1a", // Black
        '#c67856' : "#1a1a1a", // Black
        '#ba6c49' : "#1a1a1a", // Black
        '#a57257' : "#1a1a1a", // Black
        '#f0c8c9' : "#ffcc00", // Blond
        '#dda8a0' : "#ff6600", // Red
        '#b97c6d' : "#1a1a1a", // Black
        '#a8756c' : "#1a1a1a", // Black
        '#ad6452' : "#1a1a1a", // Black
        '#5c3836' : "#1a1a1a", // Black
        '#cb8442' : "#1a1a1a", // Black
        '#bd723c' : "#1a1a1a", // Black
        '#704139' : "#1a1a1a", // Black
        '#a3866a' : "#1a1a1a"  // Black
    };
    var newHairColor = hairColorDict[skinColor];
    c.choices['hairColor'] = newHairColor;
    hash.add({ hairColor: newHairColor });
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function colorOnHover() {
    var malePath = document.getElementById("path_male");
    var femalePath = document.getElementById("path_female");
    var newTone = this.style.backgroundColor;
    femalePath.style.fill = newTone;
    malePath.style.fill = newTone;
}

function colorCutout(newColor){
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
    setTimeout(function(){
        launch();
    }, 300);
}

function selectMale(event) {
    window.sex = "m";
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
    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Male', eventLabel: 'Select male template'});
    setTimeout(function(){
        displayPallette();
    }, 350);
}

function selectFemale(event) {
    window.sex = "f";
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
    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Female', eventLabel: 'Select female template'});
    setTimeout(function(){
        displayPallette();
    }, 350);
}
