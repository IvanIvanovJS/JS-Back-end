import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'The Name should be at least 5 characters long!'],
        maxLength: [50, `The Name shouldn't be longer than 50 characters!`]

    },
    year: {
        type: Number,
        required: [true, 'Year is required!']
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, `The Image should start with http:// or https://`]
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'The Kind should be a minimum of 10 characters long!']
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: [3, 'The need should be a minimum of 3 characters long!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'The Location should be a minimum of 3 characters long!']
    },
    description: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'The Location should be a minimum of 3 characters long!']
    },
    donation: [{
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