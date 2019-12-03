
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
  console.log('getPallette', sectionId);
  console.log('getOptions', getOptions(sectionId));
  // var options = getOptions(sectionId);
  var layers = getSectionLayersList(sectionId);
  layers = replaceMultilayer(layers, sectionId);
  var counter = layers.length;
  var el;
  console.log('layers', layers);
  while(counter--) {
    console.log('option', '#svg1 #' + layers[counter]);
    el = document.querySelector('#svg1 #' + layers[counter] + ' .skin');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('skin', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .lips');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('lips', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .alpha');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('alpha', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .beta');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('beta', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .gamma');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('gamma', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .delta');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('delta', el.style.fill);
    }
    el = document.querySelector('#svg1 #' + layers[counter] + ' .epsilon');
    if (el != null && el.style != null && el.style.fill != null) {
      console.log('epsilon', el.style.fill);
    }
  }
  // Get all the options in the section.
  // Go through them all,
  // Noting all the color classes within them.
  // Start with skin color, then do the lips, followed by the greek alphabet.
  // Be sure to leave out the absentees, but double-check using the suffixes,
  // and make calculations to deduce the base color.
  // Order them and display them visually in painted rectangles.
  // Clicking the rectangles resets the colorpicker.
}

function getColor(sectionId) {
    console.log('getColor', sectionId);
    clearPicker();
    var id = sectionId;
    var slide = document.getElementById('slide');
    var picker = document.getElementById('picker');
    var section = document.querySelector('.section-id');
    var wrapper = document.querySelector(".colorpicker-wrapper");
    section.innerHTML = id;
    console.log('id', id);
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
