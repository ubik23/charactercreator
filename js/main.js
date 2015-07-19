
/*
TODO:
-save states (look-up form values, save as json, persist, populate dropdown)
-Emotions
-Head Turns
*/
// The forms, menus and options that make up a character
//Todo Zoom in on the head tab viewBox="208 75 140 140"
$(document).ready(function() {
    createForm(sex);
    createCharacter();
});

function birth(){
    var sexes = ["m", "f"];
    var sex = hash.get('sex') || sexes[Math.floor(Math.random() * 2)]; // Has the sex of the character been defined by the uri? If not, default to ... random, eventually!
    var layers = [];
    hash.add({ sex: sex });
    return sex
}

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
};

function createCharacter(){
    document.getElementById( sex+"Button").checked=true;
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
                            viewport.selectAll(idOf).attr({opacity:1});
                        }
                    }
                    else {
                        viewport.selectAll(id).attr({opacity:1});
                    }
                };
            }
        }
    };
};

function show(context){  // Draw the SVG on screen
    var selectedOption = context.value;
    var options = Array.prototype.slice.call(context.options).map(function(d, i){ return d.value; });
    var sections = [context.className];
    if (sections[0] === 'emotion'){
        console.log('EMOTION!!!!');
        console.log('Emo layers: ', fromEmotionGetLayers(context.value));
        sections = [];
        var emotions = fromEmotionGetLayers(context.value);
        for (emo in emotions){
            console.log('emo: ', emotions[emo]);
            console.log('emo section: ', emotions[emo].split('_')[0]);
            sections.push(emotions[emo].split('_')[0]);
        }
    };
    console.log('Sections: ',sections);
    console.log('Context.value ', context.value);
    console.log('Options: ', options);
    console.log('Selected option: ', selectedOption);
    for (section in sections){
        options.forEach(function(d, i){
            var id = '#'+sections[section]+'_'+d;
            console.log('d: ', d);
            //console.log(selectedOptions);
            if(d === selectedOption){
                console.log('d is selectedOption');
                for (lyr in multiLayer){
                    if (id.slice(1) == multiLayer[lyr][0]){
                        for (var i=1;i<=multiLayer[lyr][1];i++){
                            idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
                            viewport.selectAll(idOf).attr({opacity:1});
                            viewportFace.selectAll(idOf).attr({opacity:1});
                            viewportTorso.selectAll(idOf).attr({opacity:1});
                            viewportBody.selectAll(idOf).attr({opacity:1});
                            viewportFull.selectAll(idOf).attr({opacity:1});
                        }
                    }
                    else {
                        console.log('showing: ',id);
                        viewport.selectAll(id).attr({opacity:1});
                        viewportFace.selectAll(id).attr({opacity:1});
                        viewportTorso.selectAll(id).attr({opacity:1});
                        viewportBody.selectAll(id).attr({opacity:1});
                        viewportFull.selectAll(id).attr({opacity:1});
                    }
            };
            var obj = new Array();
            obj[sections[section]] = selectedOption;
            hash.add(obj);
            modCharacter(sections[section], selectedOption);
            ga('send', 'event', 'menu', 'select', id);
            }
            else {
                console.log('else...');
            for (lyr in multiLayer){
                if (id.slice(1) == multiLayer[lyr][0]){
                    for (var i=1;i<=multiLayer[lyr][1];i++){
                        idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
                        viewport.selectAll(idOf).attr({opacity:0});
                        viewportFace.selectAll(idOf).attr({opacity:0});
                        viewportTorso.selectAll(idOf).attr({opacity:0});
                        viewportBody.selectAll(idOf).attr({opacity:0});
                        viewportFull.selectAll(idOf).attr({opacity:0});
                    }
                }
                else {
                    viewport.selectAll(id).attr({opacity:0})
                    viewportFace.selectAll(id).attr({opacity:0})
                    viewportTorso.selectAll(id).attr({opacity:0})
                    viewportBody.selectAll(id).attr({opacity:0})
                    viewportFull.selectAll(id).attr({opacity:0})
                }
            };
            ;
            }
        });
    };
}

function trans(sex){
    hash.add({ sex: sex });
    location.reload();
}


function Character(fullName, sex, emotion, choices, birthday){
    this.fullName = fullName || '';
    this.sex = sex || birth();;
    this.emotion = emotion || 'neutral';

    this.skinTone = hash.get('skinColor') || skinTones[Math.floor(Math.random() * skinTones.length)];
    hash.add({ skinColor: this.skinTone });
    this.choices = choices || {
        body : 'athletic', // Or a random body shape eventually
        body_head : 'default', //Or random from list
        ears : 'default', // or rand
        nose : 'default', // Or random
        lips : 'default', //or rand
        skinColor : this.skinTone, //'#ffd5d5', // Or some random skin color from
        hairColor : '#ffe680', // Or random from list of hair colors',
        irisColor : '#2ad4ff', // Or some random eye color
        underwear : 'plain', // or random, whatever.
        underwearColor : '#f2f2f2', // Or random from a list of fabrics',
    };
    this.birthday = birthday || new Date();// todo: today's date by default, with dropdown menu to change it manually || ;
};

