function random(){
    var forms = window.forms;
    var formLen = forms.length;
    var formRand = Math.floor((Math.random() * formLen));
    var count = 0;
    var randForm = forms[formRand];
    for (k in randForm) if (randForm.hasOwnProperty(k)) count++;
    var keys = [];
    for (var key in forms[formRand]) {
        if (forms[formRand].hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    var lenKey = keys.length;
    var randKey = Math.floor((Math.random() * lenKey));
    var key = keys[randKey];
    var myKey = key;
    var len = forms[formRand][myKey].length;
    var rand = Math.floor((Math.random() * len));
    var layer = forms[formRand][myKey][rand].toLowerCase();
    console.log('key.toLowerCase()', key.toLowerCase());
    console.log('layer', layer);
    showRandom(key.toLowerCase(), layer);
}

function showRandom(section, layer){  // Draw the SVG on screen
    hideCompetition(section);
    var selectedOption = layer;
    var sections = [];
    sections[0] = section;
    var obj = new Array();
    var id = '#'+sections[0]+'_'+selectedOption;
    obj[sections[0]] = selectedOption;
    hash.add(obj);

    if (sections[0] === 'emotion'){
        modCharacter(sections[0], selectedOption);
        sections = [];//Reset the sections layer so it doesn't contain 'emotion', as it isn't a layer in itself.
        var emotions = GetEmotionGetLayers(selectedOption);
        for (emo in emotions){
            var newEmo = emotions[emo] + "_" + layer;
            sections.push(newEmo);
        }
    };

    for (section in sections){
        sectionOptions = getOptions(sections[section]);
        var id = '#'+sections[section] + '_' + layer;
        for (option in sectionOptions){
            optionId = '#' + sections[section] + '_' + sectionOptions[option];
            hideId(optionId)
        }

        if (id.slice(-1) != '_') {
          showId(id);
        }
        if (sections[section] === 'brows'||sections[section] === 'eyes'||sections[section] === 'mouth'||sections[section] === 'lashes'||sections[section] === 'sockets'){
            modCharacter(sections[section], selectedOption);
        } else {
            var obj = new Array();
            obj[sections[section]] = selectedOption;
            hash.add(obj);
            modCharacter(sections[section], selectedOption);
        }
    };
}

function hideCompetition (section) {
    var headPiece = ["hair", "mask", "veil"];
    var topPiece = ["shorts", "pants"];
    var overPiece = ["jacket", "coat"];

    if (headPiece.indexOf(section) != -1 ){
        hideArray(headPiece);
    } else if (topPiece.indexOf(section) != -1) {
        hideArray(topPiece);
    } else if (overPiece.indexOf(section) != -1) {
        hideArray(overPiece);
    };
}

function hideArray(competition) {
  console.log('competition', competition);
    for (section in competition) {
        sectionOptions = getOptions(competition[section]);
        for (option in sectionOptions) {
          if (sectionOptions[option] != '') {
            optionId = '#' + competition[section] + '_' + sectionOptions[option];
            hideId(optionId)
            var obj = new Array();
            obj[competition[section]] = "";
            hash.add(obj);
            modCharacter(competition[section], "");
          }
        }
    }
}

function showId(id) {
  console.log('showId', id);
  var showList = [];
  var inMuliLayer = false;
  var svgContainer = document.querySelector('#svg1');
  ga('send', 'event', 'menu', 'select', id);

  for (lyr in multiLayer) {
      if (id.slice(1) == multiLayer[lyr][0]){
          inMuliLayer = true;
          for (var i=1;i<=multiLayer[lyr][1];i++) {
              idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
              showList.push(idOf.slice(1));
          }
      }
  };

  if (inMuliLayer === false) {
    showList.push(id.slice(1));
  }
  loadFilesFromList(showList);
}

function hideId(id) {
  var svgContainer = document.querySelector('#svg1');
  var layerToHide;

  for (lyr in multiLayer) {
      if (id.slice(1) == multiLayer[lyr][0]) {
          for (var i=1;i<=multiLayer[lyr][1];i++) {
              idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
              layerToHide = svgContainer.querySelector(idOf);
              if (layerToHide != null) {
                svgContainer.removeChild(layerToHide);
              }
          }
      }
      else {
          layerToHide = svgContainer.querySelector(id);
          if (layerToHide != null) {
            svgContainer.removeChild(layerToHide);
          }
      }
  };
}

function getOptions(section) {
   var sectionOptions = [];
   for (form in window.forms) {
       if ( capitalizeFirstLetter(section) in window.forms[form] ) {
            return window.forms[form][capitalizeFirstLetter(section)];
       } else {
       }
   }
}

function smartRandomStream() {
  // TODO
  // Count the amount of options in each category of all forms.
  // Give each for that percentage of chance to its parent form.
  // Do the same for each category in that form.
  // Allow sex change option to have its share of chance to be picked.
  // Do the same for changing the skin color.
  // Cycle on a setInterval so not to overheat laptop.
}

function smartRandomSingle() {
  var roll;
  var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
  var obj = new Array();
  var forms = window.forms;
  var counter = formLen = forms.length;
  var categories;
  var newColor;
  var keys;
  var keyLen;
  var keyCounter;
  var items;
  var itemsLen;
  var newItem;
  var formCount;
  var obj = new Array();
  var roll;
  var catKey;

  hash.clear();
  // First, clear the board and start from the silhouettes
  resetCharacter();
  // Choose the sex at random (50/50)
  var roll = Math.floor((Math.random() * 100));
  if (roll <= 50) {
    selectFemale();
  } else {
    selectMale();
  }
  // Then choose the skin color at random (1/24)
  roll = Math.floor((Math.random() * 24));
  newColor = obj['skinColor'] =  skinTones[roll-1].toLowerCase();
  hash.add(obj);
  console.log('newColor', newColor);
  defaultEyeColor(newColor);
  defaultHairColor(newColor);
  defaultPupilShape();

  launch();
  setTimeout(function(){
      while (counter--) {
        formCount = formLen-1-counter
        // console.log('formCount', formCount);
        categories = forms[formCount];
        keys = Object.keys(categories);
        keyCounter = keyLen = keys.length;
        // console.log('cat', categories);
        // console.log('keys', keys);
        // console.log('keys ammount', keyLen);
        if (formCount === 0) {
          while (keyCounter--) {
            items = categories[keys[keyLen-1-keyCounter]];
            itemsLen = items.length;
            var roll = Math.floor((Math.random() * itemsLen));
            showRandom(keys[keyLen-1-keyCounter].toLowerCase(), items[roll].toLowerCase());
            obj[keys[keyLen-1-keyCounter].toLowerCase()] = items[roll].toLowerCase();
            hash.add(obj);
          }
        }
        if (formCount > 0) {
          while (keyCounter--) {
            items = categories[keys[keyLen-1-keyCounter]];
            itemsLen = items.length;
            catKey = keys[keyLen-1-keyCounter].toLowerCase();

            if (catKey != 'pants' && catKey != 'underwear' && catKey != 'body' && catKey != 'cloak' && catKey != 'shoes') {
              roll = Math.floor((Math.random() * 100));
              if (roll <= 50) {
                newItem = 'none';
              } else {
                roll = Math.floor((Math.random() * (itemsLen -1))) +1;
                newItem = items[roll].toLowerCase();
              }
            } else if (catKey === 'body') {
              roll = Math.floor((Math.random() * itemsLen));
              newItem = items[roll].toLowerCase();
            } else if (catKey === 'cloak') {
              newItem = 'none';
            } else {
              roll = Math.floor((Math.random() * (itemsLen -1))) +1;
              newItem = items[roll].toLowerCase();
            }
            showRandom(catKey, newItem);
            obj[catKey] = newItem;
            hash.add(obj);
          }
        }
      }
    }, 300);



  // Cycle through each category in the first form
  // For Mouth pass on male, change color on female (50% chance to keep the skin color)

  // In the second form, give the 'none' option a 50% chance so not to ovepopulate with items.
  // in the third, give 50% to 'none' for Tie, Vest, Holster, Shoulderpads and Scarf
  // In the Fourth, give 50% to 'none' for all
  // In the fifth, choose pants (don't accept 'none' as an option)
  // In the sixth, socks are optional but shoes are not
}
