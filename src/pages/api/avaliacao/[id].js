import { PrismaClient } from "@prisma/client"
import axios from "axios";
import Modulo from "../../../components/Modulo";

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
            for (let i = 0; i < result.Modulo.length; i++) {
                const auxModulo = result.Modulo[i];
                await prisma.pergunta.deleteMany({
                    where: {
                        modulo: auxModulo.id,
                    }
                });
                await prisma.modulo.delete({
                    where: {
                        id: auxModulo.id,
                    }
                });
            }
            const resultado = await prisma.avaliacao.delete({
                where: {
                    id: id,
                }
            });
            return res.status(200).json(resultado);
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}
