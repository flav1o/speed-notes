module.exports = function ValidationError(message) {
  this.name = 'validationError';
  this.message = message;
};
