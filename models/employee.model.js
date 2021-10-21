const mongoose = require('mongoose');


var employeeSchema = new mongoose.Schema({
    
    id: { type: 'string',
    required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: { type: 'string',
    required:true
},
    email: {
        type: String,
        required:true
    },
    mobile: {
        type: String,
        required:true
    },
    salary: {
        type: Number,
        required:true
    }
});





// Custom validation for email
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');



// employeeSchema.path('password').validate((val) => {
//     const passRegex = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
//     return passRegex.test(password);
// }, 'Invalid Password'  )









mongoose.model('Employee', employeeSchema);