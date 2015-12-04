
function createForm(sex, forms){
    for (var f in forms){
        var formContainer = document.querySelector('#content_'+(Number(f)+1));
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
            newHtml += '<div class="Cell"><select class="select '+t+'" onchange="show(this.options[this.selectedIndex].innerHTML, className);"'+defval+'>'+options+'</select></div>';
            htagc = x.toLowerCase() + 'Color';
            var hashColor = hash.get(htagc);
            if (hashColor !== undefined) {
                var colorValue = hashColor;
              }
            else {
                var colorValue = '#ffffff'
            }
            newHtml += '<div class="Cell"><input class="color" onchange="colorize(this, this.color)" value="'+colorValue+'" id="'+ t +'c"></div>';  // '+ hash.get('this.color');
            newHtml += '</div>';
            newHtml += '</div>';
            selcount ++
        }
        newHtml += '</div>';
        newHtml += '</form>';
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = newHtml;
        formContainer.appendChild(htmlObject);
        var color = document.querySelectorAll('.color');
        for (var i = 0; i < color.length; i++) {
            color[i].addEventListener("click", getColor, false);
        }
    }
}

function getColor() {
     clearPicker();
     var id = this.id;
     var id = this.id.slice(0, -1);
     var slide = document.getElementById('slide');
     var picker = document.getElementById('picker');
     var section = document.querySelector('.section-id');
     var wrapper = document.querySelector(".colorpicker-wrapper");
     section.innerHTML = id;
    var tl = new TimelineLite({onComplete: ColorPicker(
        slide,
        picker,
        function(hex, hsv, rgb) {
          colorize(id, hex);
        })
    });
    tl.to(wrapper, 0.5, { opacity:'1'})
}

function closePicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    var tl = new TimelineLite({onComplete: emptyPicker});
    tl.to(wrapper, 0.125, { opacity:'0'});
}

function emptyPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '';
}

function clearPicker() {
     var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span><button class="close-colorpicker" onclick="closePicker();">x</button></div><div id="picker"></div><div id="slide"></div>';
}
