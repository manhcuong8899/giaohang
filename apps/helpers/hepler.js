var bcrypt =require('bcrypt');
const config = require("config");
const setTZ = require('set-tz')
const slug = require('slug');
const multer =require('multer');
const makeDir = require('make-dir');
const fdate = require('date-and-time');
const fs = require('fs');

function hash_password(apass) {
    var saltRounds = config.get("salt");
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(apass,salt);
    return hash;
}
function compare_password(pass,hash){
    return bcrypt.compareSync(pass,hash);
}
function checkPhoneNumber(phone) {
    var flag = false;
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                flag = true;
            }
        }
    }
    return flag;
}

function formatvnd(value){
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(value)
    return formatter
}
function formatdate(value){
    var datetime = fdate.format(value, 'YYYY-MM-DD');
    return datetime
}
function formatdatetime(value){
    var datetimetime = fdate.format(value, 'DD/MM/YYYY HH:mm:ss');
    return datetimetime
}
function codesupply(){
    setTZ('Asia/Bangkok')
    var date = Date.now();
    var code = "SL"+date;
    return code;
}
function codeshop(){
    setTZ('Asia/Bangkok')
    var date = Date.now();
    var code = "SH"+date;
    return code;
}
function codeporder(){
    setTZ('Asia/Bangkok')
    var date = Date.now();
    var code = "OR"+date;
    return code;
}
function codedelivery(){
    setTZ('Asia/Bangkok')
    var date = Date.now();
    var code = "DL"+date;
    return code;
}
function getNametypeArticles(code) {
    var name = "";
    switch(code) {
        case "products":
             name = "Sản phẩm";
            break;
        case "news":
            name = "Tin tức";
            break;
        case "servies":
            name = "Dịch vụ";
            break;
        case "introduction":
            name = "Giới thiệu";
            break;
        case "policy":
            name = "Quy định và Chính sách";
            break;
        case "guide":
            name = "Hướng dẫn";
            break;
    }
    return name;
}

function uploadimages(path,input) {
    let nameimages;
    let diskStorage = multer.diskStorage({
        destination: (req, file,callback) => {
            const names = slug(req.body.name);
            makeDir(path+names);
            const linkimages =path+names;
            callback(null, linkimages);
        },
        filename: (req,file,callback) => {
            const names = req.body.name;
            let math = ["image/png", "image/jpeg","image/jpg"];
            if (math.indexOf(file.mimetype) === -1) {
                let errorMess = 'File <strong>' + file.originalname +'</strong> không đúng định dạng. Chỉ áp dụng file định dạng hình ảnh.';
                return callback(errorMess, null);
            }
            // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            nameimages = slug(names)+ '.'+ extension;
            callback(null, nameimages);
        }
    });
    let uploadFile = multer({storage: diskStorage}).single(input);
    return uploadFile;
}

function uploadMultipleimages(path) {
    let nameimages;
    let diskStorage = multer.diskStorage({
        destination: (req, file,callback) => {
            const names = slug(req.body.name);
            if(file.fieldname =='images'){
                makeDir(path+names);
                const linkimages =path+names;
                callback(null, linkimages);
            }else{
                makeDir(path+names+'/views');
                const linkimages =path+names+'/views';
                callback(null, linkimages);
            }
        },
        filename: (req,file,callback) => {
            const names = req.body.name;
            let math = ["image/png", "image/jpeg","image/jpg"];
            if (math.indexOf(file.mimetype) === -1) {
                let errorMess = 'File <strong>' + c +'</strong> không đúng định dạng. Chỉ áp dụng file định dạng hình ảnh.';
                return callback(errorMess, null);
            }
            // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];

            if(file.fieldname =='images'){
                nameimages = slug(names)+ '.'+ extension;
            } else{
                nameimages =slug(names)+ '-' + Date.now() + '.'+ extension;
            }
            callback(null, nameimages);
        }
    });
    let uploadFile = multer({storage: diskStorage}).fields([{ name: 'images', maxCount: 1 }, { name: 'input-image', maxCount: 5 }]);
    return uploadFile;
}

function uploadimages_setnamecode(path,input,code) {
    let nameimages;
    let diskStorage = multer.diskStorage({
        destination: (req, file,callback) => {
            makeDir(path+code);
            const linkimages =path+code;
            callback(null, linkimages);
        },
        filename: (req,file,callback) => {
            let math = ["image/png", "image/jpeg","image/jpg"];
            if (math.indexOf(file.mimetype) === -1) {
                let errorMess = 'File <strong>' + file.originalname +'</strong> không đúng định dạng. Chỉ áp dụng file định dạng hình ảnh.';
                return callback(errorMess, null);
            }
            // Tên của file thì mình nối thêm một cái nhãn thời gian để đảm bảo không bị trùng.
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            nameimages = code+ '.'+ extension;
            callback(null, nameimages);
        }
    });
    let uploadFile = multer({storage: diskStorage}).single(input);
    return uploadFile;
}
function getnameimages(slug,type) {
            let extArray = type.split("/");
            let extension = extArray[extArray.length - 1];
            let nameimages = slug+ '.'+ extension;
            return nameimages;
}
function renamefolder(oldDirName,newDirName ) {
    if (fs.existsSync(oldDirName)) {
        return fs.renameSync(oldDirName, newDirName);
    }
}
function deleteDirectory(dir) {
    if (fs.existsSync(dir)) {
       return  fs.rmdirSync(dir, { recursive: true });
    }
};
function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

function spit(slug) {
    return slug.split(".html", 2);
}

module.exports ={
    hash_password:hash_password,
    compare_password:compare_password,
    checkPhoneNumber:checkPhoneNumber,
    formatvnd:formatvnd,
    formatdate:formatdate,
    formatdatetime:formatdatetime,
    codesupply:codesupply,
    codeshop:codeshop,
    getNametypeArticles:getNametypeArticles,
    uploadimages:uploadimages,
    getnameimages:getnameimages,
    renamefolder:renamefolder,
    deleteDirectory:deleteDirectory,
    uploadimages_setnamecode:uploadimages_setnamecode,
    uploadMultipleimages:uploadMultipleimages,
    isEmpty:isEmpty,
    spit:spit,
    codeporder:codeporder,
    codedelivery:codedelivery
}