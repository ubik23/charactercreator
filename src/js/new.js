
function getNewItemList() {
  var newItemsMale = []
  var newItemsFemale = [['legs', 'skirt', 'highfashion'], ['torso', 'shirt', 'collar'], ['torso', 'shirt', 'sleeveless_sfl']]

  var newItems = newItemsFemale

  return newItems
}

function isNewInCategory (cat) {

  var verdict = false
  var newClass = ''
  var newItems = getNewItemList()
  var counter = newItems.length

  while (verdict === false && counter-- ) {
    if (cat === capitalizeFirstLetter(newItems[counter][0])) {
      verdict = true
    }
  }
  if (verdict) {
    newClass = ' new'
  }
  return newClass
}

function isNewInSection (cat, section) {

  var verdict = false
  var newClass = ''
  var newItems = getNewItemList()
  var counter = newItems.length

  while (verdict === false && counter-- ) {
    if ( cat === capitalizeFirstLetter(newItems[counter][0]) && section === capitalizeFirstLetter(newItems[counter][1])) {
      verdict = true
    }
  }
  if (verdict) {
    newClass = ' new'
  }
  return newClass
}

function isNew(section, item) {
  var verdict = false
  var newClass = ''
  var newItems = getNewItemList()
  var counter = newItems.length

  while (verdict === false && counter-- ) {

    if ( capitalizeFirstLetter(section) === capitalizeFirstLetter(newItems[counter][1]) && item === newItems[counter][2] ) {
      verdict = true
    }
  }
  if (verdict) {
    newClass = ' new'
  }
  return newClass
}


function addNewLabel() {
  const newItems = getNewItemList()
  // Loop each item
  // Add a className to the category
  // Add a className to the sectionName
  // Add a className to the thumbnail

}

function removeNewLabel() {

}
