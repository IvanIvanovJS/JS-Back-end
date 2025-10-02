import User from "../Models/User.js"

export default {
    register(userData) {
        return User.create(userData)
    }
}