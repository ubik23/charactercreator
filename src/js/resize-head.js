function resizeHead (ev) {
    var slider = ev.target.value
    var headElements = document.querySelectorAll('.js-head-element')
    var counter = headElements.length
    var scaleValue = 1.2
    while(counter--) {
        headElements[counter].setAttribute('transform',  'scale(1.2)')
    }
}