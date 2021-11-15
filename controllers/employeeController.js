const express = require('express');
var router= express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


// Insert Route
router.get('/',(req,res) => {
    res.render('employee/addOrEdit',{
        viewTitle : "Insert Employee"
    });
});




// // Insert Employee Recoord into Database
router.post('/',(req,res) => {
    // req.body._id == ''
    insertRecord(req,res);
    // console.log('Error While Inserting employee record')
    });


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


// Retrieving ALL employee from database in table and sorting according to last entry on top
router.get('/list',(req,res) => { 
    Employee.find((err, docs)  => {
        if(!err) {
            res.render('employee/list',{
                list:docs
            });
        }
        else {
            console.log('error in retrieving employee list : ' + err);
        }
    }).sort({_id:-1}).lean(); // It is prevent the warning when trying to display records. It is must use while doing CRUD Operations using HBS.
// .sort({_id:-1}) this will help me to sort the data and show the lastest entry on top.
});



// // update employee function
// function updateRecord(req, res) {
//     Employee.findOneAndUpdate({ _id: req.body._id },
//             req.body, { new: true }, (err, doc) => {
//         if (!err) { res.redirect('list'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("employee/update", {
//                     viewTitle: 'Update Employee',
//                     emp: req.body
                    
                    
//                 });console.log("updated");
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     }).lean();

// }




// // Update Employee Recoord into Database
// router.put('/update/:_id', (req, res) => {

//     updateRecord(req,res);

// });



// // Update Route
// // router.post('/update/:_id',(req,res) => {
// //     if(req.body._id == '')
// //     insertRecord(req,res);
// //     else
// //     updateRecord(req,res);
// // });

// // Getting Employee details for Update Employee Records.

// router.get('/update/:id',(req,res) => {
//     Employee.findById(req.params.id, (err, doc) => {console.log(doc)  
//         if (!err) {
//             res.render("employee/update", {
//                 viewTitle: "Update Employee",
//                 emp: doc,
                
//             });
//         }
//     }).lean();
// });




//update employee function


function updateRecord(req,res){
    Employee.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    emp: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving users list :' + err);
        }
    });
});



// Update Route
router.post('/',(req,res) => {
    if(req.body._id == '')
    insertRecord(req,res);
    else
    updateRecord(req,res);
});



// Getting Employee details for Update Employee Records.
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                titleName: "Update User",
                emp: doc
            });
        }
    }).lean();
});




// delete route employee

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports =router;