
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
  console.log('sectionId', sectionId);
  var pallette = {};
  var files = [];
  var counter;
  var el;

  if (sectionId === 'body') {
    files = getAllBodyLayers();
  } else {
    files = getSectionLayersList(sectionId);
    files = replaceMultilayer(files, sectionId);
  }
  console.log('files', files);

  counter = files.length;

  while(counter--) {
    el = document.querySelector('#svg1 #' + files[counter] + ' .skin');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.skin = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .lips');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.lips = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .alpha');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.alpha = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .beta');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.beta = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .gamma');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.gamma = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .delta');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.delta = el.style.fill;
    }
    el = document.querySelector('#svg1 #' + files[counter] + ' .epsilon');
    if (el != null && el.style != null && el.style.fill != null) {
      pallette.epsilon = el.style.fill;
    }
  }
  console.log('pallette', pallette);
  // Get all the options in the section.
  // Go through them all,
  // Noting all the color classes within them.
  // Start with skin color, then do the lips, followed by the greek alphabet.
  // Be sure to leave out the absentees, but double-check using the suffixes,
  // and make calculations to deduce the base color.
  // Order them and display them visually in painted rectangles.
  // Clicking the rectangles resets the colorpicker if different from current color.
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
