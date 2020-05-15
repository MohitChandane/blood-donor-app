const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./user.model')
const postRoutes = require('./post')
 const verifyUser = require('./verify')
//const verifyUser = require('./post')
const app = express();

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

app.get('/signin/:username/:password',(req,res) => {
    const username =  req.params.username
    const password =  req.params.password
    console.log('username -- '+ username)
    console.log('password -- '+ password)
    User.findOne({username: username, password: password}).then((data) => {
        console.log('data -- '+ data)
        if(data) {
            if(data.isVerified) {
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
        // if(data.password === password) {
        //     res.send({
        //         status: 'Valid user'
        //     })
        // } else {
        //     res.send({
        //         status: 'Invalid user'
        //     })
        // }
        // console.log('req -- ' + req.params.username);
        // console.log('res -- ' + res);
        // console.log("username found in database" + data);
     //   res.send(data);
    })
})

app.get('/verifyme', verifyUser.verifyTheUser)

app.post('/users', postRoutes.postRoute )

app.patch('/users/:username', (req, res) => {
    console.log('req.body --- ' + req.body)
    User.findOneAndUpdate({username: req.params.username},{
        $set: req.body
    }).then(() => {
        res.send({
            status: 'User data updated'
        });
    })
})

app.delete('/users/:id',(req, res) => {
    User.findOneAndDelete({
        _id: req.params.id}).then((removedUser) => {
        res.send(removedUser);
    })
})