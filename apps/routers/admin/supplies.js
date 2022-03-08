module.exports = (app) => {
    const supplies_controller = require('../../controllers/admin/supplies');
    const discount_controller = require('../../controllers/admin/discount');

    app.get('/admin/supplies/all', supplies_controller.all)
    app.post('/admin/supplies/created', supplies_controller.created)
    app.get('/admin/supplies/view/:id', supplies_controller.view)
    app.post('/admin/supplies/view/:id', supplies_controller.updated)
    app.post('/admin/supplies/seach', supplies_controller.seach)
    app.post('/admin/supplies/delete/:id', supplies_controller.delete)
    app.get('/admin/supplies/users/:id', supplies_controller.users)
    app.get('/admin/supplies/dasboard/:id', supplies_controller.dashboard)
};