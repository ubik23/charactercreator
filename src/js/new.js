
function getNewItemList() {
  console.log('getNewItemList')
  var newItemsMale = []
  var newItemsFemale = [['legs', 'skirt', 'highfashion'], ['torso', 'shirt', 'sleeveless']]

  var newItems = newItemsFemale

  return newItems
}

function isNewInCategory (cat) {
  console.log('cat >>>', cat)
  var verdict = false
  var newClass = ''
  var newItems = getNewItemList()
  var counter = newItems.length

  while (verdict === false && counter-- ) {
    console.log('newItems[counter][0]', newItems[counter][0])
    if (cat === capitalizeFirstLetter(newItems[counter][0])) {
      verdict = true
    }
  }
  if (verdict) {
    newClass = ' new'
  }
  return newClass
}

function isNew(item) {
  var verdict = false
  var newItems = getNewItemList()
  var counter = newItems.length()

  while (verdict === false && counter-- ) {

  }
  return verdict
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
