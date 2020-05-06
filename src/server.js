const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./user.model')
const postRoutes = require('./post')
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

app.post('/users', postRoutes.postRoute )

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