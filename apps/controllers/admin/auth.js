const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const helpers = require('../../helpers/hepler');
module.exports = {
    login:  function(req, res) {
        setTimeout(() => {
            res.status(200).render('auth/login', {
                layout: 'auth',
                title: 'Đăng nhập hệ thống quản trị',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },
    post_login: function(req, res) {
                const user = req.body;
                const  email = user.email;
                const  password = user.password;

        if(email.trim().length==0){
            res.render("auth/login",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"Chưa điền email đăng nhập"}});
        }else{
            userDB.getUsername(email).then((auser)=>{
                var status = helpers.compare_password(password,auser[0].password);
                if(!status){
                    res.render("auth/login",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"Mật khẩu không đúng"}});
                }else{
                    req.session.user = auser[0];
                    if(auser[0].type_user==1){
                        res.redirect('/admin/dashboard')
                    }
                    if(auser[0].type_user==2){
                        res.redirect('/shop/dashboard')
                    }
                    if(auser[0].type_user==3){
                        res.redirect('/supply/dashboard')
                    }
                    if(auser[0].type_user==4){
                        res.redirect('/')
                    }

                }
            }).catch((err) => {
                res.redirect('back');
            });
        }
    },
    register:  function(req, res) {
        setTimeout(() => {
            res.status(200).render('auth/register', {
                layout: 'auth',
                title: 'Đăng ký tài khoản quản trị',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },
    post_register:  function(req, res) {
        const user = req.body;
        const  full_name = user.full_name;
        const  email = user.email;
        const  password = user.password;
        const  repassword = user.repassword;

        if(full_name.trim().length==0 || full_name.trim().length <6){
            res.render("auth/register",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"Chưa điền đầy đủ họ và tên"}});
        }
        if(email.trim().length==0){
            res.render("auth/register",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"Email không hợp lệ"}});
        }
        if(password!= repassword && password.trim().length!=0){
            res.render("auth/register",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"Mật khẩu không trùng nhau"}});
        }
        var pass = helpers.hash_password(password);
        data ={
            username: email,
            full_name: full_name,
            email:email,
            password:pass,
            locale:'vn',
            type:'99'
        }
       userDB.register(data).then((result) => {
           res.render("auth/login",{layout: 'auth',csrfToken: req.csrfToken(),data:{success:"TÀI KHOẢN TẠO THÀNH CÔNG"}});
       }).catch((err) => {
           res.render("auth/register",{layout: 'auth',csrfToken: req.csrfToken(),data:{error:"ĐÃ TỒN TẠI TÀI KHOẢN"}});

       });

    },
    logout:  function(req, res) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/admin/login');
                }
            });

        }
    },

};