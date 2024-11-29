import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY

export const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];
   if (!token){
    return res.status(403).json({ error: 'No token provided' });
   } 

   // Tách token theo định dạng 'Bearer <token>'
   const tokenString = token.split(' ')[1];
   
   if (!tokenString) {
    return res.status(403).json({ error: 'Token format is incorrect' });
   }
   

   jwt.verify(tokenString, process.env.SECRET_KEY, (err, decoded) => {
       if (err){
        return res.status(401).json({ error: 'Unauthorized' });
       } 

       req.userId = decoded.id;  // Gắn thông tin người dùng vào request
       next();
   });
};