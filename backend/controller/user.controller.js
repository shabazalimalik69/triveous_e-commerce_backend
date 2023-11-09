const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')

const signUpUser = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    await User.create({...req.body, password: hash})
    res.status(201).send('Account Created Successfully')
    return
  } catch (err) {
    console.log('Error : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) {
      sendResponseError(400, 'Please Signup !', res)
    }

    const matchedPassword = await checkPassword(password, user.password)
    if (matchedPassword) {
      let token = newToken(user)
      res.status(200).send({status: 200, token})
      return
    }
    sendResponseError(400, 'Invalid password !', res)
  } catch (err) {
    console.log('Error', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

module.exports = {signUpUser, signInUser}
