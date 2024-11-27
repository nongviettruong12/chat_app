const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/database');
const router = express.Router()

const SECRET_KEY =  'vaicapia'

router.post('/register', (req, res) =>{
    const { username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    db.run (
      'INSERT INTO users ( username, password ) VALUES (?, ?)',
      [username, hashedPassword],
      (err) =>{
        if (err) {
          return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    )
})
router.post('/login', (req, res) =>{
  const { username, password } = req.body

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err ||!user) return res.status(404).json({ error: 'User not found' });

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id}, SECRET_KEY, { expiresIn:'1h'})
    res.json({ token })
  })
})
module.exports = router
