
function createForm(sex){
    var forms = [form1, form2, form3];
    for (var f in forms){
        var formContainer = $('#content_'+(Number(f)+1));
        //form.head, form.body, form.clothing, form.accessories...
        var newHtml = '<form>';
        newHtml += '<form action="">\n ';
        if (f == 0 ){
            newHtml += '<div class="hud">';
            newHtml += '<div><input id="mButton" type="radio" name="sex" value="male" onclick="trans(value[0]);" checked>Male</div> '; // attribute 'checked' if in hashtag // onclick="trans(this);"
            newHtml += '<div><input id="fButton" type="radio" name="sex" value="female" onclick="trans(value[0]);" >Female</div>'; // attribute 'checked' if in hashtag
            newHtml += '<svg class="random-button" onclick="random();" width="25" height="25" viewBox="0 0 625 625" version="1"><path d="M312.466 0l-36.784 93.304h26.044v123.174c-18.596 2.062-35.58 9.448-49.47 20.54l-87.13-87.128 18.394-18.392-92.03-39.94 39.94 91.96 18.46-18.39 87.06 87.06c-11.114 13.888-18.463 30.93-20.54 49.538H93.305v-26.044L0 312.534l93.304 36.784v-26.044H216.41c2.067 18.633 9.412 35.7 20.54 49.605l-87.06 87.06-18.46-18.393-39.94 91.96 92.03-39.94-18.393-18.39 87.128-87.13c13.89 11.093 30.875 18.48 49.47 20.54v123.108h-26.043L312.466 625l36.852-93.304h-26.044V408.59c18.607-2.077 35.65-9.426 49.538-20.54l87.06 87.06-18.39 18.46 91.96 39.94-39.94-92.03-18.392 18.393-87.128-87.128c11.092-13.89 18.478-30.875 20.54-49.47h123.174v26.043L625 312.534l-93.304-36.852v26.044H408.522c-2.072-18.57-9.46-35.53-20.54-49.403l87.128-87.13 18.392 18.394 39.94-92.03-91.96 39.94 18.39 18.46-87.06 87.06c-13.888-11.114-30.93-18.463-49.538-20.54V93.305h26.044L312.466 0z"/></svg>';
            newHtml += '<svg class="play-button" onclick="playRandom = setInterval(random, 500);" width="25" height="25" viewBox="0 0 1024 1024"><path class="path1" d="M192 128l640 384-640 384z"></path></svg>';
            newHtml += '<svg class="pause-button" onclick="clearInterval(playRandom);" width="25" height="25" viewBox="0 0 1024 1024"><path class="path1" d="M128 128h320v768h-320zM576 128h320v768h-320z"></path></svg>';
            newHtml += '</div>';
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
