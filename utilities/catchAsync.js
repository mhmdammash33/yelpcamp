
function catchAsync(callbackFunction){
    return function(req,res,next){
        callbackFunction(req,res,next).catch(e=>next(e));
}
}

module.exports = catchAsync;

