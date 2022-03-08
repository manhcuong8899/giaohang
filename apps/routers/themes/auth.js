module.exports = (app) => {
    const auth_controller = require('../../controllers/admin/auth');
    app.get('/admin/login', auth_controller.login)
    app.get('/admin/logout', auth_controller.logout)
    app.post('/admin/login', auth_controller.post_login)
    app.get('/admin/register', auth_controller.register)
    app.post('/admin/register', auth_controller.post_register)
};