const express = require('express');
const mongoose = require('mongoose');

//router imports
const userRoutes = require("./routes/UserRoute");
const todoRoutes = require("./routes/TaskRoute");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);


app.get("", (req, res) => {
    res.status(200).json({ 
        message: "hellow world!"
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server is running at http://localhost:3000");
});

mongoose.connect("mongodb+srv://bc007:msdhoni007@cluster0.dcb5w.mongodb.net/tododb?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true },(err) => {
    if (err) {
        console.log(err);
    }

    console.log("Database connected");
});
