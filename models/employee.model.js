const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    salary: {
        type: String,
        title: 'salary',
        sal: [
            "Below 2 Lacs0",
            "2-4 Lacs",
            "4-7 Lacs",
            "Above 7 lacs"
        ],
        "salNames": [
            "Below 2 Lacs0",
            "2-4 Lacs",
            "4-7 Lacs",
            "Above 7 lacs"
        ]
        }
    // salary: {
    //     type: Array,
    //     required: true
    // }
});

// Fire a Function before Doc save to empDB
employeeSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Custom validation for email
// employeeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');


mongoose.model('Employee', employeeSchema);