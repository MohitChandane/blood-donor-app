const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./user.model')
const postRoutes = require('./post')
const verifyUser = require('./verify')
const app = express();

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