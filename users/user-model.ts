import { QueryBuilder } from 'knex';
import db from '../database/db-config';
import { User } from '../types';

interface UserFilter {
  username?: string;
  department?: string;
}

const find = (): QueryBuilder<{}, User[]> => {
  return db('users').select('id', 'username', 'department');
};

const findBy = (filter: UserFilter): QueryBuilder<{}, User> => {
  return db('users')
    .where(filter)
    .first<User>();
};

const findById = (id: number): QueryBuilder<{}, User> => {
  return db('users')
    .where({ id })
    .first<User>();
};

const add = async (user: User): Promise<User> => {
  const ids = await db('users').insert(user, 'id');
  const [id] = ids;
  return findById(id);
};

export default { find, findBy, findById, add };
