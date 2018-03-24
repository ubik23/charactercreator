/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "(whoami|login|logout|register)" }] */

'use strict'

// yucky globals
var myUsername = false
var currentUser = false
var personnages = {}
var personnageActuel = false

var fetchDb = (function () {
  var baseOpts = {
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  var binary = ['get', 'delete', 'head']
  var ternary = ['post', 'put']

  var fetchDb = function (path, body, method) {
    var url = '/api/' + path
    var opts = {}
    if (!method && typeof body === 'string') {
      method = body
      body = false
    }
    console.log('fetchDb', path, method || 'get')
    if (body) {
      opts.body = JSON.stringify(body)
      opts.method = 'post'
    }
    if (method) {
        opts.method = method;
    }
    return window.fetch(url, Object.assign(opts, baseOpts))
  }

  binary.forEach(function (m) { fetchDb[m] = function (path) { return fetchDb(path, m) } })
  ternary.forEach(function (m) { fetchDb[m] = function (path, body) { return fetchDb(path, body, m) } })
  fetchDb.reject = function (resp, message) {
    var err = new Error(message || resp.statusText)
    err.statusText = resp.statusText
    err.status = resp.status
    err.url = resp.url
    return Promise.reject(err)
  }
  return fetchDb
}())

function deleteDbSession () {
  return fetchDb.delete('session')
    .then(function (resp) {
      return resp.json()
    })
}

function getDbSession () {
  return fetchDb('session')
    .then(function (resp) {
      if (resp.ok) { return resp.json() }
      return fetchDb.reject(resp)
    })
    .then(function (json) {
      if (json.userCtx.name) {
          return json.userCtx.name
      }
      return fetchDb.reject('Not connected')
    })
}

function getDbUser (username) {
  return fetchDb('users/' + username)
    .then(function (resp) {
      return resp.json()
    })
}

function updateDbUser (user) {
  return fetchDb.post('users', user)
    .then(function (resp) {
      console.log('resp.status', resp.status);
      if (resp.ok) {
          return resp.json()
      }
      if (resp.status === 409) {
          return fetchDb.reject(resp, 'Not saving, _rev fields don\'t match')
      }
      if (resp.status === 404) {
          loginMenu();
          return fetchDb.reject(resp, 'Not logged in.')
      }
      return fetchDb.reject(resp)
    })
}

function loginDbUser (username, password) {
  return fetchDb.post('session', {
    name: username,
    password: password
  })
    .then(function (resp) {
      if (resp.status === 200) { return resp.json() }
      if (resp.status === 401) {
          determineErrorMessage(username);
          //return resp.json();
          return fetchDb.reject(resp)
      }
      return fetchDb.reject(resp)
    })
}

function determineErrorMessage(username) {
    var currentOverlay = document.querySelector('.overlay--show');
    if (currentOverlay.classList.contains('js-login')) {
        showErrorUsernamePasswordMismatch();
    }
    if (currentOverlay.classList.contains('js-register')) {
        showErrorUsernameTaken(username);
    }
}

function showErrorUsernamePasswordMismatch() {
    var currentOverlay = document.querySelector('.overlay--show');
    console.log('currentOverlay', currentOverlay);
    var errorBox = currentOverlay.querySelector('.overlay__error');
    console.log('errorBox');
    var errorText = errorBox.querySelector('.overlay__error__text');
    var errorMsg = 'Sorry, username/password mismatch. Please try again.';
    clearInputFields();
    errorText.innerHTML = errorMsg;
    errorBox.classList.add('overlay__error--show');
    console.log('Sorry, username/password mismatch');
    //clearInputUsername();
}

function createDbUser (username, password, email) {
  console.log('Create DB User');
  return fetchDb.post('users', {
    _id: 'org.couchdb.user:' + username,
    roles: [],
    type: 'user',
    name: username,
    password: password,
    email: email,
    createdAt: new Date().toISOString(),
    cc: {
      personnages: {},
      personnageActuel: false
    }
  })
    .then(function (resp) {
        console.log('resp.status');
      if (resp.status === 201) { return resp.json() }
      if (resp.status === 409) {
          showErrorUsernameTaken(username);
          return resp.json();
     }
      return fetchDb.reject(resp)
    })
}

function showErrorUsernameTaken(username) {
    var currentOverlay = document.querySelector('.overlay--show');
    var errorBox = currentOverlay.querySelector('.overlay__error');
    var errorText = errorBox.querySelector('.overlay__error__text');
    var errorMsg = 'Username "' + username + '" is already taken. Try another.';
    errorText.innerHTML = errorMsg;
    errorBox.classList.add('overlay__error--show');
    console.log("C'est pris!");
    clearInputUsername();
}

function whoami (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-character-list');
  var closeBtn = overlay.querySelector('.close-btn');
  closeAllOverlays();
  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', closeOverlay, true);
  closeBtn.addEventListener('click', closeOverlay, false);
}
function closeAllOverlays() {
    var overlays = document.querySelectorAll(".overlay--show");
    var counter = overlays.length;
    while (counter--){
        overlays[counter].classList.remove('overlay--show');
    }
}
function showAbout(ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-about');
  var closeBtn = overlay.querySelector('.close-btn');
  closeAllOverlays();
  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', closeOverlay, true);
  closeBtn.addEventListener('click', closeOverlay, false);
}

function logout (ev) {
  ev.preventDefault()
  deleteDbSession()
    .then(function (json) {
      currentUser = false
      personnages = {}
      personnageActuel = false
      myUsername = false
      return json
    })
    .catch(function (err) {
      console.error('err4', err)
    })
    logoutUI();
}

function logoutUI(){
  var pageWrap = document.querySelector('.logged');
  if (pageWrap) {
       pageWrap.classList.remove('logged');
       resetCharacters();
  }
}

function loginMenu(evt) {
    if (evt) {
        evt.preventDefault()
    }
    var overlay = document.querySelector('.js-login');
    var loginForm = document.querySelector('#login-form');
    var firstInput = overlay.querySelector('.first-input');
  var closeBtn = overlay.querySelector('.close-btn');
  closeAllOverlays();
    overlay.classList.add('overlay--show');
    loginForm.addEventListener("submit", login, true);
    overlay.addEventListener('click', closeLogin, true);
    firstInput.focus();
  closeBtn.addEventListener('click', closeOverlay, false);
}

function closeLogin(evt) {
    var overlay = document.querySelector('.js-login');
    var cancelBtn = overlay.querySelector('.cancel-btn');
    var target = evt.target;
    if (target === overlay || target === cancelBtn) {
      var login = document.querySelector('.overlay--show');
      if (login) {
          clearInputFields();
          login.classList.remove('overlay--show');
      }
    }
}

function closeOverlay(evt) {
    var overlay = document.querySelector('.overlay--show');
    if (overlay === null){ return };
    var cancelBtn = overlay.querySelector('.cancel-btn');
    var closeBtn = overlay.querySelector('.close-btn');
    var target = evt.target;
    if (target === overlay || target === cancelBtn || target === closeBtn) {
      if (overlay) {
          hideNewCharacterInputField();
          overlay.classList.remove('overlay--show');
      }
    }
}

function hideNewCharacterInputField() {
    var overlay = document.querySelector('.overlay--show');
    var newField = overlay.querySelector('.overlay__char-new--create');
    if (newField) {
        clearInputFields();
        newField.classList.remove('overlay__char-new--create');
    }
}

function clearInputFields() {
    var currentOverlay = document.querySelector('.overlay--show');
    var inputList = currentOverlay.querySelectorAll('input');
    var inputListLength = inputList.length;
    var errorField = currentOverlay.querySelector('.overlay__error--show');
    while (inputListLength--) {
        inputList[inputListLength].value = '';
    }
    if (errorField) {
        errorField.classList.remove('overlay__error--show');
    }
}

function clearInputUsername() {
    var currentOverlay = document.querySelector('.overlay--show');
    var inputUsername = currentOverlay.querySelectorAll('.overlay__input__username');
    inputUsername[0].value = '';
}

function login(evt) {
    evt.preventDefault()
    var event = evt;
    var username = event.target.children[0].lastElementChild.value;
    var password = event.target.children[1].lastElementChild.value;
    var login = document.querySelector('.overlay--show');
    var currentCharacter;

    if (!username || !password) {
        console.log('missing username or password.');
        return
    }

  loginDbUser(username, password)
    .then(function () {
      myUsername = username
      return getDbUser(username)
    })
    .then(function (user) {
      currentUser = user
      var u = currentUser.cc.personnages[currentUser.cc.personnageActuel]
      var r
      var t = []
      for (r in u) {
        t.push(encodeURIComponent(r) + '=' + encodeURIComponent(u[r]))
      }
      clearInputFields();
      login.classList.remove('overlay--show');
      manageCharacters(user);
    })
    .catch(function (err) {
      console.error('err3', err)
    })
}

function inheritNewCharacter() {
    var newCharModal = document.querySelector('.js-login-new-character');
    var hasHash = hash.get('sex');
    var continueBtn = document.querySelector('.js-continue-character');
    var loadBtn = document.querySelector('.js-load-character');
    if (!hasHash) {
        //TODO check to see if there is a currentCharacter, and if so, load it.
        return
    }
    loadBtn.addEventListener('click', loadCharacter, false);
    continueBtn.addEventListener('click', continueNewCharacter, false);
    newCharModal.classList.add('overlay--show');
    newCharModal.addEventListener('click', closeNewCharacterOverlay, false);
}

function continueNewCharacter(evt) {
    evt.preventDefault();
    var newCharModal = document.querySelector('.overlay--show');
    var nameCharModal = document.querySelector('.js-name-character');
    var createBtn = nameCharModal.querySelector('.overlay__char-create-btn');
    newCharModal.classList.remove('overlay--show');
    //TODO open modal to ask for character name and save it before proceeding.
    createBtn.addEventListener('click', requestNewCharacterName);
    nameCharModal.classList.add('overlay--show');
}

function requestNewCharacterName(evt) {
    evt.preventDefault();
    var nameCharModal = document.querySelector('.overlay--show');
    if (nameCharModal) {
        nameCharModal.classList.remove('overlay--show');
    }
}

function loadCharacter(evt) {
    var characterSVG = document.querySelector('#svg1');
    var newCharModal = document.querySelector('.overlay--show');
    evt.preventDefault();
    hash.clear();
    clearCharacter();
    hashCharacter();
    startup();
    setHashTrigger();
    setTimeout(function(){
        characterSVG.classList.remove('character--hide');
        if (newCharModal) {
            newCharModal.classList.remove('overlay--show');
        }
    },500);
}

function closeNewCharacterOverlay(evt) {
    var overlay = document.querySelector('.js-login-new-character');
    var target = evt.target;
    if (target === overlay) {
      var modal = document.querySelector('.overlay--show');
      if (modal) {
          modal.classList.remove('overlay--show');
      }
    }
}

function hashCharacter() {
      var u = currentUser.cc.personnages[currentUser.cc.personnageActuel]
      var r
      var t = []
      for (r in u) {
        t.push(encodeURIComponent(r) + '=' + encodeURIComponent(u[r]))
      }
      if (t.length) {
        personnageActuelToHash(currentUser);
      }
}

function switchCharacter(evt) {
    evt.preventDefault();
    var choices;
    var characterListUI = document.querySelector('.js-character-list');
    var characterSVG = document.querySelector('#svg1');
    var newCard = this.parentNode.parentNode;
    var newChar = newCard.querySelector('.overlay__char-name').innerHTML;
    var oldCard = document.querySelector('.overlay__char--current');
    var currentClass = characterSVG.getAttribute('class');
    var newClass = currentClass + ' ' + 'character--hide';
    var charGender = currentUser.cc.personnages[newChar].sex;
    if (currentClass === '') {
        if (charGender === 'f') {
            currentClass = 'select-female';
        }
        if (charGender === 'm') {
            currentClass = 'select-male';
        }
        newClass = currentClass;
    }
    if (oldCard) {
        oldCard.classList.remove('overlay__char--current');
    }
    newCard.classList.add('overlay__char--current');
    currentUser.cc.personnageActuel = newChar;
    characterListUI.classList.remove('overlay--show');
    characterSVG.setAttribute('class', newClass);

    updateDbUser(currentUser)
        .then(function (json) {
          currentUser._rev = json.rev
          return json
        })
        .then(function (json){
            window.sex = currentUser.cc.personnages[newChar].sex;
            choices = currentUser.cc.personnages[newChar];
            console.log('choices', choices);
            c = new Character(choices);
            hash.clear();
            setTimeout(function(){
                clearCharacter();
                hashCharacter();
                setHashTrigger();
            },500);
        })
        .catch(function (err) {
          console.log('err', err)
        })
}

function revealCharacter() {
    var characterSVG = document.querySelector('#svg1');
    characterSVG.classList.remove('character--hide');
}

function manageCharacters() {
    var charUI = document.querySelector('.js-character-list');
    var userTitle = charUI.querySelector('.overlay__title');
    var charCard = charUI.querySelector('.overlay__char-card--orig');
    var charList = Object.keys(currentUser.cc.personnages);
    var charNum = charList.length;
    var charContainer = charUI.querySelector('.overlay__container--char-list');
    var charCurrent = currentUser.cc.personnageActuel;
    var usernameButton = document.querySelector('#usernameButton');
    var usernameText = usernameButton.querySelector('.menu-text');
    var pageWrap = document.querySelector('#pagewrap');
    var editBtns;
    var editBtnsNum;
    var delBtns;
    var delBtnsNum;
    var saveBtn = document.querySelector('.save-btn');
    var newBtn = charUI.querySelector('.overlay__char-new-btn');
    var createBtn = charUI.querySelector('.overlay__char-create-btn');
    var charName;

    resetCharacters();
    while (charNum--) {
        charName = charList[charNum];
        var newCard = charCard.cloneNode(true);
        var charNameCard = newCard.querySelector('.overlay__char-name');
        newCard.classList.remove('overlay__char-card--orig')
        if (charName === charCurrent){
            newCard.classList.add('overlay__char--current');
        }
        charNameCard.innerHTML = charName;
        charContainer.appendChild(newCard);
    }
    editBtns = charUI.querySelectorAll('.overlay__char-edit');
    editBtnsNum = editBtns.length;
    while (editBtnsNum--) {
        editBtns[editBtnsNum].addEventListener('click', switchCharacter);
    }
    delBtns = charUI.querySelectorAll('.overlay__char-delete');
    delBtnsNum = delBtns.length;
    while (delBtnsNum--) {
        delBtns[delBtnsNum].addEventListener('click', deleteChar);
    }
    userTitle.innerHTML = currentUser.name;
    usernameText.innerHTML = currentUser.name;
    pageWrap.classList.add('logged');
    saveBtn.addEventListener('click', saveChar, true);
    newBtn.addEventListener('click', newChar, true);
    createBtn.addEventListener('click', createChar, true);
}

function resetCharacters() {
    var charUI = document.querySelector('.js-character-list');
    var charCards = charUI.querySelectorAll('.overlay__char-card:not(.overlay__char-card--orig):not(.overlay__char-new)');
    Array.prototype.forEach.call( charCards, function( node ) {
        node.parentNode.removeChild( node );
    });
}

function registerMenu() {
  var loginMenu = document.querySelector('.js-login');
  var overlay = document.querySelector('.js-register');
  var registerForm = document.querySelector('#register-form');
  var firstInput = overlay.querySelector('.first-input');
  var closeBtn = overlay.querySelector('.close-btn');

  if (loginMenu.classList.contains('overlay--show')) {
      loginMenu.classList.remove('overlay--show');
  }

  closeAllOverlays();
  overlay.classList.add('overlay--show');
  registerForm.addEventListener("submit", register, true);
  overlay.addEventListener('click', closeRegister, true);
  firstInput.focus();
  closeBtn.addEventListener('click', closeOverlay, false);
}

function closeRegister(evt) {
    var overlay = document.querySelector('.js-register');
    var cancelBtn = overlay.querySelector('.cancel-btn');
    var target = evt.target;

    if (target === overlay || target === cancelBtn) {
      var register = document.querySelector('.overlay--show');
      if (register) {
          clearInputFields();
          register.classList.remove('overlay--show');
      }
    }
}

function register (evt) {
    evt.preventDefault()
    var event = evt;
    var email = event.target.children[0].lastElementChild.value;
    var username = event.target.children[1].lastElementChild.value;
    var password = event.target.children[2].lastElementChild.value;
    var register = document.querySelector('.overlay--show');

    if (!username) {
      console.log('missing username.');
      return
    }
    if (!password) {
      console.log('missing password.');
      return
    }
    if (!email) {
      console.log('missing email.');
      return
    }

    console.log('Calling createDbUSer');
    createDbUser(username, password, email)
        .then(function () {
          return loginDbUser(username, password)
        })
        .then(function (json) {
            console.log('fetched2', json)
            return username
        })
        .then(getDbUser)
        .then(function(user){
            currentUser = user
            manageCharacters(currentUser)
            register.classList.remove('overlay--show');
        })
        .catch(function (err) {
          console.error('register err', err)
        })
}

getDbSession()
  .then(getDbUser)
  .then(function (user) {
    var r
    var t = []
    myUsername = user.name
    currentUser = user
    if (user.cc && user.cc.personnages &&
      user.cc.personnageActuel &&
      user.cc.personnages[user.cc.personnageActuel]
    ) {
      personnages = user.cc.personnages
      personnageActuel = user.cc.personnageActuel

      for (r in user.cc.personnages[user.cc.personnageActuel]) {
        t.push(
          encodeURIComponent(r) + '=' +
          encodeURIComponent(user.cc.personnages[user.cc.personnageActuel][r])
        )
      }
    }
    manageCharacters(currentUser);
  })
  .catch(function (err) {
    console.log('getDbUser error', err)
  })

function setHashTrigger() {
    window.addEventListener('hashchange', triggerSaveBtn, false)
}

function triggerSaveBtn() {
    var saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.classList.add('save--enabled');
    }
}

function newChar() {
    var newCard = document.querySelector('.js-new-card');
    var firstInput = newCard.querySelector('.first-input');
    newCard.classList.add('overlay__char-new--create');
    firstInput.focus();
}

function createChar(evt) {
    if (evt) {
        evt.preventDefault();
    }
    var el = this;
    var newCard = document.querySelector('.overlay__char-new--create');
    var newCharNameEl = el.parentNode.querySelector('.js-new-char-name');
    var newCharName = newCharNameEl.value;

    newCard.classList.remove('overlay__char-new--create');
    var personnageActuel = newCharName;
    if (!personnageActuel) { return }
    if (!currentUser.cc) { currentUser.cc = {} }
    if (!currentUser.cc.personnageActuel) { currentUser.cc.personnageActuel = personnageActuel }
    if (!currentUser.cc.personnages) { currentUser.cc.personnages = {} }
    currentUser.cc.personnages[personnageActuel] = window.hash.get();
    Object.assign(currentUser.cc.personnages, personnages);

    updateDbUser(currentUser)
        .then(function (json) {
          currentUser._rev = json.rev
          return json
        })
        .catch(function (err) {
          console.log('err', err)
        })
        manageCharacters();
}

function deleteChar() {
    var el = this;
    var disposible = el.parentNode.parentNode.querySelector('.overlay__char-name').innerHTML;
    delete currentUser.cc.personnages[disposible];

    updateDbUser(currentUser)
        .then(function (json) {
          currentUser._rev = json.rev
          return json
        })
        .catch(function (err) {
          console.log('err', err)
        })
        manageCharacters();
}

function saveChar() {
    var saveBtn = document.querySelector('.save-btn');
    saveBtn.classList.remove('save--enabled');
    var personnageActuel = currentUser.cc.personnageActuel;
    if (!myUsername || !currentUser) { return }
    if (!currentUser) { return }

    if (!personnageActuel) {
      //if (!personnageActuel) { personnageActuel = window.prompt('Nom du personnage') }
      return;
    }
    if (!currentUser.cc) {
      currentUser.cc = {};
    }
    if (!currentUser.cc.personnageActuel) { currentUser.cc.personnageActuel = personnageActuel }
    if (!currentUser.cc.personnages) { currentUser.cc.personnages = {} }
    currentUser.cc.personnages[personnageActuel] = window.hash.get();
    Object.assign(currentUser.cc.personnages, personnages)

    updateDbUser(currentUser)
        .then(function (json) {
          currentUser._rev = json.rev
          return json
        })
        .catch(function (err) {
          console.log('err', err)
        })
}

