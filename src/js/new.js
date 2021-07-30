
function getNewItemList() {

  const allCookies = Cookies.get()
  console.log("All Cookies", allCookies)

  var newItemsMale = []
  var newItemsFemale = [['legs', 'skirt', 'highfashion'], ['torso', 'shirt', 'collar'], ['torso', 'shirt', 'sleeveless_sfl']]
  const sex = window.c.choices.sex
  var newItems

  if (sex === 'm') {
    newItems = newItemsMale
  } else if (sex === 'f') {
    newItems = newItemsFemale
  }
  return newItems
}

function removeFromNew(category, section, item) {
  console.log([category, section, item])
  // TODO use cookies to track seen items
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
