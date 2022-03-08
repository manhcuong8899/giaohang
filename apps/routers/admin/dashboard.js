module.exports = (app) => {
    const dashboard_controller = require('../../controllers/admin/dashboard');
    app.get('/admin/dashboard',dashboard_controller.index)
};