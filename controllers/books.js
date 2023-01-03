const { StatusCodes } = require('http-status-codes')
const Books = require('../models/books')

exports.createBook = async (req, res) => {
    // try {
    //    const {product_name, price} = req.body 

    //    if (!product_name || !price) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Please provide all the required parameters'})
    //    }

    //    const newProduct = await Product.create({...req.body})

    //    return res.status(StatusCodes.CREATED).json({newProduct})

    // } catch (error) {
    //     console.log(error)
    //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    // }

    try {
        const {book_title, price, author} = req.body 
 
        if (!(book_title || price || author)) {
         return res.status(StatusCodes.BAD_REQUEST).json({msg : 'Please provide all the required parameters'})
        }
 
        const newBook = await Books.create({...req.body})
 
        return res.status(StatusCodes.CREATED).json({newBook})
 
     } catch (error) {
         console.log(error)
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
     }
 
}

exports.getAllBook = async (req, res) => {
//    try {
//         const getAllProduct = await Product.find({})

//         if (!getAllProduct) {
//             return res.status(StatusCodes.NOT_FOUND).json({msg : `Oops no products found in our database!`})
//         }

//         return res.status(StatusCodes.OK).json({total_products : getAllProduct.length, getAllProduct})
//    } catch (error) {
//         console.log(error)
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
//    }

try {
    const getAllBook = await Books.find({})

    if (!getAllBook) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `Oops no books found in our database!`})
    }

    return res.status(StatusCodes.OK).json({total_products : getAllBook.length, getAllBook})
} catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
}

// res.send('Hello I Changed Something')


    // try {
    //    let {name, price, sort, field, numerical} = req.query

    //    const queryObject = {}
       
    //    if (name) {
    //     queryObject.product_name = {$regex : name, $options : 'xi'}
    //    }

    //    if (price) {
    //     price = Number(price)
    //     queryObject.price = price
    //    }
    
    //    if (numerical) {

    //     const operatorMap = {
    //         "<" : "$lt",
    //         "<=" : "$lte",
    //         "=" : "$eq",
    //         ">" : "$gt",
    //         ">=" : "$gte"
    //     }

    //     const regEx = /\b(<|<=|=|>|>=)\b/g

    //     let filter = numerical.replace(regEx, (match) => `*${operatorMap[match]}*`)
    //     console.log(filter)

    //     const options = ['price']

    //     filter = filter.split(',').forEach((item) => {
    //         const [query, operator, value] = item.split('*')
    //         if (options.includes(query)) {
    //             queryObject[query] = {[operator] : Number(value)}
    //         }
    //     })

    //    }
    //    console.log(queryObject)
    //    let result = Product.find(queryObject)

    //    if (sort) {
    //     const sortList = sort.split(',').join(' ')
    //     result = result.sort(sortList)
    //    }

    //    else {
    //     result = result.sort('-product_name')
    //    }

    //    if (field) {
    //     const fieldList = field.split(',').join(' ')
    //     result = result.select(fieldList)
    //    }

    //    const products = await result

    //    return res.status(StatusCodes.OK).json({total : products.length, products})

    // } catch (error) {
    //     console.log(error)
    //     return res.status(StatusCodes).json({error})
    // }
}

exports.getSingleBook = async (req, res) => {
    try {
       const {id : bookId}  = req.params

       const book = await Books.findOne({_id : bookId})

       if (!book) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `Book with id ${bookId} does not exist`})
       }

       return res.status(StatusCodes.OK).json({book})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
}

exports.updateBook = async (req, res) => {
    try {
        const {params : {id : bookId}, body : {book_title, price, author}} = req

        if(!(book_title || price || author)) {
            return res.status(StatusCodes.BAD_REQUEST).json({msg : `Please provide all the required parameters`})
        }

        const updateBook = await Books.findByIdAndUpdate(
            {_id : bookId},
            req.body,
            {new : true, runValidators: true}
        )

        if (!updateBook) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : `Book does not exist`})
        }
        return res.status(StatusCodes.CREATED).json({updateBook})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err : msg.err})
    }
    // try {
    //     const {params : {id : productId}, body : {product_name, price}} = req

    //     if (!product_name || !price) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({msg : `Please provide all the required parameters!`})
    //     }

    //     const updateProduct = await Product.findByIdAndUpdate(
    //         {_id : productId}, 
    //         req.body, 
    //         {new : true, runValidators: true})

    //     if (!updateProduct) {
    //         return res.status(StatusCodes.NOT_FOUND).json({msg : `Product does not exist!`})
    //     }

    //     return res.status(StatusCodes.CREATED).json({updateProduct})
    // } catch (error) {
    //     console.log(error)
    //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
    // }
}

exports.deleteBook = async (req, res) => {
   try {
    const {id : bookId} = req.params

    const deleteBook = await Books.findByIdAndDelete({_id : bookId})

    if (!deleteBook) {
        return res.status(StatusCodes.NOT_FOUND).json({msg : `Book with id ${bookId} not found`})
    }

    return res.status(StatusCodes.OK).json({msg : `Book deleted successfully!`})
   } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : error.message})
   }
}