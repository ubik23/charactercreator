
function addColorPicker() {
  var section = document.querySelector('.section--selected').innerHTML.toLowerCase();
  getColor(section);
}

function hideColorPicker() {
    var colorPicker  = document.querySelector('.colorpicker-wrapper');
    if (colorPicker && !colorPicker.classList.contains('section--hide')) {
      colorPicker.classList.add('section--hide');
    }
}

function getColor(sectionId) {
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
