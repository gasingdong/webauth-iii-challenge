import { QueryBuilder } from 'knex';
import db from '../database/db-config';
import { User } from '../types';

const find = (): QueryBuilder<{}, User[]> => {
  return db('users');
};

export default { find };
