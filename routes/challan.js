const express=require("express");
const upload = require('../middileware/upload'); // Import Multer middleware

const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


const router=express.Router()

// Handle POST request for image upload
router.post('/submit-pic', upload.single('mypic'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded:', req.file);
    res.send(`Image uploaded successfully: ${req.file.filename}`);
});




// POST route to create a new challan entry
router.post("/generate", async (req, res) => {
    try {
        const { vehicle_number, violation, fine , imageID} = req.body;

        // Create a new challan document
        const newChallan = new Challan({ vehicle_number, violation, fine ,imageID});

        // Save to the database
        await newChallan.save();

        res.status(201).json({ message: "Challan submitted successfully!", challan: newChallan });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit challan", details: error.message });
    }
});

module.exports=router;