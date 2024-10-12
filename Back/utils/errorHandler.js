const ExpressError=require('./ExpressError');

function handle(err, req, res, next) {
    const {statusCode=500}=err;
    if(!err.message) err.message='Something Went Wrong!'
    res.status(statusCode).render('errors',{err});
}

function noPageError(req,res,next){
    next(new ExpressError('Page Not Found',404));
}

module.exports = {
    handle,
    noPageError
}