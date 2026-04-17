const express =require("express");
const router = express.Router();
const db =require("../db");
const multer =require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename:  (req,file,cd) => {
        cd(null,Date.now() + "-" +
    file.originalname);
    }
});

const upload = multer({storage});

router.post("/upload",
upload.single("file"),(req,res) => {
    const { title,subject,userId} =req.body;
    const filePath = req.file.path;

    db.query("INSERT INTO notes(title,subject,file_url,uploaded_by)VALUES(?,?,?,?)",
       [title, subject, filePath, userId],
       (err)=>  {
         if(err)return
    res.status(500).send(err);
            res.send("Note uploaded");     
          
    
      }    
    ); 
 });

 router.get("/", (req, res) => {
    db.query("SELECT * FROME notes", (err,results) => {
        if(err) return
    res.status(500).send(err);
        res.json(results);
    });
 });

 module.exports = router;