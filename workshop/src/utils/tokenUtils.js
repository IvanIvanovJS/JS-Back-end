import jwt from 'jsonwebtoken';

export function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };

    // TODO: Make it async
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    return token;
}
