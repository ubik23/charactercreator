function resizeHead (ev) {
    ev.preventDefault()
    var headSize = ev.target.value
    var hashArgs = {}

    hashArgs['headsize'] = headSize
    hash.add(hashArgs)
    // TODO replace "c" variable with currentCharacter variable
    c.choices.headSize = headSize
    
    applyHeadResize(headSize)
}

function applyHeadResize (headSize) {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
    var start = Date.now()
    const animDur = 250 // Duration in milliseconds for the changing head size animation
    let previousTimeStamp
    let done = false
    var myReq

    if (headSize === 0) {
        horizontalCompensation = 0
        verticalCompensation = 0
    }

    // Recursive requestAnimationFrame function to animate resizing of head
    function stepHeadResize(timestamp) {
        let elapsed = Date.now() - start
        const horizontalOffset = -28.17
        const verticalOffset = -15 // Was 15.5
        let counter, scaleValue, horizontalCompensation, verticalCompensation, animHeadSize
        let headElements = document.querySelectorAll('#svg1 .js-head-element')

        if (elapsed > animDur) { elapsed = animDur}

        if (headSize > currentHeadSize) {
            animHeadSize = Number(currentHeadSize) + ((Number(headSize) - Number(currentHeadSize)) * (elapsed / animDur))
        } else {
            animHeadSize = Number(headSize) + ((Number(currentHeadSize) - Number(headSize)) * (1 - (elapsed / animDur)))
        }
        
        horizontalCompensation = (animHeadSize * horizontalOffset)
        verticalCompensation = (animHeadSize * verticalOffset)
        scaleValue = 1 + (animHeadSize / 10)
        counter = headElements.length

        while(counter--) {
            headElements[counter].setAttribute('transform',  'matrix(' + scaleValue + ',0,0,' + scaleValue + ',' + horizontalCompensation + ',' + verticalCompensation + ')')
        }
        
        if (elapsed < animDur) { // Stop the animation after the set duration
            requestAnimationFrame(stepHeadResize)
        } else {
            currentHeadSize = headSize
            cancelAnimationFrame(stepHeadResize)
        }
    }

    requestAnimationFrame(stepHeadResize)
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