function getNewItemList() {
  // window.localStorage.clear() // Uncomment to reset new items
  var newItemsMaleTemp = []
  var newItemsFemaleTemp = []

  var newItemsMale = []
  var newItemsFemale = []

  newItemsFemaleTemp.forEach((x) => {
    const cookieName = ["seen-item", "f", x[0], x[1], x[2]].join("---")
    if (!window.localStorage.getItem(cookieName)) {
      newItemsFemale.push(x)
    }

  })

  newItemsMaleTemp.forEach((x) => {
    const cookieName = ["seen-item", "m", x[0], x[1], x[2]].join("---")
    if (!window.localStorage.getItem(cookieName)) {
      newItemsMale.push(x)
    }
  })

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
  window.localStorage.setItem(["seen-item", window.c.choices.sex, category, section, item].join("---"), "seen")
}

function isNewInCategory(cat) {
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

function isNewInSection(cat, section) {
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
