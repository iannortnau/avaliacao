import { PrismaClient } from "@prisma/client"
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import moment from "moment";
const prisma = new PrismaClient();
import nodemailer from "nodemailer";
import md5 from "md5";

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return createPdf();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createPdf() {
        try {
            const avaliacao = req.body.avaliacao;
            const rascunho = req.body.rascunho;
            const data = req.body.graficoData;
            const code = md5(rascunho.usuarioEmail+"_"+avaliacao.id);

            const modulos = [];
            for (let i = 0; i < rascunho.modulosGuia.length; i++) {
                const auxModulo = {
                    titulo: avaliacao.Modulo[i].titulo,
                    media: rascunho.modulos[rascunho.modulosGuia[i]].media,
                    perguntas:[]
                }
                for (let j = 0; j < rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia.length; j++) {
                    const auxPergunta = {
                        titulo: avaliacao.Modulo[i].Pergunta[j].titulo,
                        descricao: avaliacao.Modulo[i].Pergunta[j].descricao,
                        resposta: rascunho.modulos[rascunho.modulosGuia[i]].perguntas[rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia[j]],
                    }
                    auxModulo.perguntas.push(auxPergunta);
                }
                modulos.push(auxModulo);
            }

            console.log(modulos);
            const Pdf = () => (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.painel1}>
                            <Text style={styles.h1}>{avaliacao.nome}</Text>
                            <Text style={styles.h2}>{avaliacao.descricao}</Text>
                            <Text style={styles.h3}>{avaliacao.criador}</Text>
                            <View style={styles.painel2}>
                                <Text style={styles.h5}>Nome: {rascunho.usuarioNome}</Text>
                                <Text style={styles.h5}>Email: {rascunho.usuarioEmail}</Text>
                                <Text style={styles.h5}>Data: {moment(rascunho.data).format("DD/MM/YYYY")}</Text>

                            </View>
                        </View>
                        <Image
                            style={styles.img}
                            src={data}
                        />
                    </Page>
                    <Page size="A4" style={styles.page} wrap={false}>
                        {modulos.map(function (modulo, index) {
                            return(
                                <View key={"m"+index} style={styles.painel1} wrap={false}>
                                    <Text style={styles.h1}>{modulo.titulo}:</Text>
                                    <Text style={styles.h2}>Média: {modulo.media.toFixed(2)}</Text>
                                    {modulo.perguntas.map(function (pergunta,index) {
                                        return(
                                            <View key={"p:"+index} style={styles.painelP}>
                                                <Text style={styles.tp}>{pergunta.titulo}:</Text>
                                                <Text style={styles.tp}>{pergunta.descricao}</Text>
                                                <View key={"p:"+index} style={styles.painelP}>
                                                    <Text style={styles.tp}>Resposta:{pergunta.resposta}</Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </Page>
                </Document>
            );

            ReactPDF.render(<Pdf />, __dirname+"/../../../../public/pdf/"+code+".pdf");
            const result = await prisma.relatorio.update({
                where: {
                    id: rascunho.relatorio,
                },
                data:{
                    usuario_pdf:process.env.NEXT_PUBLIC_URL+"/pdf/"+code+".pdf"
                },
            });

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'desenvolvesccap@gmail.com',
                    pass: 'gsxbwirbosctafiu'
                }
            });
            var mailOptions = {
                from: 'desenvolvesccap@gmail.com',
                to: rascunho.usuarioEmail,
                subject: 'PDF - '+avaliacao.nome,
                attachments: [
                    {   // file on disk as an attachment
                        filename: rascunho.usuarioEmail+"_"+avaliacao.nome+".pdf",
                        path: __dirname+"/../../../../public/pdf/"+code+".pdf" // stream this file
                    },
                ]
            };
            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return res.status(400).json(error);
                } else {
                    return res.status(200).json("ok");
                }
            })
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}

const corPrimaria = "#4f41ff";
const corPrimariaTr = "rgba(115, 104, 230, 0.36)";
const corPrimariaTrTr = "rgba(115, 104, 230, 0.2)";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    painel1:{
        color:corPrimaria,
        width:"95%",
        padding:"0.25cm",
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        margin: "0.5cm",
        backgroundColor: corPrimariaTr,
        borderRadius:"0.25cm",

    },
    painel2:{
        color:corPrimaria,
        padding:"0.25cm",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        flexWrap: 'wrap',
        margin: "0.5cm",
        backgroundColor: corPrimariaTrTr,
        borderRadius:"0.25cm",
    },
    painelP:{
        color:corPrimaria,
        width: "100%",
        padding:"0.25cm",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        textAlign:'center',
        flexWrap: 'wrap',
        margin: "0.1cm",
        backgroundColor: corPrimariaTrTr,
        borderRadius:"0.25cm",
    },
    tp:{
        fontSize:11,
        margin: "0.1cm",
    },
    h1:{margin: "0.2cm",},
    h2:{margin: "0.2cm",fontSize:10},
    h3:{margin: "0.2cm",},
    h5:{margin: "0.5cm",},
    img:{
        width: "15cm",
        height: "15cm",
    },
});
