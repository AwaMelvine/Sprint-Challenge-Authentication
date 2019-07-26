const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function createToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const options = {
    expiresIn: 1000 * 60 * 60 * 24
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

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

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await User.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);
      res.status(201).json({ data: token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: 'You shall not pass!' });
  }
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
