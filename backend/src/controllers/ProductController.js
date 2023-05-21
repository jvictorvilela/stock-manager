import Product from '../models/Product.js';
import { PrismaClient } from '@prisma/client';

class ProductController {
    static async create(req, res) {
        const { name, price } = req.body;
        if (!Product.validate({ name, price })) {
            return res.status(422).json({ message: 'Parâmetros inválidos.' });
        }

        try {
            const prisma = new PrismaClient();
            await prisma.products.create({
                data: {
                    name,
                    price: parseFloat(price),
                }
            })

            return res.json({ message: 'Produto criado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar produto.' });
        }
    }

    static async list(req, res) {
        try {
            const prisma = new PrismaClient();

            const products = await prisma.products.findMany();
            const productsWithQty = await Promise.all(products.map(async (product) => {
                const productInstance = await Product.getProductById(product.id);
                const qty = await productInstance.getStockQty();
                product.qty = qty;
                return product;
            }));

            return res.json(productsWithQty);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar produtos.' })
        }
    }

    static async update(req, res) {
        const { name, price } = req.body;
        const id = parseInt(req.params.id);

        if (!Product.validate({ name, price })) {
            return res.status(422).json({ message: 'Parâmetros inválidos.' });
        }

        try {
            const prisma = new PrismaClient();
            await prisma.products.update({
                where: { id },
                data: {
                    name,
                    price: parseFloat(price),
                }
            })

            return res.json({ message: 'Produto editado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao editar produto.' });
        }
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);
        const prisma = new PrismaClient();

        const deleteMovements = prisma.movements.deleteMany({ where: { product_id: id } });

        const deleteProduct = prisma.products.delete({ where: { id } });

        try {
            await prisma.$transaction([deleteMovements, deleteProduct]);

            return res.json({ message: 'Produto excluido com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir produto.' });
        }
    }
}

export default ProductController;