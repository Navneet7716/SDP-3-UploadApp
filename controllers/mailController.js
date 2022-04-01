const mailgun = require("mailgun-js");
const env = require("./env")
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.APIKEY, domain: DOMAIN,  host: process.env.HOST});

exports.sendEmail = async (req, res) => {
    const {recipient, subject, message} = req.body;

    console.log(process.env.APIKEY)

    const data = {
        from: 'Team Jobbers <me@samples.mailgun.org>',
        to: recipient,
        subject: subject,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <span style="font-size: 1.1rem;">${message}</span>
            <br />
            <br />

            <span style="font-size: 1rem;">Greetings From, </span>
            <br />
            <span style="font-size: 1rem ;font-weight: bold;">Team Jobbers</span>
            <br />
            <img src="https://jobbersdata.s3.amazonaws.com/SignUp.png" height="100px" width="100px" alt="JOBBERS"/>
        </body>
        </html>
        `
    };

   let res1 = await mg.messages().send(data, function (error, body) {
        console.log(" bpod " ,body);
        console.log(error);
    });

    res.send(res1)

}

// const nodemailer = require("nodemailer");
// const pug = require("pug");
// const htmlToText = require("html-to-text");

// class Email {
//   constructor(email, message) {
//     this.to = email;
//     this.message = message;
//     this.from = process.env.EMAIL;
//   }

//   newTransport() {
//     return;
//   }

//   async send(message, subject) {
//     const html = pug.renderFile(`${__dirname}/a.pug`, {
//       firstName: this.firstName,
//       message: this.message,
//       subject,
//     });

//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendMail(subject, message) {
//     await this.send();
//   }

//   async sendWelcome() {
//     await this.send("welcome", "Welcome to the Realtors Family!");
//   }
//   async sendContactInfo() {
//     await this.send("contact", "Requst For Owner Contacted Is Accepted.");
//   }

//   async sendDeclineMail() {
//     await this.send("decline", "Requst For Owner Contacted Is Declined.");
//   }
//   async sendPasswordReset() {
//     await this.send(
//       "passwordReset",
//       "Your Password Reset Token (valid for only 10 mins)"
//     );
//   }
// }

// exports.sendEmail = async (req, res) => {
//   const { recipient, subject, message } = req.body;

//   const html = pug.renderFile(`${__dirname}/a.pug`, {
//     message,
//     subject,
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: recipient,
//     subject,
//     html,
//     text: htmlToText.fromString(html),
//   };
//   try {

      
//       let res1 = await nodemailer
//       .createTransport({
//         service: 'gmail',
//           auth: {
//               user: 'realtorsapi@gmail.com',
//               pass: 'Dhruvrishi123',
//             },
//         })
//         .sendMail(mailOptions);
//         console.log(res1);
//       res.send(res1)
//     }catch (e) {
//         console.log(e);
//         res.send(e)
//     }
// };
