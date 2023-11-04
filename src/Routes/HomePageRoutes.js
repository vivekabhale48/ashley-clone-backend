const router = require('express').Router();
const HomePageSchema = require('../schema/homePageSchema');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;


//Couldinary config
cloudinary.config({
    cloud_name: 'dzt8twkox',
    api_key: '283764817279696',
    api_secret: '7SU4wQpmItRUF8NZMSsQO7Nlzqw',
    secure: true
});


router.post('/HomePage', async (req, res, next) => {
    try {
        // Upload the image to Cloudinary
        const file = req.files.photo;
        const mainCategoryName = req.body.categoryName;
        const mainSubCatName = req.body.subCatName;
        let imageUrl;

        if (!file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }
        else {
            const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {folder: 'Ashley_on_Acima_clone_assets'});
            imageUrl = cloudinaryResponse.url;
        }

        const subCatObject = {
            subCatName: mainSubCatName,
            subCatImg: imageUrl
        }
        const homeSchema = new HomePageSchema({
            _id: new mongoose.Types.ObjectId(),
            categoryName: mainCategoryName,
            subCategory: [{
                subCatName: mainSubCatName,
                subCatImg: imageUrl
            }],
        });

        const datafound = await HomePageSchema.findOne({ categoryName: mainCategoryName });
        if (datafound) {
            datafound.subCategory.push(subCatObject);

            // Save the updated data
            const savedData = await datafound.save();
            res.status(200).json(savedData);
        }
        else {

            // Save the new data
            const result = await homeSchema.save();
            res.status(200).json(result);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;