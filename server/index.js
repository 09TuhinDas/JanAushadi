const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'  // Allow requests from localhost:5173
  }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 8080;

// Medicine schema
const schemaData = mongoose.Schema({
  DrugCode: Number,
  ProductName: String,
  batches: [
    {
      BatchNo: Number,
      Quantity: Number,
      Discount: Number,
      MfgDate: String,
      Expire: String,
      Pack: Number,
      MRP: Number,
      Tax: Number,
      amount: Number
    }
  ]
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
const medicineModel = mongoose.model("Medicine", schemaData);

// Invoice model
const invoiceModel = mongoose.model("Invoice", invoiceSchema);

// Read medicines
app.get('/', async (req, res) => {
    const data = await medicineModel.find();
    res.json({ success: 'true', data: data });
});

// Create medicine
app.post("/create", async (req, res) => {
    try {
        const { DrugCode, ProductName, BatchNo, Quantity, Discount, MfgDate, Expire, Pack, MRP, Tax, amount } = req.body;

        if (!ProductName) {
            return res.status(400).json({ message: "ProductName is required." });
        }

        const result = await medicineModel.findOneAndUpdate(
            { DrugCode: DrugCode },
            { 
                $set: { ProductName }, // Include ProductName in the update
                $push: { batches: { BatchNo, Quantity, Discount, MfgDate, Expire, Pack, MRP, Tax, amount } } 
            },
            { new: true, upsert: true }
        );

        res.send({ success: true, message: "Batch added successfully", data: result });
    } catch (error) {
        console.error("Error saving batch:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get medicine by ID
app.get('/getMedicine/:id', async (req, res) => {
    const id = req.params.id;
    const data = await medicineModel.findById({ _id: id });
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
        const { DrugCode, ProductName, BatchNo, Quantity, Discount, MfgDate, Expire, Pack, MRP, Tax } = req.body;

        const data = await medicineModel.updateOne(
            { _id: id },
            {
                $set: {
                    DrugCode,
                    ProductName,
                    BatchNo,
                    Quantity,
                    Discount,
                    MfgDate,
                    Expire,
                    Pack,
                    MRP,
                    Tax,
                },
            }
        );

        res.send({ success: true, message: "Data updated successfully", data });
    } catch (error) {
        console.error("Failed to update data:", error);
        res.status(500).send({ success: false, message: "Failed to update data" });
    }
});

// Get medicine by DrugCode
app.get("/drug/:DrugCode", async (req, res) => {
    try {
        const drug = await medicineModel.findOne({ DrugCode: req.params.DrugCode });
        if (!drug) {
            res.status(404).json({ message: 'Drug not found' });
        } else {
            res.json(drug); // Return the entire drug object
        }
    } catch (error) {
        console.error("Error fetching drug:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get batch numbers by DrugCode
app.get("/drug/:DrugCode/batches", async (req, res) => {
    try {
      const drugCode = req.params.DrugCode;
      console.log(`Searching for drug with code ${drugCode}`);
      const drug = await medicineModel.findOne({ DrugCode: parseInt(drugCode) });
      console.log(`Found drug: ${JSON.stringify(drug)}`);
      if (!drug) {
        return res.status(404).json({ message: 'Drug not found' });
      }
      res.json({
        ProductName: drug.ProductName,
        batches: drug.batches // Return all batches with details
      });
    } catch (error) {
      console.error("Error fetching batches:", error);
      res.status(500).json({ message: error.message });
    }
  });
// Update medicine quantity and pack by DrugCode and BatchNo
app.put('/drug/:DrugCode/batch/:BatchNo', async (req, res) => {
    try {
        const { DrugCode, BatchNo } = req.params;
        const { Quantity, Discount, MfgDate, Expire, Pack, MRP, Tax, amount, quantityToDeduct } = req.body;

        const medicine = await medicineModel.findOne({ DrugCode: parseInt(DrugCode) });
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const batch = medicine.batches.find(batch => batch.BatchNo === parseInt(BatchNo));
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        if (quantityToDeduct !== undefined) {
            const quantityNumber = Number(quantityToDeduct);
            if (batch.Quantity < quantityNumber) {
                return res.status(400).json({ message: 'Insufficient quantity' });
            }

            // Deduct the quantity and update the pack size
            batch.Quantity -= quantityNumber;

            // Update pack size based on the new quantity
            const totalPacks = Math.floor(batch.Quantity / batch.Pack);
            batch.Pack = totalPacks > 0 ? totalPacks : 1; // Ensure pack size is at least 1
        } else {
            // Update batch details if provided
            batch.Quantity = Quantity !== undefined ? Quantity : batch.Quantity;
            batch.Discount = Discount !== undefined ? Discount : batch.Discount;
            batch.MfgDate = MfgDate !== undefined ? MfgDate : batch.MfgDate;
            batch.Expire = Expire !== undefined ? Expire : batch.Expire;
            batch.Pack = Pack !== undefined ? Pack : batch.Pack;
            batch.MRP = MRP !== undefined ? MRP : batch.MRP;
            batch.Tax = Tax !== undefined ? Tax : batch.Tax;
            batch.amount = amount !== undefined ? amount : batch.amount;
        }

        await medicine.save();
        res.json({ success: true, message: 'Batch details updated', data: medicine });
    } catch (err) {
        console.error("Error updating batch:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get batch details by DrugCode and BatchNo
// Get batch details by DrugCode and BatchNo
app.get("/drug/:DrugCode/batch/:BatchNo", async (req, res) => {
    try {
        const drugCode = req.params.DrugCode;
        const batchNo = req.params.BatchNo;

        const medicine = await medicineModel.findOne({ DrugCode: parseInt(drugCode) });
        if (!medicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        const batch = medicine.batches.find(batch => batch.BatchNo === parseInt(batchNo));
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        res.json({
            Quantity: batch.Quantity,
            Discount: batch.Discount,
            MfgDate: batch.MfgDate,
            Expire: batch.Expire,
            Pack: batch.Pack, // Return the Pack value
            MRP: batch.MRP,
            Tax: batch.Tax,
            amount: batch.amount
        });
    } catch (error) {
        console.error("Error fetching batch details:", error);
        res.status(500).json({ message: error.message });
    }
});

// Update medicine quantity and pack by DrugCode and BatchNo
// Update medicine quantity and pack by DrugCode and BatchNo



// Delete medicine by ID
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await medicineModel.deleteOne({ _id: id });
    res.send({ success: 'true', message: "Data deleted successfully", data: data });
});

// Update medicine quantity and pack
app.post("/updateDrug", async (req, res) => {
    try {
        const { DrugCode, BatchNo, Quantity } = req.body;

        if (!DrugCode || !BatchNo || Quantity == null) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const drug = await medicineModel.findOne({ DrugCode });

        if (!drug) {
            return res.status(404).json({ message: 'Drug not found' });
        }

        const batch = drug.batches.find((batch) => batch.BatchNo === parseInt(BatchNo));
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        if (batch.Quantity < Quantity) {
            return res.status(400).json({ message: 'Insufficient quantity' });
        }

        batch.Quantity -= Quantity;

        await drug.save();

        res.json({
            message: 'Quantity updated successfully',
            BatchNo: batch.BatchNo,
            Quantity: batch.Quantity
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
app.get('/next-invoice-number', async (req, res) => {
  try {
      const latestInvoice = await invoiceModel.findOne().sort({ createdAt: -1 });
      const nextInvoiceNumber = latestInvoice ? latestInvoice.invoiceNumber + 1 : 1;
      res.json({ nextInvoiceNumber });
  } catch (error) {
      console.error("Error fetching next invoice number:", error);
      res.status (500).json({ message: 'Internal Server Error' });
  }
});

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

app.put("/drug/:DrugCode", async (req, res) => {
    try {
        const { DrugCode } = req.params;
        const { ProductName, batches } = req.body; // Include other fields as needed

        const drug = await medicineModel.findOneAndUpdate(
            { DrugCode: parseInt(DrugCode) },
            { $set: { ProductName, batches } }, // Update fields based on your requirements
            { new: true } // Return the updated document
        );

        if (!drug) {
            return res.status(404).json({ message: 'Drug not found' });
        }

        res.json({ success: true, message: 'Drug updated successfully', data: drug });
    } catch (error) {
        console.error("Error updating drug:", error);
        res.status(500).json({ message: error.message });
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
            console.log (`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));