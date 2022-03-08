const var_dump = require('var_dump');
const helpers = require('../../helpers/hepler');
const help_delivery = require('../../helpers/delivery');
const authlogin = require('../../helpers/auth');
const configDB = require('../../models/ConfigDB')
const pricelistDB = require('../../models/PricelistDB')
const addressDB = require('../../models/AddressDB')
const deliveryDB = require('../../models/DeliveryDB');
const date = require('date-and-time');
const setTZ = require('set-tz');
const fdate = require('date-and-time');
module.exports = {
    created:  function(req, res) {
        authlogin.authshop(req, res);
        const datenow = date.format(new Date(), 'DD/MM/YYYY');
        let province, listaddress;
        configDB.city().then((result) => {province = result})
            .catch((err) => warning = err);
        addressDB.address_shop(req.session['user'].shop_id).then((result) => {listaddress = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/delivery/created', {
                layout: 'shop/delivery',
                title: 'Tạo vận đơn vận chuyển',
                csrfToken: req.csrfToken(),
                data:{province,listaddress},
                user:req.session['user'],
                datenow:datenow,
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
    post_created: async  function(req, res) {
        authlogin.authshop(req, res);
        const data = req.body;
        setTZ('Asia/Bangkok');
        const now = new Date();
        var dateorder = fdate.format(now, 'YYYY/MM/DD HH:mm:ss');
        const randomcode = helpers.codedelivery();
        let totalweight = help_delivery.TotalKg(data.weight);

        let feeorder;
        var thuho = data.totalmoney.replace(/,/g, "");
        let feeship;
        pricelistDB.getfeeorders(parseInt(thuho)).then((kq) =>{
            feeorder = (thuho/100)*kq.fee;
            let addReceive ;
            let addSend;
            configDB.compares(data.province,data.addressshop).then((kq) => {
                let type = 'NT';
                addReceive = kq[0];
                addSend = kq[1];
                var code = addReceive[0].code.localeCompare(addSend[0].code);
                var domain = addReceive[0].domain.localeCompare(addSend[0].domain);
                if(code!=0){
                    type = 'NM';
                    if(domain != 0){
                        type = 'LM';
                    }
                }
                var gam = totalweight*1000;
                pricelistDB.getfee(type,gam).then((result) =>{
                    var maxvalue = result[1][1].value;
                    if(gam > maxvalue){
                        var kg = (gam - maxvalue)/1000; /// Số kg tính thêm
                        var add = result[0][0].fee*Math.ceil(kg); /// Phí thêm
                        feeship = result[1][1].fee + add;
                    }else{
                        feeship = result[0][0].fee;
                    }
                    /// Chen du lieu vao bang order van don delivery
                    adata ={
                        code:randomcode,
                        phone: data.phone,
                        full_name: data.full_name,
                        address:data.address,
                        city:data.province,
                        district:data.district,
                        wards:data.wards,
                        addressshop:data.addressshop,
                        status:1,
                        created_at:dateorder,
                        shop_id:req.session['user'].shop_id,
                        users_id:req.session['user'].id,
                        feeorder:feeorder,
                        totalmoney:parseInt(thuho),
                        feeship:feeship,
                    }
                    deliveryDB.created(adata).then((result)=>{
                        var orid = result[1][0].id;
                        for(let i = 0; i < data.name.length; i++){
                            item = {
                                order_id:orid,
                                name:data.name[i],
                                qty:data.amount[i],
                                weight:data.weight[i],
                            }
                            deliveryDB.createddetail(item).then((result)=>{
                            }).catch((err) => {
                                res.redirect('back');
                            });
                            res.redirect('/shop/delivery/created');
                        }
                    }).catch((err) => {
                        res.redirect('back');
                    });
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    status:  function(req, res) {
        setTimeout(() => {
            res.status(200).render('shop/delivery/status', {
                layout: 'shop/delivery',
                title: 'Quản lý đơn hàng',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },
    feetransport: async function(req, res){
        data = req.body;
        let addReceive ;
        let addSend;
        configDB.compares(data.province,data.addressshop).then((kq) => {
            let type = 'NT';
            addReceive = kq[0];
            addSend = kq[1];
            var code = addReceive[0].code.localeCompare(addSend[0].code);
            var domain = addReceive[0].domain.localeCompare(addSend[0].domain);
            if(code!=0){
                    type = 'NM';
                if(domain != 0){
                    type = 'LM';
                }
            }
            var gam = data.totalkg*1000;
            pricelistDB.getfee(type,gam).then((result) =>{
                var maxvalue = result[1][1].value;
                if(gam > maxvalue){
                    var kg = (gam - maxvalue)/1000; /// Số kg tính thêm
                    var add = result[0][0].fee*Math.ceil(kg); /// Phí thêm
                       let fee = result[1][1].fee + add;

                        data ={
                            fee:fee
                        }
                        res.send(data);
                }else{
                    let fee = result[0][0].fee;
                    data ={
                        fee:fee
                    }
                    res.send(data);
                }
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
    },
    feeorders: async function(req, res){
        data = req.body;
        pricelistDB.getfeeorders(data.money).then((kq) =>{
            fee ={
                orders:(data.money/100)*kq.fee
            }
        res.send(fee)
        }).catch((err) => warning = err);

    },
    all:  function(req, res) {
        authlogin.authshop(req, res);
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        deliveryDB.shop_all(req.session['user'].shop_id).then((result) => {listsorders = result;})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('shop/delivery/all',{
                layout: 'shop/delivery',
                title: 'Quản lý vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },

    bystatus:  function(req, res) {
        authlogin.authshop(req, res);
        var statuscode = req.params.code;
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        deliveryDB.shop_listbystatus(statuscode,req.session['user'].shop_id).then((result) => {listsorders = result;})
            .catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('shop/delivery/all',{
                layout: 'shop/delivery',
                title: 'Quản lý vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },

    detail: function(req, res){
        authlogin.authshop(req, res);
        var code = req.params.code;
        let aorders, listdetail,status,Totals = 0,Totalskg=0;
        let orderid;
        let addshop;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        deliveryDB.getorderid(code).then((result) => {
            orderid = result;
            deliveryDB.view(orderid).then((result) => {
                aorders=result;
                Totals = Totals + parseInt(aorders.totalmoney) + parseInt(aorders.feeorder) + parseInt(aorders.feeship);
                deliveryDB.listdetail(orderid).then((detail) => {
                    listdetail=detail;
                    listdetail.forEach(function(value) {
                        Totalskg = Totalskg + value.weight;
                    });
                }).catch((err) => warning = err);
                addressDB.view_address(aorders.addressshop,aorders.shop_id).then((result) => {addshop = result;
                }).catch((err) => warning = err);
            }).catch((err) => warning = err);
        }).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/delivery/detail',{
                layout: 'shop/delivery',
                title: 'Chi tiết vận đơn',
                csrfToken: req.csrfToken(),
                data:{code,aorders,listdetail,status,Totalskg,Totals,addshop},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
    seach: function(req, res){
        authlogin.authshop(req, res);
        const data = req.body;
        let warning; let listsorders;
        let status;
        deliveryDB.liststatus().then((kq) => {
            status = kq;
        }).catch((err) => warning = err);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);

        deliveryDB.shop_seach(data,req.session['user'].shop_id).then((result) => { listsorders = result;}
        ).catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/delivery/all',{
                layout: 'shop/delivery',
                title: 'Kết quả tìm kiếm vận đơn',
                csrfToken: req.csrfToken(),
                data:{listsorders,status,city},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },

};