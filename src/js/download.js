function download() {
    ga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Download', eventLabel: 'Download SVG file of character'});
    var filename = "my_character.svg";
    var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->\n<svg xmlns="http://www.w3.org/2000/svg" id="character" width="560" height="560">\n'
    var svgRaw = document.getElementById('svg1').childNodes;
    //This previous version of the text contains all svg files shown and hidden
    //It will need to be filtered to keep only the layers needed for our purpose
    if (currentUser && currentUser.cc.personnageActuel !== ''){
        filename = currentUser.cc.personnageActuel + ".svg";
    }
    var svgNodes = Array.prototype.slice.call(svgRaw);
    svgNodes.forEach(function(item){
        //This is where we start filtering the nodes so that we can append them into our downloaded file.
        if (item.style != undefined){
            //This removes only useless layers and allows us to o the next test.
            if (item.style.opacity != 0){
                var svgString = item.innerHTML;
                if (svgString.slice(-43) === "<desc>Created with Snap</desc><defs></defs>"){
                    svgString = svgString.slice(0, -43);
                };
                text += svgString;
            } else {
            };
        } else {
        };
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
