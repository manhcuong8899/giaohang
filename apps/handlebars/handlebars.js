const hbs = require('express-handlebars');
const config = require("config");
const configDB = require("../models/ConfigDB");
const helper = require('../helpers/hepler');
var register = hbs.create({});
register.handlebars.registerHelper('isdefined', function(value) {
    return value !== undefined;
});
register.handlebars.registerHelper('status_users', function(status) {
    if(status==1){
       return  name="Kích hoạt";
    }else {
        return  name="Khóa";
    }

});

register.handlebars.registerHelper('domain_locale', function(domain) {
    switch(domain) {
        case "TBB":
            return "Tây Bắc Bộ"
            break;
        case "DBB":
           return "Đông Bắc Bộ"
            break;
        case "DBSH":
            return "Đồng Bằng Sông Hồng"
            break;
        case "BTB":
            return "Bắc Trung Bộ"
            break;
        case "NTB":
            return "Nam Trung Bộ"
            break;
        case "TN":
            return "Tây Nguyên"
            break;
        case "DNB":
            return "Đông Nam Bộ"
            break;
        case "DBSCL":
            return "ĐĐồng Bằng sông cửu long"
            break;
    }

});

register.handlebars.registerHelper('baseurl', function(string) {
    const domain = config.get("server.domain");
    const  baseurl = domain+string;
return baseurl;
});

register.handlebars.registerHelper('ifvalue', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
register.handlebars.registerHelper('feecod', function(value,fee) {
   if(value > 20000000){
       let view = helper.formatvnd(fee);
       return view
   }else{
       view = fee + '%';
   }
   return view;
});
register.handlebars.registerHelper('formatvnd', function(value) {
    value = parseInt(value);
  return helper.formatvnd(value);
});
register.handlebars.registerHelper('formatdate', function(value) {
    return helper.formatdate(value);
});
register.handlebars.registerHelper('formatdatetime', function(value) {
    return helper.formatdatetime(value);
});
register.handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});
register.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
register.handlebars.registerHelper('nameParentcate', function(code) {
    switch(code) {
        case "DSMB":
            return "ĐẶC SẢN MIỀN BẮC"
            break;
        case "DSMN":
            return "ĐẶC SẢN MIỀN NAM"
            break;
        case "DSTN":
            return "ĐẶC SẢN TÂY NGUYÊN"
            break;
    }

});
register.handlebars.registerHelper('nameParentcate', function(code) {
    switch(code) {
        case "DSMB":
            return "ĐẶC SẢN MIỀN BẮC"
            break;
        case "DSMN":
            return "ĐẶC SẢN MIỀN NAM"
            break;
        case "DSTN":
            return "ĐẶC SẢN TÂY NGUYÊN"
            break;
    }
});

register.handlebars.registerHelper('statusOrders', function(code) {
    switch(code) {
        case 1:
            return "#ff0000";
            break;
        case 2:
            return "#f8053e";
            break;
        case 3:
            return "#118a06";
            break;
        case 4:
            return "#deaf0d";
            break;
        case 5:
            return "#a27f06";
            break;
        case 6:
            return "#bc0732";
            break;
        case 7:
            return "#02861a";
            break;
        case 8:
            return "#ba0922";
            break;
        case 9:
            return "#1dcd0e";
            break;
        case 10:
            return "#cd680e";
            break;
        case 11:
            return "#cf0fa9";
            break;
        case 12:
            return "#ff0000";
            break;
        case 13:
            return "#0b0a0b";
            break;
    }
});
register.handlebars.registerHelper('totalorder', function(totals,feeship,feepack,feebuy) {
    let tong =0;
    tong = parseInt(totals) + parseInt(feeship) + parseInt(feepack) + parseInt(feebuy);
    let view = helper.formatvnd(tong);
    return view
});

register.handlebars.registerHelper('totalback', function(totals,feeship,feepack,feebuy,deposit,status) {
    let tong =0;
    tong = parseInt(totals) + parseInt(feeship) + parseInt(feepack) + parseInt(feebuy);
    if(parseInt(status) > 4){
        tong = tong - parseInt(deposit);
    }
    let view = helper.formatvnd(tong);
    return view
});

register.handlebars.registerHelper('totalsdl_cust', function(totalmoney,feeship) {
    let tong =0;
    tong = parseInt(totalmoney) + parseInt(feeship);
    let view = helper.formatvnd(tong);
    return view
});
register.handlebars.registerHelper('totalsdelivery', function(totalmoney,feeship,feeorder){
    let tong =0;
    tong = parseInt(totalmoney) + parseInt(feeship) + parseInt(feeorder);
    let view = helper.formatvnd(tong);
    return view
});
register.handlebars.registerHelper('totals_shop', function(feeship,feeorder){
    let tong =0;
    tong = parseInt(feeship) + parseInt(feeorder);
    let view = helper.formatvnd(tong);
    return view
});
register.handlebars.registerHelper('percentdelivery', function(delivery,value){
    let percent =0;
    percent = (parseInt(value)/parseInt(delivery))*100;
    return percent
});
