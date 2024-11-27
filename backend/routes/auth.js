const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router()

const SECRET_KEY =  'vaicapia'

router.post('/register', (req, res) =>{
    const { username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    User.create(username, hashedPassword, (err) =>{
      if (err) return res.status(400).json({ error:'username already exists'})
        res.json({ message:'user register success' })
    })
})
router.post('/login', (req, res) =>{
  const { username, password } = req.body

  User.findByUsername(username, (err, user)=>{
    if (err || !user) return res.status(404).json({ error:'user not found' })

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!invalidPassword) return res.status(400).json({ error: 'invalid password'})
    const token = jwt.sign({ id: user.id}, SECRET_KEY, { expiresIn:'1h'})
    res.json({ token })
  })
})
module.exports = router
