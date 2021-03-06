'use strict'

const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')

const todosAPI = require('../todos/api')
const todosUI = require('../todos/ui')

const onShowAll = () => {
  todosAPI.index()
    .then(todosUI.onShowAllSuccess)
    .catch(todosUI.onShowAllFailure)
}

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.authError)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(() => onShowAll())
    .catch(ui.authError)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordError)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.authError)
}

const eventHandlers = () => {
  ui.onClose()
  ui.showLearnMore()
  ui.showPasswordForm()
  $('#signUpTemplate').on('submit', '#signUp', onSignUp)
  $('#signInTemplate').on('submit', '#signIn', onSignIn)
  $('#passwordTemplate').on('submit', '#password', onChangePassword)
  $('.sign-in-btn').on('click', ui.showSignIn)
  $('.sign-up-btn').on('click', ui.showSignUp)
  $('#signOut').on('click', onSignOut)
}

module.exports = {
  eventHandlers
}
