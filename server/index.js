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
    MfgDate:String,
    Expire:String,
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

  app.get("/drug/:DrugCode", async (req, res) => {
    try {
      const drug = await userModel.findOne({ DrugCode: req.params.DrugCode });
      if (!drug) {
        res.status(404).json({ message: 'Drug not found' });
      } else {
        res.json({ ProductName: drug.ProductName, BatchNo: drug.BatchNo, Quantity: drug.Quantity, Discount: drug.Discount, Pack: drug.Pack, MRP: drug.MRP, amount: drug.amount, MfgDate: drug.MfgDate, Expire: drug.Expire});
      }
    } catch (error) {
      console.error("Error fetching drug:", error);
      res.status(500).json({ message: error.message });
    }
  })

  app.put('/drug/:DrugCode', async (req, res) => {
    try {
        const { quantity } = req.body;
        const medicine = await userModel.findOne({ DrugCode: req.params.DrugCode });
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const quantityPerPack = Math.floor(medicine.Quantity / medicine.Pack);
        if (quantity > quantityPerPack) {
            return res.status(400).json({ message: 'Quantity exceeds available quantity per pack' });
        }

        const newQuantity = medicine.Quantity - quantity;
        let newPackSize = medicine.Pack;

        if (quantity === quantityPerPack) {
            newPackSize -= 1;
        }

        if (newPackSize < 0) {
            return res.status(400).json({ message: 'Quantity exceeds available pack size' });
        }

        medicine.Quantity = newQuantity;
        medicine.Pack = newPackSize;
        await medicine.save();
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//delete data
app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : 'true', message : "data deleted successfully", data : data})
})



// API Endpoint to get product name and batch no by drug code
// Get product name by drug code
app.post("/updateDrug", async (req, res) => {
  try {
    const { DrugCode, Quantity, Pack } = req.body;

    if (!DrugCode || Quantity == null || Pack == null) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const drug = await userModel.findOne({ DrugCode });

    if (!drug) {
      return res.status(404).json({ message: 'Drug not found' });
    }

    if (drug.Quantity < Quantity || drug.Pack < Pack) {
      return res.status(400).json({ message: 'Insufficient quantity or pack' });
    }

    // Assuming batchNo and ProductName are fields in your userModel schema
    const batchNo = drug.BatchNo;
    const ProductName = drug.ProductName;
    const Mfg = drug.MfgDate;
    const Expire = drug.Expire;

    drug.Quantity -= Quantity;
    drug.Pack -= Pack;

    await drug.save();

    res.json({
      message: 'Quantity and pack updated successfully',
      BatchNo: batchNo,
      ProductName: ProductName,
      MfgDate: Mfg,
      Expire: Expire
    });
  } catch (error) {
    console.error("Error updating drug:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

mongoose.connect("mongodb://localhost:27017/medicine", )
.then(() =>{
    console.log("connected to db")
    app.listen(PORT, () => {
        console.log(`Server is running`)
      })
})
.catch((err) => console.log(err))
 
