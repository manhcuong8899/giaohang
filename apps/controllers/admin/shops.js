const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const shopDB = require('../../models/ShopDB')
const discountDB = require('../../models/DiscountDB')
const pricelistDB = require('../../models/PricelistDB')
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    all:  function(req, res) {
        authlogin.authstaff(req, res);
        let listshop;
        shopDB.all().then((result) => { listshop = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shops/all', {
                layout: 'shops',
                title: 'Quản lý thông tin Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{listshop},
                user:req.session['user'],
            });
        }, 100);
    },
    created: function(req, res){
        const request = req.body;
        const  phone = request.phone;
        const code = helper.codeshop();
        const checkphone = helper.checkPhoneNumber(phone);
        if(checkphone==false){
            res.render("shops/all",{layout: 'shops',csrfToken: req.csrfToken(),data:{error:"Số điện thoại không hợp lệ"}});
        }else{
            var formartphone = phone.replace('0', '+84');
        }
        var pass = helper.hash_password('12345678');
        data ={
            name: request.name,
            full_name: request.full_name,
            phone:formartphone,
            email:request.email,
            address:request.address,
            taxcode:request.taxcode,
            code:code,
        }
        shopDB.created(data).then((result) => {
            let sid;
          let datauser = [];
           shopDB.getShopid(formartphone).then((shopid)=>{
               sid = shopid;
               datauser={
                   full_name: request.full_name,
                   username: formartphone,
                   phone: formartphone,
                   password: pass,
                   status:1,
                   email:request.email,
                   shop_id:sid,
                   verified:1,
                   type_user:2,
                   role_id:1,
                   no_delete:1,
               }
               userDB.register(datauser).then((kq)=>{
                   res.redirect('back');
               });
           });
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete:  function(req, res){
        var shopid = req.params.id;
        shopDB.deleteshop(shopid).then((result) =>{
            res.redirect('/admin/shops/all');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view:  function(req, res){
        var id = req.params.id;
        shopDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        shopDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach: function(req, res){
        authlogin.authlogin(req, res);
        const data = req.body;
        let listshop;
        shopDB.seach(data).then((result) => { listshop = result; console.log(listshops)})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shops/all',{
                layout: 'shops',
                title: 'Quản lý thông tin Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{listshop},
                user:req.session['user'],
            });
        }, 100);
    },
    users:  function(req, res){
        const shopid = req.params.id;
        authlogin.authstaff(req, res);
        let warning; let liststaff; let listroles; let branch;
        userDB.shopsusers(shopid).then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
       shopDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/shops',{
                layout: 'users',
                title: 'Quản lý tài khoản Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },
    dashboard:  function(req, res){
        const shopid = req.params.id;
        authlogin.authstaff(req, res);
        let info; let countuser,discount,transportfee,codfee;
        shopDB.view(shopid).then((result) => { info = result;})
            .catch((err) => warning = err);
        shopDB.countuser(shopid).then((count) => { countuser = count.TotalCount;
            })
            .catch((err) => warning = err);
        discountDB.shop(shopid).then((result) => { discount = result;
            console.log(discount);})
            .catch((err) => warning = err);
        pricelistDB.shop(shopid).then((result) => { transportfee = result;})
            .catch((err) => warning = err);
        pricelistDB.codfee(shopid).then((result) => { codfee = result;})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('shops/dashboard',{
                layout: 'shops',
                title: 'Thông tin chi tiết Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{info,countuser,discount,transportfee,codfee},
                user:req.session['user'],
            });
        }, 100);
    },
};