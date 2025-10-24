import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email is required!'],
        minLength: [10, 'Email should be atleast 10 characters long!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username is too short!']
    },
    password: {
        type: String,
        required: [true, 'User password is required!'],
        minLength: [2, 'Password should be atleast 4 characters long!']
    }

});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)

})

const User = model('User', userSchema)

export default User