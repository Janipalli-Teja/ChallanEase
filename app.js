const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

app.use(cookieParser());

const { connectMongoDB } = require("./controllers/connection");
const model = require("./model/schema"); //importing schema to store in database format


// importing routes 
const challanRoutes = require("./routes/challan");
const UserRoutes = require("./routes/user");




// connecting mongodb
connectMongoDB("mongodb+srv://tejajanipali:g8ld6WZ9qPFzmJKw@challans.pk3a8.mongodb.net/?retryWrites=true&w=majority&appName=Challans")
    .then(() => {
        console.log("Mongodb connected")
    })
    .catch((err) => {
        console.log(err)
    });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));




app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "pages", "login.html"));
});

// Ensure correct MIME type for manifest.json
app.get("/manifest.json", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "manifest.json"), {
        headers: { "Content-Type": "application/manifest+json" }
    });
});

// home page
app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "pages", "index.html"));
});

app.get("/challan", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "challan.html"));
});


//routes
app.use("/user", UserRoutes); 
app.use("/api", challanRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});    
