function showHandPosition (selectedOption) {
    console.log('showHandPosition selectedOption', selectedOption)
    // console.log('Holding', selectedOption)
    // TODO
    // Check for male/femal template
    // And for each body position
    // And finally for left/right hand

    // Determine what the current hand position to be replaced is
    // remove current hand
    // const sex = getSex()
    var currentHand
    var currentNails
    var replacementHand
    var replacementNails
    //const side = 'right'
    
    if (selectedOption === 'camera' || selectedOption === 'boom_mic' || selectedOption === 'pad') {
        currentHand = "#body_hand_right_default"
        currentNails = "#nails_short_right_default"
        replacementHand = "right_grip"
    }
    if (selectedOption === '') {
        currentHand = "#body_hand_right_grip"
        currentNails = "#nails_short_right_grip"
        replacementHand = "right_default"
    }

    console.log('currentHand', currentHand)
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
    // const side = 'right'

    suffixKeywords = getHandPositionKeywords(selectedOption)

    handPosition = prefix + suffixKeywords

    return handPosition
}

function handCallback () {
    // console.log('hand callback', test)
    // get the item we're holding from the hash
    const holdingItem = hash.get('holding')
    var showHand, showNails
    console.log('holding >>>>>>', holdingItem)

    if (holdingItem === 'camera' || holdingItem === 'pad' || holdingItem === 'boom_mic') {
        showHand = '#body_hand_right_grip'
        showNails = '#nails_short_right_grip'
    }
    if (holdingItem === undefined) {
        showHand = '#body_hand_right_default'
        showNails = '#nails_short_right_default'
    }

    document.querySelector(showHand).style = "opacity:1;"
    document.querySelector(showNails).style = "opacity:1;"
}

function removeElement (id) {
    console.log('removeElement id', id)
    const el = document.querySelector(id)
    if (el) {
        el.remove()
    }
}

function checkHolding () {
    console.log('Check Holding')
    const holdingItem = hash.get('holding')
    if (holdinItem != '') {
        getHandPosition(holdingItem)
    }
}

function getHandPositionKeywords (selectedOption) {
    console.log('getHandPositionKeywords')
    var position = 'grip'
    var keywords =  ''
    // if statements to concatenate keywords to string
    if (selectedOption === 'camera' || selectedOption === 'boom_mic' || selectedOption === 'pad') {
        position = 'grip'
    }
    if (selectedOption === '' || selectedOption === undefined) {
        position = 'default'
    }

    keywords =  position

    return keywords
}