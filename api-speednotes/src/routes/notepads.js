const express = require('express');
const validationError = require('../errors/validationError');

module.exports = (app) => {
  const router = express.Router();

  router.get('/:url', (req, res, next) => {
    app.services.notepad.findOne({ url: req.params.url })
      .then((result) => {
        if (result) res.status(200).json(result);

        const newPad = {
          url: req.params.url,
          date: Date.now(),
          content: 'Welcome to Speed Notes\nEnjoy!\nAuto saving every 5 seconds.',
          author: '',
          email: '',
        }

        if (!result)
          app.services.notepad.create(newPad)
            .then(() => res.status(201).json(newPad))
            .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.notepad.create(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.put('/:url', async (req, res, next) => {
    console.log("BODY PARAMS ->", req.body)
    try {
      const result = await app.services.notepad.update(req.body, {url:req.body.url})
      return res.status(200).json(result[0])
    } catch (err) {
      return next(err);
    }
  })

  return router;
}
