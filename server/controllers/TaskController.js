const fs = require('fs');
const path = require('path');
const TASK = require('../model/TaskModel');

const TaskPage = async (req, res, next) => {
    try {
        const data = await TASK.find().sort({ date: 1, priority: -1 })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const AddTask = async (req, res, next) => {
    try {
        const filename = req?.file?.filename;
        if (!filename) {
            res.status(400).json({ message: "Invalid image type" })
        }
        const query = new TASK({ ...req.body, image: filename })
        await query.save()
            .then(() => res.status(201).json({ message: 'Task added successfully', data: query }))
            .catch(() => res.status(400).json({ message: 'Something went wrong' }))
    } catch (error) {
        return res.status(400).json({ message: error.message });
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
        console.error('Error deleting task:', error.message);
        return res.status(400).json({ message: error.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const { image, _id, ...data } = req.body;
        const filename = req?.file?.filename
        if (filename) {
            const query = await TASK.findOne({ _id: id })
            if (query.image) {
                const dir = 'C:/Users/babpp/Desktop/Task-Manager/server/public/uploads'
                const filePath = path.join(dir, query.image);
                fs.unlinkSync(filePath);
            }
        }
        const update = await TASK.findByIdAndUpdate({ _id: _id }, { $set: { ...data, image: filename ?? image } }, { upsert: true });
        if (update) {
            return res.status(200).json({ message: 'Task updated successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error.message);
        return res.status(400).json({ message: error.message });
    }
};



module.exports = {
    TaskPage,
    AddTask,
    deleteTask,
    updateTask,
}