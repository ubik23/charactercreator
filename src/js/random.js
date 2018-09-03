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
    // if (sections[0] === "pupils") {
    //     sections[0] += "_" + selectedOption;
    //     selectedOption = hash.get('emotion');
    //     if (selectedOption == undefined){
    //         selectedOption = 'neutral';
    //     };
    // }
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
        // loadFilesFromList(layersList, callback, callbackLoopFlag)
        //
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
