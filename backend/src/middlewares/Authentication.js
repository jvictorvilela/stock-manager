import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Authentication {
    static auth(req, res, next) {
        const token = req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Acesso negado!' });
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            
            next();

        } catch (error) {
            return res.status(400).json({ message: 'Token inválido!' });
        }
    }
}

export default Authentication;