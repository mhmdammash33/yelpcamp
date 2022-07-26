const Review = require('../models/review');

const isReviewAuthor = (req,res,next)=>{
    const {id,reviewid} = req.params;
    const review = Review.findById(reviewid);
    if(!review.author._id.equals(req.user._id)){
        req.flash('error','You have no permission to delete the Review!!');
        res.redirect(`/campgrounds/${id}`)
    } 
    next();
}

module.exports = isReviewAuthor;