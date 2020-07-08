const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./user.model')
const postRoutes = require('./post')
const verifyUser = require('./verify')
const fetch = require('./fetch-users');
const app = express();
const NodeGeocoder = require('node-geocoder');

const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
mongoose.connect('mongodb://localhost:27017/bloodDataBank', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.listen(3000, () => {
    console.log('server started on port 3000')
})

app.get('/users', (req, res) => {
    var beforeThreeMonthsDate = new Date()
    beforeThreeMonthsDate.setDate(beforeThreeMonthsDate.getDate() - 90)
    User.find({ lastDonated: { $lt: beforeThreeMonthsDate } }).then((users) => {
        res.send(users);
    })
})

app.get('/signin/:username/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password
    User.findOne({ username: username, password: password }).then((data) => {
        console.log('data -- ' + data)
        if (data) {
            if (data.isVerified) {
                res.send(data)
            } else {
                res.send({
                    status: 'User not verified'
                })
            }

        } else {
            res.send({
                status: 'Invalid user'
            })
        }
    })
})

app.get('/verifyme', verifyUser.verifyTheUser)

app.post('/users', postRoutes.postRoute)

app.patch('/users/:username', (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, {
        $set: req.body
    }).then(() => {
        res.send({
            status: 'User data updated'
        });
    })
})

app.delete('/users/:id', (req, res) => {
    User.findOneAndDelete({
        _id: req.params.id
    }).then((removedUser) => {
        res.send(removedUser);
    })
})

app.post('/fetchusers', (req,res) => {
    
    const data = {
        zipcode: req.body.zipcode
    }
    const options = {
        provider: 'opencage',
        //  apiKey: 'AIzaSyB_-vXmpiBPSC0BYwbvCbjIu4YqI_exVTc' // google  
        apiKey: '4ad88fb03c0c4d64a3bcb97ee38408bc', // OpenCage
    };
    const geocoder = NodeGeocoder(options);
    geocoder.geocode(req.body.zipcode)
        .then((data) => {
            console.log(data[0]);
            const location = {
                lat: data[0].latitude,
                long: data[0].longitude
            }
          //  return location;
          return  res.status(200).json({
                location
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                status: "Invalid Zipcode provided"
            })
        })
    
    // console.log('data in fetch -- ' +  req.body.zipcode);
    // res.status(200).json({
    //     location
    // })
})
// const options = {
//     provider: 'opencage',
//     //  apiKey: 'AIzaSyB_-vXmpiBPSC0BYwbvCbjIu4YqI_exVTc' // google  
//     apiKey: '4ad88fb03c0c4d64a3bcb97ee38408bc', // OpenCage
// };
// const geocoder = NodeGeocoder(options);
// geocoder.reverse(' solapur')
//     .then((res) => {
//         console.log(res);
//         // const location = {
//         //     lat: res[0].latitude,
//         //     long: res[0].longitude
//         // }
//        // return resolve(location);
//     })
//     .catch((err) => {
//         console.log(err);
//      //   return reject(err)
//     })