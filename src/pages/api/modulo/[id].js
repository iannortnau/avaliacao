import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

async function handler(req, res) {
    const id =  parseInt(req.query.id);
    switch (req.method) {
        case 'GET':
            return getModulo();
        case 'PUT':
            return attModulo();
        case 'DELETE':
            return deleteModulo();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    
    async function getModulo() {
        try {
            const result = await prisma.avaliacao.findUnique({
                where: {
                    id: id,
                },
            });
            return res.status(200).json(result);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }

    async function attModulo(){
        try {
            const result = await prisma.modulo.update({
                where: {
                    id: id,
                },
                data:req.body.data,
            });
            return res.status(200).json(result);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }

    async function deleteModulo(){
        try {
            const result = await prisma.modulo.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json(result);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}
