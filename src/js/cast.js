"use strict"

function newChar () {
  var newCard = document.querySelector('.js-new-card')
  var firstInput = newCard.querySelector('.first-input')
  newCard.classList.add('overlay__char-new--create')
  firstInput.focus()
}

function createChar (evt) {
  if (evt) {
    evt.preventDefault()
  }
  var el = this
  var newCard = document.querySelector('.overlay__char-new--create')
  var newCharNameEl = el.parentNode.querySelector('.js-new-char-name')
  var newCharName = newCharNameEl.value

  newCard.classList.remove('overlay__char-new--create')
  var personnageActuel = newCharName
  if (!personnageActuel) { return }
  if (!currentUser.cc) { currentUser.cc = {} }
  if (!currentUser.cc.personnageActuel) { currentUser.cc.personnageActuel = personnageActuel }
  if (!currentUser.cc.personnages) { currentUser.cc.personnages = {} }
  currentUser.cc.personnages[personnageActuel] = window.hash.get()
  Object.assign(currentUser.cc.personnages, personnages)

  updateDbUser(currentUser)
    .then(function (json) {
      currentUser._rev = json.rev
      // return json
      gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'New', eventLabel: 'Save new character' })
    })
    /*
    .catch(function (err) {
      consolelog('err', err)
    })
    */
  manageCharacters()
}

function deleteChar () {
  var el = this
  var disposible = el.parentNode.parentNode.querySelector('.overlay__char-name').innerHTML
  delete currentUser.cc.personnages[disposible]

  updateDbUser(currentUser)
    .then(function (json) {
      currentUser._rev = json.rev
      // return json
      gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Delete', eventLabel: 'Delete character' })
    })
    /*
    .catch(function (err) {
      consolelog('err', err)
    })
    */
  manageCharacters()
}

function saveChar () {
  var saveBtn = document.querySelector('.save-btn')
  saveBtn.classList.remove('save--enabled')
  var personnageActuel = currentUser.cc.personnageActuel

  if (!myUsername || !currentUser) { return }
  if (!currentUser) { return }
  if (!personnageActuel) { return }
  if (!currentUser.cc) { currentUser.cc = {} }
  if (!currentUser.cc.personnageActuel) { currentUser.cc.personnageActuel = personnageActuel }
  if (!currentUser.cc.personnages) { currentUser.cc.personnages = {} }

  currentUser.cc.personnages[personnageActuel] = window.hash.get()

  Object.assign(currentUser.cc.personnages, personnages)

  updateDbUser(currentUser)
    .then(function (json) {
      currentUser._rev = json.rev
      // return json
      gaga('send', 'event', { eventCategory: 'Navigation', eventAction: 'Save', eventLabel: 'Save character' })
    })
    /*
    .catch(function (err) {
      consolelog('err', err)
    })
    */
}
