const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.set('views','CHM')

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

app.use(checkWorkingHours);
app.use(express.static('CHM'));

app.get('/', (req, res) => {
    res.status(200).render('accueil');
} );

app.get('/services', (req, res) => {
    res.status(200).render('services');
} );

app.get('/contact', (req, res) => {
    res.status(200).render('contact');
} );

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
