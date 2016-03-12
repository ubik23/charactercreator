function createForm(sex, forms){
    var sex = sex || window.sex;
    var forms = forms || window.forms;
    var sectionHtml = '<ul class="section__list">';
    for (var f in forms){
        var formContainer = document.querySelector('#content_1');
        var newHtml = '';
        var selcount = 0
        sectionHtml += '<section class="accordeon__section-label"><span class="accordeon__section-title">Section</span><div class="accordeon__svg-container"><svg width="25" height="25"><use xlink:href="#accordeon_btn"/></svg></div></section><div class="accordeon__content section--hide">';
        for(var x in forms[f]){
            sectionHtml += '    <a class="section__link"><li class="sbl__option" tabindex="0">'+x+'</li></a>';
            var sectionTitle = x;
            var t = sectionTitle.toLowerCase();
            newHtml += '    <div class="Row options__container options__'+t+'"><span class="svg__section__title">'+t+'</span><div class="thumbnails__container">';
            var xsel = hash.get(t);
            var options = forms[f][x].map(function(d, i){
            var tempId ='#'+t+'_'+d;
            var sections = [tempId];
            var multiLayer = window.multiLayer;
            for (lyr in multiLayer){
                if (tempId.slice(1) === multiLayer[lyr][0]){
                    sections = [];
                    for (var i=1;i<=multiLayer[lyr][1];i++){
                        newLayer = tempId + '_' + i + '_of_' + multiLayer[lyr][1];
                        sections.push(newLayer);
                    }
                };
            };
            if (t === "emotion"){
                var sections = [];
                var emotions = GetEmotionGetLayers(d);
                for (emo in emotions){
                    var newEmo = '#' + emotions[emo] + '_' + d;
                    sections.push(newEmo);
                };
            }
            var clonedNode = '';
            for (i in sections){
                var selectNode = document.querySelector(sections[i]);
                if (selectNode != null){
                    var newNode = selectNode.cloneNode(true).innerHTML;
                    clonedNode += newNode;
                };
            };
            var viewBox = getViewBox(t, d);
            newHtml += '    <div class="option__container option__'+t+'_'+d+'" tabindex="0"><svg viewBox="' + viewBox + '" class="svg__option '+t+'_'+d+'">' + clonedNode + '</svg><span class="option__label">'+d+'</span></div>';}).join('\n');
            var defaultValue = hash.get(x);
            if (defaultValue !== undefined) {
                var defval = 'selected="'+ defaultValue + '" ';
              }
            else {var defval = '';}
            htagc = x.toLowerCase() + 'Color';
            var hashColor = hash.get(htagc);
            if (hashColor !== undefined) {
                var colorValue = hashColor;
              }
            else {
                var colorValue = '#ffffff'
            }
            newHtml += '    </div>';
            newHtml += '</div>';
            selcount ++
        }
        sectionHtml += '</div>';
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = newHtml;
        formContainer.appendChild(htmlObject);
    }
    sectionHtml += '</ul>';
    var sectionContainer = document.querySelector('#sidebar-left');
    var sectionList = document.createElement('div');
    sectionList.innerHTML = sectionHtml;
    sectionContainer.appendChild(sectionList);
    var sidebarLeftOptions  = document.querySelectorAll('.sbl__option');
    var optionThumbnails  = document.querySelectorAll('.option__container');
    var sectionButtons  = document.querySelectorAll('.accordeon__section-label');
    addEventListenerList(sidebarLeftOptions, 'mouseover', showThumbOptions);
    addEventListenerList(sidebarLeftOptions, 'focus', showThumbOptions);
    addEventListenerList(sidebarLeftOptions, 'click', openThumbs );
    addEventListenerList(optionThumbnails, 'click', changeOption);
    addEventListenerList(sectionButtons, 'click', toggleSection);
}

function openThumbs() {
    closeSections();
    var thumbSection = document.querySelector('.widget');
    var thumbSectionBtn = thumbSection.previousSibling;
    if (thumbSectionBtn.classList === undefined && thumbSectionBtn.previousSibling.classList != undefined){
        thumbSectionBtn = thumbSectionBtn.previousSibling;
    }
    thumbSectionBtn = thumbSectionBtn.querySelector('.accordeon__svg-container');
    if (thumbSectionBtn.classList.contains('section-btn--hide')){
        thumbSectionBtn.classList.toggle('section-btn--hide');
    }
    if (thumbSection.classList.contains('section--hide')){
        thumbSection.classList.toggle('section--hide');
    }
}
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function closeSections(exception) {
    var sectionButtons  = document.querySelectorAll('.accordeon__section-label');
    var displayButtons = document.querySelectorAll('.accordeon__svg-container');
    var i = sectionButtons.length;
    while (i--){
        var section = sectionButtons[i];
        if (section !== exception){
            var button = displayButtons[i];
            var sectionContent = section.nextSibling;
            if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined){
                sectionContent = sectionContent.nextSibling;
            }
            if (!sectionContent.classList.contains('section--hide')){
                sectionContent.classList.toggle('section--hide');
            }
            if (!button.classList.contains('section-btn--hide')){
                button.classList.toggle('section-btn--hide')
            }
        }
    }
}

function toggleSection() {
    closeSections(this);
    var sectionContent = this.nextSibling;
    if (sectionContent.classList === undefined && sectionContent.nextSibling.classList != undefined){
        sectionContent = sectionContent.nextSibling;
    }
    var maxHeight = sectionContent.clientHeight;
    var displayButton = this.querySelector('.accordeon__svg-container');
    if (sectionContent.classList.contains('accordeon__content')) {
        if (sectionContent.classList.contains('section--hide')){
        } else {
            sectionContent.style.maxHeight = maxHeight;
        };
        sectionContent.classList.toggle('section--hide');
        displayButton.classList.toggle('section-btn--hide');
    }
}

function showThumbOptions() {
    var showOptionThumbs = document.querySelector('.options__'+this.innerHTML.toLowerCase());
    var allOptions  = document.querySelectorAll('.options__container');
    for (var i = 0, len = allOptions.length; i < len; i++) {
        allOptions[i].classList.remove('selected--option');
    }
    showOptionThumbs.classList.add('selected--option');
    var section = this.innerHTML.toLowerCase();
    getColor(section);
}

function changeOption() {
    var category = this.parentNode.parentNode.firstChild.innerHTML;
    var userChoice = this.lastChild.innerHTML;
    show(userChoice, category);
}

function getColor(sectionId) {
    clearPicker();
    var id = sectionId;
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
}

function emptyPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '';
}

function clearPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span></div><div class="colorpicker-align"><div id="picker"></div><div id="slide"></div></div>';
}

function getViewBox(t, d) {
    var id = t + '_' + d;
    var sex = window.sex;
    if (sex==="m"){
        var idDict = {
            "body_athletic":"65 130 430 430",
            "coat_snowboard":"160 124 230 230",
            "coat_trench":"130 124 290 290",
            "glasses_fpv":"250 97 64 64",
            "hat_helmet_vietnam":"243 86 80 80",
            "hat_motorcycle":"243 86 80 80",
            "hat_tuque":"243 85 80 80",
            "hair_mohawk":"243 45 80 80",
            "mask_horse":"233 80 100 100",
            "mask_robin":"261 108 40 40",
            "pet_canine":"82 403 150 150",
            "pet_chicken":"45 403 150 150",
            "pet_doge":"341 349 200 200",
            "pet_feline":"381 439 128 128",
            "pet_fox":"42 393 150 150",
            "pet_gerbil":"125 475 64 64",
            "pet_parrot":"203 116 80 80",
            "pet_raven":"50 439 128 128",
            "pet_rat":"300 439 128 128",
            "pet_siamese_cat":"42 393 150 150",
            "pet_vulture":"281 349 180 180",
            "scar_horizontal_neck":"265 139 32 32",
            "scar_horizontal_nose":"264 115 32 32",
            "scar_vertical_heart":"249 164 64 64",
            "scar_vertical_left":"264 110 32 32",
            "scar_vertical_right":"264 110 32 32",
            "scarf_drape":"185 140 190 190",
            "tatoo_aum_chest":"248 165 64 64",
            "tatoo_aum_left":"298 157 64 64",
            "tatoo_aum_right":"198 154 64 64",
            "tatoo_chaos_chest":"248 169 64 64",
            "tatoo_chaos_left":"298 164 64 64",
            "tatoo_chaos_right":"198 164 64 64",
            "underwear_boxers":"224 258 120 120"
        }
        var sectionDict = {
            "age":"261 109 40 40",
            "belt":"185 135 190 190",
            "body_head":"249 95 64 64",
            "coat":"95 134 360 360",
            "earpiece":"280 125 25 25",
            "ears":"254 120 20 20",
            "earings":"256 87 50 50",
            "emotion":"259 113 42 42",
            "eyepatch":"261 109 40 40",
            "facialhair":"261 124 40 40",
            "glasses":"261 109 40 40",
            "gloves":"206 308 40 40",
            "hat":"241 70 80 80",
            "hair":"243 80 80 80",
            "headband":"241 90 80 80",
            "holster":"215 150 130 130",
            "horns":"256 87 50 50",
            "iris":"270.25 124.85 4 4",
            "jacket":"170 130 220 220",
            "mask":"243 93 80 80",
            "nose":"265 115 32 32",
            "pants":"130 244 290 290",
            "pipe":"252 132 32 32",
            "pupils":"270.25 124.85 40 40",
            "scarf":"185 120 190 190",
            "shirt":"190 140 190 190",
            "shoes":"210 442 120 120",
            "shoulderpads":"207 100 150 150",
            "socks":"210 442 120 120",
            "suit":"65 130 430 430",
            "tie":"241 140 80 80",
            "underwear":"228 238 120 120",
            "veil":"207 97 150 150",
            "vest":"185 135 190 190",
            "wings":"110 -30 350 350"
        }
    } else if (sex==="f"){
        var idDict = {
            "body_athletic":"65 130 430 430",
            "coat_snowboard":"160 124 230 230",
            "coat_trench":"130 124 290 290",
            "glasses_fpv":"252 109 64 64",
            "hat_helmet_vietnam":"243 98 80 80",
            "hat_motorcycle":"243 98 80 80",
            "hat_tiara":"262 98 40 40",
            "hat_tuque":"243 97 80 80",
            "hair_afro":"243 80 80 80",
            "hair_mohawk":"243 57 80 80",
            "mask_horse":"233 92 100 100",
            "mask_robin":"261 120 40 40",
            "pet_canine":"82 403 150 150",
            "pet_chicken":"45 403 150 150",
            "pet_doge":"341 349 200 200",
            "pet_feline":"381 439 128 128",
            "pet_fox":"42 393 150 150",
            "pet_gerbil":"125 475 64 64",
            "pet_parrot":"275 126 80 80",
            "pet_raven":"50 439 128 128",
            "pet_rat":"300 439 128 128",
            "pet_siamese_cat":"42 393 150 150",
            "pet_vulture":"281 349 180 180",
            "scar_horizontal_neck":"265 139 32 32",
            "scar_horizontal_nose":"264 115 32 32",
            "scar_vertical_heart":"249 164 64 64",
            "scar_vertical_left":"264 110 32 32",
            "scar_vertical_right":"264 110 32 32",
            "scarf_drape":"185 140 190 190",
            "tatoo_aum_chest":"248 165 64 64",
            "tatoo_aum_left":"298 157 64 64",
            "tatoo_aum_right":"198 154 64 64",
            "tatoo_chaos_chest":"248 169 64 64",
            "tatoo_chaos_left":"298 164 64 64",
            "tatoo_chaos_right":"198 164 64 64",
            "underwear_boxers":"224 258 120 120"
        }
        var sectionDict = {
            "age":"261 121 40 40",
            "belt":"175 185 190 190",
            "body_head":"249 107 64 64",
            "coat":"125 79 280 280",
            "earpiece":"280 137 25 25",
            "ears":"254 130 20 20",
            "earings":"256 87 50 50",
            "emotion":"261 125 42 42",
            "eyepatch":"261 121 40 40",
            "facialhair":"261 124 40 40",
            "glasses":"263 121 40 40",
            "gloves":"206 308 40 40",
            "hat":"241 82 80 80",
            "hair":"243 92 80 80",
            "headband":"241 102 80 80",
            "holster":"215 150 130 130",
            "horns":"257 99 50 50",
            "iris":"273.75 137.5 4 4",
            "jacket":"170 130 220 220",
            "leggings":"136 305 260 260",
            "makeup":"267.5 123 30 30",
            "mask":"243 105 80 80",
            "nails":"192 318 40 40",
            "nose":"265 127 32 32",
            "pants":"130 244 290 290",
            "pipe":"255 144 32 32",
            "pupils":"270.25 124.85 40 40",
            "scarf":"185 120 190 190",
            "shirt":"190 140 190 190",
            "shoes":"225 442 120 120",
            "shoulderpads":"207 100 150 150",
            "socks":"225 442 120 120",
            "suit":"80 130 400 400",
            "tie":"241 140 80 80",
            "underwear":"232 258 90 90",
            "veil":"207 97 150 150",
            "vest":"185 135 190 190",
            "wings":"110 -30 350 350"
        }
    }
    if (idDict[id]) {
        return idDict[id];
    } else if (sectionDict[t]) {
        return sectionDict[t];
    } else {
        return "0 0 560 560";
    }
}
