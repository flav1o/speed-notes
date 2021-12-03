module.exports = (app) => {
    app.route('/notepad/:url')
        .get(app.routes.notepads.findOne)
        .post(app.routes.notepads.create)
}