import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getModulos();
        case 'POST':
            return createModulo();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getModulos() {
        const usuarios = await prisma.modulo.findMany();
        console.log(usuarios);
        return res.status(200).json(usuarios);
    }

    async function createModulo() {
        try {
            const resp = await prisma.modulo.create({
                data:req.body.data
            });
            return res.status(200).json(resp);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}
