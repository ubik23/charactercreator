
function parseHash(){
    var face = {
        'Brows': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf'],
        //'Pupils_human': ['neutral', 'anger', 'indignation', 'sterness'],
        'Iris': ['neutral', 'anger', 'indignation', 'sterness'],
        'Eyes': ['neutral', 'anger', 'indignation', 'sterness'],
    };
    var forms = [form1, form2, form3, face];
    //get the pupils from form1 and append the emotions,
    console.log('Forms: ', forms);
    for (var f in forms){
        for(var x in forms[f]){
            var section =  x.toLowerCase();
            if (section ==='brows'||section === 'eyes'||section ==='iris'||section === 'pupils'){
                var hashData = hash.get('emotion');
                console.log('Emotion from hash is: ', hashData);
                if (hashData === undefined){
                    console.log('Hash.Data is undefined!!!');
                    hashData = 'neutral';
                }
            } else {
                var hashData = hash.get(section);
            }
            if (section === "pupils") {
                var hashPupils = hash.get('pupils');
                if (hashPupils == undefined){
                    hashPupils = 'human';
                };
                console.log('Pupils: ', hashPupils);
                section += "_" + hashPupils;
            }
            var id = section + '_' + hashData;
            if (hashData != undefined){
                console.log('hash id: ', id);
                // Add the key/value pair to c.choices here
                modCharacter(section, hashData);
                ga('send', 'event', 'hash', 'select', id);
            }else if(section === 'brows'||section === 'eyes'||section === 'iris'||section === 'pupils_human') {
                //TODO: Get emotion from hash

                modCharacter(section, 'neutral');
            };
            if (id in skinLayers || section ==='body'){ section = 'skin'}
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
