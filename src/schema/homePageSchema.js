const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homePageSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    categoryName: String,
    subCategory: [{
        _id: mongoose.Types.ObjectId,
        subCatName: String,
        subCatImg: String
    }]
})

module.exports = mongoose.model('HomePageSchema', homePageSchema);