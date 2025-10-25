import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'The Name should be at least 5 characters long!'],
        maxLength: [50, `The Name shouldn't be longer than 50 characters!`]

    },
    age: {
        type: Number,
        required: [true, 'Age is required!']
    },
    moons: {
        type: Number,
        required: [true, 'Moons is required!']
    },
    size: {
        type: Number,
        required: [true, 'Size is required!']
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        match: [/^https?:\/\//, `The Image should start with http:// or https://`]
    },
    solarSystem: {
        type: String,
        required: [true, 'SolarSystem is required!'],
        minLength: [3, 'The SolarSystem should be a minimum of 10 characters long!']
    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        enum: {
            values: ['Inner', 'Outer', 'Dwarf'],
            message: (props) => `${props.value} is not a valid type!`
        }
    },
    rings: {
        type: String,
        required: [true, 'Rings is required!'],
        enum: {
            values: ['Yes', 'No'],
            message: (props) => `${props.value} is not a valid rings!`
        }
    },

    description: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'The Location should be a minimum of 3 characters long!']
    },
    likedList: [{
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