const mailgun = require("mailgun-js");
const DOMAIN = 'worldtravelo.live';
const mg = mailgun({apiKey: "a2a2ebe1214fc232f1f3edc71ca48a70-b6d086a8-383b5dd8", domain: DOMAIN});

exports.sendEmail = async (req, res) => {
    const {recipient, subject, message} = req.body;

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
            <img src="https://sdp3jobber.s3.ap-south-1.amazonaws.com/SignUp.png" height="100px" width="100px" alt="JOBBERS"/>
        </body>
        </html>
        `
    };
    
   let res1 = await mg.messages().send(data, function (error, body) {
        console.log(body);
    });

    res.send(res1)

}