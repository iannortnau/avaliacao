import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getRelatorios();
        case 'POST':
            return createRelatorio();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getRelatorios() {
        const usuarios = await prisma.relatorio.findMany({
            include: {
                Media: {
                    include:{
                        Resposta:true
                    }
                }
            },
        });
        //console.log(usuarios);
        return res.status(200).json(usuarios);
    }

    async function createRelatorio() {
        try {
            const rascunho = req.body;

            const resp = await prisma.relatorio.create({
                data:{
                    avaliacao: rascunho.avaliacao,
                    usuario_nome: rascunho.usuarioNome,
                    usuario_email: rascunho.usuarioEmail,
                    usuario_pdf:"",
                    data: rascunho.data,
                }
            });

            const relatorio = resp.id;
            console.log(resp);
            for (let i = 0; i < rascunho.modulosGuia.length; i++) {
                const resp = await prisma.media.create({
                    data:{
                        modulo:rascunho.modulosGuia[i],
                        relatorio:relatorio,
                        valor:rascunho.modulos[rascunho.modulosGuia[i]].media,
                    }
                });
                console.log(resp);
                const media = resp.id;
                for (let j = 0; j < rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia.length; j++) {
                    const resp = await prisma.resposta.create({
                        data:{
                            pergunta:rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia[j],
                            media:media,
                            valor:rascunho.modulos[rascunho.modulosGuia[i]].perguntas[rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia[j]],
                        }
                    });
                    console.log(resp);
                }
            }
            const result = await prisma.relatorio.findUnique({
                where: {
                    id: relatorio,
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
}
