const { User } = require('./user.model')
const nodemailer = require('nodemailer'); // temp
const jwt = require('jsonwebtoken');
const express = require('express')
// var rand=Math.floor((Math.random() * 100) + 54);

var userDetails;

function createUniqueUserId() {
    return Math.floor((Math.random() * 100) + 54)
}


const app = express();
const postRoute = (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        emailID: req.body.emailID,
        username: req.body.username,
        password: req.body.password,
        lastDonated: req.body.lastDonated,
        uniqueUserId: createUniqueUserId()
    };
    // var usersID = req.body._id ;
    userDetails = user;
    const newUser = new User(
        user
    );

    var JWTToken = jwt.sign({ emailID: user.emailID, firstName: user.firstName, _id: user._id }, 'mohitchahdae');
    link = "http://localhost:3000/verifyme?id=" + user.uniqueUserId;
    // email sending
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testapplication1394@gmail.com',
            pass: '1q2w3e4r5t_'
        }
    });
    const mailPayload = {
        from: 'testapplication1394@gmail.com',
        to: user.emailID,
        subject: 'mail from node js app',
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };
    var host = req.headers.host;

    User.count({ emailID: user.emailID }).then((emailIDCount) => {
        if (emailIDCount > 0) {
            return res.status(400).json({
                error: "Email ID already exists"
            })
        } else {
            User.count({ username: user.username }).then((usernameCount) => {
                if (usernameCount > 0) {
                    return res.status(400).json({
                        error: "Username already exists"
                    })
                }
                else {
                    transporter.sendMail(mailPayload, (error, info) => {
                        if (error) {
                            console.log('Error occured while sending mail', error.message);
                            return res.status(400).json({
                                error: "email not vaild"
                            })
                        } else {
                            newUser.save((err, result) => { //save in databade
                                if (err) {
                                    return res.status(400).json({
                                        error: err
                                    })
                                }
                                res.status(200).json({
                                    post: result
                                })
                            })

                        }
                    })
                }
            })
        }
    })

}


module.exports = {
    postRoute, userDetails, //verifyTheUser
}