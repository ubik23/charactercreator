window.onload = function() {

    console.log("loaded");
};

function selectMale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var malePath = document.getElementById("path_male");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var tl = new TimelineLite();
    tl.to(maleSilhouette, 1.5, {x:111, ease:SlowMo.easeIn}, "select_male")
    .to(malePath, 1.5, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_male")
    .to(femaleSilhouette, 1, {opacity:0}, "select_male");
}

function selectFemale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female");
    var tl = new TimelineLite();
    tl.to(femaleSilhouette, 1.5, {x:-111, ease:SlowMo.easeIn}, "select_female")
    .to(femalePath, 1.5, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_female")
    .to(maleSilhouette, 1, {opacity:0}, "select_female");
}

