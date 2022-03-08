module.exports = (app) => {
    const shops_controller = require('../../controllers/admin/shops');
    app.get('/admin/shops/all', shops_controller.all)
    app.post('/admin/shops/created', shops_controller.created)
    app.get('/admin/shops/view/:id', shops_controller.view)
    app.post('/admin/shops/view/:id', shops_controller.updated)
    app.post('/admin/shops/seach', shops_controller.seach)
    app.post('/admin/shops/delete/:id', shops_controller.delete)
    app.get('/admin/shops/users/:id', shops_controller.users)
    app.get('/admin/shops/dasboard/:id', shops_controller.dashboard)
};