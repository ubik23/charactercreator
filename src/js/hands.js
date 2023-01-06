function showHandPosition (selectedOption, previousHolding) {
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
    let nailsOption = hash.get('nails') || 'short'

    console.log("nails option >>>---", nailsOption)

    const previousKeywords = getHandPositionKeywords(previousHolding)
    const replacementKeywords = getHandPositionKeywords(selectedOption)
    //const side = 'right'

    currentHand = "#body_hand_right_" + previousKeywords
    currentNails = "#nails_" + nailsOption + "_right_" + previousKeywords
    replacementHand = "right_" + replacementKeywords

    removeElement("#svg1 " + currentHand)
    removeElement("#svg1 " + currentNails)

    // Load correct hand
    loadSectionLayers(["body_hand"], [replacementHand], handCallback, true)
    loadSectionLayers(["nails_" + nailsOption], [replacementHand], handCallback, true)
}

function getHandPosition (selectedOption) {
    var suffixKeywords = ''
    const side = 'right'
    const prefix = 'body_hand_' + side + '_' 
    

    suffixKeywords = getHandPositionKeywords(selectedOption)

    handPosition = prefix + suffixKeywords

    return handPosition
}

function handCallback () {
    // get the item we're holding from the hash
    const visibleStyle = "opacity:1;pointer-events: auto;"
    const holdingItem = getHoldingItem()
    var showHand, showNails
    const keywords = getHandPositionKeywords(holdingItem)
    let nailsOption = hash.get('nails') || 'short'


    showHand = '#body_hand_right_' + keywords
    showNails = '#nails_' + nailsOption + '_right_' + keywords

    document.querySelector(showHand).style = visibleStyle
    document.querySelector(showNails).style = visibleStyle
}

function removeElement (id) {
    const el = document.querySelector(id)
    if (el) {
        el.remove()
    }
}

//function checkHolding () {
    //const holdingItem = hash.get('holding')
    //if (holdinItem != '') {
        //getHandPosition(holdingItem)
    //}
//}

function getHandPositionKeywords (selectedOption) {
    let position
    let keywords =  ''
    // get sex of character
    const sex = hash.get('sex')
    // if statements to concatenate keywords to string
    if (sex === 'f') {
        if (selectedOption === 'book_address' || selectedOption === 'camera' || selectedOption === 'camera_photo' || selectedOption === 'boom_mic' || selectedOption === 'ipad' || selectedOption === 'pad') {
            position = 'grip'
        }
        if (selectedOption === '' || selectedOption === undefined) {
            position = 'default'
        }
    }
    if (sex === 'm') {
        if (selectedOption === 'book_address' || selectedOption === 'camera' || selectedOption === 'camera_photo' || selectedOption === 'boom_mic' || selectedOption === 'ipad' || selectedOption === 'pad') {
            position = 'default'
        }
        if (selectedOption === '' || selectedOption === undefined) {
            position = 'default'
        }
    }

    keywords =  position

    return keywords
}

function getNailsLayers (option) {
    console.log('getNailsLayers, option:', option)
    var nailsLayers = []
    var holdingItem = getHoldingItem()
    var handPosition = getHandPositionKeywords(holdingItem)

    console.log('getNailsLayers handPosition', handPosition)

    nailsLayers = nailsLayers.concat(['nails_' + option + '_left_' + 'default'])
    nailsLayers = nailsLayers.concat(['nails_' + option + '_right_' + handPosition])
    console.log('nailsLayers]', nailsLayers)

    return nailsLayers
}

function getHoldingItem () {
    var holdingItem = hash.get('holding')

    return holdingItem
}

function addHandSidePositionToList (list) {
    let newList = []
    let positionKeyword = getHandPositionKeywords(getHoldingItem())
    listCounter = list.length
    itemsChangedByHandPosition = ['nails', 'gloves']

    while(listCounter--) {
        console.log('list[listCounter]', list[listCounter])
        if (list[listCounter] != '') {
            newList.push(list[listCounter] + '_right_' + positionKeyword)
            newList.push(list[listCounter] + '_left_' + 'default')
          } else {
            newList.push(list[listCounter] )
          }
    }
    console.log('newList', newList)

    return newList
}