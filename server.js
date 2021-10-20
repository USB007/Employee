require('./models/db')

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const ejs = require('ejs')




const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyParser.urlencoded({ 
    extended: true

}));

app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', }));
app.set('view engine', 'hbs');
// app.set('view engine', 'ejs');


app.listen(3003,() =>{
    console.log('Express server started at  port 3003')
});


app.use('/employee', employeeController);