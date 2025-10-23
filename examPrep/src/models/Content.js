import { Schema, Types, model } from "mongoose";

const contentSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!']
    },
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    category: {
        type: String,
        required: [true, 'Category is required!']
    },
    followList: {
        type: Array,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'user'
    }
})

const Content = model('Content', contentSchema);

export default Content;