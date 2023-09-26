const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
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
        image: {
            type: String,
        },
        priority: {
            type: Number,
            enum: [3, 2, 1],
            default: 1
        },
        status: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model("Tasks", TaskSchema);
