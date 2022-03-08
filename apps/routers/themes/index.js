module.exports = (app) => {
    const home_controller = require('../../controllers/themes/home');
    app.get('/',home_controller.index)
    app.get('/dang-nhap',home_controller.login)
    app.get('/dang-ky',home_controller.register)
    app.post('/members/register',home_controller.post_register)
    app.post('/members/login',home_controller.post_login)
    app.post('/members/update',home_controller.post_update)
    app.get('/logout',home_controller.logout)
    app.get('/members/dashboard',home_controller.dashboard)
    app.get('/members/vieworder/:code',home_controller.detail)
    app.get('/members/confirm/:code',home_controller.confirm)
};