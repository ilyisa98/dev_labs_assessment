var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var reverse = require('reverse-object-order');
var reversed = require('reverse-object');
var port = 3000;

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));


//receiving post request
app.post('/user', function (req, res) {
    dbConn.then(function(db) {
        db.collection('user').insertOne(req.body)
    });
    
    //escapes apostrophe
    var data = (req.body);
    

    //reverse data
    var reversedData = reverse(data);
    var finalData = reversed(reversedData);
    
    //print data
    res.send(finalData);
    
    
    
    
});

app.listen(port, () => {
  console.log("Server listening on port " + port)
});
