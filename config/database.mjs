import knex from 'knex';
import configKnex from '../knexfile.js';

const db = knex(configKnex[process.env.NODE_ENV || 'dev']);

export default db;