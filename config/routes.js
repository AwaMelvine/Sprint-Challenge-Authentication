const axios = require('axios');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  try {
    const user = req.body;

    user.password = bcrypt.hashSync(user.password, 12);
    const prevUser = await User.findByUsername(user.username);

    if (prevUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const newUser = await User.add(user);
    res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register' });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
