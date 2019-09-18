import knex from 'knex';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('../knexfile');

export default knex(knexConfig.development);
