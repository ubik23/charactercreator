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
  // console.log('who am i?')
  isUser()
    .then(function (who) {
      window.alert(['who', who, myUsername].join(' '))
      myUsername = who
    })
    .catch(function (e) {
      window.alert(['not connected', e, myUsername].join(' '))
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
}

function login (ev) {
  ev.preventDefault()
  // console.log('login? Yeah sure', typeof ev, ev)

  var username = window.prompt('Username')
  var password = window.prompt('Password')

  if (!username || !password) { return }

  loginDbUser(username, password)
    .then(function () {
    //.then(function (json) {
      // console.log('fetched3', json)
      myUsername = username
      return getDbUser(username)
    })
    .then(function (user) {
      // console.log('USER:', user)
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
    })
    .catch(function (err) {
      console.error('err3', err)
    })
}

function register (ev) {
  ev.preventDefault()
  var username = window.prompt('Username')
  var email = window.prompt('Email')
  var password = window.prompt('Password')
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
      // console.log('fetched2', json)
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
        window.location = 'http://cc/?#' + t.join('&')
      }
    }
  })
  .catch(function (err) {
    console.log('getDbUser error', err)
  })

window.addEventListener('hashchange', function () {
  // console.log('myUsername', myUsername)
  // console.log('hash', window.hash.get())
  if (!myUsername || !currentUser) { return }
  console.log('hash changed')
  if (!currentUser) { return }
  console.log('logged in', currentUser.name)

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
