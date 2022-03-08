const configDB = require('../../models/ConfigDB');
const sellingDB = require('../../models/SellingDB');
const categoryDB = require('../../models/Category');
const helper = require('../../helpers/hepler');
const crypto = require('../../helpers/crypto');
const userDB = require('../../models/UsersDB');
const  authlogin =require('../../helpers/auth');
const orderDB = require('../../models/OrderDB');
module.exports = {
    index:  function(req, res) {
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        let newsproducts, dsmb;
        let cate_dsmb,cate_dsmn, cate_dstn;
        sellingDB.newproducts().then((result) => {newsproducts = result;
        }).catch((err) => warning = err);
        sellingDB.bycode('DSMB').then((result) => {dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('themes/home/index',{
                layout: 'themes/index',
                title: 'ĐẶC SẢN BA MIỀN',
                csrfToken: req.csrfToken(),
                data:{settings,newsproducts,dsmb,cate_dsmb,cate_dsmn,cate_dstn},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
    login:  function(req, res) {
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        let cate_dsmb,cate_dsmn, cate_dstn;
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('themes/members/login',{
                layout: 'themes/members',
                title: 'TRANG ĐĂNG NHẬP',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn,cate_dstn},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },

    register:  function(req, res) {
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        let cate_dsmb,cate_dsmn, cate_dstn;
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('themes/members/register',{
                layout: 'themes/members',
                title: 'TRANG ĐĂNG KÝ THÀNH VIÊN',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn,cate_dstn},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
    post_register:  function(req, res) {
        const user = req.body;
        const  full_name = user.full_name;
        const  email = user.email;
        const  password = user.password;
        const  repassword = user.repassword;
        const  phone = user.phone;
        const  address = user.address;

        const checkphone = helper.checkPhoneNumber(phone);
        if(checkphone==false){
            res.redirect('/dang-ky');
        }else{
            var formartphone = phone.replace('0', '+84');
        }
        if(password!= repassword){
            res.redirect('/dang-ky');
        }
        var pass = helper.hash_password(password);
        data ={
            username: email,
            full_name: full_name,
            email:email,
            password:pass,
            phone:formartphone,
            address:address,
            type_user:'4',
            verified:'1',
        }
        userDB.register(data).then((result) => {
            res.redirect('/dang-nhap');
        }).catch((err) => {
            res.redirect('back');
        });

    },
    post_update:  function(req, res) {
        authlogin.authcustomers(req, res);
        const auser = req.body;
        const  full_name = auser.full_name;
        const  email = auser.email;
        const  address = auser.address;
        const  password = auser.password;
        const  repassword = auser.repassword;
        if(password!="" && repassword!="" ){
            if(password!= repassword){
                res.redirect('/members/dashboard');
            }
            var pass = helper.hash_password(password);
            data ={
                username: email,
                full_name: full_name,
                email:email,
                password:pass,
                address:address,
            }
            const amember = req.session['members'].id;
            userDB.memberupdated(data,amember).then((result) => {
                res.redirect('/dang-nhap');
            }).catch((err) => {
                res.redirect('back');
            });
        }else{
            data ={
                username: email,
                full_name: full_name,
                email:email,
                address:address,
            }
            const amember = req.session['members'].id;
            userDB.memberupdatednopass(data,amember).then((result) => {
                res.redirect('/members/dashboard');
            }).catch((err) => {
                res.redirect('back');
            });
        }
    },
    post_login: function(req, res) {
        const user = req.body;
        const  email = user.email;
        const  password = user.password;
        userDB.getMemberUser(email).then((auser) => {
            var status = helper.compare_password(password,auser.password);
            if(!status){
                res.redirect('/dang-nhap');
            }else{
                req.session.members = auser;
                res.redirect('/')
            }
        }).catch((err) => {
            res.redirect('back');
        });
    },
    logout:  function(req, res) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });

        }
    },
    dashboard:  function(req, res) {
        authlogin.authcustomers(req, res);
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        let cate_dsmb,cate_dsmn, cate_dstn;
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);
        let amember;
        userDB.getMemberUser(req.session['members'].username).then((result) => {amember = result;
        if(amember==undefined){
            return res.redirect('/dang-nhap');
        }
        }).catch((err) => warning = err);

        //// List danh sach order
        let neworders;
        orderDB.m_neworder(req.session['members'].id).then((result) => {neworders = result;
        }).catch((err) => warning = err);
        let depositorders;
        orderDB.m_depositorder(req.session['members'].id).then((result) => {depositorders = result;
        }).catch((err) => warning = err);
        let shiporders;
        orderDB.m_shiporder(req.session['members'].id).then((result) => {shiporders = result;
        }).catch((err) => warning = err);
        let finishorders;
        orderDB.m_finishorder(req.session['members'].id).then((result) => {finishorders = result;
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('themes/members/dashboard',{
                layout: 'themes/members',
                title: 'TRANG THÀNH VIÊN',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn,cate_dstn,amember,neworders,depositorders,shiporders,finishorders},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
    detail: function(req, res){
        authlogin.authcustomers(req, res);
        var code = req.params.code;
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);
        let cate_dsmb,cate_dsmn, cate_dstn;
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);

        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        let aorders, listdetail,thanhtoan=0;
        let orderid;

        orderDB.getorderid(code).then((result) => {
            orderid = result;
            orderDB.view(orderid).then((result) => {
                aorders=result;
                thanhtoan = aorders.totals + aorders.feeship + aorders.feepack + aorders.feebuy;
                orderDB.listdetail(orderid).then((detail) => {
                    listdetail=detail;
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('themes/members/vieworder',{
                layout: 'themes/members',
                title: 'Xem chi tiết đơn hàng',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn,cate_dstn,code,aorders,listdetail,thanhtoan},
                members:req.session['members'],
            });
        }, 100);
    },
    confirm: function(req, res) {
        authlogin.authcustomers(req, res);
        let orderid;
        var code = req.params.code;
        orderDB.getorderid(code).then((result) => {
            orderid = result;
            orderDB.confirm(orderid).then((result) => {
                res.redirect('/members/vieworder/'+code);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
};