const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       //Nous extrayons le token du header Authorization de la requête entrante
       const token = req.headers.authorization.split(' ')[1];
       //Nous utilisons ensuite la fonction verify pour décoder notre token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       //Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};