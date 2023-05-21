import { PrismaClient } from '@prisma/client';
import User from '../models/User.js';

class UserController {
    static async register(req, res) {
        const user = new User(req.body);
        const response = await user.register(res);
    }

    static async list(req, res) {
        const prisma = new PrismaClient();

        try {
            const users = await prisma.users.findMany();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Falha ao listar usuários.' });
        }
    }

    static async show(req, res) {
        const id = parseInt(req.params.id);

        const user = await User.getUserById(id);

        if (user) {
            return res.json(user.getData());
        }
        return res.status(404).json({ message: 'usuário não encontrado.' });
    }
}

export default UserController;