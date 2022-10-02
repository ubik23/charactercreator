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
        currentNails = "#nails_short_2_of_2"
        replacementHand = "right_grip"
    }
    if (selectedOption === '') {
        currentHand = "#body_hand_right_grip"
        currentNails = "#nails_short_2_of_2"
        replacementHand = "right_default"
    }

    console.log('currentHand', currentHand)
    removeHandElement("#svg1 " + currentHand)
    removeHandElement("#svg1 " + currentNails)

    // Load correct hand
    loadSectionLayers(["body_hand"], [replacementHand], handCallback, true)
    e
}

function getHandPosition (selectedOption) {
    console.log('getHandPosition', selectedOption)
    var suffixKeywords = ''
    const prefix = 'body_hand' 
    var handPosition = 'body_hand_right_grip'
    // const side = 'right'

    suffixKeywords = getHandPositionKeywords(selectedOption)

    handPosition = prefix + suffixKeywords

    return handPosition
}

function handCallback () {
    // console.log('hand callback', test)
    // get the item we're holding from the hash
    const holdingItem = hash.get('holding')
    var showItem
    console.log('holding >>>>>>', holdingItem)

    if (holdingItem === 'camera' || holdingItem === 'pad' || holdingItem === 'boom_mic') {
        showItem = '#body_hand_right_grip'
    }
    if (holdingItem === undefined) {
        showItem = '#body_hand_right_default'
    }

    document.querySelector(showItem).style = "opacity:1;"
}

function removeHandElement (id) {
    console.log('removeHandElement id', id)
    const el = document.querySelector(id)
    if (el) {
        el.remove()
    }
}

function checkHolding () {
    console.log('Check Holding Werx yo!!')
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