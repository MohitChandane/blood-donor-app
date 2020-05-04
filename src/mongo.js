const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/bloodDonorDB', {useNewUrlParser: true}).then(() =>{
    console.log('Connected to mongo DB');
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};