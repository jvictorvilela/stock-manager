import { PrismaClient } from "@prisma/client";

class Product {
    constructor({ id, name, price }) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    static async getProductById(id) {
        const prisma = new PrismaClient();

        const product = await prisma.products.findUnique({
            where: { id }
        });

        return new Product(product);
    }

    static validate({ name, price }) {
        const nPrice = parseFloat(price);
        return (!!name && !!nPrice);
    }

    async getStockQty() {
        const prisma = new PrismaClient();

        const moviments = await prisma.movements.findMany({
            where: {
                product_id: this.id
            }
        });

        const total = moviments.reduce((prev, next) => {
            if (prev?.qty) {
                return prev.qty + next.qty;
            } else {
                return prev + next.qty;
            }
        }, 0);

        return total;
    }

    getId() {
        return this.id;
    }
}

export default Product;