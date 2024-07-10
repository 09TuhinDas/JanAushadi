const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'  // Allow requests from localhost:5173
  }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Medicine schema
const schemaData = mongoose.Schema({
    DrugCode: Number,
    ProductName: String,
    BatchNo: Number,
    Quantity: Number,
    Discount: Number,
    MfgDate: String,
    Expire: String,
    Pack: Number,
    MRP: Number,
    Tax: Number,
    amount: Number,
}, {
    timestamps: true
});

// Invoice schema
const invoiceSchema = mongoose.Schema({
    invoiceNumber: { type: Number, required: true, unique: true },
    billedItems: [{
      DrugCode: Number,
      ProductName: String,
      BatchNo: Number,
      Quantity: Number,
      Discount: Number,
      MfgDate: String,
      Pack: Number,
      MRP: Number,
      amount: Number
    }],
    netAmount: { type: Number, required: true }, // New field for net amount
  }, { timestamps: true });
// Medicine model
const userModel = mongoose.model("User", schemaData);

// Invoice model
const invoiceModel = mongoose.model("Invoice", invoiceSchema);

// Read medicines
app.get('/', async (req, res) => {
    const data = await userModel.find();
    res.json({ success: 'true', data: data });
});

// Create medicine
app.post('/create', async (req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: 'true', message: "Data saved successfully", data: data });
});

// Get medicine by ID
app.get('/getUser/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userModel.findById({ _id: id });
    if (data) {
        res.status(200).json({ success: 'true', message: "Data fetched successfully", data: data });
    } else {
        res.status(404).json({ success: 'false', message: "Data not found" });
    }
});

// Update medicine by ID
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

// Get medicine by DrugCode
app.get("/drug/:DrugCode", async (req, res) => {
    try {
        const drug = await userModel.findOne({ DrugCode: req.params.DrugCode });
        if (!drug) {
            res.status(404).json({ message: 'Drug not found' });
        } else {
            res.json({ ProductName: drug.ProductName, BatchNo: drug.BatchNo, Quantity: drug.Quantity, Discount: drug.Discount, Pack: drug.Pack, MRP: drug.MRP, amount: drug.amount, MfgDate: drug.MfgDate, Expire: drug.Expire });
        }
    } catch (error) {
        console.error("Error fetching drug:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update medicine quantity and pack by DrugCode
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

// Delete medicine by ID
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: 'true', message: "Data deleted successfully", data: data });
});

// Update medicine quantity and pack
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

// Get the latest invoice number
app.get('/latest-invoice', async (req, res) => {
  try {
      const latestInvoice = await invoiceModel.findOne().sort({ createdAt: -1 });
      const invoiceNumber = latestInvoice ? latestInvoice.invoiceNumber : 0;
      res.json({ invoiceNumber });
  } catch (error) {
      console.error("Error fetching latest invoice:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Get the next invoice number
// Get the next invoice number
app.get('/next-invoice-number', async (req, res) => {
  try {
      const latestInvoice = await invoiceModel.findOne().sort({ createdAt: -1 });
      const nextInvoiceNumber = latestInvoice ? latestInvoice.invoiceNumber + 1 : 1;
      res.json({ nextInvoiceNumber });
  } catch (error) {
      console.error("Error fetching next invoice number:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Save a new invoice number and billed items
// Save a new invoice number and billed items
app.post("/save-invoice", async (req, res) => {
    try {
        const { invoiceNumber, billedItems, netAmount } = req.body;

        // Validate required fields
        if (!invoiceNumber || !billedItems || billedItems.length === 0 || !netAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Additional validation logic as needed...

        // Create an array of objects with the required fields
        const billedItemsArray = billedItems.map((item) => ({
            DrugCode: item.DrugCode,
            ProductName: item.ProductName,
            BatchNo: item.BatchNo,
            Quantity: item.Quantity,
            Discount: item.Discount,
            MfgDate: item.MfgDate,
            Pack: item.Pack,
            MRP: item.MRP,
            amount: item.amount,
        }));

        // Save invoice and items to database
        const newInvoice = new invoiceModel({
            invoiceNumber,
            billedItems: billedItemsArray,
            netAmount,
        });

        await newInvoice.save();

        res.status(200).json({ message: "Invoice saved successfully" });
    } catch (error) {
        console.error("Error saving invoice:", error);
        res.status(500).json({ message: "Failed to save invoice" });
    }
});

// Fetch an invoice by its number
app.get('/invoice/:invoiceNumber', async (req, res) => {
  try {
      const invoiceNumber = req.params.invoiceNumber;
      const invoice = await invoiceModel.findOne({ invoiceNumber });
      if (!invoice) {
          return res.status(404).json({ message: 'Invoice not found' });
      }
      res.json({ success: true, data: invoice });
  } catch (error) {
      console.error("Error fetching invoice:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
mongoose.connect("mongodb://localhost:27017/medicine")
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));