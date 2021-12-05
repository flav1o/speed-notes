const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = async (filter = {}) => {
      return app.db('notepads').where(filter).first();
    };

    const create = async (notes) => {
      if(!notes.url) throw new ValidationError('O URL é um campo obrigatório!')
      if(!notes.date) throw new ValidationError('A data é um campo obrigatório!')
      if(!notes.content) throw new ValidationError('A informação é um campo obrigatório!')

      return app.db('notepads').insert(notes, ['url', 'date', 'content', 'author', 'email'])
    };
  
    const update = async (notes, filter = {}) => {
      if(!notes.date) throw new ValidationError('A data é um campo obrigatório!')
      if(!notes.content) throw new ValidationError('A informação é um campo obrigatório!')

      console.log("NOTES URL ->", notes.url)
      return app.db('notepads').where(filter).update(notes, ['date', 'content', 'author', 'email']);
    }

    const deletePad = async (filter = {}) => {
      return app.db('notepads').where(filter).delete();
    }

    return { findOne, create, update, deletePad };
};
  