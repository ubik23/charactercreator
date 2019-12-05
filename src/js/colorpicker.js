
function addColorPicker() {
  var section = document.querySelector('.section--selected').innerHTML.toLowerCase();
  getPallette(section);
  getColor(section);
}

function hideColorPicker() {
    var colorPicker  = document.querySelector('.colorpicker-wrapper');
    if (colorPicker && !colorPicker.classList.contains('section--hide')) {
      colorPicker.classList.add('section--hide');
    }
}

function getPallette(sectionId) {
  var pallette = {};
  var files = [];
  var counter;
  var el;
  var emotions;
  var categories = ['skin', 'lips', 'alpha', 'beta', 'gamma', 'delta', 'epsilon'];
  var catCounter;

  if (sectionId === 'body') {
    files = getAllBodyLayers();

  } else if (sectionId === 'mouth') {
    emotions = getSectionLayersList('emotion');
    counter = emotions.length;
    while (counter--) {
      files.push(sectionId + '_' + emotions[counter]);
    }

  } else {
    files = getSectionLayersList(sectionId);
    files = replaceMultilayer(files, sectionId);
  }

  counter = files.length;

  while(counter--) {
    catCounter = categories.length;

    while (catCounter--) {
      el = document.querySelector('#svg1 #' + files[counter] + ' .' + categories[catCounter]);
      if (el != null && el.style != null && el.style.fill != null) {
        pallette[categories[catCounter]] = el.style.fill;
      }
    }
  }

  return pallette;
}

function getColor(sectionId) {
    clearPicker();
    var id = sectionId;
    var slide = document.getElementById('slide');
    var picker = document.getElementById('picker');
    var section = document.querySelector('.section-id');
    var wrapper = document.querySelector(".colorpicker-wrapper");
    section.innerHTML = id;
    try {
      ColorPicker(
          slide,
          picker,
          function(hex, hsv, rgb) {
              colorize(id, hex);
          });
    } catch(error) {
      console.error(error);
    }
}

function emptyPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '';
}

function clearPicker() {
    var wrapper = document.querySelector(".colorpicker-wrapper");
    wrapper.innerHTML = '<div class="colorpicker-controls"><span class="section-id"></span></div><div class="colorpicker-align"><div id="picker" style="background-color:rgb(255,0,0);"></div><div id="slide"></div></div>';
}
