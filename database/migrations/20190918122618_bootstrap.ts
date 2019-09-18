import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 128)
      .unique()
      .notNullable();

    users.string('password', 128).notNullable();

    users.string('department', 128).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
