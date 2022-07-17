const utils = require('./utils')
const Image = require('../models').Image

exports.resizeAndUpdateImage = async (image_id, fileurl, column, width) => {
    try{
        let resized_image = await utils.reSizeImage(fileurl, width);
        let updateData = null
        if(resized_image) {
            updateData = {}
            updateData = {
                [column]: process.env.BASE_URL + resized_image
            }
        }
        if(updateData){
            await Image.update(updateData, {where: {id: image_id}})
            return true
        }
        return true
    }catch(err){
        console.log("Error in resizeAndUpdateImage for imageid:: ", image_id, " Error:: ", err)
        return false
    }
}