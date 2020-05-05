
const nodemailer = require('nodemailer'); // temp
const express = require('express')
const bodyParser = require('body-parser');
// const {mongoose} = require('./src/mongo')
const mongoose = require('mongoose');
const { User } = require('./user.model')
//const mailSender = require ('./mail-sender')
const app = express();

// const mailer = mailSender();

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200  
}

app.use(cors(corsOptions))
mongoose.connect('mongodb://localhost:27017/bloodDataBank', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send("Hello World")
})
app.listen(3000, () => {
    console.log('server started on port 3000')
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
})

app.post('/users', (req,res) => {
    console.log('reqqqqqw', req.body);
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        emailID: req.body.emailID,
        username: req.body.username,
        password: req.body.password,
        lastDonated: req.body.lastDonated
    };
   // typeof window !== 'undefined' && window.localStorage.setItem("emailID", user.emailID); 
  //var sendID = user.emailID;
   // module.exports = user.emailID;
    const newUser = new User(
        user
    );
    newUser.save().then((data) => {
        res.send(data);
    })
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
        to: user.emailID,
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


})

app.patch('/users/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/users/:id',(req, res) => {
    User.findOneAndDelete({
        _id: req.params.id}).then((removedUser) => {
        res.send(removedUser);
    })
})