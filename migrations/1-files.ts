import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.integer('size').notNullable();
    table.string('content', 1000000).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('collection_id').references('id').inTable('collections');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('files');
}
