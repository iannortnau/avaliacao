import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

async function handler(req, res) {
    const id =  parseInt(req.query.id);
    switch (req.method) {
        case 'GET':
            return getAvaliacao();
        case 'PUT':
            return attAvaliacao();
        case 'DELETE':
            return deleteAvaliacao();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    
    async function getAvaliacao() {
        try {
            const result = await prisma.avaliacao.findUnique({
                where: {
                    id: id,
                },
                include: {
                    Modulo: {
                        include:{
                            Pergunta:true
                        }
                    }
                },
            });
            return res.status(200).json(result);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }

    async function attAvaliacao(){
        try {
            const result = await prisma.avaliacao.update({
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

    async function deleteAvaliacao(){
        try {
            const result = await prisma.avaliacao.delete({
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
