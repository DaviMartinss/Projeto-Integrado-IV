import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");
import smtp from "./smtp.js";
import SMTP_CONFIG from "./smtp.js";

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: true,
    auth: {
        user:SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
      },
});
class SendMailBemVindo {
    async run(user, email){

        //console.log("Em msg", msg, "em email", email);
        const mailSent = await transporter.sendMail({
            text: "Olá, " +user+". Seja bem-vindo ao show do milhão. Pronto para ser o novo milionário?",
            subject: "Seja Bem-Vindo ao Show do milhão",
            from: "show do milhão <testeufcweb@gmail.com>",
            to: [email],
        });
        console.log(mailSent);
        
    }
}

class SendEmailAtencaoDenuncia {
    async run(user, email){

        const mailSent = await transporter.sendMail({
            text: "Olá, " +user+". Você tem uma nova pergunta para validar.",
            subject: "Validar pergunta - Show do Milhão",
            from: "Show do Milhão <testeufcweb@gmail.com>",
            to: [email],
        });
        console.log(mailSent);
        
    }
}

class SendMail {
    async run(msg, email){ 

        const mailSent = await transporter.sendMail({
            text: "Olá,\nParece que você esqueceu a sua senha do jogo show do milhão. Caso tenha sido você, segue a sua senha: \n\n\t\tSENHA: " + msg +"\n\nDo contrário, recomendamos urgentemente que altere sua senha para uma nova e mais segura, de preferência, alguma que possua maiúsculas, minúsculas, dígitos e caracteres especiais como: '#', '$', '%' por exemplo.",
            subject: "ATENÇÃO - Recuperação de Senha",
            from: "Show do milhão <testeufcweb@gmail.com>",
            to: [email],
        });
        console.log(mailSent);
    }
}

export const sendMail = new SendMail();
export const sendMailBemVindo = new SendMailBemVindo();
export const sendEmailAtencaoDenuncia = new SendEmailAtencaoDenuncia();