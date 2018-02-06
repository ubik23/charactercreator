function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function clearCharacter() {
    var svgContainer = document.querySelector('#svg1');
    var maleSilhouette = svgContainer.querySelector('#male_silhouette');
    var femaleSilhouette = svgContainer.querySelector('#female_silhouette');
    svgContainer.innerHTML = maleSilhouette + femaleSilhouette;
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
            //modCharacter(myKey, myValue);
            //hash.add({mykey: myValue});
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
    var characterSVG = document.querySelector('#svg1');
    characterSVG.classList.add('character--hide');
    hideForms();
    console.log('hideForms');
    hash.add({ sex: sex });
    hash.add({ emotion: 'neutral' }); // Female and Male templates have different set of emotions at this time.
    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.personnageActuel) {
         currentUser.cc.personnages[personnageActuel].sex = sex;
    }
    window.sex = sex;
   buildCharacter(resetForms);
}

function buildCharacter(callback) {
    var characterSVG = document.querySelector('#svg1');
    setTimeout(function(){
        clearForms();
        clearCharacter();
        interpretHash();
        setTimeout(function(){
            characterSVG.classList.remove('character--hide');
            console.log('buildCharacter');
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
        lips : 'default', //or rand
        skinColor : this.skinTone, //'#ffd5d5', // Or some random skin color from
        hairColor : '#ffe680', // Or random from list of hair colors',
        irisColor : '#2ad4ff', // Or some random eye color
        underwear : 'plain', // or random, whatever.
        underwearColor : '#f2f2f2', // Or random from a list of fabrics',
    };
    this.choices.emotion = this.choices.emotion || 'neutral';
    this.choices.body = this.choices.body || 'athletic';
    this.choices.lips = this.choices.lips || 'default';
    if (this.skinTone) {
        this.choices.skinColor = this.skinTone;

    } else {
        //console.log('no skinTone found.')
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
    faceElements = ['brows', 'eyes', 'iris', 'pupils', 'mouth', 'lashes'];
    for (e in faceElements) {
        if (faceElements[e] === 'pupils'){
            var pupils = hash.get('pupils');
            if (pupils === undefined){
                pupils = 'human';
            }
             faceElements[e] += '_' + pupils;
        }
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

    hideCompetition(sections[0]);
    hash.add(obj);
    if (currentUser) {
        triggerSaveBtn();
    }
    if (sections[0] === "pupils") {
        sections[0] += "_" + selectedOption;
        selectedOption = hash.get('emotion');
        if (selectedOption == undefined){
            selectedOption = 'neutral';
        };
    }
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
            if(d === selectedOption){
                for (lyr in multiLayer){
                    sectionShow(multiLayer, id);
                };
                if (sections[section] === 'brows'||sections[section] === 'eyes'||sections[section] === 'iris'||sections[section] === 'mouth'||sections[section] === 'pupils_human'||sections[section] === 'lashes'){
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
    if (id.slice(1) == multiLayer[lyr][0]){
        for (var i=1;i<=multiLayer[lyr][1];i++){
            idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
            viewport.selectAll(idOf).attr({opacity:1});
        }
    }
    else {
        viewport.selectAll(id).attr({opacity:1});
    }
}

function sectionHide(multiLayer, id) {
    if (id.slice(1) == multiLayer[lyr][0]){
        for (var i=1;i<=multiLayer[lyr][1];i++){
            idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
            viewport.selectAll(idOf).attr({opacity:0});
        }
    }
    else {
        viewport.selectAll(id).attr({opacity:0})
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
