import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('chats').del();

  await knex('chats').insert([
    {
      id: '250e9b01-e118-495c-9c6b-ed7cc6fbb943',
      message: 'Hello file!',
      source: 'bot',
      file_id: 'd45ddf12-10ca-40b6-b152-6da1fbbf6153',
      collection_id: null,
    },
    {
      id: 'f72b4ab9-1540-417c-8c70-fe8fc94d6994',
      message: 'Hello collection!',
      source: 'bot',
      file_id: null,
      collection_id: '0f9e2f1d-7f2f-4633-8b85-ea9eefc874bd',
    },
  ]);
}
