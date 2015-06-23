
/*
TODO:
-save states (look-up form values, save as json, persist, populate dropdown)
*/

// The forms, menus and options that make up a character

//Todo Zoom in on the head tab viewBox="208 75 140 140"
var layerDirectoryMale = 'layer/male/';
var layerDirectoryFemale = 'layer/female/';


var maleForm1 = {
'Body': ['athletic'],
'Underwear': ['plain'],
'Scar': ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart' , 'vertical_left', 'vertical_right'],
'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil'],
'Tatoo': ['', 'chaos_left', 'chaos_right'],

};

var maleForm2 = {
'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
'Ears' : ['default', 'pointed'],
'Iris' : ['neutral'],
'Nose' : ['default', 'pointed', 'strong'],
'Lips' : ['neutral'],
'Horns': ['', 'devil'],
'Facialhair': ['','beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'chinpuff', 'goatee', 'moustache', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
'Face': ['neutral', 'joy', 'surprise', 'anger', 'fear', 'disgust'],
'Hair': ['', 'balding', 'balding_crazy', 'short', 'gelled', 'wavy', 'manga', 'mohawk'],
'Hat': ['','baseball','berret', 'cap', 'cowboy', 'fedora', 'top', 'police', 'scumbag'],
'Mask': ['', 'guy_fawkes', 'robin'],
'Glasses': ['', 'designer', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
'Eyepatch': ['', 'left', 'right']
};

var maleForm3 = {
'Suit': ['', 'wetsuit'],
'Shirt': ['', 'tanktop', 'colar', 'tshirt', 'turtleneck'],
'Tie': ['', 'neck', 'bolo', 'bow'],
'Gloves': ['', 'lab', 'motorcycle'],
'Vest': ['', 'vest'],
'Jacket': ['', 'suit'],
'Belt': ['', 'straps', 'utility'],
'Pants': ['', 'suit', 'jeans', 'leather'],
'Coat': ['', 'lab', 'trench'],
'Socks': ['','socks'], 
'Shoes': ['','hightops', 'leather']
};

var femaleForm1 = {
'Body': ['athletic'],
'Nails': ['', 'short', 'long'],
'Tatoo': ['', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
'Underwear': ['plain'],
'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil'],
};

var femaleForm2 = {
'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
'Ears' : ['default', 'pointed'],
'Iris' : ['neutral'],
'Lips' : ['default'],
'Nose' : ['default'],
'Face': ['neutral'],
'Horns': ['', 'devil'],
'Hair': ['','afro', 'down', 'manga', 'mohawk', 'ponytail', 'short'],
'Makeup': ['', 'gothic_eyeliner'],
'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
'Eyepatch': ['', 'left', 'right'],
'Glasses': ['', 'designer', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
'Hat': ['', 'top', 'waitress', 'cowboy', 'police', 'scumbag'],
'Mask': ['', 'guy_fawkes']
};

var femaleForm3 = {
'Dress': ['','casual','corset', 'suit', 'waitress', 'short', 'cheerleader'],
'Bra': ['', 'bow'],
'Leggings': ['', 'regular'],
'Bracelet' : ['','rings'],

};

var layersFemale = [
'logo.svg',
'pet_feline.svg',
'pet_raven.svg',
'pet_rat.svg',
'pet_canine.svg',
'pet_siamese_cat.svg',
'pet_gerbil.svg',
'hair_down_3_of_3.svg',
'hair_manga_2_of_2.svg',
'body_athletic.svg',

'tatoo_chaos_left.svg',
'tatoo_chaos_right.svg',
'tatoo_archeopteryx_left.svg',

'underwear_plain.svg',
'leggings_regular.svg',
'bra_bow.svg', 
'dress_casual.svg',
'dress_corset.svg',
'dress_suit.svg',
'dress_short.svg',
'dress_waitress.svg',
'dress_cheerleader.svg',
'hair_down_2_of_3.svg',
'body_head_default.svg',
'body_head_square.svg',
'body_head_diamond.svg',
'body_head_heart.svg',
'body_head_oblong.svg',
'body_head_oval.svg',
'body_head_round.svg',
'body_head_triangle.svg',
'ears_default.svg',
'ears_pointed.svg',
'nose_default.svg',
'lips_default.svg',
'body_face.svg',
'tatoo_tribal_face.svg',
'earings_gold_rings.svg',
'earings_gold_ring_left.svg',
'earings_gold_ring_right.svg',
'makeup_gothic_eyeliner.svg',

'eyes_neutral.svg',
'iris_neutral.svg',
'pupils_neutral.svg',
'mouth_shadow.svg',
'brows_neutral.svg',
'eyepatch_left.svg',
'eyepatch_right.svg',
'mask_guy_fawkes.svg',
'glasses_hipster.svg',
'glasses_google.svg',
'glasses_oakley.svg',
'glasses_rayban.svg',
'glasses_round.svg',
'glasses_wayrafer.svg',
'glasses_designer.svg',
'tie_bow.svg',
'hair_short.svg',
'hair_afro.svg',
'hair_mohawk.svg',
'hair_ponytail.svg',
'glasses_goggles.svg',
'hat_waitress.svg',
'hat_police.svg',
'hat_cowboy.svg',
'hat_top.svg',
'hat_scumbag.svg',
'hair_down_1_of_3.svg',
'hair_manga_1_of_2.svg',
'bracelet_rings.svg',
'body_hand.svg',
'nails_short.svg',
'nails_long.svg',
'horns_devil.svg',
];

var multiLayerFemale = [['hair_manga', 2], ['hair_down', 3]];
var multiLayerMale = [['hair_manga',2], ['coat_trench', 2], ['hat_fedora', 2], ['shirt_colar', 2]];

var layersMale = [
'logo.svg',
'pet_feline.svg',
'pet_raven.svg',
'pet_rat.svg',
'pet_canine.svg',
'pet_siamese_cat.svg',
'pet_gerbil.svg',
'hat_fedora_2_of_2.svg',
'hair_manga_2_of_2.svg',
'coat_trench_2_of_2.svg',
'body_athletic.svg',
'scar_horizontal_neck.svg',
'body_head_default.svg',
'body_head_square.svg',
'body_head_diamond.svg',
'body_head_heart.svg',
'body_head_oblong.svg',
'body_head_oval.svg',
'body_head_round.svg',
'body_head_triangle.svg',
'ears_default.svg',
'ears_pointed.svg',
'nose_default.svg',
'nose_pointed.svg',
'nose_strong.svg',
'iris_human.svg',
'pupils_human.svg',
'scar_vertical_heart.svg',
'earings_gold_rings.svg',
'earings_gold_ring_left.svg',
'earings_gold_ring_right.svg',
'underwear_plain.svg',
'suit_wetsuit.svg',
'shirt_colar_2_of_2.svg',
'shirt_turtleneck.svg',
'socks_socks.svg',
'shoes_hightops.svg',
'shoes_leather.svg',
'shirt_tanktop.svg',
'tatoo_chaos_left.svg',
'tatoo_chaos_right.svg',
'tie_bolo.svg',
'tie_bow_1_of_2.svg',
'tie_bow_2_of_2.svg',
'tie_neck.svg',
'shirt_colar_1_of_2.svg',
'vest_vest.svg',
'pants_jeans.svg',
'pants_leather.svg',
'pants_suit.svg',
'belt_straps.svg',
'shirt_tshirt.svg',
'gloves_lab.svg',
'gloves_motorcycle.svg',
'jacket_suit.svg',
'belt_utility.svg', 
'coat_lab.svg',
'coat_trench_1_of_2.svg',
'scar_horizontal_nose.svg',
'scar_vertical_left.svg',
'scar_vertical_right.svg',
'face_anger.svg',
'face_disgust.svg',
'face_fear.svg',
'face_joy.svg',
'face_neutral.svg',
'face_surprise.svg',
'lips_neutral.svg',
'eyes_neutral.svg',
'iris_neutral.svg',
'pupils_neutral.svg',
'brows_neutral.svg',
'facialhair_beard_boxed.svg',
'facialhair_beard_ducktail.svg',
'facialhair_beard_guru.svg',
'facialhair_beard_intelectual.svg',
'facialhair_beard_rap.svg',
'facialhair_chinpuff.svg',
'facialhair_goatee.svg',
'facialhair_moustache.svg',
'facialhair_moustache_thick.svg',
'facialhair_muttonchops.svg',
'facialhair_muttonchops_friendly.svg',
'facialhair_soulpatch.svg',
'facialhair_winnfield.svg',
'eyepatch_left.svg',
'eyepatch_right.svg',
'hair_balding.svg',
'hair_balding_crazy.svg',
'hair_gelled.svg',
'hair_manga_1_of_2.svg',
'hair_mohawk.svg',
'hair_short.svg',
'hair_wavy.svg',
'horns_devil.svg',
'mask_guy_fawkes.svg',
'glasses_designer.svg',
'glasses_goggles.svg',
'glasses_google.svg',
'glasses_hipster.svg',
'glasses_oakley.svg',
'glasses_rayban.svg',
'glasses_round.svg',
'glasses_wayrafer.svg',
'hat_baseball.svg',
'hat_berret.svg',
'hat_cap.svg',
'hat_cowboy.svg',
'hat_fedora_1_of_2.svg',
'hat_top.svg',
'hat_police.svg',
'hat_scumbag.svg',
'jewelry_chain.svg',
'jewelry_earings.svg',
'jewelry_nosering.svg',
'jewelry_watch.svg',
'mask_robin.svg',
'mic.svg'
];

function zoomIn() {
	shape = document.getElementById(("svg1"));
	if (sex == 'm'){
		shape.setAttribute("viewBox", "225 75 110 110"); 
	}	
	else {
		shape.setAttribute("viewBox", "225 86 110 110"); 
	}
}

function zoomOut() {
	shape = document.getElementById(("svg1"));
	shape.setAttribute("viewBox", "0 0 560 560"); 
}

function tabSwitch(new_tab, new_content) {  
      
	document.getElementById('content_1').style.display = 'none';  
	document.getElementById('content_2').style.display = 'none';  
	document.getElementById('content_3').style.display = 'none'; 
	document.getElementById('content_4').style.display = 'none';          
	document.getElementById(new_content).style.display = 'block';     


	document.getElementById('tab_1').className = '';  
	document.getElementById('tab_2').className = '';  
	document.getElementById('tab_3').className = '';          
	document.getElementById('tab_4').className = '';     
	document.getElementById(new_tab).className = 'active';        

	}  

function show(context){  // Draw the SVG on screen

	//console.log('show context : ', context.value);
	var selectedOption = context.value;
	var options = Array.prototype.slice.call(context.options).map(function(d, i){ return d.value; });
	var section = context.className;
	options.forEach(function(d, i){ 
	    var id = '#'+section+'_'+d;
	    if(d === selectedOption){
		//console.log('show id : ', id);
		for (lyr in multiLayer){
			//console.log(lyr);
			//console.log(multiLayer[lyr]);
			if (id.slice(1) == multiLayer[lyr][0]){
				//console.log('id in mutliLayer : ', id.slice(1));
				for (var i=1;i<=multiLayer[lyr][1];i++){
					idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
					viewport.selectAll(idOf).attr({opacity:1});	
				}
			}
			else {
				viewport.selectAll(id).attr({opacity:1});
			}
		};
		var obj = new Array();
		obj[section] = selectedOption;
	     	hash.add(obj);
	    }
	    else {
		for (lyr in multiLayer){
			//console.log(lyr);
			//console.log(multiLayer[lyr]);
			if (id.slice(1) == multiLayer[lyr][0]){
				//console.log('id in mutliLayer : ', id.slice(1));
				for (var i=1;i<=multiLayer[lyr][1];i++){
					idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
					viewport.selectAll(idOf).attr({opacity:0});	
				}
			}
			else {
				viewport.selectAll(id).attr({opacity:0})
			}
		};
		;
		}
	});
}

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



function test(_context, _color){
	console.log( 'test _context : ', _context);
	var id = _context.getAttribute("id").slice(0,-1);
	console.log('test id : ',id);
	// get all the options for that id
	// Cycle through each form array 
	var forms = [form1, form2, form3];
	for (var f in forms){
		// Cycle through each element in the form
		for(var x in forms[f]){
			// is x = to id?
			// if so, cycle through each element
			if(x.toLowerCase() === id){	
				console.log('test id : ',id);
				// Figure out which form to look in to find this id
				// Cycle through each option 
				console.log('forms[f] : ', forms[f]);
				var capitalId = id.replace(/^[a-z]/, function(m){ return m.toUpperCase() });

				console.log('the id is : ', id);
				// If the id is body, than the list will be of all 'skin' layers
				skinLayers = ['body_athletic', 'body_head_default', 'body_head_diamond', 'body_head_heart', 'body_head_oblong', 'body_head_oval', 'body_head_round', 'body_head_square', 'body_head_triangle', 'body_hand', 'ears_default', 'ears_pointed', 'nose_default', 'nose_pointed', 'nose_strong', 'mouth_shadow', 'face_neutral'];
				hairLayers = ['facialhair_beard_boxed', 'facialhair_beard_ducktail', 'facialhair_beard_guru', 'facialhair_beard_intelectual', 'facialhair_beard_rap', 'facialhair_chinpuff', 'facialhair_goatee', 'facialhair_mustache', 'facialhair_mustache_thick', 'facialhair_muttonchops', 'facialhair_muttonchops_friendly', 'facialhair_soulpatch', 'facialhair_winnfield', 'hair_balding', 'hair_balding_crazy', 'hair_short', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'brows_neutral' ];
				if (id === 'body' || id === 'body_head' || id === 'ears' || id === 'nose'){
					affectedList = skinLayers;
				}
				else if (id ==='facialhair' || id === 'hair'){
					affectedList = hairLayers;
				}
				else {
					affectedList = [];
					for (i in forms[f][capitalId]){
						console.log('forms[f][capitalId][i] : ', forms[f][capitalId][i]);
						var tmpId = forms[f][capitalId][i];
						if (tmpId != ''){
							affectedList.push(id + '_' +tmpId);
						}

					}
				}
				console.log('affectedList : ', affectedList);
				for (n in affectedList){
					console.log('affectedList[n] : ', affectedList[n]);
					fullId = '#' + affectedList[n];

					// Else, the list is taken from the form.
					var optLayer = viewport.select(fullId); // todo: Add selection to category
					if (optLayer != null){
						var optPaths = optLayer.selectAll('path')

						for (p in optPaths) {

							if ( typeof optPaths[p].attr === 'function'){
								var pathId = optPaths[p].attr("id")
								var pathStyle = viewport.select('#'+ pathId).attr("style");
								// Parse the style in a json object
								// Identify if the path is a shape or a shadow
								// apply newStyle if applicable
								console.log('pathStyle : ', pathStyle);
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

								//json.style.fill = _color.toString();
								var newColor = _color.toString();

								// json to string

								newStyle = json.style;
								var replacement = '';
								for (n in Object.keys(newStyle)){
									var currentKey = Object.keys(newStyle)[n]
									if (currentKey === 'fill'){

										//console.log('newColor : ', newColor);
										//console.log('shadeColor2 : ', ColorLuminance(newColor, -0.1));
										if (newStyle[currentKey] != 'none'){
											console.log('the Key : ', newStyle[currentKey]);
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

										//console.log('ssss', json.style["stroke-width"]);
										if (newStyle[currentKey] != 'none'){
											if (json.style["stroke-width"] != undefined){
												var currentValue = ColorLuminance(newColor, -0.2);
		 
												//var currentValue = '#000000'; 
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

									//console.log('currentKey : ', currentKey);
									//console.log('currentValuen : ', currentValue);
				
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


	
	//Exit

	//var selectedOption = $('#'+id).siblings().forEach(function(d,i){
		//console.log( 'id : ', d.getAttribute('id'));
			//});
	//console.log( 'selectedOption : ', selectedOption);
	//var section = $(_context).siblings('select').attr('class');
	//console.log( 'section : ', section);
	// var id = '#'+section+'_'+selectedOption;
	//console.log( 'test id', id);
	//changeColor(id, '#'+_color.toString())
}

function changeColor(_selector, _newColor){
	//console.log('_selector',_selector);
	d3.select(_selector).selectAll('path, rect, circle').each(function(d, i){
		var el =  d3.select(this);
		var fill = el.style('fill');
		var stroke = el.style('stroke');
		if(fill != 'none'){
			//console.log(d3.hsl(fill).toString());//Grab the old color, for future use.
			var fillLightness = d3.hsl(fill).l;
			var fillHsl = d3.hsl(_newColor);
			// fillHsl.l = fillLightness;
			
			if(stroke === 'none'){
				fillHsl.l -= 0.1;
				}
			el.style({fill: fillHsl.toString()});
			//console.log('color',fillHsl.toString());// Add color to the hash
			var obj = new Array();
			obj[_selector.slice(1).split("_")[0]+'c'] = fillHsl.toString(); //obj[_selector.slice(1)+'c'] = fillHsl.toString();
		     	hash.add(obj);
			//console.log('obj',obj);
			if(stroke != 'none'){
				//console.log('orignial color',d3.hsl(fill).toString());//Grab the
				}
			}
		if(stroke != 'none'){
			var strokeLightness  = d3.hsl(stroke).l;
			var strokeHsl = d3.hsl(_newColor);
			strokeHsl.l -= 0.2;
			el.style({stroke: strokeHsl.toString()});
			//console.log('orignial color',d3.hsl(fill).toString());//Grab the
		    	}
		});
	}

function pickColor(){
	var selectedOption = $(_context).siblings('select').find(':selected').text();
	var section = $(_context).siblings('select').attr('class');
	var id = '#'+section+'_'+selectedOption;
	// console.log( 'test id', id);
	var colour = viewport.select(id).attr("fill");
	return colour
}

function createForm(sex){
	var forms = [form1, form2, form3];
	for (var f in forms){
		var formContainer = $('#content_'+(Number(f)+1));
		//console.log('#content_'+(f+1));
		//form.head, form.body, form.clothing, form.accessories...
		var newHtml = '<form>';
		newHtml += '<form action="">\n ';
		if (f == 0 ){
			newHtml += '<input id="mButton" type="radio" name="sex" value="male" onclick="trans(value[0]);" checked>Male\n '; // attribute 'checked' if in hashtag // onclick="trans(this);"
			newHtml += '<input id="fButton" type="radio" name="sex" value="female" onclick="trans(value[0]);" >Female\n '; // attribute 'checked' if in hashtag
			newHtml += '<br>\n ';
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
			htagc = x.toLowerCase() + 'c';
			//console.log('x = ',htagc);
			var hashColor = hash.get(htagc);
			//console.log('hashColor = ',hashColor);
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
		//return newHtml;
	}
}

function createCharacter(){
	//console.log(sex);
	document.getElementById( sex+"Button").checked=true;

	//Draw the essential stuff
	var basics = ['body_athletic', 'body_hand',  'logo', 'underwear_plain',   'ears_default', 'lips_default', 'lips_neutral', 'face_neutral', 'nose_default', 'brows_neutral', 'mouth_shadow', 'iris_neutral', 'pupils_neutral', 'eyes_neutral'];

	// todo: read the defaults instead of relying on the list
	//console.log('hash.head : ',hash.get('body_head') );
	//If hash.head doesn't exist, append it.
	if (hash.get('body_head')===undefined){
		basics.push('body_head_default')
	}
	for (var y = 0; y < layers.length; y++) {
	
	viewport.selectAll('#'+basics[y]).attr({opacity:1});
	}

	//Draw stuff from the hash
	//function drawHash(form){}
	var forms = [form1, form2, form3];
	for (var lot in forms){
		//console.log('lot',lot);
		for(var x in forms[lot]){
			var sectionTitle = x;
			var t = sectionTitle.toLowerCase();
			var xsel = hash.get(t);
			if (xsel !== undefined) {
				var id = '#' + t +'_'+xsel
				for (lyr in multiLayer){
					//console.log(lyr);
					//console.log(multiLayer[lyr]);
					if (id.slice(1) == multiLayer[lyr][0]){
						//console.log('id in mutliLayer : ', id.slice(1));
						for (var i=1;i<=multiLayer[lyr][1];i++){
							idOf = id + '_' + i + '_of_' + multiLayer[lyr][1];
							viewport.selectAll(idOf).attr({opacity:1});	
						}
					}
					else {
						viewport.selectAll(id).attr({opacity:1});
					}
				};
				//$('#'+id).show();
				//viewport.selectAll('#'+id).attr({opacity:1});
			}
		}
	};
};

function trans(sex){
	hash.add({ sex: sex });
	location.reload();
	}

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
	if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// This is where things start to happen
// This variable represents the cast of chararcters created
var cc = {};

function Character(){
	//this.sex
	//this.choices
	//this.meta		
};
var sexes = ["m", "f"]; 

var sex = hash.get('sex') || sexes[Math.floor(Math.random() * 2)]; // Has the sex of the character been defined by the uri? If not, default to ... random, eventually!
var layers = [];
hash.add({ sex: sex });
if (sex ==='m') {
	var form1 = maleForm1;
	var form2 = maleForm2;
	var form3 = maleForm3;
	var layerDirectory = layerDirectoryMale;
	var layers = layersMale;
	var multiLayer = multiLayerMale;
}
else {
	var form1 = femaleForm1;
	var form2 = femaleForm2;
	var form3 = femaleForm3;
	var layerDirectory = layerDirectoryFemale;
	var layers = layersFemale;
	var multiLayer = multiLayerFemale;
}

function onSVGLoaded( data){ 
	viewport.append(data);
	viewport.attr({opacity:1});
	viewport.selectAll('#logo').attr({opacity:0});
}

var viewport = Snap("#svg1");
for (var y = 0; y < layers.length; y++) {
	Snap.load(layerDirectory+layers[y], onSVGLoaded);
}
viewport.selectAll('#logo').attr({opacity:1});
for (var y = 0; y < layers.length; y++) {
	Snap.load(layerDirectory+layers[y], onSVGLoaded);
}

// Assign unique ids to each option for select2 
$(window).load(function() {
	for (var y = 0; y < layers.length; y++) {
	viewport.selectAll('#'+layers[y].slice(0,-4)).attr({opacity:0});
	}
createForm(sex);
createCharacter();
});

