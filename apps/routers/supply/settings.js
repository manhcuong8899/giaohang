module.exports = (app) => {

    const settings_controller = require('../../controllers/supply/settings');

    ////Router settings
    app.get('/supply/settings/information', settings_controller.information)
    app.post('/supply/settings/information/update/:code', settings_controller.updated_information)

    app.get('/supply/settings/users', settings_controller.users)
    app.post('/supply/settings/users/created', settings_controller.created_users)
    app.get('/supply/settings/users/view/:id', settings_controller.view_users)
    app.post('/supply/settings/users/view/:id', settings_controller.updated_users)
    app.post('/supply/settings/users/delete/:id', settings_controller.delete_users)
    app.post('/supply/settings/users/seach/:supplyid', settings_controller.seach_users)

    app.get('/supply/settings/banks', settings_controller.banks)
    app.post('/supply/settings/banks', settings_controller.created_bank)
    app.get('/supply/settings/banks/view/:id', settings_controller.view_bank)
    app.post('/supply/settings/banks/view/:id', settings_controller.updated_bank)
    app.post('/supply/settings/banks/delete/:id', settings_controller.delete_bank)
    app.post('/supply/settings/banks/default/:id', settings_controller.default_bank)



};