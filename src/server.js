

const express = require('express')
const bodyParser = require('body-parser');  
// const {mongoose} = require('./src/mongo')
const mongoose = require ('mongoose');
 const {User} = require('./user.model')
const app =  express();
mongoose.connect('mongodb://localhost:27017/bloodDonorDB', {useNewUrlParser: true})


// const User = mongoose.model('User', {name: String});

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
        name: req.body.name,
        address: req.body.address
    };
    const newUser = new User(
        user
    );
    //  newUser.save().then(function(){
    //     console.log('tested');
    //     res.send(user);
    // });
    newUser.save().then((data) => {
        res.send(data);
    })
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