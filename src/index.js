const express = require('express');
const app = express();
const route = require('./Route/route');
const mongoose = require('mongoose');

var cookieParser = require('cookie-parser')
const cors = require("cors")
const dotenv = require('dotenv')
 dotenv.config()

let MONGODB_URL = process.env.MONGODB_URL
let port = process.env.PORT

app.use(cors())
app.use(cookieParser())

app.use(express.json());



mongoose.connect(MONGODB_URL, {
    useNewUrlParser : true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(port, function () {
    console.log('Express app running on port ' + (port))
});