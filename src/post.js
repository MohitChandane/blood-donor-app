const { User } = require('./user.model')
const nodemailer = require('nodemailer'); // temp
const jwt = require('jsonwebtoken');
const express = require('express')
const NodeGeocoder = require('node-geocoder');
// var rand=Math.floor((Math.random() * 100) + 54);

var userDetails;

function getLatLong(zipcode) {
    return new Promise ((resolve, reject) => {
        const options = {
            provider: 'opencage',
            //  apiKey: 'AIzaSyB_-vXmpiBPSC0BYwbvCbjIu4YqI_exVTc' // google  
            apiKey: '4ad88fb03c0c4d64a3bcb97ee38408bc', // OpenCage
        };
        const geocoder = NodeGeocoder(options);
        geocoder.geocode(zipcode)
            .then((res) => {
                console.log(res[0]);
                const location = {
                    lat: res[0].latitude,
                    long: res[0].longitude
                }
                return resolve(location);
            })
            .catch((err) => {
                console.log(err);
                return reject(err)
            })
    });
}

const postRoute = async (req, res) => {
    const location = await getLatLong(req.body.zipcode);
    console.log('location ------ ' + location)
    
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        emailID: req.body.emailID,
        username: req.body.username,
        password: req.body.password,
        lastDonated: req.body.lastDonated,
        latitude: location.lat,
        longitude: location.long,
        zipcode: req.body.zipcode,
        bloodgroup: req.body.bloodgroup,
        uniqueUserId: jwt.sign({ emailID: req.body.emailID, firstName: req.body.firstName, mobileNumber: req.body.mobileNumber }, 'mohitchahdae')
    };
    console.log('user in node is ' + JSON.stringify(user));
    userDetails = user;
    const newUser = new User(
        user
    );
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