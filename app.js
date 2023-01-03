require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const connectDB = require('./db/connect')
const customersRoute = require('./routes/customer')
const bookRoute = require('./routes/books')
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/v1', customersRoute)
app.use('/api/v1', bookRoute)

const start = async () => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    } catch (error) {
       console.log(error) 
    }
}

start()

// const Start = async () => {
//     app.listen(port, () => console.log('Get used to building a server'))
// }

// Start()