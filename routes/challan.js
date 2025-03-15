const express = require("express");
const upload = require('../middileware/upload'); // Import Multer middleware
const Challan = require('../model/schema'); // Import the Challan model
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const router = express.Router();

router.get("/challan", async (req, res) => {
    try {
        const challans = await Challan.find(); // Fetch all challans from the database
        res.status(200).json(challans);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve challans", details: error.message });
    }
});

let lastUploadedImageID = null;  // Temporary storage for latest imageID

// Handle Image Upload
router.post('/submit-pic', upload.single('mypic'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    lastUploadedImageID = req.file.filename;  // Save imageID in memory
    console.log('Stored imageID:', lastUploadedImageID);

    res.send({ message: "Image uploaded successfully", imageID: lastUploadedImageID });
});

// POST route to create a new challan entry
router.post("/generate", async (req, res) => {
    try {
        const { vehicle_number, violation, fine } = req.body;

        if (!vehicle_number || !violation || !fine) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!lastUploadedImageID) {
            return res.status(400).json({ error: "No uploaded image found" });
        }

        // Create and save the new challan with the last imageID
        const newChallan = new Challan({ vehicle_number, violation, fine, imageID: lastUploadedImageID });
        await newChallan.save();

        res.status(201).json({ message: "Challan submitted successfully!", challan: newChallan });
        console.log(newChallan);
        // Reset imageID after use (optional)
        lastUploadedImageID = null;
    } catch (error) {
        res.status(500).json({ error: "Failed to submit challan", details: error.message });
    }
});

module.exports = router;
