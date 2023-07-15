import jwt, {Secret} from 'jsonwebtoken';

export const generateToken = (userId: string, expires: Date, type: string, secret = process.env.JWT_SECRET) => {
    const secretKey: Secret = secret
    const payload = {
        sub: userId,
        iat: Date.now(),
        exp: expires.getTime(),
        type,
    }
    return jwt.sign(payload, secretKey);
}