"use strict"

function parseHash (forms, skinLayers, hairLayers) {
  newParseHash()

  var formsLength = forms.length
  var formsCounter = formsLength
  var hashColor
  var hashColorBeta
  var hashColorGamma
  var hashColorDelta
  var hashColorEpsilon
  var headSize

  while (formsCounter--) {
    var f = formsLength - formsCounter - 1

    for (var x in forms[f]) {
      var section = x.toLowerCase()
      var id
      var hashData

      if (section === 'pupils') {
        modCharacter(section, hashData)
      }

      if (section === 'brows' || section === 'eyes' || section === 'mouth' || section === 'lashes' || section === 'sockets') {
        hashData = hash.get('emotion')
        if (hashData === undefined) {
          hashData = 'neutral'
        }
      } else {
        hashData = hash.get(section)
      }

      id = section + '_' + hashData

      if (hashData != undefined) {
        modCharacter(section, hashData)
      } else if (section === 'brows' || section === 'eyes' || section === 'mouth' || section === 'lashes' || section === 'sockets') {
        modCharacter(section, 'neutral')
      }

      if (id in skinLayers || section === 'body') {
        section = 'skin'
      } else if (id in hairLayers || section === 'hair') { section = 'hair' }

      hashColor = hash.get(section + 'Color')
      hashColorBeta = hash.get(section + 'Color-bet')
      hashColorGamma = hash.get(section + 'Color-gam')
      hashColorDelta = hash.get(section + 'Color-del')
      hashColorEpsilon = hash.get(section + 'Color-eps')

      if (hashColor != undefined && hashColor != '') {
        modCharacter(section + 'Color', hashColor)
      }

      if (hashColorBeta != undefined && hashColorBeta != '') {
        modCharacter(section + 'Color-bet', hashColorBeta)
      }

      if (hashColorGamma != undefined && hashColorGamma != '') {
        modCharacter(section + 'Color-gam', hashColorGamma)
      }

      if (hashColorDelta != undefined && hashColorDelta != '') {
        modCharacter(section + 'Color-del', hashColorDelta)
      }

      if (hashColorEpsilon != undefined && hashColorEpsilon != '') {
        modCharacter(section + 'Color-eps', hashColorEpsilon)
      }
    }
  }
}

function newParseHash () {
  var hashDict = hash.get()
  var keys = Object.keys(hashDict)
  var key

  for (key in hashDict) {
    if (hashDict[key] === '') { hash.remove(key) }
  }

  if (hashDict.irisColor != '') {
    modCharacter('irisColor', hashDict.irisColor)
  }
}

function hashCharacter () {
  var u = currentUser.cc.personnages[currentUser.cc.personnageActuel]
  var r
  var t = []

  for (r in u) {
    t.push(encodeURIComponent(r) + '=' + encodeURIComponent(u[r]))
  }

  if (t.length) {
    personnageActuelToHash(currentUser)
  }
}

function personnageActuelToHash (currentUser) {
  var personnageActuel = currentUser.cc.personnageActuel
  var personnageActuelData
  var itemsList
  var currentCount
  var myKey
  var myValue
  var hashArgs = {}

  if (personnageActuel && personnageActuel !== '') {
    personnageActuelData = currentUser.cc.personnages[personnageActuel]
    itemsList = Object.keys(personnageActuelData)
    itemsListLength = itemsList.length
    itemsListCounter = itemsListLength

    while (itemsListCounter--) {
      currentCount = itemsListLength - itemsListCounter - 1
      myKey = itemsList[currentCount]
      myValue = personnageActuelData[itemsList[currentCount]]
      hashArgs[myKey] = myValue
      hash.add(hashArgs)
    }

    clearCharacter()
    interpretHash()
  }
}

function interpretHash () {
  var hashSex = hash.get('sex')
  
  if (hashSex === 'm') {
    selectMale()
  } else if (hashSex === 'f') {
    selectFemale()
  }
}
