const { text } = require("express")
const nodemailer = require("nodemailer")


const sendMail = async (email,subject,message) => {

    try{
     
        const transpotation = nodemailer.createTransport({

            service: 'gmail',
            secure: true,
            port: 2153,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user : "adityakumar98762@gmail.com",
                pass: "a7982917606"
            },
            tls: {
                rejectUnauthorized: true
            }

        });

        const mailoption = {

            from: "adityakumar98762@gmail.com",
            to : email,
            subject: subject,
            text: message
        }

        await transpotation.sendMail(mailoption)

        console.error('mail sent succefully');
    } catch (err) {

        console.error('Error sending email:', err);
    }
}

module.exports = sendMail