const router = require('express').Router()
const middleHomePageSchema = require('../schema/middleHomePageSchema');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dzt8twkox',
    api_key: '283764817279696',
    api_secret: '7SU4wQpmItRUF8NZMSsQO7Nlzqw',
    secure: true
});

router.post('/MiddleHomeCatSection', async(req, res, next) => {
    try {
        // const file = req.files.photo;
        const {roomSubCatImg, middleCategoryName, shopAll, roomSections, roomSubCatName} = req.body;

        const roomSubCatSectionsArray = {
            _id: new mongoose.Types.ObjectId,
            roomSubCatName: roomSubCatName,
            roomSubCatImg: roomSubCatImg
        }

        const roomSectionsArray = {
            _id: new mongoose.Types.ObjectId,
            roomSections: roomSections,
            roomSubCatSections: [roomSubCatSectionsArray]
        }

        const middleSchema = new middleHomePageSchema({
            _id: new mongoose.Types.ObjectId,
            middleCategoryName: middleCategoryName,
            shopAll: shopAll,
            midSubCatArray: [roomSectionsArray]
        })

        const result = await middleSchema.save();
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
