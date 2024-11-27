const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/admins", adminRoutes);


const PORT = process.env.PORT || 5000;



mongoose
    .connect('mongodb+srv://kiran:kiran@mongo.qvudqvf.mongodb.net/?retryWrites=true&w=majority&appName=mongo')
    .then(() => {
        console.log("Connected to MongoDB");
    })

    .catch((error) => {
        console.log(error.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});