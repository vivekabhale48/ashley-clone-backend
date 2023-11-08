const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const middleHomePageSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    middleCategoryName: String,
    shopAll: String,
    midSubCatArray: [
        {
            _id: mongoose.Types.ObjectId,
            roomSections: String,
            roomSubCatSections: [
                {
                    _id: mongoose.Types.ObjectId,
                    roomSubCatName: String,
                    roomSubCatImg: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('middleHomePageDatas', middleHomePageSchema)