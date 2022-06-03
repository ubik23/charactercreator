function resizeHead (ev) {
    var headSize = ev.target.value
    var hashArgs = {}

    hashArgs['headsize'] = headSize
    hash.add(hashArgs)
    
    applyHeadResize(headSize)
}

function applyHeadResize (headSize) {
    var headElements = document.querySelectorAll('.js-head-element')
    var counter = headElements.length
    var scaleValue = 1 + (headSize / 10)
    var horizontalCompensation = (headSize * -28.17)
    var verticalCompensation = (headSize * -15.5)

    if (headSize === 0) {
        horizontalCompensation = 0
        verticalCompensation = 0
    }

    console.log('counter', counter)

    while(counter--) {
        headElements[counter].setAttribute('transform',  'matrix(' + scaleValue + ',0,0,' + scaleValue + ',' + horizontalCompensation + ',' + verticalCompensation + ')')
    }
}

function setHeadSizeSlider (headSize) {
    console.log('setHeadSizeSlider')
    document.querySelector('#head-size-slider').value = headSize
}

function checkHeadSize () {
    var headSize = hash.get('headsize')

    if (headSize > 0) {
        setTimeout(function(){
            console.log('Head Size Timeout')
            setHeadSizeSlider (headSize)
            applyHeadResize (headSize)
          }, 500)
    }

}