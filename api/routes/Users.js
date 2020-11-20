const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var bcrypt = require('bcrypt');
var emailRegex = require('email-regex');
var config = require('../config.json')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = config.secreKey

users.post('/register', (req, res) => {
  var valideEmail = emailRegex({ exact: true }).test(req.body.email);
  if (valideEmail == false) {
    res.send('L\'email n\'est pas valide')
  } else {
    const today = new Date()
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today
    }

    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          User.create(userData)
            .then(user => {
              let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    }
  })
    .then(user => {
      var passwordHashed = bcrypt.compareSync(req.body.password, user.password)
      if (passwordHashed == true) {
        if (user) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({ token: token });
        } else {
          res.send('User does not exist');
        }
      } else {
        res.send("Password incorect");
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  // console.log(decode)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.put('/:userId/update', (req, res) => {
  var decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        if (req.body.passwordReq == true) {
          var passwordHashed = bcrypt.compareSync(Object.values(req.body)[0].password, user.password)
          if (passwordHashed == false) {
            console.log(passwordHashed)
            bcrypt.hash(Object.values(req.body)[0].password, 10)
            .then(hash => {
              var updatePassword = {
                password: hash
              }
              user.update(
                updatePassword
              )
            })
            .catch(err => {
              res.send(err)
            })
          } else {
            console.log("true")
            res.send('Your new password can\'t be the same at the old password')
          }
        } else {
          user.update(
            Object.values(req.body)[0]
          )
          res.json(user)
        }
      } else {
        res.send('User don\'t existe');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.delete('/:userId/delete', (req, res) => {
  console.log(req.params.userId)
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
    .then(user => {
      if (user) {
        user.destroy({ user })
      } else {
        res.send('User don\'t exist')
      }
    })
    .catch(err => {
      res.send('err: ' + err)
    })
})



module.exports = users