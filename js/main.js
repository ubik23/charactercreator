
/*
TODO:
-save states (look-up form values, save as json, persist, populate dropdown)
*/
// The forms, menus and options that make up a character
//Todo Zoom in on the head tab viewBox="208 75 140 140"
$(document).ready(function() {
    createForm(sex);
    createCharacter();
});

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

function createForm(sex){
    var forms = [form1, form2, form3, form4];
    for (var f in forms){
        var formContainer = $('#content_'+(Number(f)+1));
        //form.head, form.body, form.clothing, form.accessories...
        var newHtml = '<form>';
        newHtml += '<form action="">\n ';
        if (f == 0 ){
            newHtml += '<input id="mButton" type="radio" name="sex" value="male" onclick="trans(value[0]);" checked>Male\n '; // attribute 'checked' if in hashtag // onclick="trans(this);"
            newHtml += '<input id="fButton" type="radio" name="sex" value="female" onclick="trans(value[0]);" >Female\n '; // attribute 'checked' if in hashtag
            newHtml += '<br>\n ';
        } else if (f === '3'){
            newHtml += '<form NAME="test">\n ';
            newHtml += '<P>Name: <INPUT TYPE="TEXT" NAME="firstName"><BR><BR>\n ';
            newHtml += '<input type="Button" Value="Baptise" onClick="">\n ';
            newHtml += '</P></form>\n ';
        }
        newHtml += '<br>\n ';
        newHtml += '<div class="Table">';
        var selcount = 0
        for(var x in forms[f]){
            newHtml += '<div class="Row">';
            var sectionTitle = x;
            var t = sectionTitle.toLowerCase();
            var xsel = hash.get(t);
            var options = forms[f][x].map(function(d, i){
                var select = ''
                if ( xsel == d) { select = ' selected="selected"';}
                return '<option' + select + '>'+d+'</option>'; }).join('\n');
            var defaultValue = hash.get(x);
            if (defaultValue !== undefined) {
                var defval = 'selected="'+ defaultValue + '" ';
              }
            else {var defval = '';}
            newHtml += '<div class="select-group" ><div class="Cell">'+sectionTitle+defval+'</div>';
            newHtml += '<div class="Cell"><select class="'+t+'" onchange="show(this);onmouseenter"show(this);" '+defval+'>'+options+'</select></div>';
            htagc = x.toLowerCase() + 'Color';
            var hashColor = hash.get(htagc);
            if (hashColor !== undefined) {
                var colorValue = hashColor;
              }
            else {var colorValue = '#ffffff'}
            newHtml += '<div class="Cell"><input class="color" onchange="test(this, this.color)" value="'+colorValue+'" id="'+ t +'c"></div>';  // '+ hash.get('this.color');
            newHtml += '</div>';
            newHtml += '</div>';
            selcount ++
        }
        newHtml += '</div>';
        newHtml += '</form>';
        formContainer.append(newHtml);
    }
}

function parseHash(){
    var forms = [form1, form2, form3];
    for (var f in forms){
        // Cycle through each element in the form
        for(var x in forms[f]){
            var section =  x.toLowerCase();
            hashData = hash.get(section);
            var id = section + '_' + hashData;
            if (hashData != undefined){
                // Add the key/value pair to c.choices here
                modCharacter(section, hashData);
                ga('send', 'event', 'hash', 'select', id);
            };
            if (id in skinLayers || section ==='body'){ section = 'skin'}
            else if (id in hairLayers || section ==='hair'){ section = 'hair'};
            hashColor = hash.get(section+'Color');
            // Now to get the color
            if (hashColor != undefined && hashColor != ''){
                modCharacter(section+'Color', hashColor);
                ga('send', 'event', 'hash', 'color', section+'_'+hashColor );
            };
        };
    };
};

function applyColor(id, newColor, optLayer){

    fullId = '#' + id;
    ga('send', 'event', 'menu', 'color', fullId+'_#'+newColor );
    if (optLayer != null){
        var optPaths = optLayer.selectAll('path')

        for (p in optPaths) {

            if ( typeof optPaths[p].attr === 'function'){
                var pathId = optPaths[p].attr("id")
                var pathStyle = optLayer.select('#'+ pathId).attr("style");

                // Parse the style in a json object
                // Identify if the path is a shape or a shadow
                // apply newStyle if applicable

                var styles = pathStyle.split(';'),
                i= styles.length,
                json = {style: {}},
                style, k, v;

                while (i--){
                    style = styles[i].split(':');
                    k = $.trim(style[0]);
                    v = $.trim(style[1]);
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

function createCharacter(){
    document.getElementById( sex+"Button").checked=true;
    //Draw the essential stuff
    //Draw stuff from the hash
    //function drawHash(form){}
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

function zoomIn() {
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "140 73 290 290");
        //shape.setAttribute("viewBox", "180 85 200 200");
        //shape.setAttribute("viewBox", "204 85 150 150");
        //shape.setAttribute("viewBox", "244 85 80 80"); // Head
        //$("#svg1").animate({viewBox: "225 75 110 110"},1000);
    }
    else {
        shape.setAttribute("viewBox", "225 86 110 110");
    }
}

function zoomOut() {
    shape = document.getElementById(("svg1"));
    //shape.setAttribute("viewBox", "0 0 560 560");
    //shape.setAttribute("viewBox", "-10 0 580 580"); // Complete view
    shape.setAttribute("viewBox", "10 50 540 540"); // Full body view
}

function zoomFace() {
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "240 90 80 80");
    } else {
        shape.setAttribute("viewBox", "243 102 80 80");
    }
}

function zoomTorso() {
    shape = document.getElementById(("svg1"));// var =  "svg1" or "lg_face", etc.
    if (sex == 'm'){
        shape.setAttribute("viewBox", "204 85 150 150");
    } else {
        shape.setAttribute("viewBox", "207 97 150 150");
    }
}

function zoomBody() {
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "136 73 290 290");
    } else {
        shape.setAttribute("viewBox", "140 84 290 290");
    }
}

function zoomFull() {
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "10 50 540 540");
    } else {
        shape.setAttribute("viewBox", "10 50 540 540");
    }
}

function show(context){  // Draw the SVG on screen
    var selectedOption = context.value;
    var options = Array.prototype.slice.call(context.options).map(function(d, i){ return d.value; });
    var section = context.className;
    options.forEach(function(d, i){
        var id = '#'+section+'_'+d;
        if(d === selectedOption){
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
                viewport.selectAll(id).attr({opacity:1});
                viewportFace.selectAll(id).attr({opacity:1});
                viewportTorso.selectAll(id).attr({opacity:1});
                viewportBody.selectAll(id).attr({opacity:1});
                viewportFull.selectAll(id).attr({opacity:1});
            }
        };
        var obj = new Array();
        obj[section] = selectedOption;
            hash.add(obj);
        modCharacter(section, selectedOption);
        ga('send', 'event', 'menu', 'select', id);
        }
        else {
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
}
