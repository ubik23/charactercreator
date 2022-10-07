function showHandPosition (selectedOption, previousHolding) {
    // console.log('showHandPosition selectedOption', selectedOption)
    // console.log('Holding', selectedOption)
    // TODO
    // Check for male/femal template
    // And for each body position
    // And finally for left/right hand

    // Determine what the current hand position to be replaced is
    // remove current hand
    // const sex = getSex()
    let currentHand
    let currentNails
    let replacementHand
    let replacementNails

    const previousKeywords = getHandPositionKeywords(previousHolding)
    const replacementKeywords = getHandPositionKeywords(selectedOption)
    //const side = 'right'

    console.log('previous hand position', previousHolding)
    
    
    
    currentHand = "#body_hand_right_" + previousKeywords
    currentNails = "#nails_short_right_" + previousKeywords
    replacementHand = "right_" + replacementKeywords

    // console.log('currentHand', currentHand)
    removeElement("#svg1 " + currentHand)
    removeElement("#svg1 " + currentNails)

    // Load correct hand
    loadSectionLayers(["body_hand"], [replacementHand], handCallback, true)
    loadSectionLayers(["nails_short"], [replacementHand], handCallback, true)
}

function getHandPosition (selectedOption) {
    console.log('getHandPosition', selectedOption)
    var suffixKeywords = ''
    const prefix = 'body_hand_right_' 
    const side = 'right'

    suffixKeywords = getHandPositionKeywords(selectedOption)

    handPosition = prefix + suffixKeywords

    return handPosition
}

function handCallback () {
    // console.log('hand callback', test)
    // get the item we're holding from the hash
    const visibleStyle = "opacity:1;pointer-events: auto;"
    const holdingItem = hash.get('holding')
    var showHand, showNails
    // console.log('holding >>>>>>', holdingItem)
    const keywords = getHandPositionKeywords(holdingItem)


    showHand = '#body_hand_right_' + keywords
    showNails = '#nails_short_right_' + keywords

    document.querySelector(showHand).style = visibleStyle
    document.querySelector(showNails).style = visibleStyle
}

function removeElement (id) {
    // console.log('removeElement id', id)
    const el = document.querySelector(id)
    if (el) {
        el.remove()
    }
}

//function checkHolding () {
    // console.log('Check Holding')
    //const holdingItem = hash.get('holding')
    //if (holdinItem != '') {
        //getHandPosition(holdingItem)
    //}
//}

function getHandPositionKeywords (selectedOption) {
    // console.log('getHandPositionKeywords')
    let position
    let keywords =  ''
    // get sex of character
    const sex = hash.get('sex')
    // if statements to concatenate keywords to string
    if (sex === 'f') {
        if (selectedOption === 'camera' || selectedOption === 'boom_mic' || selectedOption === 'pad') {
            position = 'grip'
        }
        if (selectedOption === '' || selectedOption === undefined) {
            position = 'default'
        }
    }
    if (sex === 'm') {
        if (selectedOption === 'camera' || selectedOption === 'boom_mic' || selectedOption === 'pad') {
            position = 'default'
        }
        if (selectedOption === '' || selectedOption === undefined) {
            position = 'default'
        }
    }

    keywords =  position

    return keywords
}