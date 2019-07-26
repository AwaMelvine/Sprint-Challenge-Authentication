const knex = require('knex');
const { config } = require('dotenv');
const config = require('../knexfile.js');

config();

const environment = process.env.DB_ENV;

module.exports = knex(config[environment]);
