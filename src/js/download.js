
function getSVG() {
  var includeGroups = false; //TODO
  var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  id="character" width="560" height="560">\n'
  var svgRaw = document.getElementById('svg1').childNodes;
  var svgNodes;
  var svgString;
  var event;

  //This previous version of the text contains all svg files shown and hidden
  //It will need to be filtered to keep only the layers needed for our purpose
  if (currentUser && currentUser.cc.personnageActuel !== ''){
      filename = currentUser.cc.personnageActuel + ".svg";
  }

  svgNodes = Array.prototype.slice.call(svgRaw);

  svgNodes.forEach(function(item){
    if (item.innerHTML != undefined) {
          // This removes only useless layers and allows us to o the next test.
          if (!item.style || !item.style.opacity || item.style.opacity != 0){
              svgString = item.innerHTML;
              text += svgString;
          } else {
          };
    }
  });

  text += '</svg>';
  return text;
}

function download() {
    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Download', eventLabel: 'Download SVG file of character'});
    // TODO make the filename the character's name if possible.
    var filename = "my_character.svg";
    var pom;
    var text = getSVG();

    pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }

    else {
        pom.click();
    }
    caboose();
}
