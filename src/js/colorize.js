function shadeColor(color, percent) {
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

function colorizeByClass(elClassName, color) {
    var elementList = document.querySelectorAll(('.' + elClassName));
    var elementListLength = elementList.length;
    var elCounter = elementListLength;
    while (elCounter--) {
        elementList[elementListLength - (elCounter + 1)].style.fill = color;
    }
}

function colorSkin(color) {
    // WIP function to collect all the elements that need to be colored
    // when the color of the skin is changed by the user.
    colorizeByClass('upperlip', shadeColor(color, -10));
    colorizeByClass('lowerlip', shadeColor(color, 10));
}

function colorize(formId, _color){
    var colorMultiplyer = 10; // Color contrast.
    var forms = window.forms;
    var id = formId;
    var affectedList = [];
    var colorLight = shadeColor(_color, colorMultiplyer);
    var colorLighter = shadeColor(_color, (2 * colorMultiplyer));
    var colorLightest = shadeColor(_color, (3 * colorMultiplyer));
    var colorDark = shadeColor(_color, -1 * colorMultiplyer);
    var colorDarker = shadeColor(_color, -1 * (2 * colorMultiplyer));
    var colorDarkest = shadeColor(_color, -1 * (3 * colorMultiplyer));
    var classPrefix = "alpha";
    var classLightest = "--lightest";
    var classLighter = "--lighter";
    var classLight = "--light";
    var classDark = "--dark";
    var classDarker = "--darker";
    var classDarkest = "--darkest";

    for (var f in forms){
        var form = Object.keys(forms[f]);
        for(var x in form){
            // is x = to id?
            // if so, cycle through each element
            if(form[x].toLowerCase() === id){
                // Figure out which form to look in to find this id
                // Cycle through each option
                var capitalId = id.replace(/^[a-z]/, function(m){ return m.toUpperCase() });
                // If the id is body, than the list will be of all 'skin' layers
                if (id === 'body' || id === 'body_head' || id === 'ears' || id === 'nose' || id === 'age' || id === 'eyes' || id.slice(0,4) === 'mouth') {
                    affectedList = skinLayers;
                    var myKey = 'skinColor';
                    //colorSkin(_color);
                    classPrefix = "skin";
                }
                else if (id ==='facialhair' || id === 'hair') {
                    affectedList = window.hairLayers;
                    var myKey = 'hairColor';
                }
                else {
                    affectedList = [];
                    var myKey = id + 'Color'
                    if (myKey === 'irisColor'||myKey === 'browsColor'||myKey === 'lashes') {
                        for (i in forms[0]['Emotion']) {
                            var tmpId =  forms[0]['Emotion'][i];
                            if (tmpId != ''){
                                affectedList.push(id + '_' +tmpId);
                            }
                        }
                    } else {
                        for (i in forms[f][capitalId]) {
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
                affectedList = getAffectedListFromOrig(origList, multiLayer);
                var myValue = _color.toString();
                var obj = new Array();
                obj[myKey] =  myValue;
                hash.add(obj);
                modCharacter(myKey, myValue);
                for (n in affectedList) {
                    fullId = '#' + affectedList[n];
                    var alphaNodes = document.querySelectorAll(fullId+" ."+classPrefix);
                    var alphaLightNodes = document.querySelectorAll(fullId+" ."+classPrefix+classLight);
                    var alphaLighterNodes = document.querySelectorAll(fullId+" ."+classPrefix+classLighter);
                    var alphaLightestNodes = document.querySelectorAll(fullId+" ."+classPrefix+classLightest);
                    var alphaDarkNodes = document.querySelectorAll(fullId+" ."+classPrefix+classDark);
                    var alphaDarkerNodes = document.querySelectorAll(fullId+" ."+classPrefix+classDarker);
                    var alphaDarkestNodes = document.querySelectorAll(fullId+" ."+classPrefix+classDarkest);
                    var alphaNodesCounter = alphaNodes.length;
                    var alphaLightNodesCounter = alphaLightNodes.length;
                    var alphaLighterNodesCounter = alphaLighterNodes.length;
                    var alphaLightestNodesCounter = alphaLightestNodes.length;
                    var alphaDarkNodesCounter = alphaDarkNodes.length;
                    var alphaDarkerNodesCounter = alphaDarkerNodes.length;
                    var alphaDarkestNodesCounter = alphaDarkestNodes.length;
                    while (alphaNodesCounter--){
                        colorPaths(alphaNodes[alphaNodesCounter], _color, colorDarker);
                    }
                    while (alphaLightNodesCounter--){
                        colorPaths(alphaLightNodes[alphaLightNodesCounter], colorLight, colorDark);
                    }
                    while (alphaLighterNodesCounter--){
                        colorPaths(alphaLighterNodes[alphaLighterNodesCounter], colorLighter, _color);
                    }
                    while (alphaLightestNodesCounter--){
                        colorPaths(alphaLightestNodes[alphaLightestNodesCounter], colorLightest, colorLight);
                    }
                    while (alphaDarkNodesCounter--){
                        colorPaths(alphaDarkNodes[alphaDarkNodesCounter], colorDark, colorDarker);
                    }
                    while (alphaDarkerNodesCounter--){
                        colorPaths(alphaDarkerNodes[alphaDarkerNodesCounter], colorDarker, colorDarkest);
                    }
                    while (alphaDarkestNodesCounter--){
                        colorPaths(alphaDarkestNodes[alphaDarkestNodesCounter], colorDarkest, colorDarkest);
                    }
                }
            }
        }
    }
}

function colorPaths(node, _color, colorDarker){
    if (node.style.fill != "none" && node.style.fill != ""){
        node.style.fill = _color;
    }
    if (node.style.stroke != "none" && node.style.stroke != ""){
        node.style.stroke = colorDarker;
    }
}

// TO BE REPLACED BY PREVIOUS FUNCTION.
function processPaths(optPaths, _color) {
    for (p in optPaths) {
        if ( typeof optPaths[p].attr === 'function') {
            var pathId = optPaths[p].attr("id");
            if (pathId ===  undefined) {
                break;
            };                                ;
            if (fullId.slice(0,6) === "#mouth" && pathId != "upperlip" && pathId != 'lowerlip' && pathId != "lowerlip-shadow" && pathId != "upperlip-shadow") {
                continue;
            };
            var pathStyle = viewport.select('#'+ pathId).attr("style");
            if (pathStyle ===  undefined) {
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
                if (k.length > 0 && v.length > 0) {
                    json.style[k] = v;
                }
            }
            // Query the style to determine if shape or shadow
            // Change the color
            var newColor = _color.toString();
            // json to string
            var replacement = replacementStyle(json, newColor);
            viewport.selectAll('#' + pathId).attr({style: replacement});
            newStroke = shadeColor(newColor, -25);
            if (json.style["stroke-width"] === undefined){
                newColor = shadeColor(newColor, -25)
            }
        }
    }
}

function getAffectedListFromOrig(origList, multiLayer) {
    affectedList=[];
    var match;
    for (a in origList) {
        match = false;
        for (lyr in multiLayer){
            if (origList[a] == multiLayer[lyr][0]){
                for (var i=1;i<=multiLayer[lyr][1];i++){
                    idOf = origList[a] + '_' + i + '_of_' + multiLayer[lyr][1];
                    affectedList.push(idOf);
                    match = true;
                }
            };
        };
        if (!match) {
            affectedList.push(origList[a]);
        }
    };
    return affectedList;
}

function replacementStyle(json, newColor) {
    var newStyle = json.style;
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
    return replacement;
}

function applyColor(id, newColor, optLayer){
    var colorMultiplyer = 10; // Color contrast.
    var pathStyle;
    var currentNode;
    var colorContrast;
    fullId = '#' + id;
    ga('send', 'event', 'menu', 'color', fullId+'_#'+newColor );
    if (optLayer != null){
        var optPaths = optLayer.selectAll('path')
        // Change the color of nipples (ellipses) if the optlayer is the body.
        if (id === 'body_athletic_2_of_2') {
            var optEllipses = optLayer.selectAll('ellipse')
            newArray = [];
            newArray.push.apply(newArray, optPaths);
            newArray.push.apply(newArray, optEllipses);
            optPaths = newArray;
        }

        for (p in optPaths) {
            if (typeof optPaths[p].attr === 'function'){
                var colorContrast = "";
                var pathId = optPaths[p].attr("id");
                var pathClassGroup = optPaths[p].attr("class");
                if (pathClassGroup != undefined){
                    var pathClass = pathClassGroup.split(' ');
                    var counter = pathClass.length;
                    while (counter--){
                        currentClass = pathClass[counter];
                        if (currentClass === "alpha--dark"||currentClass === "skin--dark"||currentClass === "hair--dark"){
                            colorContrast = "dark";
                        } else if (currentClass === "alpha--darker"||currentClass === "skin--darker"||currentClass === "hair--darker"){
                            colorContrast = "darker";
                        } else if (currentClass === "alpha--darkest"||currentClass === "skin--darkest"||currentClass === "hair--darkest"){
                            colorContrast = "darkest";
                        } else if (currentClass === "alpha--light"||currentClass === "skin--light"||currentClass === "hair--light"){
                            colorContrast = "light";
                        } else if (currentClass === "alpha--lighter"||currentClass === "skin--lighter"||currentClass === "hair--lighter"){
                            colorContrast = "lighter";
                        } else if (currentClass === "alpha--lightest"||currentClass === "skin--lightest"||currentClass === "hair--lightest"){
                            colorContrast = "lightest";
                        } else if (currentClass === "alpha"||currentClass === "skin"||currentClass === "hair"){
                            colorContrast = "base";
                        } else {
                        }
                    }
                } else {
                    pathClass = pathClassGroup;
                }
                if (pathId === undefined){
                    pathStyle = optPaths[p].node.style.cssText;
                } else {
                    pathStyle = optLayer.select('#'+ pathId).attr("style");
                }
                if (pathStyle == undefined) {
                    continue;
                }
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
                newStyle = json.style;
                var replacement = '';
                for (n in Object.keys(newStyle)){
                    var currentKey = Object.keys(newStyle)[n]
                    if (currentKey === 'fill'){
                        if (newStyle[currentKey] != 'none'){
                            if (colorContrast === 'dark'){
                                var currentValue = shadeColor('#' + newColor,  -1 * colorMultiplyer);
                            } else if (colorContrast === "darker"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (2 * colorMultiplyer));
                            } else if (colorContrast === "darkest"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (3 * colorMultiplyer));
                            } else if (colorContrast === "light"){
                                var currentValue = shadeColor('#' + newColor,  colorMultiplyer);
                            } else if (colorContrast === "lighter"){
                                var currentValue = shadeColor('#' + newColor,  (2 * colorMultiplyer));
                            } else if (colorContrast === "lightest"){
                                var currentValue = shadeColor('#' + newColor,  (3 * colorMultiplyer));
                            } else if (colorContrast === "base"){
                                var currentValue =  '#' + newColor;
                            } else if (colorContrast === ""){
                                var currentValue = newStyle[currentKey];
                            }
                        }
                        else {
                            var currentValue = newStyle[currentKey];
                        }
                    }
                    else if (currentKey === 'stroke'){
                        if (newStyle[currentKey] != 'none'){
                            if (json.style["stroke-width"] != undefined&& colorContrast === "dark"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (3 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&& colorContrast === "darker"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (3 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&& colorContrast === "darkest"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (3 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&& colorContrast === "light"){
                                var currentValue =  '#' + newColor;
                            } else if (json.style["stroke-width"] != undefined&& colorContrast === "lighter"){
                                var currentValue = shadeColor('#' + newColor,  (1 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&& colorContrast === "lightest"){
                                var currentValue = shadeColor('#' + newColor,  (2 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&&colorContrast === "base"){
                                var currentValue = shadeColor('#' + newColor,  -1 * (2 * colorMultiplyer));
                            } else if (json.style["stroke-width"] != undefined&&colorContrast === ""){
                                var currentValue = newStyle[currentKey];
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
                optLayer.selectAll('path')[p].attr({style: replacement});
            }
        }
    }
}
