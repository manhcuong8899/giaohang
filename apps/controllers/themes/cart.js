const configDB = require('../../models/ConfigDB');
const sellingDB = require('../../models/SellingDB');
const helper = require('../../helpers/hepler');
const helper_cart = require('../../helpers/cart');
const userDB = require('../../models/UsersDB');
const categoryDB = require('../../models/Category');
const authlogin = require('../../helpers/auth');
const orderDB = require('../../models/OrderDB');
const setTZ = require('set-tz');
const fdate = require('date-and-time');
module.exports = {
    addcart: function(req, res) {
        var sid = req.params.sid;
        var pid = req.params.pid;
        sellingDB.findById(sid,pid).then(function(aPro){
                item = {
                    id:sid,
                    name:aPro.name,
                    slug:aPro.slug,
                    company:aPro.company,
                    address:aPro.address,
                    phone:aPro.phone,
                    supply_id:aPro.supply_id,
                    namesupply:aPro.namesupply,
                    images:aPro.images,
                    qty:1,
                    price:aPro.price,
                    totals:aPro.price*1
                }
            if(req.session.cart==undefined){
                    req.session.cart = [];
                    req.session.cart.push(item);
                }else{
                    var cart = req.session.cart;
                    var newItem = true;
                    for (var i =0; i< cart.length; i++){
                        if(cart[i].id == sid){
                            cart[i].qty= cart[i].qty + 1;
                            cart[i].totals = aPro.price *cart[i].qty;
                            newItem = false;
                            break;
                        }
                    }
                    if(newItem){
                        cart.push(item);
                    }
                }
            res.redirect('back');
        });
        },

    viewcart: function (req, res) {
      let total = helper_cart.Total(req.session.cart);
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        let cate_dsmb,cate_dsmn, cate_dstn;
        //// Danh mục Menu
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('themes/cart/cart',{
                layout: 'themes/cart',
                title: 'Giỏ hàng',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn, cate_dstn,total},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
    checkout: function (req, res) {
        if(req.session.cart==undefined || req.session.cart.length==0){
            res.redirect('/cart');
        }
        let total = helper_cart.Total(req.session.cart);
        authlogin.authcustomers(req, res);
        let listcofig;
        let settings = new Array();

        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        let cate_dsmb,cate_dsmn, cate_dstn;
        //// Danh mục Menu
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('themes/cart/checkout',{
                layout: 'themes/cart',
                title: 'Xác nhận thanh toán',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn, cate_dstn,city,total},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
    deletecart: function (req, res){
        var id = req.params.id;
        var cart = req.session.cart;
            for(let i = 0; i < cart.length; i++) {
                let item = cart[i];
                if(item.id === id) {
                    cart.splice(i, 1);
                }
            }
            res.redirect('/cart')
    },
    updatecart: function (req, res){
        const prod = req.body;
        var cart = req.session.cart;
        for(let i = 0; i < cart.length; i++){
            cart[i].qty = prod.qty[i];
            cart[i].totals = cart[i].price*prod.qty[i];
        }
        res.redirect('/cart')
    },
    postcheckout: async function (req, res){
        authlogin.authcustomers(req, res);
        setTZ('Asia/Bangkok');
        const request = req.body;
        var code = helper.codeporder();
        const now = new Date();
        var date = fdate.format(now, 'YYYY/MM/DD HH:mm:ss');
        let totals = helper_cart.Total(req.session.cart);
        let totalqty = helper_cart.TotalQty(req.session.cart);
        data ={
            code:code,
            email: request.email,
            full_name: request.full_name,
            address:request.address,
            phone:request.phone,
            city:request.city,
            status:1,
            totals:totals,
            totalqty:totalqty,
            customer_id:req.session['members'].id,
            created_at:date,
        }
        orderDB.created(data).then((result)=>{
            var orid = result[1][0].id;
            var cart = req.session.cart;

            for(let i = 0; i < cart.length; i++){
                item = {
                    order_id:orid,
                    selling_id:cart[i].id,
                    name:cart[i].name,
                    slug:cart[i].slug,
                    company:cart[i].company,
                    address:cart[i].address,
                    phone:cart[i].phone,
                    namesupply:cart[i].namesupply,
                    images:cart[i].images,
                    qty:cart[i].qty,
                    price:cart[i].price,
                    supply_id:cart[i].supply_id,
                    totals:cart[i].price*cart[i].qty,
                    created_at: date,
                }
                orderDB.createddetail(item).then((result)=>{
                }).catch((err) => {
                    res.redirect('back');
                });
                res.redirect('/success');
            }
        }).catch((err) => {
            res.redirect('back');
        });
    },
    success: function (req, res) {
        let listcofig;
        let settings = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                settings[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        let cate_dsmb,cate_dsmn, cate_dstn;
        //// Danh mục Menu
        categoryDB.getcate('DSMB').then((result) => {cate_dsmb = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSMN').then((result) => {cate_dsmn = result;
        }).catch((err) => warning = err);
        categoryDB.getcate('DSTN').then((result) => {cate_dstn = result;
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('themes/cart/success',{
                layout: 'themes/cart',
                title: 'Giỏ hàng',
                csrfToken: req.csrfToken(),
                data:{settings,cate_dsmb,cate_dsmn, cate_dstn},
                cart:req.session.cart,
                members:req.session['members'],
            });
        }, 100);
    },
};