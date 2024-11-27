const jwt = require('jsonwebtoken');
const SECRET_KEY = 'vaicapia'

const verifyToken = (req, res, next) => {
 const token = req.headers['authorization']
 if (!token) return res.status(403).json({ error: 'No token provided' });
 
 jwt.verify(token.split('')[1], SECRET_KEY, (err, decoded)=>{
    if (err) return res.status(401).json({ error:'Unauthorized' });
    req.userId = decoded.id
    next()
 })
}
module.exports = { verifyToken}