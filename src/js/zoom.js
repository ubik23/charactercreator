
function scrollZoom(e) {
    var svgViewBox = document.querySelector("#svg1");
    var event = window.event || e;
    var delta = event.detail? event.detail*(-120) : event.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    var zoomLevel = document.querySelector("#zoomLevel").value;
    var zoom = document.querySelector("#zoomLevel");
    //document.getElementById("wheelvalue").innerHTML=delta //delta returns +120 when wheel is scrolled up, -120 when down
    if (delta > 0 ){
        zoomLevel = zoomLevel + 1;
        if (zoomLevel > 3) {
             zoomLevel = 3;
        }
        document.querySelector("#zoomLevel").value = zoomLevel;
        document.querySelector("#zoomLevel").onchange();
    } else {
        zoomLevel = zoomLevel - 1;
        if (zoomLevel < 0) {
             zoomLevel = 0;
        }
        document.querySelector("#zoomLevel").value = zoomLevel;
        document.querySelector("#zoomLevel").onchange();
    }
}

function zoomIn() {
    var sex = c.sex;
    var newViewBox;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
      newViewBox = "140 73 290 290";
        //shape.setAttribute("viewBox", "140 73 290 290");
    }
    else {
      newViewBox = "225 86 110 110";
        //shape.setAttribute("viewBox", "225 86 110 110");
    }
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", newViewBox);
}

function zoomOut() {
    var sex = c.sex;
    shape = document.getElementById(("svg1"));
    //shape.setAttribute("viewBox", "0 0 560 560");
    //shape.setAttribute("viewBox", "-10 0 580 580"); // Complete view
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", "10 50 540 540"); // Full body view
}

function zoomFace() {
    var sex = c.sex;
    var newViewBox;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
      newViewBox = "240 99 80 80";
        //shape.setAttribute("viewBox", "240 90 80 80");
    } else {
      newViewBox = "243 109 80 80";
        //shape.setAttribute("viewBox", "243 102 80 80");
    }
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", newViewBox);
}

function zoomTorso() {
    var sex = c.sex;
    var newViewBox;
    shape = document.getElementById(("svg1"));// var =  "svg1" or "lg_face", etc.
    if (sex == 'm'){
      newViewBox = "204 85 150 150";
        //shape.setAttribute("viewBox", "204 85 150 150");
    } else {
      newViewBox = "207 97 150 150";
        //shape.setAttribute("viewBox", "207 97 150 150");
    }
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", newViewBox);
}

function zoomBody() {
    var sex = c.sex;
    var newViewBox;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
      newViewBox = "136 73 290 290";
        //shape.setAttribute("viewBox", "136 73 290 290");
    } else {
      newViewBox = "140 84 290 290";
        //shape.setAttribute("viewBox", "140 84 290 290");
    }
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", newViewBox);
}

function zoomFull() {
    var sex = c.sex;
    var newViewBox;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
      newViewBox = "10 50 540 540";
        //shape.setAttribute("viewBox", "10 50 540 540");
    } else {
      newViewBox = "10 50 540 540";
        //shape.setAttribute("viewBox", "10 50 540 540");
    }
    animateZoom(newViewBox);
    //shape.setAttribute("viewBox", newViewBox);
}

function viewBoxZoom(ev) {
    var zoomLevel = ev.target.value;
       //var zoomLevel = document.querySelector("#zoomLevel").value;
     if (zoomLevel == 3){
        zoomFace();
     } else if (zoomLevel == 2){
          zoomTorso();
     } else if (zoomLevel ==1){
          zoomBody();
     } else if (zoomLevel == 0){
         zoomFull();
     }
}

function sectionZoom(sectionLabel) {
    if (sectionLabel === "Head") {zoomFace();}
    if (sectionLabel === "Accessories") {zoomFace();}
    if (sectionLabel === "Torso") {zoomTorso();}
    if (sectionLabel === "Body") {zoomBody();}
    if (sectionLabel === "Legs") {zoomFull();}
    if (sectionLabel === "Feet") {zoomFull();}
}

function animateZoom(newViewBox) {
  newViewBox = newViewBox.split(' ');
  var characterSVG = document.querySelector('#svg1');
  var currentViewBox = characterSVG.viewBox.baseVal;
  var globalID;
  var animationDuration = 200; // Duration of animation in milliseconds;
  var startTime = Date.now();
  var currentTime;
  var timeElapsed;
  var xOld = currentViewBox.x;
  var yOld = currentViewBox.y;
  var widthOld = currentViewBox.width;
  var heightOld = currentViewBox.height;
  var xDiff = newViewBox[0] - currentViewBox.x;
  var yDiff = newViewBox[1] - currentViewBox.y;
  var widthDiff = newViewBox[2] - currentViewBox.width;
  var heightDiff = newViewBox[3] - currentViewBox.height;
  var multiplyer;
  var xNew;
  var yNew;
  var widthNew;
  var heightNew;
  var animateViewBox;
  function repeatOften() {
    currentTime = Date.now();
    timeElapsed = currentTime - startTime;
    multiplyer = timeElapsed / animationDuration;
    if (multiplyer > 1) {multiplyer = 1};
    // Do whatever
    xNew = xOld + (xDiff * multiplyer);
    yNew = yOld + (yDiff * multiplyer);
    widthNew = widthOld + (widthDiff * multiplyer);
    heightNew = heightOld + (heightDiff * multiplyer);
    animateViewBox = xNew + ' ' + yNew + ' ' + widthNew + ' ' + heightNew;
    characterSVG.setAttribute("viewBox", animateViewBox);
    if (timeElapsed >= animationDuration) {
      cancelAnimationFrame(globalID);
      return;
    }
    globalID = requestAnimationFrame(repeatOften);
  }
  globalID = requestAnimationFrame(repeatOften);
}
