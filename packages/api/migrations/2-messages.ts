import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('message').notNullable();
    table.enum('source', ['user', 'bot']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('file_id').references('id').inTable('files');
    table.uuid('collection_id').references('id').inTable('collections');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages');
}
