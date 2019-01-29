module.exports = function(err, req, res, next){
    // log errors
    res.status(500).send('Something went wrong !');
}