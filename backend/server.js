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
app.use('/api/Departments/', require('./routes/departmentRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline);
});
