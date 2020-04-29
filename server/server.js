const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// App Set //
const PORT = process.env.PORT || 5000;
const app = express();

//
// EXPRESS APPLICATION MIDDLEWARE
// ------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SETUP my cookie session middleware
app.use(cookieSession({
  name: 'session',
  keys: ['masterKey'],
  // how much time till it expires
  maxAge: 2 * 60 * 1000, // represents 2 mins in milliseconds
}));

//
// API ROUTES
// ------------------------------------------------------------

// save the creature to cookie session
app.post('/api/creature', (req, res) => {
    // save creature
    // storing the value sent from client-side
    const newCreature = req.body.fantasticCreature;

    // const sampleObject = {};

    // sampleObject.something = 'WORDS';

    // document.cookie
    // req.session <=> app.us(cookieSession())
    req.session.favoriteCreature = newCreature;

    console.log('POST:', newCreature);

    res.sendStatus(200);
});

// retrieve the creature stored with cookie session
app.get('/api/creature', (req, res) => {
    // get saved cookie information
    console.log('GET CREATURE');
    const favoriteCreature = req.session.favoriteCreature;

    res.send({
      fantasticCreature: favoriteCreature
    });
});

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
