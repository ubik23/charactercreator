function download() {
    console.log('Download');
    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Download', eventLabel: 'Download SVG file of character'});
    var filename = "my_character.svg";
    var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->\n<svg xmlns="http://www.w3.org/2000/svg" id="character" width="560" height="560">\n'
    var svgRaw = document.getElementById('svg1').childNodes;
    console.log('svgRaw', svgRaw);

    //This previous version of the text contains all svg files shown and hidden
    //It will need to be filtered to keep only the layers needed for our purpose
    if (currentUser && currentUser.cc.personnageActuel !== ''){
        filename = currentUser.cc.personnageActuel + ".svg";
    }
    var svgNodes = Array.prototype.slice.call(svgRaw);
    console.log('svgNodes', svgNodes);
    svgNodes.forEach(function(item){
      if (item.innerHTML != undefined) {
            //This removes only useless layers and allows us to o the next test.
            console.log('item', item);
            console.log('item.innerHTML', item.innerHTML);
            if (!item.style || !item.style.opacity || item.style.opacity != 0){
                var svgString = item.innerHTML;
                if (svgString.slice(-43) === "<desc>Created with Snap</desc><defs></defs>"){
                    svgString = svgString.slice(0, -43);
                };
                text += svgString;
            } else {
            };
      }
    });
    text += '</svg>';
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
