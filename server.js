const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors')
app.use(cors())
app.post('/insertData', async (req,res)=>{  
       const { selectedMovie,selectedSlot,seatData } = req.body;
       console.log(req.body);
          await connection.create({movie:selectedMovie,slot:selectedSlot,seats:seatData});
          res.send({status:"Insert Successfully"});
          console.log('Insert Successfully');
   
   });

app.get('/getData',async(req,res)=>{
   const data= await connection.findOne().sort({ _id: -1 });
   console.log(data);
   res.json(data);
})



app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   