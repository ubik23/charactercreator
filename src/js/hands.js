function getHandPosition (selectedOption) {
    // console.log('Holding', selectedOption)
    // TODO
    // Check for male/femal template
    // And for each body position
    // And finally for left/right hand

    // Determine what the current hand position to be replaced is
    // remove current hand
    var currentHand
    var currentNails
    var replacementHand
    var replacementNails

    if (selectedOption === 'camera') {
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
    
}

function handCallback () {
    // console.log('hand callback', test)
    // get the item we're holding from the hash
    const holdingItem = hash.get('holding')
    var showItem
    console.log('holding >>>>>>', holdingItem)

    if (holdingItem === 'camera') {
        showItem = '#body_hand_right_grip'
    }
    if (holdingItem === undefined) {
        showItem = '#body_hand_right_default'
    }

    document.querySelector(showItem).style = "opacity:1;"
}

function removeHandElement (id) {
    const el = document.querySelector(id)
    if (el) {
        el.remove()
    }
}