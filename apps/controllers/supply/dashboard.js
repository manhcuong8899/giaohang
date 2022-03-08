const authlogin = require('../../helpers/auth');
const var_dump = require('var_dump');
module.exports = {
    dashboard:  function(req, res) {
        authlogin.authsupply(req, res);
        setTimeout(() => {
            res.status(200).render('supply/dashboard', {
                layout: 'supply/main',
                title: 'Bảng điều khiển nhà cung cấp'+req.session['user'],
                user:req.session['user'],
            });
        }, 100);
    },
};