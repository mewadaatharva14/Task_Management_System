const sqlite3 = require('sqlite3').verbose();

let sql;

const db = new sqlite3.Database('./project1.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        console.log(err);
    }
})


sql = `drop table tasks`;
db.run(sql);

// module.exports = {sql,db}