import { Schema, Types, model } from "mongoose";

const mythSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'The Name should be at least 2 characters long!']
    },

    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, `The Image Url should start with http:// or https://`]
    },
    origin: {
        type: String,
        required: [true, 'Origin is required!'],
        minLength: [3, 'The Origin should be a minimum of 3 characters long!']
    },
    role: {
        type: String,
        required: [true, 'Role is required!'],
        minLength: [2, 'The role should be a minimum of 2 characters long!']
    },
    symbol: {
        type: String,
        required: [true, 'Symbol is required!'],
        minLength: [3, 'The symbol should be a minimum of 3 characters long!'],
        maxLength: [40, 'The symbol should be a maximum of 40 characters long!']
    },
    era: {
        type: String,
        required: [true, 'Era is required!'],
        minLength: [5, 'The era should be a minimum of 5 characters long!'],
        maxLength: [15, 'The symbol should be a maximum of 15 characters long!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'The description should be a minimum of 10 characters long!']
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Myth = model('Myth', mythSchema);

export default Myth;