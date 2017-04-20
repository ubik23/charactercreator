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
    if (method) { opts.method = method }
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
      if (json.userCtx.name) { return json.userCtx.name }
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
      if (resp.ok) { return resp.json() }
      if (resp.status === 409) { return fetchDb.reject(resp, 'Not saving, _rev fields don\'t match') }
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
      return fetchDb.reject(resp)
    })
}

function createDbUser (username, password, email) {
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
      if (resp.status === 201) { return resp.json() }
      return fetchDb.reject(resp)
    })
}

function isUser () {
  return getDbSession()
    .then(function (json) {
      // console.log('fetched', json)
      if (json.userCtx.name) {
        myUsername = json.userCtx.name
        return json.userCtx.name
      }
      return fetchDb.reject('Not connected')
    })
}

function whoami (ev) {
  ev.preventDefault()
  var overlay = document.querySelector('.js-character-list');
  overlay.classList.add('overlay--show');
  overlay.addEventListener('click', closeOverlay, true);
  // console.log('who am i?')
  isUser()
    .then(function (who) {
      //window.alert(['who', who, myUsername].join(' '))
      myUsername = who
    })
    .catch(function (e) {
      //window.alert(['not connected', e, myUsername].join(' '))
      myUsername = false
      // alert('not connected', who, myUsername)
      // console.error('Nope', e)
    })
}

function logout (ev) {
  ev.preventDefault()
  // console.log('logout? Yeah sure', typeof ev, ev, myUsername)
  deleteDbSession()
    .then(function (json) {
      // console.log('fetched4', json)
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

function loginMenu() {
  var overlay = document.querySelector('.js-login');
  var loginForm = document.querySelector('#login-form');
  var firstInput = overlay.querySelector('.first-input');
  overlay.classList.add('overlay--show');
  loginForm.addEventListener("submit", login, true);
  overlay.addEventListener('click', closeLogin, true);
  firstInput.focus();
}

function closeLogin(evt) {
  var overlay = document.querySelector('.js-login');
  var cancelBtn = overlay.querySelector('.cancelbtn');
    var target = evt.target;
    if (target === overlay || target === cancelBtn) {
      var login = document.querySelector('.overlay--show');
      if (login) {
          login.classList.remove('overlay--show');
      }
    }
}

function closeOverlay(evt) {
  var overlay = document.querySelector('.overlay--show');
  var cancelBtn = overlay.querySelector('.cancelbtn');
    var target = evt.target;
    if (target === overlay || target === cancelBtn) {
      var login = document.querySelector('.overlay--show');
      if (login) {
          login.classList.remove('overlay--show');
      }
    }
}

function login(evt) {
    evt.preventDefault()
    var event = evt;
    var username = event.target.children[0].lastElementChild.value;
    var password = event.target.children[1].lastElementChild.value;
    var login = document.querySelector('.overlay--show');
    login.classList.remove('overlay--show');

  if (!username || !password) { return }

  loginDbUser(username, password)
    .then(function () {
    //.then(function (json) {
      // console.log('fetched3', json)
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
      if (t.length) {
        window.location = '/#' + t.join('&')
      }
      manageCharacters(user);
      interpretHash();
    })
    .catch(function (err) {
      console.error('err3', err)
    })
}

function switchCharacter(evt) {
    evt.preventDefault();
    var newCard = this.parentNode.parentNode;
     var newChar = newCard.querySelector('.overlay__char-name').innerHTML;
     var oldCard = document.querySelector('.overlay__char--current');
     oldCard.classList.remove('overlay__char--current');
     newCard.classList.add('overlay__char--current');
     console.log(currentUser);
     currentUser.cc.personnageActuel = newChar;
     console.log(newChar);
      updateDbUser(currentUser)
        .then(function (json) {
          currentUser._rev = json.rev
          return json
        })
        .catch(function (err) {
          console.log('err', err)
        })

}

function manageCharacters(currentUser) {
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
    while (charNum--) {
        var charName = charList[charNum];
        var newCard = charCard.cloneNode(true);
        var charNameCard = newCard.querySelector('.overlay__char-name');
        newCard.classList.remove('overlay__char-card--orig')
        if (charName === charCurrent){
            console.log('****same');
            newCard.classList.add('overlay__char--current');
        }
        charNameCard.innerHTML = charName;
        charContainer.appendChild(newCard);
        console.log(newCard);
        console.log(charList[charNum]) ;
    }
    editBtns = charUI.querySelectorAll('.overlay__char-edit');
    editBtnsNum = editBtns.length
    while (editBtnsNum--) {
        editBtns[editBtnsNum].addEventListener('click', switchCharacter);
    }
    console.log(charList.length)
    userTitle.innerHTML = currentUser.name;
    usernameText.innerHTML = currentUser.name;
    pageWrap.classList.add('logged');
      console.log('USER:', currentUser.name);
      console.log('Characters:', currentUser.cc.personnages);
      console.log('Characters:', currentUser.cc.personnages);
      console.log('Characters:', Object.keys(currentUser.cc.personnages));
      console.log('Current Character:', currentUser.cc.personnageActuel);
}

function resetCharacters() {
    var charUI = document.querySelector('.js-character-list');
    var charCards = charUI.querySelectorAll('.overlay__char-card:not(.overlay__char-card--orig)');
    Array.prototype.forEach.call( charCards, function( node ) {
        node.parentNode.removeChild( node );
    });
}

function registerMenu() {
  var loginMenu = document.querySelector('.js-login');
  var overlay = document.querySelector('.js-register');
  var registerForm = document.querySelector('#register-form');
  var firstInput = overlay.querySelector('.first-input');
  console.log('loginMenu', loginMenu);
  if (loginMenu.classList.contains('overlay--show')) {
      loginMenu.classList.remove('overlay--show');
  }
  overlay.classList.add('overlay--show');
  registerForm.addEventListener("submit", register, true);
  overlay.addEventListener('click', closeRegister, true);
  firstInput.focus();
}

function closeRegister(evt) {
  var overlay = document.querySelector('.js-register');
  var cancelBtn = overlay.querySelector('.cancelbtn');
    var target = evt.target;
    if (target === overlay || target === cancelBtn) {
      var register = document.querySelector('.overlay--show');
      if (register) {
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
    register.classList.remove('overlay--show');

  if (!username || !password || !email) { return }

  createDbUser(username, password, email)
    .then(function () {
    // .then(function (json) {
      // console.log('go on...', json)
      return loginDbUser(username, password)
    })
    .then(function (json) {
      // TODO, handle currentUser
      myUsername = username
      console.log('fetched2', json)
      return json
    })
    .catch(function (err) {
      console.error('err', err)
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
      if (t.length) {
        window.location = '/?#' + t.join('&')
      }
    }
    manageCharacters(user);
  })
  .catch(function (err) {
    console.log('getDbUser error', err)
  })

window.addEventListener('hashchange', function () {
    return;
    var personnageActuel = currentUser.cc.personnageActuel;
  console.log('currentUser', currentUser);
  // console.log('hash', window.hash.get())
  if (!myUsername || !currentUser) { return }
  console.log('hash changed')
  if (!currentUser) { return }
  console.log('logged in', currentUser.name)
  console.log('personnageActuel', personnageActuel);

  if (!personnageActuel) { personnageActuel = window.prompt('Nom du personnage') }
  if (!personnageActuel) { return }
  personnages[personnageActuel] = window.hash.get()
  if (!currentUser.cc) { currentUser.cc = {} }
  if (!currentUser.cc.personnageActuel) { currentUser.cc.personnageActuel = personnageActuel }
  if (!currentUser.cc.personnages) { currentUser.cc.personnages = {} }
  Object.assign(currentUser.cc.personnages, personnages)

  // console.log('currentUser', JSON.stringify(currentUser, null, '  '))

  updateDbUser(currentUser)
    .then(function (json) {
      currentUser._rev = json.rev
      return json
    })
    .catch(function (err) {
      console.log('err', err)
    })

}, false)
