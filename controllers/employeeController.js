const express = require('express');
var router= express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/',(req,res) => {
    res.render('employee/addOrEdit',{
        viewTitle : "Inserted Employee"
    });
});
router.post('/',(req,res) => {
    insertRecord(req,res);
})

// Insert Record Function
function insertRecord(req,res) {
    var employee=new Employee();
    employee.id=req.body.id;
    employee.username=req.body.username;
    employee.password=req.body.password;
    employee.email=req.body.email;
    employee.salary=req.body.salary;
    employee.save((err, doc) => {
        if(!err) 
            res.redirect('/employee/list');
        else
            console.log("Error During Record Insertion :" + err );


    });
}


// update employee function

// function updateRecord(req, res) {
//     Employee.findOneAndUpdate({ _id: req.body.id },
//             req.body, { new: true }, (err, doc) => {
//         if (!err) { res.redirect('employee/list'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("employee/addOrEdit", {
//                     viewTitle: 'Update Employee',
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
//     next();
// }


function updateRecord(req,res){
    Employee.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("views/employee/addOrEdit", {
                    viewTitle: 'Update User',
                    users: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


// Retrieving employee from database
router.get('/list',(req,res) => { 
    // res.json('from List');
    Employee.find((err, docs) => {
        if(!err) {
            res.render('employee/list',{
                list:docs
            });
        }
        else {
            console.log('error in retrieving employee list : ' + err);
        }
    }).lean(); // It is prevent the warning when trying to display records
});


// delete employee

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


// Update Employee details
// router.get('/:_id', (req, res) => {
//         Employee.findByIdAndUpdate(req.params._id, (err, doc) => {
//         if (!err) {
//             res.render("employee/addOrEdit", {
//                 viewTitle: "Update Employee",
//                 employee: doc
//             });
//         }else { res.send('Error in employee update :' + err); }
//     });
// });

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                titleName: "Update Employee",
                employee: doc
            });
        }
    });
});


module.exports =router;