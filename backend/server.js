const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleWare')


const app = express();
const port = process.env.PORT || 5000;
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users/', require('./routes/userRoutes'))
app.use('/api/courses/', require('./routes/coursesRoutes'))
app.use('/api/admin/create-departments/', require('./routes/departmentRoutes'))
app.use('/api/registercourse/', require('./routes/courseRegistrationRoutes'))
app.use('/api/users/admin', require('./routes/adminRoute'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline);
});
