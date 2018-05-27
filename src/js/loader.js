
Snap.plugin( function( Snap, Element, Paper, global ) {
    function addLoadedFrags( whichSVG, fragList, runWhenFinishedFunc ) { // This is called once all the loaded frags are complete
        for( var count = 0; count < fragList.length; count++ ) {
        myEl = whichSVG.append( fragList[ count ] );
        }
        runWhenFinishedFunc();
    }
    Paper.prototype.loadFilesDisplayOrdered = function( list, afterAllLoadedFunc, onEachElementLoadFunc ) {
        var image, fragLoadedCount = 0, listLength = list.length, fragList = new Array(), whichSVG = this;
        for( var count = 0; count < listLength; count++ ) {
            (function() {
                var whichEl = count,
                fileName = list[ whichEl ]+'.svg',
                image = Snap.load( fileName, function ( loadedFragment ) {
                    fragLoadedCount++;
                    onEachElementLoadFunc( loadedFragment, fileName );
                    fragList[ whichEl ] = loadedFragment;
                    if( fragLoadedCount >= listLength ) {
                        addLoadedFrags( whichSVG, fragList, afterAllLoadedFunc );
                    }
                });
            })();
        }
    };
});

// it uses fragments, so they aren't loaded yet into the DOM fully
function onAllLoaded() {
  var zoomContainer = document.querySelector('.zoom-container');
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var sideBarRight = document.querySelector(".sidebar-right");
    var sideBarLeft = document.querySelector(".sidebar-left");
    var downloadBtn = document.querySelector("#downloadButton");
    var characterSex;
    var hashSex = hash.get('sex');
    if (hashSex) {
         characterSex = hashSex;
    } else {
        characterSex = window.sex;
    }

    downloadBtn.addEventListener("click", download, false);
    downloadBtn.classList.add('enabled');
    femaleSilhouette.style.opacity = "0";
    maleSilhouette.style.opacity = "0";
    createForm(characterSex, forms);
    sideBarLeft.classList.add('visible');
    revealCharacter();
    zoomContainer.classList.add('zoom-container--show');
}

function processSection(section, item) {
  if (section ==='body' || section === 'ears'||section==='nose'||section==='eyes'||section==='age'||section==='mouth'||section==='wings' && item === 'devil'){
      section = 'skin';
  }
  if (section ==='facialhair' || section==='brows') {
      section = 'hair';
  }
  return section;
}

function onEachLoaded(frag, fileName) {
    var colorThis = false;
    var myLayer = fileName;
    var newColor;
    var seen;
    if (toBeShown.indexOf(myLayer.split("/")[2].split(".")[0]) > -1){
        seen = 1;
    } else {seen = 0;};
    //Get the section, then the color
    var section = myLayer.split("/")[2].split('_')[0];
    var item = myLayer.split("/")[2].split('_')[1].split('.')[0];
    section = processSection(section, item);
    // Make a list of all the color keys in c.choices
    if (c.choices[section+'Color'] != undefined) {
        newColor = c.choices[section+'Color'];
        // We now have a new color
        colorThis = true;
    };
    // Get a list
    //Check to see if the Color suffix is available for each toBeShown
    // Before we show (or hide) a layer, check to see if it's in the list of layers to be colored
    if (colorThis === true){
        applyColor(myLayer.split("/")[2].split(".")[0], newColor.slice(1), frag.select("*"));
    }
    frag.select("*").attr({ opacity: seen });
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function choicesToList(c) {
  var layersList = [];
  var sex = c.sex;
  var counter = Object.keys(c.choices).length;
  var keyChoice;
  var valueChoice;
  var layerChoice;
  while (counter--) {
    keyChoice = Object.keys(c.choices)[counter];
    if (keyChoice.slice(-5) != 'Color') {
      valueChoice = c.choices[keyChoice];
      layerChoice = keyChoice + '_' + valueChoice;
    }
  }
  return layersList;
}

function choicesToLayers(c, multiLayer){
    var selectedLayers = [];
    var emotionLayers = fromEmotionGetLayers(c.choices.emotion);
    var choiceLayers = [];
    var layersLength = emotionLayers.length;
    var layersNum = emotionLayers.length;
    while (layersNum--) {
        selectedLayers.push(emotionLayers[(layersLength - layersNum - 1)]);
    }
    //for each key in c.choices, get the value and build a layerName
    for(var index in c.choices) {
      choiceLayers.push( index + "_" + c.choices[index]);
    }
    for (var cl in choiceLayers) {
        for (lyr in multiLayer){
            if (choiceLayers[cl] == multiLayer[lyr][0]){
                for (var i=1;i<=multiLayer[lyr][1];i++){
                    idOf = choiceLayers[cl] + '_' + i + '_of_' + multiLayer[lyr][1];
                    selectedLayers.push(idOf);
                }
            }
            else {
                if (isInArray(choiceLayers[cl], selectedLayers)===false){
                selectedLayers.push(choiceLayers[cl]);
                }
            }
        };
    };
    //Add layers to be shown when creating a new character.
    if (c.sex === 'f'){
        selectedLayers.push('body_hand', 'bra_bow', 'nails_short');
    };
    return selectedLayers;
};

function fromEmotionGetLayers(emotion) {
    var facialEpressionLayers = [];
    var modElement = '';
    var faceElements = ['brows', 'eyes', 'mouth', 'lashes'];
    var faceElLength = faceElements.length;
    var faceElNum = faceElLength;
    var faceCount;
    while (faceElNum--) {
        faceCount = (faceElLength - faceElNum - 1);
        if (faceElements[faceCount] === 'pupils') {
            var pupils = hash.get('pupils');
            if (pupils === undefined) {
                pupils = 'human';
            }
            //todo add cat's eyes option.
            //faceElements[faceCount] += '_' + pupils;
        }
        modElement = faceElements[faceCount] + '_' + emotion;
        facialEpressionLayers.push(modElement);
    }
    // facialEpressionLayers.push('eyeballs_default');
    return facialEpressionLayers;
};
