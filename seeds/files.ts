import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('files').del();

  await knex('files').insert([
    {
      id: 'a2d5b602-176e-4623-9db4-1426b4079330',
      name: 'file1.txt',
      size: 1234,
      content: 'Content of file 1',
      created_at: knex.fn.now(),
    },
    {
      id: 'd45ddf12-10ca-40b6-b152-6da1fbbf6153',
      name: 'file2.txt',
      size: 5678,
      content: 'Content of file 2',
      created_at: knex.fn.now(),
    },
  ]);
}
