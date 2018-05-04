'use strict'

const store = require('../store')
const signInTemplate = require('../templates/sign-in.handlebars')
const signUpTemplate = require('../templates/sign-up.handlebars')

const authError = () => {
  clear()
  showAlert()
  error()
}

const clear = () => {
  $('form').trigger('reset')
  $('.message').hide()
  $('.message').removeClass('error')
  $('.message').html(' ')
}

const error = () => {
  const message = 'There was an error. Please try again.'
  $('.message').addClass('error')
  $('.message.error').append(message)
}

const onClose = () => {
  $('.modal').on('hidden.bs.modal', function (e) {
    clear()
  })
}

const showAlert = () => {
  $('.message').show()
}

const showSignIn = () => {
  const signInHtml = signInTemplate()
  clear()
  $('.sign-up').hide()
  $('.sign-in .form-template').html(' ')
  $('.sign-in .form-template').append(signInHtml)
  $('.sign-in').show('slow')
}

const showSignUp = () => {
  const signUpHtml = signUpTemplate()
  clear()
  $('.sign-in').hide()
  $('.sign-up .form-template').html(' ')
  $('.sign-up .form-template').append(signUpHtml)
  $('.sign-up').show('slow')
}

const signUpSuccess = (data) => {
  store.user = data.user
  clear()
  showSignIn()
}

const signInSuccess = (data) => {
  store.user = data.user
  clear()
  $('.welcome').hide()
  $('.home').show('slow')
  $('.signed-in').removeClass('hidden')
}

const changePasswordSuccess = (data) => {
  const message = 'Your new password has been saved.'
  $('form').trigger('reset')
  $('.message.password-message').show()
  $('.message.password-message').removeClass('error')
  $('.message.password-message').html(' ')
  $('.message.password-message').append(message)
}

const changePasswordError = () => {
  const message = 'There was an error. Please try again.'
  $('form').trigger('reset')
  $('.message.password-message').show()
  $('.message.password-message').addClass('error')
  $('.message.password-message').html(' ')
  $('.message.password-message').append(message)
}

const signOutSuccess = () => {
  $('.home').hide()
  $('.welcome').show('slow')
  $('.signed-in').addClass('hidden')
  store.user = null
}

const unauthorized = () => {
  $('.home, .sign-up, .message').hide()
}

module.exports = {
  authError,
  changePasswordError,
  changePasswordSuccess,
  onClose,
  showSignUp,
  showSignIn,
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  unauthorized
}
