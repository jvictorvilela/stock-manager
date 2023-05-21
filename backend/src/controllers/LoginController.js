import { PrismaClient } from '@prisma/client';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class LoginController {
    static async login(req, res) {

        const prisma = new PrismaClient();

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422).json({ message: 'Informe todos os parâmetros.' });
        }

        const user = await prisma.users.findUnique({ where: { email } })

        if (user && await bcrypt.compare(password, user.password)) {
            const userInstance = new User(user);
            return res.json({
                message: 'Usuário logado com sucesso!',
                token: userInstance.getUserToken(),
                user: user,
            })
        }

        return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
}

export default LoginController;