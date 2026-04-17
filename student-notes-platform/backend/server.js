const express= require("express");
const mysql=require("mysql2");
const bcrypt=require("bcrypt");
const cors =require("cors");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
