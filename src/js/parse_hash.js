function parseHash(c, forms, skinLayers, hairLayers){
    newParseHash();
    var formsLength = forms.length;
    var formsCounter = formsLength;
    while (formsCounter--) {
        var f = formsLength - formsCounter - 1;
        for(var x in forms[f]) {
            var section =  x.toLowerCase();
            if (section ==='brows'||section === 'eyes'||section === 'mouth'||section === 'lashes'||section === 'sockets'){
                var hashData = hash.get('emotion');
                if (hashData === undefined) {
                    hashData = 'neutral';
                }
            } else {
                var hashData = hash.get(section);
            }
            var id = section + '_' + hashData;
            if (hashData != undefined){
                modCharacter(section, hashData);
                // ga('send', 'event', 'hash', 'select', id);
            } else if (section === 'brows'||section === 'eyes'||section === 'mouth'||section === 'lashes'||section === 'sockets') {
                modCharacter(section, 'neutral');
            };
            if (id in skinLayers || section ==='body') {
                section = 'skin';
            }
            else if (id in hairLayers || section ==='hair'){ section = 'hair'};
            var hashColor = hash.get(section+'Color');
            if (hashColor != undefined && hashColor != '') {
                modCharacter(section+'Color', hashColor);
                // ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
            };
        };
    };
};

function newParseHash() {
  var hashDict = hash.get();
  var keys = Object.keys(hashDict);
  var key;
  for (key in hashDict) {
    if (hashDict[key] === '') {hash.remove(key);}
  }
  if (hashDict['irisColor'] != '') {
      modCharacter('irisColor', hashDict['irisColor']);
  }
}
