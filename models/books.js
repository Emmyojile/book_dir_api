const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    book_title : {
        type : String
    },
    price : {
        type : String
    },
    author : {
        type : String
    }
})

module.exports = mongoose.model('Books', bookSchema)