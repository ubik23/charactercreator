function download(filename = 'my_character.svg') {
        //var text = document.getElementById('svg1').innerHTML;
        var text = text || '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="560" height="560" id="character">\n';
        var svgRaw = document.getElementById('svg1').childNodes;
        //This previous version of the text contains all svg files shown and hidden
        //It will need to be filtered to keep only the layers needed for our purpose
        var svgNodes = Array.prototype.slice.call(svgRaw);

        svgNodes.forEach(function(item){
            if (item.style != undefined){
                if (item.style.opacity != 0){
                    //console.log(item.childNodes);
                    //text.concat(item.childNodes.innerHTML);
                    var svgArray = Array.prototype.slice.call(item.childNodes);
                    for (var el in svgArray) {
                        //console.log(text);
                        //console.log(svgArray[el].innerHTML);
                        var newString = svgArray[el].innerHTML;
                        if (newString != undefined && newString != "" && newString != "Created with Snap"){
                            newString = newString.trim();
                            if (newString.slice(0,9) != "<rdf:rdf>"){
                                text += newString;
                            }
                        }
                    }
                } else {
                    //console.log('undefined', item)
                }
            }
        });
        text += '</svg>';
        //console.log(text);
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
