
function createForm(sex, forms){
    //var forms = [form1, form2, form3];
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
            newHtml += '<div class="Cell"><select class="select '+t+'" onchange="show(this);" onkeydown="show(this);" '+defval+'>'+options+'</select></div>';
            htagc = x.toLowerCase() + 'Color';
            var hashColor = hash.get(htagc);
            if (hashColor !== undefined) {
                var colorValue = hashColor;
              }
            else {
                var colorValue = '#ffffff'
            }
            newHtml += '<div class="Cell"><input class="color" onchange="test(this, this.color)" value="'+colorValue+'" id="'+ t +'c"></div>';  // '+ hash.get('this.color');
            newHtml += '</div>';
            newHtml += '</div>';
            selcount ++
        }
        newHtml += '</div>';
        newHtml += '</form>';
        //formContainer.append(newHtml);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = newHtml;
        formContainer.appendChild(htmlObject);
        var color = document.querySelectorAll('.color');
        for (var i = 0; i < color.length; i++) {
            // click calls pooFunction
            color[i].addEventListener("click", getColor, false);
        }
    }
}

function getColor() {
     clearPicker();
     var id = this.id;
     var id = this.id.slice(0, -1);
    ColorPicker(
        document.getElementById('slide'),
        document.getElementById('picker'),
        function(hex, hsv, rgb) {
          //this.value = hex;
          //this.backgroundColor = hex;
          colorize(id, hex);
          clearPicker();
    });

}

function clearPicker() {
     var colorPicker = document.querySelector("#picker");
     var slide = document.querySelector("#slide");
     //colorPicker.innerHTML = '';
     //colorPicker.style = '';
     //colorPicker.removeAttribute("style");
     //slide.innerHTML = '';
}
