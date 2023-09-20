const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            default: Date.now,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        image:{
            type:String,
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium'
        },
        status:{
            type:Boolean,
            default:false
        }
    }
);

module.exports = mongoose.model("Tasks", TaskSchema);
