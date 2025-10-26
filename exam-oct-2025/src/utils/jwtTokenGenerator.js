import jwt from 'jsonwebtoken'

export default function generateJWT(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
    return token
}