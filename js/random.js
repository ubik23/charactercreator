function random(){
    //for (form in forms) {
    console.log('forms : ', forms);
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
        console.log('key', key);
        console.log('keys', keys);
                var myKey = key;
                var len = forms[formRand][myKey].length;
                var rand = Math.floor((Math.random() * len));
                var layer = forms[formRand][myKey][rand].toLowerCase();
                console.log('Layer: ', layer);
                //modCharacter(key.toLowerCase(), layer);
                showRandom(key.toLowerCase(), layer);
}

function showRandom(section, layer){  // Draw the SVG on screen
    var selectedOption = layer;
    var sections = [];
    sections[0] = section;
    var obj = new Array();
    var id = '#'+sections[0]+'_'+selectedOption;
    console.log('showRandom: id =>', id);
    obj[sections[0]] = selectedOption;
    hash.add(obj);
    if (sections[0] === "pupils") {
        sections[0] += "_" + selectedOption;
        selectedOption = hash.get('emotion');
        if (selectedOption == undefined){
            selectedOption = 'neutral';
        };
    }
    if (sections[0] === 'emotion'){
        modCharacter(sections[0], selectedOption);
        //ga('send', 'event', 'menu', 'select', id);
        sections = [];//Reset the sections layer so it doesn't contain 'emotion', as it isn't a layer in itself.
        var emotions = GetEmotionGetLayers(selectedOption);
        for (emo in emotions){
            var newEmo = emotions[emo] + "_" + layer;
            sections.push(newEmo);
        }
    };
    console.log('Sections : ', sections);
    for (section in sections){

        sectionOptions = getOptions(sections[section]);

        console.log('sectionOptions', sectionOptions);
        var id = '#'+sections[section] + '_' + layer;
        for (option in sectionOptions){
            optionId = '#' + sections[section] + '_' + sectionOptions[option];
            console.log('optionId', optionId);
            hideId(optionId)
        }
        console.log('for section in sections: id =>', id);
        showId(id);
        if (sections[section] === 'brows'||sections[section] === 'eyes'||sections[section] === 'iris'||sections[section] === 'mouth'||sections[section] === 'pupils_human'||sections[section] === 'lashes'){
            modCharacter(sections[section], selectedOption);
        } else {
            var obj = new Array();
            obj[sections[section]] = selectedOption;
            hash.add(obj);
            modCharacter(sections[section], selectedOption);
        }
    };
}

function showId(id){
        ga('send', 'event', 'menu', 'select', id);
        for (lyr in multiLayer){
            if (id.slice(1) == multiLayer[lyr][0]){
                for (var i=1;i<=multiLayer[lyr][1];i++){
                    idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
                    viewport.selectAll(idOf).attr({opacity:1});
                }
            }
            else {
                viewport.selectAll(id).attr({opacity:1});
            }
    };
}

function hideId(id){
        for (lyr in multiLayer){
            if (id.slice(1) == multiLayer[lyr][0]){
                for (var i=1;i<=multiLayer[lyr][1];i++){
                    idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
                    viewport.selectAll(idOf).attr({opacity:0});
                }
            }
            else {
                viewport.selectAll(id).attr({opacity:0});
            }
    };
}

function getOptions(section){
     var sectionOptions = [];
         console.log('window.forms', window.forms);
     for (form in window.forms){
         console.log('form :', window.forms[form]);
         console.log('key :', capitalizeFirstLetter(section));
         if ( capitalizeFirstLetter(section) in window.forms[form] ){
              console.log('key found!! ', window.forms[form][capitalizeFirstLetter(section)]);
              return window.forms[form][capitalizeFirstLetter(section)];
         } else {
             console.log('key not found.');
         }
     }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

