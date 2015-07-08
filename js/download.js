function download(filename = 'my_character.svg') {
        //var text = document.getElementById('svg1').innerHTML;
        //var text = text || '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="560" height="560" id="character">\n';
        var text = '<!-- ?xml version="1.0" encoding="UTF-8" standalone="no"? -->\n<svg xmlns="http://www.w3.org/2000/svg" id="character" width="560" height="560">\n'
        var svgRaw = document.getElementById('svg1').childNodes;
        //This previous version of the text contains all svg files shown and hidden
        //It will need to be filtered to keep only the layers needed for our purpose
        var svgNodes = Array.prototype.slice.call(svgRaw);
        svgNodes.forEach(function(item){
            //console.log(item.style);
            //This is where we start filtering the nodes so that we can append themm into our downloaded file.
            //
            if (item.style != undefined){
                //This removes only useless layers and allows us to o the next test.
                if (item.style.opacity != 0){
                    //console.log( item);
                    console.log(item.innerHTML);
                    var svgString = item.innerHTML;
                    console.log(svgString.slice(-43));
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
