function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function clearCharacter() {
    var svgContainer = document.querySelector('#svg1');
    var toBeRemovedList = document.querySelectorAll('#svg1 > g');
    var counter = toBeRemovedList.length;
    while (counter--) {
      if (toBeRemovedList[counter].id != 'male_silhouette' && toBeRemovedList[counter].id != 'female_silhouette') {
        svgContainer.removeChild(toBeRemovedList[counter]);
      }
    }
}

function personnageActuelToHash(currentUser) {
    var personnageActuel = currentUser.cc.personnageActuel;
    var personnageActuelData;
    var itemsList;
    var itemsCounter;
    var currentCount;
    var myKey;
    var myValue;
    var hashArgs = {};

    if (personnageActuel && personnageActuel !== '') {
        personnageActuelData = currentUser.cc.personnages[personnageActuel];
        itemsList = Object.keys(personnageActuelData);
        itemsListLength = itemsList.length;
        itemsListCounter = itemsListLength;
        while (itemsListCounter--) {
            currentCount = itemsListLength - itemsListCounter - 1;
            myKey = itemsList[currentCount];
            myValue = personnageActuelData[itemsList[currentCount]];
            hashArgs[myKey] = myValue;
            hash.add(hashArgs);
        }
        clearCharacter();
        interpretHash();
    } else {
        return;
    }
}

function trans(sex){
    if (c.sex === sex) {return}
    var characterSVG = document.querySelector('#svg1');
    characterSVG.classList.add('character--hide');
    hash.add({ sex: sex });
    hash.add({ emotion: 'neutral' }); // Female and Male templates have different set of emotions at this time.
    // ^ Should really check to see if the emotion doesn't exist before forcing a change to neutral.
    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.personnageActuel) {
         currentUser.cc.personnages[personnageActuel].sex = sex;
    }
    window.sex = sex;
    buildCharacter(resetForms);
}

function buildCharacter(callback) {
    var characterSVG = document.querySelector('#svg1');
    setTimeout(function(){
        zoomFull();
        clearForms();
        clearCharacter();
        interpretHash();
        setTimeout(function(){
            characterSVG.classList.remove('character--hide');
            callback();
        },500);
    },500);
}

function hideForms() {
    hideSidebarLeft();
    hideSidebarRight();
}

function clearForms() {
    clearSidebarLeft();
    clearSidebarRight();
}

function resetForms() {
    hideForms();
    //TODO The following function should be a callback or a response to a promise.
    createForm();
    showSidebarLeft();
}

function Character(choices){
    this.choices = choices || {
        emotion : 'neutral',
        body : 'athletic', // Or a random body shape eventually
        eyeballs : 'default', //or rand
        skinColor : this.skinTone, //'#ffd5d5', // Or some random skin color from
        hairColor : '#ffe680', // Or random from list of hair colors',
        irisColor : '#2ad4ff', // Or some random eye color
        underwear : 'plain', // or random, whatever.
        underwearColor : '#f2f2f2', // Or random from a list of fabrics',
    };
    this.choices.emotion = this.choices.emotion || 'neutral';
    this.choices.body = this.choices.body || 'athletic';
    //this.choices.lips = this.choices.lips || 'default';
    if (this.skinTone) {
        this.choices.skinColor = this.skinTone;
    }
    this.choices.hairColor = this.choices.hairColor || '#ffe680';
    this.choices.irisColor = this.choices.irisColor || '#2ad4ff';
    this.choices.underwear = this.choices.underwear || 'plain';
    this.choices.underwearColor = this.choices.underwearColor || '#f2f2f2';

    choices = this.choices;
    if (!choices.body_head) {
        choices.body_head = 'default';
    }
    if (!choices.ears) {
        choices.ears = 'default';
    }
    if (!choices.nose) {
        choices.nose = 'default';
    }
};

function modCharacter(myKey, myValue){
    // look in c.choices to see if the key is already there
    if (myKey in c.choices){
        delete c.choices[myKey];
    };
    // If there, modify the value
    //if not, add it in, with the value
    //if the value is '', then delete the key from the object,
    if (myValue != ''){
        c.choices[myKey] = myValue;
    };
    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
        currentUser.cc.personnages[currentUser.cc.personnageActuel][myKey] = myValue;
    }
};

function createCharacter(){
    document.getElementById(sex+"Button").checked=true;
    //Draw the essential stuff
    //Draw stuff from the hash
    var forms = [form1, form2, form3];
    for (var lot in forms){
        for(var x in forms[lot]){
            var sectionTitle = x;
            var t = sectionTitle.toLowerCase();
            var xsel = hash.get(t);
            if (xsel !== undefined) {
                var id = '#' + t +'_'+xsel
                for (lyr in multiLayer){
                    if (id.slice(1) == multiLayer[lyr][0]){
                        for (var i=1;i<=multiLayer[lyr][1];i++){
                            idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
                            viewport.selectAll(idOf).attr({
                                opacity:1
                            });
                        }
                    }
                    else {
                        viewport.selectAll(id).attr({
                            opacity:1
                        });
                    }
                };
            }
        }
    };
};

function GetEmotionGetLayers(option) {
    var facialExpressionLayers = [];
    var modElement = '';
    faceElements = ['brows', 'eyes', 'mouth', 'lashes', 'sockets'];
    for (e in faceElements) {
        // if (faceElements[e] === 'pupils'){
        //     var pupils = hash.get('pupils');
        //     if (pupils === undefined){
        //         pupils = 'human';
        //     }
        //      faceElements[e] += '_' + pupils;
        // }
        var eLayer = faceElements[e]//+'_'+option;
        facialExpressionLayers.push(eLayer);
    };
    return facialExpressionLayers;
};

function getOptions (section) {
    var forms = window.forms;
    var section = capitalizeFirstLetter(section);
    for (i in forms){
        options = forms[i][section];
        if (options != undefined){
        return options
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function show(userChoice, category) {
    if (typeof(category) === "string") {
        var sections = [category];
    } else {
        var sections = [category.split(" ")[1]];
    };
    var selectedOption = userChoice;
    var options = getOptions(sections[0])
    var obj = new Array();
    var id = '#'+sections[0]+'_'+selectedOption;
    //hideCompetition(sections[0]);
    obj[category] = userChoice;
    if (userChoice === '') {
      hash.remove(category);
    } else {
      hash.add(obj);
    }
    if (currentUser) {
        triggerSaveBtn();
    }
    // if (sections[0] === "pupils") {
    //     sections[0] += "_" + selectedOption;
    //     selectedOption = hash.get('emotion');
    //     if (selectedOption == undefined){
    //         selectedOption = 'neutral';
    //     };
    // }
    if (sections[0] === 'emotion'){
        modCharacter(sections[0], selectedOption);
        ga('send', 'event', 'menu', 'select', id);
        sections = [];//Reset the sections layer so it doesn't contain 'emotion', as it isn't a layer in itself.
        var emotions = GetEmotionGetLayers(selectedOption);
        for (emo in emotions){
            var newEmo = emotions[emo];
            sections.push(newEmo);
        }
    };
    displaySections(sections, options, selectedOption, multiLayer);
}

function displaySections(sections, options, selectedOption, multiLayer) {
    for (section in sections){
        options.forEach(function(d, i){
            var id = '#'+sections[section]+'_'+d;
            if(selectedOption != '' && d === selectedOption){
                sectionShow(multiLayer, id);

                if (sections[section] === 'brows'||sections[section] === 'eyes'||sections[section] === 'mouth'||sections[section] === 'lashes'||sections[section] === 'sockets'){
                    modCharacter(sections[section], selectedOption);
                } else {
                    var obj = new Array();
                    obj[sections[section]] = selectedOption;
                    hash.add(obj);
                    modCharacter(sections[section], selectedOption);
                    ga('send', 'event', 'menu', 'select', id);
                }
            }
            else {
                for (lyr in multiLayer){
                    sectionHide(multiLayer, id);
                };
            };
        });
    };
}

function sectionShow(multiLayer, id) {
  var svgContainer = document.querySelector('#svg1');
  var isMultiLayered = false;
  for (lyr in multiLayer){
    if (id.slice(1) === multiLayer[lyr][0]){
      isMultiLayered = true;
      break;
    }
  }
  if (id.slice(1) === multiLayer[lyr][0]){
      for (var i=1;i<=multiLayer[lyr][1];i++){
          idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
          svgContainer.querySelector(idOf).style.opacity = 1;
      }
  }
  else {
      svgContainer.querySelector(id).style.opacity = 1;
  }
  if (id.slice(1).split('_')[0] === 'eyes') {
    changeClipPathOnEyes(id);
  }
}

function changeClipPathOnEyes(id) {
  var emotion = id.slice(1).split('_')[1];
  var svgContainer = document.querySelector('#svg1');
  var eyeRight = svgContainer.querySelector('#eye_right');
  var eyeLeft = svgContainer.querySelector('#eye_left');
  eyeRight.setAttribute('clip-path', 'url(' + id + '--right)');
  eyeLeft.setAttribute('clip-path', 'url(' + id + '--left)');
}

function sectionHide(multiLayer, id) {
  var svgContainer = document.querySelector('#svg1');
  var sectionToHide;
    if (id.slice(1) == multiLayer[lyr][0]) {
        for (var i=1;i<=multiLayer[lyr][1];i++) {
            idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
            sectionToHide = svgContainer.querySelector(idOf);
            if (sectionToHide != null) {
              sectionToHide.style.opacity = 0;
            }
        }
    }
    else {
        // viewport.selectAll(id).attr({opacity:0})
        sectionToHide = svgContainer.querySelector(id);
        if (sectionToHide != null) {
          sectionToHide.style.opacity = 0;
        }
    };
}

function resetCharacterTemplate() {
    var characterSVG = document.querySelector('#svg1');
    var elements = characterSVG.querySelectorAll('*');
    var elementsLength = elements.length;
    var elementsCounter = elementsLength;
    while (elementsCounter--) {
        if (elements[elementsCounter].style.opacity !== 0) {
            elements[elementsCounter].style.opactiy = "0";
        }
    }
}
