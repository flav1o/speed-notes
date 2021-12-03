const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = async (filter = {}) => {
      console.log("filter->", filter)
      return app.db('notepads').where(filter).first();
    };

    const create = async (notes) => {
      if(!notes.url) throw new ValidationError('O URL é um campo obrigatório!')
      if(!notes.date) throw new ValidationError('A data é um campo obrigatório!')
      if(!notes.content) throw new ValidationError('A informação é um campo obrigatório!')

      return app.db('notepads').insert(notes, ['url', 'date', 'content', 'author', 'email'])
    };
  
    return { findOne, create };
};
  