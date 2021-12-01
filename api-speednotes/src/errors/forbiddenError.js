module.exports = function ForbiddenError(message = 'Não tem acesso ao recurso solicitado') {
  this.name = 'forbiddenError';
  this.message = message;
};
