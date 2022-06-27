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
    console.log('>>>currentHeadSize', currentHeadSize)
    const animDur = 250 // Duration in milliseconds for the changing head size animation
    let start, previousTimeStamp
    let done = false

    if (headSize === 0) {
        horizontalCompensation = 0
        verticalCompensation = 0
    }

    function stepHeadResize(timestamp) {
        const horizontalOffset = -28.17
        const verticalOffset = -15.5
        let headElements, counter, scaleValue, horizontalCompensation, verticalCompensation, animHeadSize
        

        if (start === undefined) {
            start = timestamp
        }

        const elapsed = timestamp - start

        if (previousTimeStamp !== timestamp) {
            console.log('elapsed', elapsed)
            headElements = document.querySelectorAll('#svg1 .js-head-element')
            counter = headElements.length
            

            // Math.min() is used here to make sure the element stops at exactly 200px
        //     const count = Math.min(0.1 * elapsed, 200);
        //     element.style.transform = 'translateX(' + count + 'px)';
        //     if (count === 200) done = true;

            while(counter--) {
                // animHeadSize = (currentHeadSize + ((headSize - currentHeadSize) * (elapsed / animDur))) / 10
                // n = 0 + ((0 - 1 ( * (125 / 250)))/10)
                console.log('currentHeadSize', currentHeadSize)
                animHeadSize = currentHeadSize + ((headSize - currentHeadSize * (elapsed / animDur)))
                console.log('animHeadSize', animHeadSize)
                scaleValue = 1 + (animHeadSize / 10)
                console.log('scaleValue', scaleValue)
                horizontalCompensation = (animHeadSize * horizontalOffset)
                verticalCompensation = (animHeadSize * verticalOffset)

                headElements[counter].setAttribute('transform',  'matrix(' + scaleValue + ',0,0,' + scaleValue + ',' + horizontalCompensation + ',' + verticalCompensation + ')')
            }

          }
        
          if (elapsed < animDur) { // Stop the animation after the set duration
            previousTimeStamp = timestamp
            !done && window.requestAnimationFrame(stepHeadResize);
          }
    }

    window.requestAnimationFrame(stepHeadResize);

    // currentHeadSize = headSize
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