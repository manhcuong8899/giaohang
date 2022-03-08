module.exports = (app) => {
    const settings_controller = require('../../controllers/shop/settings');
    ////Router settings
    app.get('/shop/settings/information', settings_controller.information)
    app.post('/shop/settings/information/update/:code', settings_controller.updated_information)

    app.get('/shop/settings/users', settings_controller.users)
    app.post('/shop/settings/users/created', settings_controller.created_users)
    app.get('/shop/settings/users/view/:id', settings_controller.view_users)
    app.post('/shop/settings/users/view/:id', settings_controller.updated_users)
    app.post('/shop/settings/users/delete/:id', settings_controller.delete_users)
    app.post('/shop/settings/users/seach/:shopid', settings_controller.seach_users)

    app.get('/shop/settings/banks', settings_controller.banks)
    app.post('/shop/settings/banks', settings_controller.created_bank)
    app.get('/shop/settings/banks/view/:id', settings_controller.view_bank)
    app.post('/shop/settings/banks/view/:id', settings_controller.updated_bank)
    app.post('/shop/settings/banks/delete/:id', settings_controller.delete_bank)
    app.post('/shop/settings/banks/default/:id', settings_controller.default_bank)

    app.get('/shop/settings/address', settings_controller.address)
    app.post('/shop/settings/address', settings_controller.created_address)
    app.get('/shop/settings/address/view/:id', settings_controller.view_address)
    app.post('/shop/settings/address/view/:id', settings_controller.updated_address)
    app.post('/shop/settings/address/delete/:id', settings_controller.delete_address)
    app.post('/shop/settings/address/default/:id', settings_controller.default_address)
};