import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('collections').del();

  await knex('collections').insert([
    {
      id: '0f9e2f1d-7f2f-4633-8b85-ea9eefc874bd',
      name: 'collection1',
      color: 'red',
      created_at: knex.fn.now(),
    },
  ]);
}
