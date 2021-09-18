import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getPerguntas();
        case 'POST':
            return createPergunta();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getPerguntas() {
        const usuarios = await prisma.pergunta.findMany();
        //console.log(usuarios);
        return res.status(200).json(usuarios);
    }

    async function createPergunta() {
        try {
            const resp = await prisma.pergunta.create({
                data:req.body.data
            });
            return res.status(200).json(resp);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}
