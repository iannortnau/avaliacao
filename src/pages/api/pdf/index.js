import { PrismaClient } from "@prisma/client"
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image} from '@react-pdf/renderer';
import moment from "moment";
const prisma = new PrismaClient();
import nodemailer from "nodemailer";

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

            const Pdf = () => (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.painel1}>
                            <Text style={styles.h1}>{avaliacao.nome}</Text>
                            <Text style={styles.h2}>{avaliacao.descricao}</Text>
                            <Text style={styles.h3}>{avaliacao.criador}</Text>
                            <View style={styles.painel2}>
                                <Text style={styles.h5}><b>Nome:</b> {rascunho.usuarioNome}</Text>
                                <Text style={styles.h5}><b>Email:</b> {rascunho.usuarioEmail}</Text>
                                <Text style={styles.h5}><b>Data:</b> {moment(rascunho.data).format("DD/MM/YYYY")}</Text>

                            </View>
                        </View>
                        <Image
                            style={styles.img}
                            src={data}
                        />
                    </Page>
                </Document>
            );
            ReactPDF.render(<Pdf />, __dirname+"/../../../../public/pdf/"+rascunho.usuarioEmail+"_"+avaliacao.id+".pdf");

            const result = await prisma.relatorio.update({
                where: {
                    id: rascunho.relatorio,
                },
                data:{
                    usuario_pdf:process.env.NEXT_PUBLIC_URL+"/pdf/"+rascunho.usuarioEmail+"_"+avaliacao.id+".pdf"
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
                        path: process.env.NEXT_PUBLIC_URL+"/pdf/"+rascunho.usuarioEmail+"_"+avaliacao.id+".pdf" // stream this file
                    },
                ]
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return res.status(400).json(error);
                } else {
                    return res.status(200).json("ok");
                }
            });
        }catch (e) {
            console.log(e);
            return res.status(400).json(e);
        }
    }
}

const corPrimaria = "#7368e6";
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
    h1:{margin: "0.2cm",},
    h2:{margin: "0.2cm",},
    h3:{margin: "0.2cm",},
    h5:{
        margin: "0.5cm",
    },
    img:{
        width: "15cm",
        height: "15cm",

    },
});
