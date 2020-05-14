const {rand, userDetails} = require('./post')
const { User } = require('./user.model')
const verifyTheUser = (req, res) => {
    host=req.get('host');
  //  console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        User.findOne({uniqueUserId: req.query.id}, (err, document) => {
            console.log('sadsdsadhsajdhsajdhsajhds'+document);
            
        if(req.query.id== document.uniqueUserId)
        {
        User.findOneAndUpdate({uniqueUserId: document.uniqueUserId},{
            $set:{isVerified: true}}).then((newDocument) => {
                console.log("new updated document is -- " + newDocument)
            })
           res.send("Congrats your email has been verified, please proceed to log in")

        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
        });
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
}

module.exports = {
    verifyTheUser
}