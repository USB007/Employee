require('./models/db')

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const ejs = require('ejs')
const expressValidator = require('express-validator');
const {check, validationResult} = require('express-validator')
// const Handlebars = require('handlebars')
const select = require('./handlebars_helper.js');
const employeeController = require('./controllers/employeeController');
var paginateHelper = require('express-handlebars-paginate');

// //Register Helper
// exphbs.registerHelper('paginate', paginate);


var app = express();
app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.use(bodyParser.json());

app.use(
    express.urlencoded({
      extended: true
    })
  );


app.set('views',path.join(__dirname,'/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',  }));

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));

app.set('view engine', 'hbs');
// app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({extended : false}) 

app.set(expressValidator)
app.listen(3003,() =>{
    console.log('Express server started at  port 3003')
});


// Pagination  
// app.get('/list',(req,res) =>{
// const page = parseInt(req.query.page)
// const limit = parseInt(req.query.limit)

// const startIndex = (page -1 ) * limit
// const endIndex = page * limit

// const results={}
// if (endIndex < await model.countDocuments().exec()) {
// result.next = {
//   page: page +1,
//   limit : limit
// }
// }

// if (startIndex > 0) {
// results.previous ={
//   page: page - 1,
// limit : limit
// }
// }

// })

//pagination end here

app.use('/employee', employeeController);
// app.use('/update', employeeController);