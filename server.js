const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)


var Users = require('./api/routes/Users')

app.use('/users', Users);

app.listen(port, function() {
    console.log('server is listen on port: ' + port)
});
