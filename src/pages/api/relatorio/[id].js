import { PrismaClient } from "@prisma/client"
import axios from "axios";
import Modulo from "../../../components/Modulo";

const prisma = new PrismaClient()
export default handler;

async function handler(req, res) {
    const id =  parseInt(req.query.id);
    switch (req.method) {
        case 'GET':
            return getRelatorio();
        case 'PUT':
            return attRelatorio();
        case 'DELETE':
            return deleteRelatorio();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    
    async function getRelatorio() {
        try {
            const result = await prisma.relatorio.findUnique({
                where: {
                    id: id,
                },
                include: {
                    Media: {
                        include:{
                            Resposta:true
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

    async function attRelatorio(){
        try {
            const result = await prisma.relatorio.update({
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

    async function deleteRelatorio(){
        try {
            const result = await prisma.relatorio.findUnique({
                where: {
                    id: id,
                },
                include: {
                    Media: {
                        include:{
                            Resposta:true
                        }
                    }
                },
            });
            for (let i = 0; i < result.Media.length; i++) {
                const auxMedia = result.Media[i];
                await prisma.resposta.deleteMany({
                    where: {
                        media: auxMedia.id,
                    }
                });
                await prisma.media.delete({
                    where: {
                        id: auxMedia.id,
                    }
                });
            }
            const resultado = await prisma.relatorio.delete({
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
