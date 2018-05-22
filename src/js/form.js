function createForm(sex, forms){
  //TODO Check to see if there is already an existing form for the sex of the new character.
  //If not, check to see if there is an existing form of the opposite sex and remove it before creating another.
  var itemsThumbsContent = document.querySelector('#content_1');
  itemsThumbsContent.innerHTML = '';
  var sex = sex || window.sex;
  var forms = forms || window.forms;
  var sectionNames = ["Head","Accessories", "Torso", "Body", "Legs", "Feet"];
  var sectionHtml = '<h2 class="sidebar__title"><svg class="icon"><use xlink:href="#icon-coathanger"></use></svg>Categories</h2>';
  sectionHtml += '<ul class="section__list">';
  for (var f in forms) {
    var formContainer = document.querySelector('#content_1');
    var newHtml = '';
    var selcount = 0;
    sectionHtml += '<section class="accordeon__section-label"><span class="accordeon__section-title"><svg class="icon"><use xlink:href="#'+getIconId(sectionNames[f], sex)+'"></use></svg><span class="accordeon__section-title__text">'+sectionNames[f]+'</span></span><div class="accordeon__svg-container section-btn--hide"><svg width="25" height="25"><use xlink:href="#accordeon_btn"/></svg></div></section><div class="accordeon__content section--hide">';
    var formsLength = forms.length;
    var formCounter = formsLength;
    for(var x in forms[f]) {
        sectionHtml += '    <a class="section__link"><li class="sbl__option" tabindex="0">' + x +'</li></a>';
        var sectionTitle = x;
        var t = sectionTitle.toLowerCase();
        newHtml += '    <div class="Row options__container options__' + t + '"><span class="svg__section__title">' + t + '</span><div class="thumbnails__container">';
        var xsel = hash.get(t);
        var options = forms[f][x].map(function(d, i) {
            var tempId ='#' + t + '_' + d;
            var multiLayer = window.multiLayer;
            var sections = getSectionsFromIdMultiLayer(multiLayer, tempId)
            if (t === "emotion") {
                var sections = [];
                var emotions = GetEmotionGetLayers(d);
                for (emo in emotions) {
                    var newEmo = '#' + emotions[emo] + '_' + d;
                    sections.push(newEmo);
                };
            }
            var viewBox = getViewBox(t, d);
            newHtml += '    <div class="option__container option__' + t + '_' + d + '" tabindex="0"><svg viewBox="' + viewBox + '" class="svg__option ' + t + '_' + d + '"></svg><span class="option__label">' + d + '</span></div>';}).join('\n');
            var defaultValue = hash.get(x);
            if (defaultValue !== undefined) {
                var defval = 'selected="' + defaultValue + '" ';
            } else {
                var defval = '';
            }
            htagc = x.toLowerCase() + 'Color';
            var hashColor = hash.get(htagc);
            if (hashColor !== undefined) {
                var colorValue = hashColor;
            }
            else {
                var colorValue = '#ffffff'
            }
            newHtml += '    </div>';
            newHtml += '</div>';
            selcount ++;
        }
        sectionHtml += '</div>';
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = newHtml;
        formContainer.appendChild(htmlObject);
    }
    sectionHtml += '</ul>';
    var sectionContainer = document.querySelector('#sidebar-left');
    var sectionList = document.createElement('div');
    sectionList.innerHTML = sectionHtml;
    sectionContainer.innerHTML = '';
    sectionContainer.appendChild(sectionList);
    var sidebarLeftOptions  = document.querySelectorAll('.sbl__option');
    var optionThumbnails  = document.querySelectorAll('.option__container');
    var sectionButtons  = document.querySelectorAll('.accordeon__section-label');

    addEventListenerList(sidebarLeftOptions, 'mouseover', showThumbOptions);
    addEventListenerList(sidebarLeftOptions, 'focus', showThumbOptions);
    addEventListenerList(sidebarLeftOptions, 'click', openThumbs);
    addEventListenerList(optionThumbnails, 'click', changeOption);
    addEventListenerList(sectionButtons, 'click', toggleSection);
}

function getSectionsFromIdMultiLayer(multiLayer, tempId) {
    var sections = [];
    for (lyr in multiLayer) {
        if (tempId.slice(1) === multiLayer[lyr][0]) {
            for (var i=1;i<=multiLayer[lyr][1];i++) {
                newLayer = tempId + '_' + i + '_of_' + multiLayer[lyr][1];
                sections.push(newLayer);
            }
        }
        if (sections.length === 0) {
        sections = [tempId];
        }
    }
    return sections;
}
function getSectionLayersList(section) {
  var sex = c.sex;
  var formList;
  var formCounter;
  var itemList;
  if (sex === "m") {
    formList = window.maleFormList;
  } else {
    formList = window.femaleFormList;
  }
  formCounter = formList.length;
  while (formCounter--) {
    if (section in formList[formCounter]) {
      itemList = formList[formCounter][section];
    }
  }
  return itemList;
}

function replaceMultilayer(section, layersList) {
  var counter = layersList.length;
  var multilayer;
  var multiCounter;
  var fullList = [];
  var currentItem;
  var currentQty;
  var currentIndex;
  var qtyCounter;
  if (sex === 'm') {
    multilayer = window.multiLayerMale;
  } else {
    multilayer = window.multiLayerFemale;
  }
  while (counter--) {
    if (layersList[counter] != '') {
      fullList.push(section + '_' + layersList[counter]);
    }
  }
  multiCounter = multiLayer.length;
  while (multiCounter--) {
    currentItem = multilayer[multiCounter][0];
    if (isInArray(currentItem, fullList)) {
      currentIndex = fullList.indexOf(currentItem);
      fullList.splice(currentIndex, 1);
      currentQty = multilayer[multiCounter][1];
      qtyCounter = currentQty;
      while (qtyCounter--) {
        fullList.push(currentItem + '_' + (qtyCounter + 1) + '_of_' + currentQty);
      }
    }
  }
  return fullList;
}
function loadSectionLayers(section, layersList, callback) {
  var emotionLayerList = [];
  var sex = c.sex;
  var layerDirectory;
  var counter = layersList.length;
  var xhr;
  var file;
  var layerID;
  var inDom;
  var item;
  var nextLayerSibling;
  var emotionCounter;
  var htmlObject;
  var svgObject;
  var layers;
  layersList = replaceMultilayer(section, layersList);
  if (section === 'emotion') {
    emotionCounter = layersList.length;
    while (emotionCounter--) {
        emotionLayerList = emotionLayerList.concat(fromEmotionGetLayers(layersList[emotionCounter]));
    }
    layersList = emotionLayerList;
  }
  if (sex === 'm') {
    layerDirectory = 'layer/male/';
    layers = window.layersMale;
  } else {
    layerDirectory = 'layer/female/';
    layers = window.layersFemale;
  }
  while (counter--) {
    item = layersList[counter];
    if (section === "emotion") {
      layerID = item;
    } else {
      layerID = section + '_' + item;
    }

    if (layers.indexOf(layerID) === -1) {
      continue
    }

    file = layerDirectory + section + '_' + item + '.svg';

    fetch(file).then(function(response) {
      return response.text();
      }).then(function (text) {
        var htmlObject = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        var svgObject;
        var layerID;
        var nextLayerSibling;
        htmlObject.innerHTML = text;
        svgObject = htmlObject.querySelector('g');
        svgObject.style.opacity = 0;
        svgObject = colorElement(svgObject);
        layerID = svgObject.id;
        nextLayerSibling = findNextLayerInDom(layerID);
        if ((document.querySelector('#' + layerID)) === null) {
          if (nextLayerSibling != null) {
            nextLayerSibling.parentNode.insertBefore(svgObject, nextLayerSibling);
          } else {
            document.querySelector('#svg1').appendChild(svgObject);
          }
        }
        return svgObject;
    }).then(function(svgObject){
      if (typeof callback === 'function') {callback(svgObject);}
    })
  }
}

function findNextLayerInDom(item) {
  var sex = c.sex;
  var nextLayerSibling = null;
  var layers;
  var amountLayers;
  var itemPosition;
  if (sex === 'm') {
    layers = window.layersMale;
  } else {
    layers = window.layersFemale;
  }
  amountLayers = layers.length;
  itemPosition = layers.indexOf(item);
  while (nextLayerSibling === null) {
    nextLayerSibling = document.querySelector('#' + layers[itemPosition + 1]);
    if (itemPosition > amountLayers) {
      return
    }
    ++itemPosition;
  }
  return nextLayerSibling;
}

function populateThumbs(svgObject) {
  var thumbObject = svgObject.cloneNode(true);;
  var layerID = thumbObject.id;
  thumbObject.style.opacity = 1;
  document.querySelector('#content_1 .' + layerID).appendChild(thumbObject);
}

function openThumbs() {
    var _ = this;
    var section = _.innerHTML;
    var layersList = getSectionLayersList(section);
    sectionLowerCase = section.toLowerCase();
    loadSectionLayers(sectionLowerCase, layersList, populateThumbs);
    var previousSelection = document.querySelector('.section--selected');
    if (previousSelection != null) {
        previousSelection.classList.remove('section--selected');
    };
    showThumbOptions(_);
    _.classList.add('section--selected');

    var thumbSection = document.querySelector('.widget');
    var thumbSectionBtn = thumbSection.previousSibling;
    var sidebarLeft = document.querySelector('#sidebar-left');
    var sidebarRight = document.querySelector('.sidebar-right');

    if (thumbSectionBtn.classList === undefined && thumbSectionBtn.previousSibling.classList != undefined) {
        thumbSectionBtn = thumbSectionBtn.previousSibling;
    }
    thumbSectionBtn = thumbSectionBtn.querySelector('.accordeon__svg-container');
    if (thumbSectionBtn.classList.contains('section-btn--hide')) {
        thumbSectionBtn.classList.toggle('section-btn--hide');
    }
    if (thumbSection.classList.contains('section--hide')) {
        thumbSection.classList.toggle('section--hide');
    }
    if (sidebarLeft.classList.contains('cherry')) {
         sidebarLeft.classList.remove("cherry");
         sidebarRight.classList.add("visible");
    }
    sidebarRight.classList.add("visible");
}

function showSidebarLeft() {
    var sidebarLeft = document.querySelector('#sidebar-left');
    sidebarLeft.classList.add('visible');
}

function hideSidebarLeft() {
    var sidebarLeft = document.querySelector('#sidebar-left');
    sidebarLeft.classList.remove('visible');
}

function clearSidebarLeft() {
    var sidebarLeft = document.querySelector('#sidebar-left');
    sidebarLeft.innerHTML  = '';
}

function showSidebarRight() {
    var sidebarLeft = document.querySelector('#sidebar');
    sidebarLeft.classList.add('visible');
}

function hideSidebarRight() {
    var sidebarLeft = document.querySelector('#sidebar');
    sidebarLeft.classList.remove('visible');
}

function clearSidebarRight() {
    var sidebarParent = document.querySelector('#content');
    var sidebarRight = document.querySelector('#sidebar');
    sidebarParent.removeChild(sidebarRight);
    sidebarParent.appendChild(rightSidebarClone);
}

function addEventListenerList(list, event, fn) {
    var listLength = list.length;
    var listCounter = listLength;
    var i;
    while (listCounter--) {
        i = listLength - listCounter - 1;
        list[i].addEventListener(event, fn, false);
    }
}

function closeSections(exception) {
    var sectionButtons  = document.querySelectorAll('.accordeon__section-label');
    var displayButtons = document.querySelectorAll('.accordeon__svg-container');
    var i = sectionButtons.length;
    while (i--){
        var section = sectionButtons[i];
        if (section !== exception && section.parentNode.parentNode.parentNode.classList.contains('sidebar-left')){
            var button = displayButtons[i];
            var sectionContent = section.nextSibling;
            if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined){
                sectionContent = sectionContent.nextSibling;
            }
            if (!sectionContent.classList.contains('section--hide')){
                sectionContent.classList.toggle('section--hide');
            }
            if (!button.classList.contains('section-btn--hide')){
                button.classList.toggle('section-btn--hide');
            }
        }
    }
}

function toggleSection(ev) {

  var el = ev.target;
  var sectionLabel;
  var elChild;
  var parent = getParent(el, '.accordeon__section-label');

  elChild = parent.querySelector('.accordeon__section-title__text');
  if (elChild != null) {
    sectionLabel = elChild.innerHTML;
    sectionZoom(sectionLabel);
  }
  var _ = this;
  if (this.parentNode.parentNode.parentNode.classList.contains('sidebar-left')){
       closeSections(_);
  };
  var alert = document.querySelector('.alert');
  if (alert != null){
      alert.classList.remove('alert');
  }
  if (_.classList.contains('alert')){
      _.classList.remove('alert');
  };
  var sectionContent = _.nextSibling;
  if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined){
      sectionContent = sectionContent.nextSibling;
  }
  var maxHeight = sectionContent.clientHeight;
  var displayButton = _.querySelector('.accordeon__svg-container');
  if (sectionContent.classList.contains('accordeon__content')) {
      if (sectionContent.classList.contains('section--hide')){
      } else {
          sectionContent.style.maxHeight = maxHeight;
      };
      sectionContent.classList.toggle('section--hide');
      displayButton.classList.toggle('section-btn--hide');
  }

}

function showThumbOptions(_) {
    var _ = _.target || _;
    var showOptionThumbs = document.querySelector('.options__'+_.innerHTML.toLowerCase());
    var allOptions  = document.querySelectorAll('.options__container');
    var sectionSelected = document.querySelector('.section--selected');
    if (sectionSelected === null){
        for (var i = 0, len = allOptions.length; i < len; i++) {
            allOptions[i].classList.remove('selected--option');
        }
        showOptionThumbs.classList.add('selected--option');
        var section = _.innerHTML.toLowerCase();
        getColor(section);
    };
}

function changeOption() {
    var category = this.parentNode.parentNode.firstChild.innerHTML;
    var userChoice = this.lastChild.innerHTML;
    var colors = document.querySelector('.colorpicker-wrapper').previousSibling;
    if (colors.classList === undefined && colors.previousSibling.classList != undefined){
        colors = colors.previousSibling;
    }
    show(userChoice, category);
    colors.classList.add('alert');
}

function getColor(sectionId) {
    clearPicker();
    var id = sectionId;
    var slide = document.getElementById('slide');
    var picker = document.getElementById('picker');
    var section = document.querySelector('.section-id');
    var wrapper = document.querySelector(".colorpicker-wrapper");
    section.innerHTML = id;
    ColorPicker(
        slide,
        picker,
        function(hex, hsv, rgb) {
          colorize(id, hex);
        })
}

function emptyPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '';
}

function clearPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span></div><div class="colorpicker-align"><div id="picker" style="background-color:rgb(255,0,0);"></div><div id="slide"></div></div>';
}

function getIconId(sectionName, sex) {
    var iconDictMale = {
        "Head":"icon-face",
        "Accessories":"icon-glasses",
        "Torso":"icon-shirt",
        "Body":"icon-underwear",
        "Legs":"icon-pants",
        "Feet":"icon-shoes"
    }
    var iconDictFemale = {
        "Head":"icon-face",
        "Accessories":"icon-glasses",
        "Torso":"icon-shirt",
        "Body":"icon-underwear",
        "Legs":"icon-dress",
        "Feet":"icon-shoes"
    }
    if (sex==="f"){
         return iconDictFemale[sectionName];

    }
    else if (sex==="m"){
         return iconDictMale[sectionName];
    } else {
        return 'icon-face';
    }
}

function getViewBox(t, d) {
    var id = t + '_' + d;
    var sex = window.sex;
    if (sex==="m"){
        var idDict = {
            "body_athletic":"65 130 430 430",
            "coat_snowboard":"160 124 230 230",
            "coat_fall_long":"130 124 290 290",
            "coat_trench":"130 124 290 290",
            "ears_plugged":"254 122 20 20",
            "ears_unplugged":"254 121 20 20",
            "glasses_fpv":"250 97 64 64",
            "hat_helmet_vietnam":"243 86 80 80",
            "hat_jester":"208 54 140 140",
            "hat_motorcycle":"243 86 80 80",
            "hat_tuque":"243 85 80 80",
            "hair_mohawk":"243 45 80 80",
            "holster_revolver_hip":"220 240 130 130",
            "horns_large":"235 58 90 90",
            "jewelry_chain":"241 140 80 80",
            "mask_horse":"233 80 100 100",
            "mask_robin":"261 108 40 40",
            "pet_canine":"82 403 150 150",
            "pet_chicken":"45 403 150 150",
            "pet_doge":"341 349 200 200",
            "pet_feline":"381 439 128 128",
            "pet_fox":"42 393 150 150",
            "pet_gerbil":"125 475 64 64",
            "pet_parrot":"203 116 80 80",
            "pet_raven":"50 439 128 128",
            "pet_rat":"300 439 128 128",
            "pet_siamese_cat":"42 393 150 150",
            "pet_vulture":"281 349 180 180",
            "scar_horizontal_neck":"265 139 32 32",
            "scar_horizontal_nose":"264 115 32 32",
            "scar_vertical_heart":"249 164 64 64",
            "scar_vertical_left":"264 110 32 32",
            "scar_vertical_right":"264 110 32 32",
            "scarf_drape":"185 140 190 190",
            "tatoo_aum_chest":"248 165 64 64",
            "tatoo_aum_left":"298 157 64 64",
            "tatoo_aum_right":"198 154 64 64",
            "tatoo_chaos_chest":"248 169 64 64",
            "tatoo_chaos_left":"298 164 64 64",
            "tatoo_chaos_right":"198 164 64 64",
            "underwear_boxers":"224 258 120 120"
        }
        var sectionDict = {
            "age":"261 109 40 40",
            "belt":"185 135 190 190",
            "body_head":"249 95 64 64",
            "cloak":"0 0 560 560",
            "coat":"95 134 360 360",
            "earpiece":"280 125 25 25",
            "ears":"254 120 20 20",
            "earings":"256 87 50 50",
            "emotion":"259 113 42 42",
            "eyepatch":"261 109 40 40",
            "facialhair":"261 124 40 40",
            "freckles":"261 109 40 40",
            "glasses":"261 109 40 40",
            "gloves":"206 308 40 40",
            "hat":"241 70 80 80",
            "hair":"243 80 80 80",
            "headband":"241 90 80 80",
            "holster":"215 150 130 130",
            "horns":"256 87 50 50",
            "iris":"270.25 124.85 4 4",
            "jacket":"170 130 220 220",
            "mask":"243 93 80 80",
            "nose":"265 115 32 32",
            "pants":"130 244 290 290",
            "pipe":"252 132 32 32",
            "pupils":"270.25 124.85 40 40",
            "scarf":"185 120 190 190",
            "shirt":"190 140 190 190",
            "shoes":"210 442 120 120",
            "shoulderpads":"207 120 150 150",
            "socks":"210 442 120 120",
            "suit":"65 130 430 430",
            "tie":"241 140 80 80",
            "underwear":"228 238 120 120",
            "veil":"207 97 150 150",
            "vest":"185 135 190 190",
            "watch":"331 302 25 25",
            "warpaint":"261 109 40 40",
            "wings":"110 -30 350 350"
        }
    } else if (sex==="f") {
        var idDict = {
            "body_athletic":"65 130 430 430",
            "coat_winter_tubecollar":"125 120 280 280",
            "dress_bobafett":"160 165 230 230",
            "dress_corset":"175 180 200 200",
            "dress_japanese_pleat":"105 140 340 340",
            "dress_parisian_fall":"105 160 340 340",
            "dress_german_expression":"75 160 400 400",
            "dress_short":"175 180 200 200",
            "dress_suit":"175 140 200 200",
            "dress_waitress":"160 140 230 230",
            "earings_gold_ring_left":"289 141 20 20",
            "glasses_fpv":"252 109 64 64",
            "hat_helmet_vietnam":"243 98 80 80",
            "hat_motorcycle":"243 98 80 80",
            "hat_tiara":"262 98 40 40",
            "hat_tuque":"243 97 80 80",
            "hair_afro":"243 80 80 80",
            "hair_mohawk":"243 57 80 80",
            "holster_revolver_hip":"213 245 130 130",
            "holster_revolver_thigh":"213 285 130 130",
            "mask_horse":"233 92 100 100",
            "mask_robin":"261 120 40 40",
            "pet_canine":"82 403 150 150",
            "pet_chicken":"45 403 150 150",
            "pet_doge":"341 349 200 200",
            "pet_feline":"381 439 128 128",
            "pet_fox":"42 393 150 150",
            "pet_gerbil":"125 475 64 64",
            "pet_parrot":"275 126 80 80",
            "pet_raven":"50 439 128 128",
            "pet_rat":"300 439 128 128",
            "pet_siamese_cat":"42 393 150 150",
            "pet_vulture":"281 349 180 180",
            "scar_horizontal_neck":"265 139 32 32",
            "scar_horizontal_nose":"264 115 32 32",
            "scar_vertical_heart":"249 164 64 64",
            "scar_vertical_left":"264 110 32 32",
            "scar_vertical_right":"264 110 32 32",
            "scarf_drape":"185 140 190 190",
            "tatoo_archeopteryx_left":"282 173 64 64",
            "tatoo_aum_chest":"248 165 64 64",
            "tatoo_aum_left":"298 157 64 64",
            "tatoo_aum_right":"198 154 64 64",
            "tatoo_chaos_chest":"248 175 48 48",
            "tatoo_chaos_left":"298 170 48 48",
            "tatoo_chaos_right":"210 164 48 48",
            "tatoo_tribal_face":"258 105 50 50",
            "top_tank":"215 165 120 120",
            "underwear_boxers":"224 258 120 120"
        }
        var sectionDict = {
            "age":"261 121 40 40",
            "belt":"175 185 190 190",
            "body_head":"249 107 64 64",
            "bra":"220 160 100 100",
            "bracelet":"316 252 48 48",
            "coat":"125 79 280 280",
            "collar":"255 160 48 48",
            "dress":"160 150 230 230",
            "earpiece":"280 137 25 25",
            "earings":"257 141 20 20",
            "ears":"254 130 20 20",
            "emotion":"261 125 42 42",
            "eyepatch":"261 121 40 40",
            "facialhair":"261 124 40 40",
            "glasses":"263 121 40 40",
            "gloves":"206 308 40 40",
            "hat":"241 82 80 80",
            "hair":"243 92 80 80",
            "headband":"241 102 80 80",
            "holster":"215 150 130 130",
            "horns":"257 99 50 50",
            "iris":"273.75 137.5 4 4",
            "jacket":"170 130 220 220",
            "leggings":"136 305 260 260",
            "makeup":"267.5 123 30 30",
            "mask":"243 105 80 80",
            "nails":"200 327 25 25",
            "necklace":"255 160 48 48",
            "nose":"265 127 32 32",
            "pants":"130 244 290 290",
            "pipe":"255 144 32 32",
            "pupils":"270.25 124.85 40 40",
            "scarf":"185 120 190 190",
            "shirt":"190 140 190 190",
            "shoes":"225 442 120 120",
            "shorts":"215 245 120 120",
            "shoulderpads":"207 100 150 150",
            "socks":"225 442 120 120",
            "suit":"80 130 400 400",
            "tie":"241 140 80 80",
            "top":"225 160 100 100",
            "underwear":"232 258 90 90",
            "veil":"207 97 150 150",
            "vest":"185 135 190 190",
            "wings":"110 -30 350 350"
        }
    }
    if (idDict[id]) {
        return idDict[id];
    } else if (sectionDict[t]) {
        return sectionDict[t];
    } else {
        return "0 0 560 560";
    }
}
