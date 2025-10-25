import User from "../models/User.js";
import bcrypt from 'bcrypt'
import generateJWT from "../utils/jwtTokenGenerator.js";

export async function register(email, username, password, repeatPassword) {
    const user = await User.findOne({ username })
    if (user) {
        throw new Error('Username already exists!')
    }

    if (password !== repeatPassword) {
        throw new Error('Passwords do not match.Please re-enter.')
    }

    const createdUser = await User.create({ email, username, password });
    const token = generateJWT(createdUser);

    return token
}

export async function login(username, password) {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error('Invalid username or password!')
    }


    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        throw new Error('Invalid username or password!')
    }

    const token = generateJWT(user)

    return token
}