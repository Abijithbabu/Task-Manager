const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        name: {
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
        priority: {
            type: String,
            enum: ['high', 'medium', 'low'],
            default: 'medium'
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tasks", TaskSchema);
