import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getAvaliacoes();
        case 'POST':
            return createAvaliacao();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getAvaliacoes() {
        const usuarios = await prisma.avaliacao.findMany();
        console.log(usuarios);
        return res.status(200).json(usuarios);
    }

    async function createAvaliacao() {
        try {
            const resp = await prisma.avaliacao.create({
                data:req.body.data
            });
            return res.status(200).json(resp);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}
