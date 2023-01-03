const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

const {
    createBook,
    getAllBook,
    getSingleBook, 
    updateBook, 
    deleteBook} = require('../controllers/books')

router.route('/book').post(createBook).get(getAllBook)
router.route('/book/:id').get(getSingleBook).patch(updateBook).delete(deleteBook)

module.exports = router
