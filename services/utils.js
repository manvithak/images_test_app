const sharp = require('sharp');
const axios = require('axios');

exports.reSizeImage = async (fileurl, width) => {
  try{
    const response = await axios.get(fileurl, {
      responseType: "arraybuffer",
    });
    const filename = fileurl.split('/').pop()
    const resizedImageName = width + '_' + filename
    
    const buffer = Buffer.from(response.data, "base64") //converts the arraybuffer to base64
    
    const image = await sharp(buffer).resize({ //Read image from buffer and resize the image 
      fit: sharp.fit.contain, //To maintian the aspect ratio of image
      width: width
    }).toFile("./uploads/"+ resizedImageName);
    return resizedImageName
  }
  catch(err){
    console.log("Error in reSizeImage:: ", err)
    return null
  }
  
}