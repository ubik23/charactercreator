function parseHash(){
    var forms = window.forms;
    var skinlayers = window.skinlayers;
    var hairLayers = window.hairLayers;
    var face = {
        'Brows': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf'],
        'Lashes': ['neutral', 'anger', 'indignation', 'sterness', 'rage', 'disdain', 'aversion', 'disgust', 'revulsion', 'concern', 'anxiety', 'fear', 'satisfaction', 'amusement', 'joy', 'laughing', 'dejection', 'amasement', 'betrayal', 'caged', 'desperation', 'eeww', 'horror', 'melancholy', 'omg', 'outrage'],
        'Iris': ['neutral', 'anger', 'indignation', 'sterness', 'rage', 'disdain', 'aversion', 'disgust', 'revulsion', 'concern', 'anxiety', 'fear', 'satisfaction', 'amusement', 'joy', 'laughing', 'dejection', 'amasement', 'betrayal', 'caged', 'desperation', 'eeww', 'horror', 'melancholy', 'omg', 'outrage'],
        'Eyes': ['neutral', 'anger', 'indignation', 'sterness', 'rage', 'disdain', 'aversion', 'disgust', 'revulsion', 'concern', 'anxiety', 'fear', 'satisfaction', 'amusement', 'joy', 'laughing', 'dejection', 'amasement', 'betrayal', 'caged', 'desperation', 'eeww', 'horror', 'melancholy', 'omg', 'outrage'],
        'Mouth': ['neutral', 'anger', 'alertness', 'anxiety', 'betrayal', 'caged', 'desperation', 'eeww', 'horror', 'melancholy', 'omg', 'outrage', 'sterness']
    };
    for (var f in forms){
        for(var x in forms[f]){
            var section =  x.toLowerCase();
            if (section ==='brows'||section === 'eyes'||section ==='iris'||section === 'pupils'||section === 'mouth'||section === 'lashes'){
                if (section === "pupils") {
                    var hashPupils = hash.get('pupils');
                    if (hashPupils == undefined){
                        hashPupils = 'human';
                    };
                    section += "_" + hashPupils;
                }
                var hashData = hash.get('emotion');
                if (hashData === undefined){
                    hashData = 'neutral';
                }
            } else {
                var hashData = hash.get(section);
            }
            var id = section + '_' + hashData;
            if (hashData != undefined){
                // Add the key/value pair to c.choices here
                modCharacter(section, hashData);
                ga('send', 'event', 'hash', 'select', id);
            }else if(section === 'brows'||section === 'eyes'||section === 'iris'||section === 'pupils_human' ||section === 'mouth') {
                modCharacter(section, 'neutral');
            };
            if (id in skinLayers || section ==='body'){
                section = 'skin';
            }
            else if (id in hairLayers || section ==='hair'){ section = 'hair'};
            var hashColor = hash.get(section+'Color');
            // Now to get the color
            if (hashColor != undefined && hashColor != ''){
                modCharacter(section+'Color', hashColor);
                ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
            };
        };
    };
};
