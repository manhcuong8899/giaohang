const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const helpers = require('../../helpers/hepler');
module.exports = {
    all:  function(req, res) {
        setTimeout(() => {
            res.status(200).render('supply/orders/all', {
                layout: 'supply/orders',
                title: 'Quản lý đơn hàng',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },
};