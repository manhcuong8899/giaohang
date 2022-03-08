module.exports = (app) => {
    const dashboard_controller = require('../../controllers/shop/dashboard');
    app.get('/shop/dashboard', dashboard_controller.dashboard)
};