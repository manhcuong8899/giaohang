module.exports = (app) => {
    const dashboard_controller = require('../../controllers/supply/dashboard');
    app.get('/supply/dashboard', dashboard_controller.dashboard)
};