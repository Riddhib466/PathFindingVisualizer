const express =require("express");
const router =express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/register",async(req,res)=>{
    const { name,email,password } = req.body;

    const hashedPassword = await
   bcrypt.hash(password,10);
        db.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",
          [name,email,hashedPassword],
          (err,result)=>{
        if(err) return
    res.status(500).send(err);
        res.send("User registered");
    }
   );
});

module.exports =router;