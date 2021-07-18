function createDecentRandomCharacter () {
    var sex
    var skinTone

    hideTutorial()
    gaga('send', 'event', { eventCategory: 'Secret function', eventAction: 'smartRandomSingle()', eventLabel: 'Secret Patreon reveal for new random function.' })
    hash.clear()
    resetCharacter()

    sex = getRandomSex()
    skinTone = getRandomSkinTone()

    defaultEyeColor(c, skinTone)
    defaultHairColor(c, skinTone)
    defaultPupilShape()

    // Add head shape, ears, noses and facial expressions

    if (sex === 'f') {
      dressFemaleRandom()
    } else {
      dressMaleRandom()
    }

    // TODO display download tutorial step after hitting random for the first time.
}

function getRandomHead(sex) {

}


function getRandomSex () {
  // Choose the sex at random (50/50)
    var roll
    var sex

    roll = Math.floor((Math.random() * 100))

    if (roll <= 50) { sex = 'f' } else { sex = 'm' }

    return sex
}

function getRandomSkinTone () {
  var roll
  var skinTone
  var skinToneList = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
  var obj = new Array()

  roll = Math.floor((Math.random() * skinToneList.length))
  skinTone = obj.skinColor = skinToneList[roll].toLowerCase()
  hash.add(obj)

  return skinTone
}

function getRandomFabricColor () {
  var roll
  var fabColor
  // var fabColorList

  roll = Math.floor((Math.random() * fabColorList.length))
  fabColor = fabricPallette[roll]

  return fabColor
}

function getForms (sex) {
  var forms

  if (sex === 'f') {
    selectFemale()
    var form1 = femaleForm1
    var form2 = femaleForm2
    var form3 = femaleForm3
    var form4 = femaleForm4
    var form5 = femaleForm5
    var form6 = femaleForm6
  } else {
    selectMale()
    var form1 = maleForm1
    var form2 = maleForm2
    var form3 = maleForm3
    var form4 = maleForm4
    var form5 = maleForm5
    var form6 = maleForm6
  }
  forms = [form1, form2, form3, form4, form5, form6]

  return forms
}

function dressFemaleRandom () {
  hideTutorial()
  var forms = getForms('f')
  // The following determines the percentage chance of each item to be selected
  var chanceDict = {
    // 'button' : 2,
      belt: 25,
      bracelet: 50,
      coat: 15,
      collar: 5,
      dress: 33,
      earings: 50,
      earpiece: 5,
      eyepatch: 10,
      glasses: 60,
      hat: 10,
      headband: 5,
      holster: 5,
      horns: 3,
      kneepads: 5,
      leggings: 25,
      makeup: 80,
      mask: 5,
      necklace: 25,
      pet: 20,
      scarf: 10,
      shirt: 15,
      shoulderpads: 5,
      smoke: 25,
      suit: 5,
      veil: 5,
      vest: 3,
      warpaint: 5,
      wings: 5
  }
  var options
  var randomItem
  var obj
  var topList = ['shirt', 'top', 'blouse']
  var bottomList = ['pants', 'skirt']
  var topChoice
  var fabColorCounter = fabricPallette.length
  var fabRoll = Math.floor((Math.random() * fabColorCounter))
  var fabRoll2 = Math.floor((Math.random() * fabColorCounter))
  var fabRoll3 = Math.floor((Math.random() * fabColorCounter))
  var fabColor = fabricPallette[fabRoll]
  var fabColor2 = fabricPallette[fabRoll2]


  // Get random facial features

  // Get random head shape
  obj = new Array()
  options = forms[0].Body_head.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['body_head'] = randomItem
  hash.add(obj)

  // Get random ear shapes
  obj = new Array()
  options = forms[0].Ears.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['ears'] = randomItem
  hash.add(obj)

  // Get random nose shapes
  obj = new Array()
  options = forms[0].Nose.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['nose'] = randomItem
  hash.add(obj)

  // Get random emotion
  obj = new Array()
  options = forms[0].Emotion.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['emotion'] = randomItem
  hash.add(obj)

  // Determine if wearing a dress or a top/bottom combination

  if ( Math.floor((Math.random() * 100)) <= chanceDict.dress) {
    // If wearing a dress
    obj = new Array()
    options = forms[3].Dress.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['dress'] = randomItem
    hash.add(obj)
    // change color
    obj = new Array()
    obj['dressColor'] = fabColor
    hash.add(obj)
    // Add necklace
    if ( Math.floor((Math.random() * 100)) <= chanceDict.necklace) {
      obj = new Array()
      options = forms[2].Necklace.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['necklace'] = randomItem
      hash.add(obj)
    }
  } else {
    // If wearing a top/bottom combo

    // Choose from shirts, tops and blouses
    topChoice = topList[Math.floor((Math.random() * topList.length))]

    if (topChoice === 'shirt') {
      obj = new Array()
      options = forms[2].Shirt.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['shirt'] = randomItem
      hash.add(obj)
      // change color
      obj = new Array()
      obj['shirtColor'] = fabColor2
      hash.add(obj)
    } else if (topChoice === 'top') {
      obj = new Array()
      options = forms[2].Top.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['top'] = randomItem
      hash.add(obj)
      obj = new Array()
      obj['topColor'] = fabColor2
      hash.add(obj)
    } else {
      obj = new Array()
      options = forms[3].Blouse.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['blouse'] = randomItem
      hash.add(obj)
      obj = new Array()
      obj['blouseColor'] = fabColor2
      hash.add(obj)
    }
    // Choose from skirts, pants or shorts
    bottomChoice = bottomList[Math.floor((Math.random() * bottomList.length))]

    if (bottomChoice === 'pants') {
      obj = new Array()
      options = forms[4].Pants.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['pants'] = randomItem
      hash.add(obj)
      obj = new Array()
      obj['pantsColor'] = fabColor
      hash.add(obj)
    } else if (bottomChoice === 'skirt') {
      obj = new Array()
      options = forms[4].Skirt.slice(1)
      randomItem = options[Math.floor((Math.random() * options.length))]
      obj['skirt'] = randomItem
      hash.add(obj)
      obj = new Array()
      obj['skirtColor'] = fabColor
      hash.add(obj)
    }
  }

  // Choose if wearing a hat
  if ( Math.floor((Math.random() * 100)) <= chanceDict.hat) {
    obj = new Array()
    options = forms[1].Hat.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['hat'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['hatColor'] = fabColor
    hash.add(obj)
  } else {
    // Choose hair style depending on hat
    obj = new Array()
    options = forms[0].Hair.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['hair'] = randomItem
    hash.add(obj)
  }
  // Choose Glasses
  if ( Math.floor((Math.random() * 100)) <= chanceDict.glasses) {
    obj = new Array()
    options = forms[1].Glasses.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['glasses'] = randomItem
    hash.add(obj)
  }
  // Add earrings
  if ( Math.floor((Math.random() * 100)) <= chanceDict.earings) {
    obj = new Array()
    options = forms[1].Earings.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['earings'] = randomItem
    hash.add(obj)
  }

  // Add bracelets, bandages and other accessories
  if ( Math.floor((Math.random() * 100)) <= chanceDict.bracelet) {
    obj = new Array()
    options = forms[3].Bracelet.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['bracelet'] = randomItem
    hash.add(obj)
  }

  // Add smoke accessories
  if ( Math.floor((Math.random() * 100)) <= chanceDict.smoke) {
    obj = new Array()
    options = forms[1].Smoke.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['smoke'] = randomItem
    hash.add(obj)
  }

  if ( Math.floor((Math.random() * 100)) <= chanceDict.bracelet) {
    obj = new Array()
    options = forms[3].Bracelet.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['bracelet'] = randomItem
    hash.add(obj)
  }
  // Shoulderpads
  if ( Math.floor((Math.random() * 100)) <= chanceDict.shoulderpads) {
    obj = new Array()
    options = forms[2].Shoulderpads.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['shoulderpads'] = randomItem
    hash.add(obj)
    // obj = new Array()
    // obj['shoulderpadsColor'] = fabColor
    // hash.add(obj)
  }

  // Add leggings
  if ( Math.floor((Math.random() * 100)) <= chanceDict.leggings) {
    obj = new Array()
    options = forms[5].Leggings.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['leggings'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['leggingsColor'] = fabColor2
    hash.add(obj)
  }

  // Choose shoes
  obj = new Array()
  options = forms[5].Shoes.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['shoes'] = randomItem
  hash.add(obj)
  obj = new Array()
  obj['shoesColor'] = fabColor
  hash.add(obj)

  // coat
  if ( Math.floor((Math.random() * 100)) <= chanceDict.coat) {
    obj = new Array()
    options = forms[3].Coat.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['coat'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['coatColor'] = fabColor
    hash.add(obj)
  }
  // collar
  if ( Math.floor((Math.random() * 100)) <= chanceDict.collar) {
    obj = new Array()
    options = forms[2].Collar.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['collar'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['collarColor'] = fabColor
    hash.add(obj)
  }
  // earpiece
  if ( Math.floor((Math.random() * 100)) <= chanceDict.earpiece) {
    obj = new Array()
    options = forms[1].Earpiece.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['earpiece'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['earpieceColor'] = fabColor
    hash.add(obj)
  }
  // eyepatch
  if ( Math.floor((Math.random() * 100)) <= chanceDict.eyepatch) {
    obj = new Array()
    options = forms[1].Eyepatch.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['eyepatch'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['eyepatchColor'] = fabColor
    hash.add(obj)
  }
  // holster
  if ( Math.floor((Math.random() * 100)) <= chanceDict.holster) {
    obj = new Array()
    options = forms[3].Holster.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['holster'] = randomItem
    hash.add(obj)
    // obj = new Array()
    // obj['holsterColor'] = fabColor
    // hash.add(obj)
  }
  // horns
  if ( Math.floor((Math.random() * 100)) <= chanceDict.horns) {
    obj = new Array()
    options = forms[1].Horns.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['horns'] = randomItem
    hash.add(obj)
    // obj = new Array()
    // obj['hornsColor'] = fabColor
    // hash.add(obj)
  }
  // kneepads
  if ( Math.floor((Math.random() * 100)) <= chanceDict.kneepads) {
    obj = new Array()
    options = forms[4].Kneepads.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['kneepads'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['kneepadsColor'] = fabColor2
    hash.add(obj)
  }
  // makeup
  if ( Math.floor((Math.random() * 100)) <= chanceDict.makeup) {
    obj = new Array()
    options = forms[1].Makeup.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['makeup'] = randomItem
    hash.add(obj)
    // obj = new Array()
    // obj['makeupColor'] = fabColor
    // hash.add(obj)
  }
  // mask
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.mask) {
  //   obj = new Array()
  //   options = forms[1].Mask.slice(1)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['mask'] = randomItem
  //   hash.add(obj)
  //   // obj = new Array()
  //   // obj['maskColor'] = fabColor
  //   // hash.add(obj)
  // }
  // pet
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.pet) {
  //   obj = new Array()
  //   options = forms[3].Pet.slice(1)
  //   console.log('pet', options)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['pet'] = randomItem
  //   hash.add(obj)
  //   console.log('randomItem', randomItem)
  //   obj = new Array()
  //   obj['petColor'] = fabColor
  //   hash.add(obj)
  // }
  // scarf
  if ( Math.floor((Math.random() * 100)) <= chanceDict.scarf) {
    obj = new Array()
    options = forms[2].Scarf.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['scarf'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['scarfColor'] = fabColor2
    hash.add(obj)
  }
  // suit
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.suit) {
  //   obj = new Array()
  //   options = forms[3].Suit.slice(1)
  //   console.log('suit', options)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['suit'] = randomItem
  //   hash.add(obj)
  //   console.log('randomItem', randomItem)
  //   obj = new Array()
  //   obj['suitColor'] = fabColor
  //   hash.add(obj)
  // }
  // tie
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.tie) {
  //   obj = new Array()
  //   options = forms[2].Tie.slice(1)
  //   console.log('tie', options)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['tie'] = randomItem
  //   hash.add(obj)
  //   console.log('randomItem', randomItem)
  //   obj = new Array()
  //   obj['tieColor'] = fabColor
  //   hash.add(obj)
  // }
  // veil
  if ( Math.floor((Math.random() * 100)) <= chanceDict.veil) {
    obj = new Array()
    options = forms[1].Veil.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['veil'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['veilColor'] = fabColor2
    hash.add(obj)
  }
  // warpaint
  if ( Math.floor((Math.random() * 100)) <= chanceDict.warpaint) {
    obj = new Array()
    options = forms[1].warpaint.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['warpaint'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['warpaintColor'] = fabColor
    hash.add(obj)
  }
  // wings
  if ( Math.floor((Math.random() * 100)) <= chanceDict.wings) {
    obj = new Array()
    options = forms[3].Wings.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['wings'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['wingsColor'] = fabColor
    hash.add(obj)
  }
  // ==============================================================================

  launch()
}

function dressMaleRandom () {
  hideTutorial()

  var forms = getForms('m')
  var chanceDict = {
    // 'button' : 2,
    belt: 33,
    coat: 15,
    collar: 5,
    earings: 10,
    earpiece: 5,
    eyepatch: 10,
    facialhair: 50,
    glasses: 60,
    hat: 25,
    headband: 5,
    holster: 5,
    horns: 3,
    jacket: 33,
    kneepads: 5,
    mask: 5,
    necklace: 50,
    pet: 20,
    scarf: 10,
    shirt: 95,
    shoulderpads: 5,
    smoke: 25,
    socks: 50,
    suit: 5,
    tie: 15,
    vest: 33,
    warpaint: 5,
    watch: 75,
    wings: 5
  }
  var options
  var randomItem
  var obj
  var fabColorCounter = fabricPallette.length
  var fabRoll = Math.floor((Math.random() * fabColorCounter))
  var fabColor = fabricPallette[fabRoll]
  var fabRoll2 = Math.floor((Math.random() * fabColorCounter))
  var fabColor2 = fabricPallette[fabRoll2]

  // Get random facial features

  // Get random head shape
  obj = new Array()
  options = forms[0].Body_head.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['body_head'] = randomItem
  hash.add(obj)

  // Get random ear shapes
  obj = new Array()
  options = forms[0].Ears.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['ears'] = randomItem
  hash.add(obj)

  // Get random nose shapes
  obj = new Array()
  options = forms[0].Nose.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['nose'] = randomItem
  hash.add(obj)

  // Get random emotion
  obj = new Array()
  options = forms[0].Emotion.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['emotion'] = randomItem
  hash.add(obj)

  // Choose from shirts
  obj = new Array()
  options = forms[2].Shirt.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['shirt'] = randomItem
  hash.add(obj)
  obj = new Array()
  obj['shirtColor'] = fabColor2
  hash.add(obj)

  // Choose from pants
  obj = new Array()
  options = forms[4].Pants.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['pants'] = randomItem
  hash.add(obj)
  obj = new Array()
  obj['pantsColor'] = fabColor
  hash.add(obj)

  // Add belt
  if ( Math.floor((Math.random() * 100)) <= chanceDict.belt) {
    obj = new Array()
    options = forms[4].Belt.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['belt'] = randomItem
    hash.add(obj)
  }
  
  // Vest
  if ( Math.floor((Math.random() * 100)) <= chanceDict.vest) {
    obj = new Array()
    options = forms[2].Vest.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['vest'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['vestColor'] = fabColor
    hash.add(obj)
  }
  // Jacket
  if ( Math.floor((Math.random() * 100)) <= chanceDict.jacket) {
    obj = new Array()
    options = forms[3].Jacket.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['jacket'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['jacketColor'] = fabColor
    hash.add(obj)
  }
  // Choose if wearing a hat
  if ( Math.floor((Math.random() * 100)) <= chanceDict.hat) {
    obj = new Array()
    options = forms[1].Hat.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['hat'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['hatColor'] = fabColor
    hash.add(obj)
  } else {
    // Choose hair style depending on hat
    obj = new Array()
    options = forms[0].Hair.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['hair'] = randomItem
    hash.add(obj)
  }

  // Choose Facialhair
  if ( Math.floor((Math.random() * 100)) <= chanceDict.facialhair) {
    obj = new Array()
    options = forms[0].Facialhair.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['facialhair'] = randomItem
    hash.add(obj)
  }

  // Choose Glasses
  if ( Math.floor((Math.random() * 100)) <= chanceDict.glasses) {
    obj = new Array()
    options = forms[1].Glasses.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['glasses'] = randomItem
    hash.add(obj)
  }
  // Add earrings if that's the case
  if ( Math.floor((Math.random() * 100)) <= chanceDict.earings) {
    obj = new Array()
    options = forms[1].Earings.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['earings'] = randomItem
    hash.add(obj)
  }
  // Add watch, bracelet, bandages and other accessories
  if ( Math.floor((Math.random() * 100)) <= chanceDict.watch) {
    obj = new Array()
    options = forms[3].Watch.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['watch'] = randomItem
    hash.add(obj)
  }
  // Add smoke accessories
  if ( Math.floor((Math.random() * 100)) <= chanceDict.smoke) {
    obj = new Array()
    options = forms[1].Smoke.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['smoke'] = randomItem
    hash.add(obj)
  }
  // Shoulderpads
  if ( Math.floor((Math.random() * 100)) <= chanceDict.shoulderpads) {
    obj = new Array()
    options = forms[2].Shoulderpads.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['shoulderpads'] = randomItem
    hash.add(obj)
    // obj = new Array()
    // obj['shoulderpadsColor'] = fabColor
    // hash.add(obj)
  }

  // Add socks
  if ( Math.floor((Math.random() * 100)) <= chanceDict.socks) {
    obj = new Array()
    options = forms[5].Socks.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['socks'] = randomItem
    hash.add(obj)
  }
  // Choose shoes
  obj = new Array()
  options = forms[5].Shoes.slice(1)
  randomItem = options[Math.floor((Math.random() * options.length))]
  obj['shoes'] = randomItem
  hash.add(obj)
  // obj = new Array()
  // obj['shoesColor'] = fabColor
  // hash.add(obj)

  // coat
  if ( Math.floor((Math.random() * 100)) <= chanceDict.coat) {
    obj = new Array()
    options = forms[3].Coat.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['coat'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['coatColor'] = fabColor
    hash.add(obj)
  }
  // earpiece
  if ( Math.floor((Math.random() * 100)) <= chanceDict.earpiece) {
    obj = new Array()
    options = forms[1].Earpiece.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['earpiece'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['earpieceColor'] = fabColor
    hash.add(obj)
  }
  // eyepatch
  if ( Math.floor((Math.random() * 100)) <= chanceDict.eyepatch) {
    obj = new Array()
    options = forms[1].Eyepatch.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['eyepatch'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['eyepatchColor'] = fabColor
    hash.add(obj)
  }
  // holster
  if ( Math.floor((Math.random() * 100)) <= chanceDict.holster) {
    obj = new Array()
    options = forms[3].Holster.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['holster'] = randomItem
    hash.add(obj)
  }
  // horns
  if ( Math.floor((Math.random() * 100)) <= chanceDict.horns) {
    obj = new Array()
    options = forms[1].Horns.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['horns'] = randomItem
    hash.add(obj)
  }
  // kneepads
  if ( Math.floor((Math.random() * 100)) <= chanceDict.kneepads) {
    obj = new Array()
    options = forms[4].Kneepads.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['kneepads'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['kneepadsColor'] = fabColor2
    hash.add(obj)
  }
  // mask
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.mask) {
  //   obj = new Array()
  //   options = forms[1].Mask.slice(1)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['mask'] = randomItem
  //   hash.add(obj)
  //   // obj = new Array()
  //   // obj['maskColor'] = fabColor
  //   // hash.add(obj)
  // }
  // pet
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.pet) {
  //   obj = new Array()
  //   options = forms[3].Pet.slice(1)
  //   console.log('pet', options)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['pet'] = randomItem
  //   hash.add(obj)
  //   console.log('randomItem', randomItem)
  //   obj = new Array()
  //   obj['petColor'] = fabColor
  //   hash.add(obj)
  // }
  // scarf
  if ( Math.floor((Math.random() * 100)) <= chanceDict.scarf) {
    obj = new Array()
    options = forms[2].Scarf.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['scarf'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['scarfColor'] = fabColor2
    hash.add(obj)
  }
  // suit
  // if ( Math.floor((Math.random() * 100)) <= chanceDict.suit) {
  //   obj = new Array()
  //   options = forms[3].Suit.slice(1)
  //   console.log('suit', options)
  //   randomItem = options[Math.floor((Math.random() * options.length))]
  //   obj['suit'] = randomItem
  //   hash.add(obj)
  //   console.log('randomItem', randomItem)
  //   obj = new Array()
  //   obj['suitColor'] = fabColor
  //   hash.add(obj)
  // }
  // tie
  if ( Math.floor((Math.random() * 100)) <= chanceDict.tie) {
    obj = new Array()
    options = forms[2].Tie.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['tie'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['tieColor'] = fabColor
    hash.add(obj)
  }
  // warpaint
  if ( Math.floor((Math.random() * 100)) <= chanceDict.warpaint) {
    obj = new Array()
    options = forms[1].warpaint.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['warpaint'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['warpaintColor'] = fabColor
    hash.add(obj)
  }
  // wings
  if ( Math.floor((Math.random() * 100)) <= chanceDict.wings) {
    obj = new Array()
    options = forms[3].Wings.slice(1)
    randomItem = options[Math.floor((Math.random() * options.length))]
    obj['wings'] = randomItem
    hash.add(obj)
    obj = new Array()
    obj['wingsColor'] = fabColor
    hash.add(obj)
  }

  launch()
}
