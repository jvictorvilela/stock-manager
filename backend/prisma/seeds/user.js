import { PrismaClient } from "@prisma/client";
import User from "../../src/models/User.js";

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await User.generatePasswordHash('teste');

    await prisma.users.create({
        data: {
            email: 'teste@teste.com',
            name: 'Teste',
            password: passwordHash,
        }
    });
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})