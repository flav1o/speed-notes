module.exports = (app) => {
    app.route('/notepad/:url')
        .get(app.routes.notepads.findOne)
        .post(app.routes.notepads.create)
        .put(app.routes.notepads.update)
        .delete(app.routes.notepads.deletePad)
}