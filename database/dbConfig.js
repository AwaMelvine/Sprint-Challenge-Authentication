const knex = require('knex');
const { config } = require('dotenv');
const knexConfig = require('../knexfile.js');

config();

const environment = process.env.DB_ENV;

module.exports = knex(knexConfig[environment]);
