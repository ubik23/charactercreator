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
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
    var start = Date.now()
    console.log('applyHeadResize>>>currentHeadSize', currentHeadSize)
    const animDur = 250 // Duration in milliseconds for the changing head size animation
    let previousTimeStamp
    let done = false
    var myReq

    if (headSize === 0) {
        horizontalCompensation = 0
        verticalCompensation = 0
    }


    function stepHeadResize(timestamp) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>stepHeadResize')
        const elapsed = Date.now() - start
        const horizontalOffset = -28.17
        const verticalOffset = -15.5
        let counter, scaleValue, horizontalCompensation, verticalCompensation, animHeadSize
        let headElements = document.querySelectorAll('#svg1 .js-head-element')

        // if (start === undefined) {
        //     console.log('!!!!!!! START !!!!!!!!')
        //     start = timestamp
        // }

        // animHeadSize = currentHeadSize + (headSize - currentHeadSize * (elapsed / animDur))
        animHeadSize = Number(currentHeadSize) + (elapsed / animDur)
        horizontalCompensation = (animHeadSize * horizontalOffset)
        verticalCompensation = (animHeadSize * verticalOffset)
        scaleValue = 1 + (animHeadSize / 10)

        // console.log('start', start)
        // console.log('timestamp', Date.now())
        // console.log('elapsed', elapsed)
        // console.log('animDur', animDur)
        console.log('elapsed / animDur', (elapsed / animDur))
        // console.log('headSize', headSize)
        console.log('currentHeadSize', currentHeadSize)
        // console.log('headSize - currentHeadSize', headSize - currentHeadSize)
        console.log('animHeadSize', animHeadSize)
        // console.log('scaleValue', scaleValue)
        

        // Math.min() is used here to make sure the element stops at exactly 200px
    //     const count = Math.min(0.1 * elapsed, 200);
    //     element.style.transform = 'translateX(' + count + 'px)';
    //     if (count === 200) done = true;
        counter = headElements.length

        while(counter--) {
            // animHeadSize = (currentHeadSize + ((headSize - currentHeadSize) * (elapsed / animDur))) / 10
            // n = 0 + ((0 - 1 ( * (125 / 250)))/10)

            headElements[counter].setAttribute('transform',  'matrix(' + scaleValue + ',0,0,' + scaleValue + ',' + horizontalCompensation + ',' + verticalCompensation + ')')
        }

        
        if (elapsed < animDur) { // Stop the animation after the set duration
        // previousTimeStamp = timestamp
        // !done && window.requestAnimationFrame(stepHeadResize)
        // console.log('!done')
        requestAnimationFrame(stepHeadResize)
        } else {
        cancelAnimationFrame(stepHeadResize)
        }
    }

    requestAnimationFrame(stepHeadResize)

    // cancelAnimationFrame(myReq)
    currentHeadSize = headSize
    console.log('End animation, currentHeadSize is now ', currentHeadSize)
    ///////////////////////////////////////////////////////////////////////

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