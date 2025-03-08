const express = require('express');
const path = require('path');
const {connectMongoDB}=require("./connection")



const model=require("./model/schema"); //importing schema to store in database format
const { connected } = require('process');
const challanRoutes=require("./routes/challan");

const app = express();
const PORT = 3000;



// connecting mongodb
connectMongoDB("mongodb+srv://tejajanipali:g8ld6WZ9qPFzmJKw@challans.pk3a8.mongodb.net/?retryWrites=true&w=majority&appName=Challans")
.then(()=>{
    console.log("server running")
})
.catch((err)=>{
    console.log(err)
});

app.use(express.static("public"));
// home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "index.html"));
  });
  
//routes
app.use("/api",challanRoutes)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
