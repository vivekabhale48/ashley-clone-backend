const router = require('express').Router();
const HomePageSchema = require('../schema/homePageSchema');
const mongoose = require('mongoose');


router.post('/HomePage', async (req, res, next)=>{
    const allSubCategories = req.body.subCategory;
    const subCategories = req.body.subCategory.map(subCat=>({
        _id: new mongoose.Types.ObjectId(),
        subCatName: subCat.subCatName,
        subCatImg: subCat.subCatImg,
    }))
    const homeSchema = new HomePageSchema({
        _id: new mongoose.Types.ObjectId,
        categoryName: req.body.categoryName,
        subCategory: subCategories
    });

    const datafound = await HomePageSchema.findOne({categoryName: req.body.categoryName});
    // console.log(datafound);
    if(datafound){
        subCategories.forEach(subCategory => {
            datafound.subCategory.push(subCategory);
        });

        datafound.save()
            .then(savedData => {
                res.status(200).json(savedData);
            })
            .catch(e => {
                res.status(500).json({
                    error: e
                })
            });
    } 
    else {

        homeSchema.save()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(e=>{
            console.log(e);
            res.status(500).json({
                error: e
            })
        })
    }
})

module.exports = router;