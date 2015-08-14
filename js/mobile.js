window.onload = function() {
    var state = new Object();
    state.counter = 0;
    state.skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A'];
    state.stages = ['sex', 'skin tone', 'head shape', 'eye color', 'hair style', 'hair color'];
    state.previous = function() {
        state.counter -= 1;
        console.log(state.counter);
    };
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");
    var siteTitle = document.getElementById("siteTitle");
    var downloadButton = document.getElementById("downloadButton");
    var aboutButton = document.getElementById("aboutButton");
    var stepByStep = document.getElementById("step-by-step");
    var navLeft = document.getElementById("left-arrow")
    navLeft.addEventListener("click", function(){
        console.log('console.log();');
    });
    var tl = new TimelineLite();
    tl.from(header, 1, {y:-50, ease:Linear.easeIn}, "navBars")
    .from(footer, 1, {y:+100, ease:Linear.easeIn}, "navBars")
    .from(siteTitle, 1, {x:-250, ease:SlowMo.easeIn}, "title")
    .from(downloadButton, 0.75, {y:-50, ease:SlowMo.easeIn}, "title+=0.5")
    .from(aboutButton, 0.75, {scale:0,  ease:Bounce.easeInOut}, "title+=1")
    .from(aboutButton, 0.5, {opacity:0, ease:Linear.easeIn}, "title+=1")
    tl.to(stepByStep, 0.5, {opacity:1, ease:Linear.easeIn}, "title");

};

function stageNav() {
    //var stepByStep = document.getElementById("step-by-step");
    //var state = stages[stageKey];
    //var tl = new TimelineLite();
    //tl.to(stepByStep, 0.5, {opacity:1, ease:Linear.easeIn});
    console.log('clicked');
}

function displayPallette (pallette) {

}

function selectMale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var malePath = document.getElementById("path_male");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var tl = new TimelineLite();
    var stepByStep = document.getElementById("step-by-step");
    var navLeft = document.getElementById("nav-left");
    tl.to(maleSilhouette, 1.5, {x:111, ease:SlowMo.easeIn}, "select_male")
    .to(malePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_male")
    .to(femaleSilhouette, 0.3, {opacity:0}, "select_male")
    .to(stepByStep, 0.25, {opacity:0, x:-150, ease:Linear.easeIn}, "select_male")
    .to(navLeft, 0.25, {opacity:1, ease:Bounce.easeIn}, "select_male");
}

function selectFemale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female");
    var tl = new TimelineLite();
    tl.to(femaleSilhouette, 1.5, {x:-111, ease:SlowMo.easeIn}, "select_female")
    .to(femalePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_female")
    .to(maleSilhouette, 0.3, {opacity:0}, "select_female");
}

