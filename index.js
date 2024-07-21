// app create
const exprss = require("express");
const app = exprss();


// find the PORT 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload(  {
    useTempFiles: true,
    tempFileDir: '/temp/'
}));


// connect with database
const db = require("./config/database");
db.connect();

// connect with cloud 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// mount the api route 
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);


// activate server 
app.listen(PORT, () => {
    console.log(`App is runnig at ${PORT}`);
})
