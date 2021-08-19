
exports.up = function(knex) {
    return knex.schema.createTable('productos', function(table){
        table.increments('id').unsigned().primary();        
        table.string('code').notNull();
        table.string('name').notNull();
        table.text('description').nullable();
        table.string('img').nullable();
        table.integer('stock').notNull();
        table.decimal('price').notNull();

        table.dateTime('created_at').notNull();
        table.dateTime('updated_at').nullable();
        table.dateTime('deleted_at').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('productos');
};
