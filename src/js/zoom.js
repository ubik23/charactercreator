
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
    var sex = c.sex;
    shape = document.getElementById(("svg1"));
    //shape.setAttribute("viewBox", "0 0 560 560");
    //shape.setAttribute("viewBox", "-10 0 580 580"); // Complete view
    shape.setAttribute("viewBox", "10 50 540 540"); // Full body view
}

function zoomFace() {
    var sex = c.sex;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "240 90 80 80");
    } else {
        shape.setAttribute("viewBox", "243 102 80 80");
    }
}

function zoomTorso() {
    var sex = c.sex;
    shape = document.getElementById(("svg1"));// var =  "svg1" or "lg_face", etc.
    if (sex == 'm'){
        shape.setAttribute("viewBox", "204 85 150 150");
    } else {
        shape.setAttribute("viewBox", "207 97 150 150");
    }
}

function zoomBody() {
    var sex = c.sex;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "136 73 290 290");
    } else {
        shape.setAttribute("viewBox", "140 84 290 290");
    }
}

function zoomFull() {
    var sex = c.sex;
    shape = document.getElementById(("svg1"));
    if (sex == 'm'){
        shape.setAttribute("viewBox", "10 50 540 540");
    } else {
        shape.setAttribute("viewBox", "10 50 540 540");
    }
}

function viewBoxZoom() {
     var zoomLevel = document.querySelector("#zoomLevel").value;
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
