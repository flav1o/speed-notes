const express = require('express');

module.exports = (app) => {
  app.use('/notepad', app.routes.notepads);
};
