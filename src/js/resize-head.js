function resizeHead (ev) {
    ev.preventDefault()
    var headSize = ev.target.value
    var hashArgs = {}

    hashArgs['headsize'] = headSize
    hash.add(hashArgs)
    c.choices.headSize = headSize
    
    applyHeadResize(headSize)
}

function applyHeadResize (headSize) {
    var headElements = document.querySelectorAll('#svg1 .js-head-element')
    var counter = headElements.length
    var scaleValue = 1 + (headSize / 10)
    var horizontalCompensation = (headSize * -28.17)
    var verticalCompensation = (headSize * -15.5)

    if (headSize === 0) {
        horizontalCompensation = 0
        verticalCompensation = 0
    }

    while(counter--) {
        headElements[counter].setAttribute('transform',  'matrix(' + scaleValue + ',0,0,' + scaleValue + ',' + horizontalCompensation + ',' + verticalCompensation + ')')
    }
}

function setHeadSizeSlider (headSize) {
    var slider = document.querySelector('#head-size-slider')
    if (slider.value != headSize) {
        slider.value = headSize
    }
}

function checkHeadSize () {
    var headSize = hash.get('headsize') || c.choices.headSize

    if (headSize > 0) {
        setTimeout(function(){
            setHeadSizeSlider (headSize)
            applyHeadResize (headSize)
          }, 500)
    }

}