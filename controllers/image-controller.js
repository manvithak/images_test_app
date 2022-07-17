const fs = require('fs');
const sharp = require('sharp');
const utils = require('../services/utils');
const commonServices = require('../services/common-services');
const Image = require('../models').Image;

exports.uploadImage = async (req, res) => {
    try{
        const image_data = {
            'master_image': process.env.BASE_URL +req.file.filename
        }
        const inserted_image_data = await Image.create(image_data, {returning: true})
        return res.status(200).send({data: inserted_image_data})
    }
    catch(err){
        console.log("Error in uploadImage:: ", err)
        return res.status(500).send({message: 'Image upload failed'})
    }
}

exports.getImages = async (req, res) => {
    try {
        //const imagesList = fs.readdirSync(folderPath)
        const images_list = await Image.findAll({attributes: ['id', 'master_image']})
        return res.status(200).send({data: images_list})
    }
    catch(err){
        console.log("Error in getImages:: ", err)
        return res.status(500).send({message: "Error in fetching images"})
    }
}

exports.getResizedImages = async (req, res) => {
    const image_id = req.params.imageId
    let updateData=null
    let updated_resized_image = false
    if(!imageId){
        return res.status(400).send({message:"Not a valid request"})
    }
    try{
        let image_data = await Image.findOne({where: {id: image_id}, raw: true})
        if(!image_data){
            return res.status(400).send({message:"No image data found"})
        }
        if(image_data.resized_image_300 && image_data.resized_image_600){
            return res.status(200).send({data: image_data})
        }
        else if(!image_data.resized_image_300){
            updated_resized_image = await commonServices.resizeAndUpdateImage(image_id, image_data.master_image, 'resized_image_300', 300)
        }else if(!image_data.resized_image_600){
            updated_resized_image = await commonServices.resizeAndUpdateImage(image_id, image_data.master_image, 'resized_image_600', 600)
        }
        if(updated_resized_image){
            image_data = await Image.findOne({where: {id: image_id}, raw: true})
        }
        return res.status(200).send({data: image_data})
    }catch(err){
        console.log("Error in getResizedImages:: ", err)
        return status(500).send({message:"Error in fetching list of images"})
    }
}

exports.getSpecificResizedImage = async (req, res) => {
    const image_id = req.params.imageId
    let updated_resized_image = false
    try{
        const width = Number(req.params.width)
        let column;
        if(width == 300){
            column = 'resized_image_300'
        }else if(width == 600){
            column = 'resized_image_600'
        }
        let image_data = await Image.findOne({
            where: {
                id: image_id
            },
            attributes: ['id', column, 'master_image'], 
            raw: true
        })
        if(image_data && image_data[column]){
            return res.status(200).send(image_data)
        }else if(image_data && image_data['master_image']){
            updated_resized_image = await commonServices.resizeAndUpdateImage(image_id, image_data.master_image, column, width)
            if(updated_resized_image){
                image_data = await Image.findOne({
                    where: {
                        id: image_id
                    },
                    attributes: ['id', column, 'master_image'], 
                    raw: true
                })
            }
        }
        return res.status(200).send({data: image_data})
    }catch(err){
        console.log("Error in getSpecificResizedImage:: ", err)
        return status(500).send({message:"Error in fetching specific width images"})
    }
}

