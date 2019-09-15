const express = require('express');
const router = express.Router();

const mysqlconnection = require('../database');

router.get('/api/v1/employees',(req,res)=>{

    mysqlconnection.query('SELECT * FROM employees',(err,rows,fields)=>{
        if(!err)
        {

            res.json(rows);
        }
        else
        {
            console.log(err);
        }
    });
});

router.get('/:id',(req,res)=>{

    const {id} =req.params;
    mysqlconnection.query('SELECT * FROM employees WHERE id=?',[id],(err,rows,fields)=>{

        if(!err)
        {

            res.json(rows[0]);
        }
        else
        {
            console.log(err);
        }

    });
});

router.post('/',(req,res) =>{

    const {id,nombre,salary} = req.body;
    console.log(req.body);
    
    const query =  `
        CALL employeesaddORupdate(?,?,?);
    `;
    mysqlconnection.query(query,[id,nombre,salary],(err,rows,fields)=>{

        if(!err)
        {
            res.json({Status: 'Employeed Saved'});
        }
        else
        {
            console.log(err);
            
        }
    });
});

router.put('/:id',(req,res) => {

    const {nombre,salary} = req.body;
    const {id} = req.params;
    const  query = 'CALL employeesaddORupdate(?,?,?)';
    mysqlconnection.query(query,[id,nombre,salary],(err,rows,fields) => {

        if(!err)
        {
            res.json('Employee Updated');
        }
        else
        {
            console.log(err);
        }
    });
});

router.delete('/:id',(req,res) => {

    const {id} = req.params;
    mysqlconnection.query('DELETE FROM employees WHERE id=?',[id],(err,rows,fields)=> {

        if(!err)
        {
           res.json({Status:"Employeeed deleted"});
        }
        else
        {
            console.log(err);
        }
    });

});
module.exports =router;