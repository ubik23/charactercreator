function shadeColor(color, percent) {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function shadeColor1(color, percent) {
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function ColorLuminance(hex, lum) {
// validate hex string
hex = String(hex).replace(/[^0-9a-f]/gi, '');
if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
}
lum = lum || 0;
// convert to decimal and change luminosity
var rgb = "#", c, i;
for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
}
return rgb;
}

function colorize(formId, _color){
    var forms = window.forms;
    var id = formId;
    var affectedList = [];
    // get all the options for that id
    // Cycle through each form array
    for (var f in forms){
        // Cycle through each element in the form
         var form = Object.keys(forms[f]);
        for(var x in form){
            // is x = to id?
            // if so, cycle through each element
            if(form[x].toLowerCase() === id){
                // Figure out which form to look in to find this id
                // Cycle through each option
                var capitalId = id.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
                // If the id is body, than the list will be of all 'skin' layers
                if (id === 'body' || id === 'body_head' || id === 'ears' || id === 'nose' || id === 'age' || id.slice(0,4) === 'mouth'){
                    affectedList = skinLayers;
                    var myKey = 'skinColor';
                }
                else if (id ==='facialhair' || id === 'hair'){
                    affectedList = window.hairLayers;
                    var myKey = 'hairColor';
                }
                else {
                    affectedList = [];
                    var myKey = id + 'Color'
                    if (myKey === 'irisColor'||myKey === 'browsColor'||myKey === 'lashes'){
                        for (i in forms[0]['Emotion']){
                            var tmpId =  forms[0]['Emotion'][i];
                            if (tmpId != ''){
                                affectedList.push(id + '_' +tmpId);
                            }
                        }
                    } else {
                        for (i in forms[f][capitalId]){
                            var tmpId = forms[f][capitalId][i];
                            if (tmpId != ''){
                                affectedList.push(id + '_' +tmpId);
                            }
                        }
                    }
                }
                // Look at the affected list
                // If one of those is in the multiLayer array
                // Then take it out and replace it with the layers that need to be there
                origList = affectedList
                affectedList=[];
                for (a in origList) {
                    for (lyr in multiLayer){

                        if (origList[a] == multiLayer[lyr][0]){

                            for (var i=1;i<=multiLayer[lyr][1];i++){
                                idOf = origList[a] + '_' + i + '_of_' + multiLayer[lyr][1];
                                //viewport.selectAll(idOf).attr({opacity:1});
                                // Then append the idOf to affectedList
                                affectedList.push(idOf);
                            }
                            // Take it out of the affectedList
                            //var index = affectedList.indexOf(affectedList[a]);
                            //if (index > -1) {
                                //affectedList.splice(index, 1);
                            //}
                        } else {
                            affectedList.push(origList[a]);

                        };
                    };
                };
                var myValue = _color.toString();
                var obj = new Array();
                obj[myKey] =  myValue;//obj[_selector.slice(1)+'c'] = fillHsl.toString();
                hash.add(obj);
                modCharacter(myKey, myValue);
                for (n in affectedList){
                    fullId = '#' + affectedList[n];
                    // Else, the list is taken from the form.
                    var optLayer = viewport.select(fullId);
                    if (optLayer != null){
                        var optPaths = optLayer.selectAll('path')
                        for (p in optPaths) {
                            if ( typeof optPaths[p].attr === 'function'){
                                var pathId = optPaths[p].attr("id");
                                if (pathId ===  undefined){
                                     break;
                                };                                ;
                                if (fullId.slice(0,6) === "#mouth" && pathId != "upperlip" && pathId != 'lowerlip' && pathId != "lowerlip-shadow" && pathId != "upperlip-shadow"){
                                    continue;
                                };
                                var pathStyle = viewport.select('#'+ pathId).attr("style");
                                if (pathStyle ===  undefined){
                                     break;
                                };                                ;
                                // Parse the style in a json object
                                // Identify if the path is a shape or a shadow
                                // apply newStyle if applicable
                                var styles = pathStyle.split(';'),
                                i= styles.length,
                                json = {style: {}},
                                style, k, v;
                                while (i--){
                                    style = styles[i].split(':');
                                    if (style == " "||style.length === 1) {continue;};
                                    k = style[0].trim();
                                    v = style[1].trim();
                                    if (k.length > 0 && v.length > 0){
                                        json.style[k] = v;
                                    }
                                }
                                // Query the style to determine if shape or shadow
                                // Change the color
                                var newColor = _color.toString();
                                // json to string
                                newStyle = json.style;
                                var replacement = '';
                                for (n in Object.keys(newStyle)){
                                    var currentKey = Object.keys(newStyle)[n]
                                    if (currentKey === 'fill'){
                                        if (newStyle[currentKey] != 'none'){
                                            if (json.style["stroke-width"] === undefined){
                                                var currentValue = ColorLuminance(newColor, -0.12);
                                            }
                                            else {
                                                var currentValue = newColor;
                                            }
                                        }
                                        else {
                                            var currentValue = newStyle[currentKey];
                                        }
                                    }
                                    else if (currentKey === 'stroke'){
                                        if (newStyle[currentKey] != 'none'){
                                            if (json.style["stroke-width"] != undefined){
                                                var currentValue = ColorLuminance(newColor, -0.2);
                                            }
                                        }
                                        else {
                                            var currentValue = newStyle[currentKey];
                                        }
                                    }
                                    else {
                                        var currentValue = newStyle[currentKey];
                                    }
                                    var keyVal = 	currentKey + ': ' + currentValue + '; '
                                    replacement = replacement.concat(keyVal);
                                }
                                viewport.selectAll('#'+pathId).attr({style: replacement});
                                newStroke = shadeColor(newColor, -25);
                                if (json.style["stroke-width"] === undefined){
                                    newColor = shadeColor(newColor, -25)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function applyColor(id, newColor, optLayer){
    fullId = '#' + id;
    ga('send', 'event', 'menu', 'color', fullId+'_#'+newColor );
    if (optLayer != null){
        var optPaths = optLayer.selectAll('path')
        for (p in optPaths) {
            if ( typeof optPaths[p].attr === 'function'){
                var pathId = optPaths[p].attr("id")
                var pathStyle = optLayer.select('#'+ pathId).attr("style");
                if (pathStyle == undefined) {
                    continue;
                }
                // Parse the style in a json object
                // Identify if the path is a shape or a shadow
                // apply newStyle if applicable
                var styles = pathStyle.split(';'),
                i= styles.length,
                json = {style: {}},
                style, k, v;
                while (i--){
                    style = styles[i].split(':');
                    //k = $.trim(style[0]);
                    k = style[0].replace(/\s+/g, '');
                    //v = $.trim(style[1]);
                    if (style[1]){
                        v = style[1].replace(/\s+/g, '');
                    }
                    if (k.length > 0 && v.length > 0){
                        json.style[k] = v;
                    }
                }
                // Query the style to determine if shape or shadow
                // Change the color
                newStyle = json.style;
                var replacement = '';
                for (n in Object.keys(newStyle)){
                    var currentKey = Object.keys(newStyle)[n]
                    if (currentKey === 'fill'){
                        if (newStyle[currentKey] != 'none'){
                            if (json.style["stroke-width"] === undefined){
                                var currentValue = ColorLuminance(newColor, -0.12);
                            }
                            else {
                                var currentValue = '#'+ newColor;
                            }
                        }
                        else {
                            var currentValue = newStyle[currentKey];
                        }
                    }
                    else if (currentKey === 'stroke'){
                        if (newStyle[currentKey] != 'none'){
                            if (json.style["stroke-width"] != undefined){
                                var currentValue = ColorLuminance(newColor, -0.2);
                            }
                        }
                        else {
                            var currentValue = newStyle[currentKey];
                        }
                    }
                    else {
                        var currentValue = newStyle[currentKey];
                    }
                    var keyVal = 	currentKey + ': ' + currentValue + '; '
                    replacement = replacement.concat(keyVal);
                }
                optLayer.selectAll('#'+pathId).attr({style: replacement});
                newStroke = shadeColor(newColor, -25);
                if (json.style["stroke-width"] === undefined){
                    //newColor = shadeColor(newColor, -25)
                }
            }
        }
    }
}
