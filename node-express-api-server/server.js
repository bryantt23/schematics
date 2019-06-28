//create express app
var express=require("express");
var app=express();
var db=require("./database.js");

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });



//server port
var HTTP_PORT=8000;
//start server
app.listen(HTTP_PORT, ()=>{
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
//root endpoint
app.get("/", (req, res, next)=>{
    res.json({"message": "Okay"});
});

//insert here other API endpoints
app.get("/api/pets", (req, res, next)=>{
    var sql="select * from pet";
    var params=[];
    db.all(sql, params, (err, rows)=>{
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.jsonp({
            "message":"success",
            "data":rows
        });
    });
});

app.get("/api/pet/:id", (req, res, next) => {
    var sql = "select * from pet where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/pet/", (req, res, next)=>{
    // /*
    var errors=[];
    if(!req.body.animal){
        errors.push("No animal specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data={
        animal: req.body.animal
    }
    var sql='INSERT INTO pet (animal) VALUES (?)';
    var params=[data.animal];
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data":data
            ,
            "id": this.lastID
        });
    });
    // */
//    return "hello";


});


//default response for any other request
app.use(function(req, res){
    res.status(404);
});