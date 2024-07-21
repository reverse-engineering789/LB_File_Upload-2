const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
// localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try{
        // fetch filefrom request 
        const file = req.files.file;
        console.log("Got access to the file -> ", file);


        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ;
        console.log("PATH -> ", path)
        

        // add path to the move function
        file.mv(path , (err) => {
            console.log(err);
        });
       

        // careate  a successful response 
        res.json({
            success: true,
            message: 'Local file Uploaded successfully',
        });
    }
catch (error){
    // fetch file 
         console.log("Not able to upload the file on server");
         console.log(error);
      }
}


function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }


    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload handler 

exports.imageUpload = async (req, res) => {
    try{
       // data fetch
       const {name, tags, email} = req.body;
       console.log(name, tags,email);

const file = req.files.imageFile;
console.log(file);

// validation
const supportedTypes = ["jpg", "jpeg", "png"];
const fileType = file.name.split('.')[1].toLowerCase(); 


   if(!isFileTypeSupported(fileType, supportedTypes)){
    return res.status(400).json({
        success:false,
        message: 'File format not supported'
    })

}

   // file format supported 
   console.log("Uploading to codehelp");
   const response = await uploadFileToCloudinary(file, "codehelp");
   console.log(response);

   // we want to save the entry in database 
   const fileData = await file.create({
    name,
    tags,
    email,
    imageUrl: response.secure_url,
   })

   res.json({
      success: true,
      imageUrl: response.secure_url,
      message: 'Image successfully Uploaded',
   })
}
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    } 
}


// video upload handler

exports.videoUpload = async (req, res) => {
    try{
        // data fetch
       const {name, tags, email} = req.body;
       console.log(name, tags, email);

       const file = req.files.videoFile;


       // validation
       const supportedTypes = ["mp4", "mov"];
       const fileType = file.name.split('.')[1].toLowerCase();
       console.log("File Type:", fileType);

       // TODO: add a upper limit of 5MB for video
       if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
    }
      

       // file format supported 
   console.log("Uploading to codehelp");
   const response = await uploadFileToCloudinary(file, "codehelp");
   console.log(response);


   // we want to save the entry in database 
   const fileData = await file.create({
    name,
    tags,
    email,
    imageUrl: response.secure_url,
   });
    
   res.json({
    success:true,
    imageUrl: response.secure_url,
    message:'Video successfully uploaded',
   })
 }


        catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message: 'something went wrong',
            })
        }

    }

// imageSizeReducer 

exports.imageSizeReducer = async(req, res) => {
    try{
       // data fetch
       const {name, tags, email} = req.body;
       console.log(name, tags,email);

const file = req.files.imageFile;
console.log(file);

// validation
const supportedTypes = ["jpg", "jpeg", "png"];
const fileType = file.name.split('.')[1].toLowerCase(); 


   if(!isFileTypeSupported(fileType, supportedTypes)){
    return res.status(400).json({
        success:false,
        message: 'File format not supported'
    })
}

   // file format supported 
   console.log("Uploading to codehelp");
   const response = await uploadFileToCloudinary(file, "codehelp", 90);
   console.log(response);

   // we want to save the entry in database 
   const fileData = await file.create({
    name,
    tags,
    email,
    imageUrl: response.secure_url,
   })

   res.json({
      success: true,
      imageUrl: response.secure_url,
      message: 'Image successfully Uploaded',
   })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}