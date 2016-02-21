function createForm(sex, forms){
    var sex = sex || window.sex;
    var forms = forms || window.forms;
    var sectionHtml = '<ul class="section__list">';
    for (var f in forms){
        var formContainer = document.querySelector('#content_1');
        var newHtml = '';
        if (f == 0 ){
            newHtml += '<div class="accordeon__content">';
        };
        var selcount = 0
        for(var x in forms[f]){
            sectionHtml += '    <li class="sbl__option" tabindex="0">'+x+'</li>';
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
        newHtml += '</div>';
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
    addEventListenerList(optionThumbnails, 'click', changeOption);
    addEventListenerList(sectionButtons, 'click', toggleSection);
}

function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function toggleSection() {
    var sectionContent = this.nextSibling;
    console.log('this', this);
    console.log('sectionContent', sectionContent);
    console.log('sectionContent.nextSibling', sectionContent.nextSibling);
    if (sectionContent.classlist === undefined && sectionContent.nextSibling.classList != undefined){
        console.log('undefined!!');
        sectionContent = sectionContent.nextSibling;
    }
    var maxHeight = sectionContent.clientHeight;
    var displayButton = this.querySelector('.accordeon__svg-container');
    if (sectionContent.classList.contains('accordeon__content')) {
        if (!sectionContent.classList.contains('section--hide')){
            sectionContent.style.maxHeight = maxHeight;
        }
        sectionContent.classList.toggle('section--hide')
        displayButton.classList.toggle('section-btn--hide')
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
    wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span></div><div id="picker"></div><div id="slide"></div>';
}

function getViewBox(t, d) {
    var id = t + '_' + d;
    var idDict = {
        "body_athletic":"65 130 430 430",
        "glasses_fpv":"250 97 64 64",
        "hat_helmet_vietnam":"243 86 80 80",
        "hat_motorcycle":"243 86 80 80",
        "hat_tuque":"243 85 80 80",
        "hair_mohawk":"243 45 80 80",
        "underwear_boxers":"224 258 120 120"
    }
    var sectionDict = {
        "body_head":"249 95 64 64",
        "coat":"140 84 290 290",
        "ears":"254 120 20 20",
        "emotion":"259 113 42 42",
        "eyepatch":"261 109 40 40",
        "facialhair":"261 124 40 40",
        "glasses":"261 109 40 40",
        "hat":"241 70 80 80",
        "hair":"243 80 80 80",
        "headband":"241 90 80 80",
        "horns":"241 70 80 80",
        "mask":"243 93 80 80",
        "suit":"65 130 430 430",
        "underwear":"228 238 120 120",
        "veil":"207 97 150 150",
        "wings":"110 -30 350 350"
    }
    if (idDict[id]) {
        return idDict[id];
    } else if (sectionDict[t]) {
        return sectionDict[t];
    } else {
        return "0 0 560 560";
    }
}
