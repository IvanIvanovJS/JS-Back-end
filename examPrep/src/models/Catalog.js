import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'The Title should be at least 5 characters long!'],
        maxLength: [50, `The title shouldn't be longer than 50 characters!`]

    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, `The Image should start with http:// or https://`]
    },
    content: {
        type: String,
        required: [true, 'Content is required!'],
        minLength: [10, 'The Content should be a minimum of 10 characters long!']
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        minLength: [3, 'The Category should be a minimum of 3 characters long!']
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