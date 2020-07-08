

const fetch = (req, res) => {

    const data = {
        zipcode: req.body.zipcode
    }
    console.log('data in fetch -- ' + JSON.stringify(req));
    res.status(200).json({
        status: 'working'
    })
}

module.exports = {
fetch
}