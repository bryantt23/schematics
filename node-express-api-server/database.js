var sqlite3 = require('sqlite3').verbose();
// var md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        //can't open database
        console.error(err.message);
        throw err;
    }
    else {
        console.log("Connected to SQLite database");
        db.run(`CREATE TABLE pet(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            animal text
            )`,
            (err) => {
                if (err) {
                    //table already created
                }
                else {
                    //table just created, creating some rows
                    var insert = 'INSERT INTO pet (animal) VALUES (?)';
                    db.run(insert,
                        ["dog"]);
                    db.run(insert,
                        ["cat"]);
                    db.run(insert,
                        ["snake"]);
                }
            }
        )
    }
});

module.exports=db;