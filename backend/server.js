const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleWare')
const path = require('path');   


const app = express();
const port = process.env.PORT || 5000;
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users/', require('./routes/userRoutes'))
app.use('/api/student-assignment', require('./routes/teacherRoute/assignmentRoute'))
app.use('/api/admin/courses', require('./routes/adminCourseRoute'))
app.use("/api/student/courses", require("./routes/coursesRoutes"));
app.use('/api/admin/departments', require('./routes/departmentRoutes'));
app.use('/api/registercourse', require('./routes/courseRegistrationRoutes'))
app.use('/api/admin/users', require('./routes/adminRoute'))
app.use('/api/results', require('./routes/resultRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline);
});
