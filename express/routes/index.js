const express = require('express');
const router = express.Router();
const db = require('../models/index');
const passport = require('passport');

const Crypto = require('crypto')
function getSecureRandom() {
  const buff = Crypto.randomBytes(4);
  const hex = buff.toString("hex");
  return ( parseInt(hex,16) );
}

const LocalStrategy = require('passport-local').Strategy;

localAuth();
router.post('/auth/local', (req, res, next) => {
  console.log('POST受取');
  next();
},
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false })
);

function localAuth() {
  handleSession();
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    process.nextTick(() => {
      db.user.findOne({ where: {username: username, password: password} }).then((user, err) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'usernameまたはpasswordが間違っています'});
        }
        console.log('認証済み');
        return done(null, user);
      });
    });
  }));
}

function handleSession() {
  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
}

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/register', async function(req, res, next) {
  let id = getSecureRandom();
  try {
    await db.user.create({
      id: id,
      username: req.body.username,
      password: req.body.password
    });
    res.redirect('/')
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
