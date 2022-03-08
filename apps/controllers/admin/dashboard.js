const auth = require('../../helpers/auth');
const var_dump = require('var_dump');
module.exports = {
    index:  function(req, res) {
        auth.authstaff(req, res);
        setTimeout(() => {
            res.status(200).render('dashboard', {
                layout: 'main',
                title: 'Bảng điều khiển',
                user:req.session['user'],
            });
        }, 100);
    },
};