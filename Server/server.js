const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost:27017/bitcoiner', {useNewUrlParser: true,useUnifiedTopology:true});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var PORT = 3000;
const DataTable = mongoose.model('DataTable', {
    name: String,
    email: String,
    password: String,
   });
app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});