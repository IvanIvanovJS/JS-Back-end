import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
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
    followList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Catalog = model('Catalog', catalogSchema);

export default Catalog;