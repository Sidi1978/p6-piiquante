
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

mongoose.connect(process.env.SECRET_SRV,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//pour  eviter les erreurs de CORS on ajoute ses header
// Ces headers permettent d'accéder à notre API 
// depuis n'importe quelle origine ( '*' ) 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

     
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;