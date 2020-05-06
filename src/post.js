const { User } = require('./user.model')
const nodemailer = require('nodemailer'); // temp

const postRoute = (req, res) => {
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

    const newUser = new User(
        user
    );
    // newUser.save().then((data) => {
    //     res.send(data);
    // })
    // newUser.save((err, result) => {
    //     if(err) {

    //         return res.status(400).json({
    //             error: err
    //         })
    //     }
    //     res.status(200).json({
    //         post: result
    //     })
    // })
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
        text: 'receieved from node js application'
    };

    transporter.sendMail(mailPayload, (error, info) => {
        if (error) {
            res.status(400).json({
                error: "Invalid Email Id"
            })
        } else {
            console.log("email send" + info.response);
            // newUser.save().then((data) => {
            //     res.send(data);
            // })
            newUser.save((err, result) => {
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

module.exports = {
    postRoute
}