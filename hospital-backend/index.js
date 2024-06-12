const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const adminRouter = require("./routes/admin"); 
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const {User,Admin,Course} = require('./db/db');
const { authenticateJwt,SECRET} = require('./middleware/auth')
  
const app = express();

app.use(cors())
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);


// mongoose.connect
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/HospitalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});


app.listen(3000, (req, res) => {
    console.log("App listen at port 3000")
});


