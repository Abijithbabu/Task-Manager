const fs = require('fs');
const path = require('path');
const TASK = require('../model/TaskModel');

const TaskPage = async (req, res, next) => {
    try {
        const data = await TASK.find()
        // const token = jwt.sign({ id: data[0]._id }, process.env.JWT_SECRET, {
        //     expiresIn: 860000,
        //   });
        //   console.log("token send", token);
        
        //   res
        //     .status(200)
        //     .cookie("token", token, {
        //       path: "/",
        //       expires: new Date(Date.now() + 1000 * 60 * 60),
        //       httpOnly: true,
        //       SameSite: "None",
        //       secure: true,
        //     })
        //     .json({
        //       message: "Successfully Logged in",
        //       data,
        //       token,
        //     });
        return res.status(200).json(data)
    } catch (error) {
        return next(error);
    }
};


const AddTask = async (req, res, next) => {
    try {
        console.log('hi')
        console.log(req.body)
        const filename = req?.file?.filename;
        if (!filename) {
            res.status(400).json({ message: "Invalid image type" })
        }
        const query = new TASK({ ...req.body, image: filename })
        console.log(query);
        await query.save()
            .then(() => res.status(201).json({ message: 'Task added successfully', data: query }))
            .catch(() => res.status(400).json({ message: 'Something went wrong' }))
        console.log(query);
        // return res.status(201).json({ message: 'Task added successfully' ,data:query})
    } catch (error) {
        return next(error);
    }
};


const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const query = await TASK.findOne({ _id: id })
        if (query.image) {
            const dir = 'C:/Users/babpp/Desktop/Task-Manager/server/public/uploads'
            const filePath = path.join(dir, query.image);
            fs.unlinkSync(filePath);
        }
        const data = await TASK.deleteOne({ _id: id })
        if (data) {
            return res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            return res.status(400).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const updateTask = async (req, res) => {
    try {
        console.log(req.body)
        const { image, _id, ...data } = req.body;
        const filename = req?.file?.filename
        if (filename && image) {
            const dir = 'C:/Users/babpp/Desktop/Task-Manager/server/public/uploads'
            const filePath = path.join(dir, image);
            fs.unlinkSync(filePath);
        }
        console.log(filename ?? image)
        const update = await TASK.findByIdAndUpdate({ _id: _id }, { $set: { ...data, image: filename ?? image } }, { upsert: true });
        if (update) {
            return res.status(200).json({ message: 'Task updated successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    TaskPage,
    AddTask,
    deleteTask,
    updateTask,
}