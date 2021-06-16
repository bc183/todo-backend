const express = require("express");

//model imports 
const User = require("../models/UserModel");
const Todo = require("../models/TodoModel");
const auth = require("../middlewares/auth");
const router = express.Router();


// const getTodosBasedOnUser = async (req, res) => {
//     const userId
// }

const addTodo = async (req, res) => {
    const { title, description} = req.body;

    let errors = {};

    const user = res.locals.user;
    

    if (title.trim() === "") {
        errors.title = "Title cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {

        const todoObj = new Todo({ 
            title: title,
            description: description,
            isCompleted: false,
            dateCreated: new Date(),
            userId: user._id
        });

        const savedTodo = await todoObj.save();
        return res.status(201).json(savedTodo)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

const updateTodo = async (req, res) => {
    const { title, description, isCompleted, todoId} = req.body;

    //console.log(res.locals.user);

    const user = res.locals.user;

    let errors = {};

    if (title.trim() === "") {
        errors.title = "Title cannot be empty";
    }

    if (todoId.trim() === "") {
        errors.todoId = "todoId cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {

        const todo = await Todo.findOne({ _id: todoId });

        if (todo === null) {
            return res.status(400).json({ error: "Todo do not exist." });
        }

        todo.title = title;
        todo.description = description;
        todo.isCompleted = isCompleted;

        const updatedTodo = await todo.save();

        return res.status(200).json(updatedTodo);
 
        
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }

}

router.post("/add", auth,addTodo);
router.put("/update", auth,updateTodo);

module.exports = router;