const authlogin = require('../helpers/auth');
const configDB = require('../models/ConfigDB')
const pricelistDB = require('../models/PricelistDB')
const addressDB = require('../models/AddressDB')
const date = require('date-and-time');

function TotalKg(weight) {
    if(!weight){
        return 0;
    }
    let Total=0;
    for (var i =0; i< weight.length; i++){
        Total = Total + parseInt(weight[i]);
        }
    return Total;
};
module.exports ={
    TotalKg:TotalKg,
}