const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    DrugCode: Number,
    ProductName: String,
    BatchNo:Number,
    Quantity:Number,
    Discount:Number,
    MfgDate:Date,
    Expire:Date,
    Pack:Number,
    MRP:Number,
    Tax:Number,
    amount:Number
},{
    timestamps : true
})

//read
const userModel = mongoose.model("User", schemaData)
app.get('/', async(req, res) => {
    const data = await userModel.find()
  res.json({success : 'true',data: data})
})

//create // save data
app.post('/create', async(req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : 'true', message : "data saved successfully", data: data})
})


app.get('/getUser/:id', async (req, res) => { // Corrected route parameter syntax
    const id = req.params.id;
    const data = await userModel.findById({_id:id}); // Simplified findById usage
    if (data) {
        res.status(200).json({success: 'true', message: "Data fetched successfully", data: data});
    } else {
        res.status(404).json({success: 'false', message: "Data not found"});
    }
})

// update data
app.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { ...rest } = req.body;
      const data = await userModel.updateOne({ _id: id }, { $set: rest });
      res.send({ success: true, message: "Data updated successfully", data: data });
    } catch (error) {
      console.error("Failed to update data:", error);
      res.status(500).send({ success: false, message: "Failed to update data" });
    }
  });


//delete data
app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : 'true', message : "data deleted successfully", data : data})
})

mongoose.connect("mongodb://localhost:27017/medicine")
.then(() =>{
    console.log("connected to db")
    app.listen(PORT, () => {
        console.log(`Server is running`)
      })
})
.catch((err) => console.log(err))
 
