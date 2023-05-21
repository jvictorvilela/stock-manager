import { PrismaClient } from "@prisma/client";
import Product from "./Product.js";

class Movement {
    static validate({ author_id, product_id, qty }) {
        const nQty = parseInt(qty);
        return (!!author_id && !!product_id && !isNaN(nQty));
    }

    /**
     * valida se a quantidade movimentada é permitida
     */
    static async validateQty(product_id, qty) {
        if (qty > 0) {
            return true;
        } else if (qty == 0) {
            return false;
        }

        try {
            const product = await Product.getProductById(product_id);
            const total = await product.getStockQty() + qty;
            
            return total >= 0;

        } catch (error) {
            return false;
        }
    }
}

export default Movement;