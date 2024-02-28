import {v2 as cloudinary} from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config/index.js';
import fs from 'fs'
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
       
        if(!localFilePath) return null;
        
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log('File is uploaded on cloudinary', response.url);
        fs.unlinkSync(localFilePath) //remove the locallly saved temporary file as the upload operation got failed
        return response;
    } catch(error){
        fs.unlinkSync(localFilePath) //remove the locallly saved temporary file as the upload operation got failed
        return null;
    }
}

export default uploadOnCloudinary;