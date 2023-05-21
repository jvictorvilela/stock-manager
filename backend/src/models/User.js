import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class User {
    /**
     * @param {Object} user 
     */
    constructor({ email, name, password, id } = user) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;

        const prismaInstance = new PrismaClient() 
        this.prisma = prismaInstance.users;
    }

    async register(res) {
        if (!this.email || !this.name || !this.password) {
            return res.status(422).json('Informe todos os parametros.');
        }

        const passwordHash = await User.generatePasswordHash(this.password);
        let createdUser;
        try {
            createdUser = await this.prisma.create({
                data: {
                    email: this.email,
                    name: this.name,
                    password: passwordHash,
                }
            });
        } catch(error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(403).json({ message: 'Já existe um usuário com este email.' });
                }
            }
            return res.status(500).json({ message: 'Erro desconhecido.' });
        }
        
        this.id = createdUser.id;
        this.password = createdUser.password;

        const jwt = this.getUserToken();

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            token: jwt
        });
    }

    static async generatePasswordHash(password) {
        const passwordHash = await bcrypt.hash(password, 2);

        return passwordHash;
    }

    getUserToken() {
        const token = jwt.sign({
            name: this.name,
            id: this.id
        }, process.env.JWT_SECRET)

        return token;
    }

    static async getUserById(id) {
        const prisma = new PrismaClient();
        const userData = await prisma.users.findUnique({
            where: {
                id
            }
        })

        return userData ? new User(userData) : null;
    }

    static async getUserByToken(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return await User.getUserById(decoded.id);
    }

    getData() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            created_at: this.created_at,
        }
    }
}

export default User;