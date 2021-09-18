import { PrismaClient } from "@prisma/client"
import axios from "axios";
import Modulo from "../../../components/Modulo";

const prisma = new PrismaClient()
export default handler;

async function handler(req, res) {
    const id =  parseInt(req.query.id);
    switch (req.method) {
        case 'GET':
            return getPergunta();
        case 'PUT':
            return attPergunta();
        case 'DELETE':
            return deletePergunta();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    
    async function getPergunta() {
        try {
            const result = await prisma.pergunta.findUnique({
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

    async function attPergunta(){
        try {
            const result = await prisma.pergunta.update({
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

    async function deletePergunta(){
        try {
            const resultado = await prisma.pergunta.delete({
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
