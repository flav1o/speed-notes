
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notepads', (table) => {
        table.string('url').primary().notNull();
        table.string('date').notNull();
        table.text('content').notNull();
        table.string('author');
        table.string('email');
      }).then(() => {
        return knex('notepads').insert([
          {
            url: '1234455677',
            date: Date.now(),
            content: 'ola\nola',
            author: 'flavio',
            email: 'f@ff'
          },
        ]);
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('notepads');
};
