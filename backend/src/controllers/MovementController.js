import Movement from '../models/Movement.js';
import { PrismaClient } from '@prisma/client';

class MovementController {
    static async create(req, res) {
        const { author_id, product_id, qty } = req.body;
        if (!Movement.validate({ author_id, product_id, qty })) {
            return res.status(422).json({ message: 'Parâmetros inválidos.' });
        }

        if (!await Movement.validateQty(product_id, qty)) {
            return res.status(422).json({ message: 'Quantidade inválida!' });
        }

        try {
            const prisma = new PrismaClient();
            await prisma.movements.create({
                data: {
                    author_id,
                    product_id,
                    qty: parseInt(qty),
                }
            })

            return res.json({ message: 'Movimentação criada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar movimentação.' });
        }
    }

    static async list(req, res) {
        try {
            const prisma = new PrismaClient();

            let movements = await prisma.movements.findMany({
                include: {
                    author: true,
                    product: true,
                }
            });

            movements = movements.map((movement) => {
                delete movement.author.password;
                return movement;
            })
            
            return res.json(movements);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar movimentações.' })
        }
    }
}

export default MovementController;