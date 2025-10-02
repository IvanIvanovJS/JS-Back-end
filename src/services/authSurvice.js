import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from "../Models/User.js"
import { generateAuthToken } from '../utils/tokenUtils.js'

export default {
    async register(userData) {
        const user = await User.create(userData)

        const token = generateAuthToken(user);
        return token
    },

    async login(email, password) {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('Invalid email or password!')
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new Error('Invalid email or password!')
        }


        const token = generateAuthToken(user)

        return token
    }
}