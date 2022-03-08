const db = require('../models/connectionDB');
function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            con.query('select * from branch',function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
module.exports ={
    all:all
}