const nodemailer = require('nodemailer');
const {emailID} = require('./server')


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'testapplication1394@gmail.com',
        pass: '1q2w3e4r5t_'
    }
});
// var recipientID =  localStorage.getItem("emailID ");
//var recipientID = typeof window !== 'undefined' && window.localStorage.getItem("emailID");
//console.log('email id in mail sender', recipientID);
const mailPayload = {
    from: 'testapplication1394@gmail.com',
    to: recipientID,
    subject: 'mail from node js app',
    text: 'receieved from node js application'
};

transporter.sendMail(mailPayload ,(error, info) => {
if(error){
    console.log('Error occured while sending mail', error.message);
} else {
    console.log("email send" + info.response);
}
} )