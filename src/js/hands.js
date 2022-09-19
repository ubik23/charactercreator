function getHandPosition (selectedOption) {
    console.log('Holding', selectedOption)
    // TODO
    // Check for male/femal template
    // And for each body position
    // And finally for left/right hand

    // Determine what the current hand position to be replaced is
    // remove current hand
    var currentHand = "#body_hand_right_default"
    var replacementHand = ""

    console.log('currentHand', currentHand)
    document.querySelector("#svg1 " + currentHand).remove()


    // Load correct hand

    
}