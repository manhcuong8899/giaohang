function authlogin(req,res) {
    if(req.session.user==undefined){
        return res.redirect('/admin/login');
    }
}
function authstaff(req,res) {
    if(req.session.user==undefined){
        return res.redirect('/admin/login');
    }
    if(req.session.user!=undefined){
        if(req.session.user.type_user!=1){
            return res.redirect('/admin/login');
        }
    }
}
function authsupply(req,res) {
    if(req.session.user==undefined){
        return res.redirect('/admin/login');
    }
    if(req.session.user!=undefined){
        if(req.session.user.type_user!=3){
            return res.redirect('/admin/login');
        }
    }
}
function authshop(req,res) {
    if(req.session.user==undefined){
        return res.redirect('/admin/login');
    }
    if(req.session.user!=undefined){
        if(req.session.user.type_user!=2){
            return res.redirect('/admin/login');
        }
    }
}

function authcustomers(req,res) {
    if(req.session.members==undefined){
        return res.redirect('/dang-nhap');
    }
}

module.exports ={
    authlogin:authlogin,
    authstaff:authstaff,
    authsupply:authsupply,
    authshop:authshop,
    authcustomers:authcustomers,
}
