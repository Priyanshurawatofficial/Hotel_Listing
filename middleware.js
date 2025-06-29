const { model } = require("mongoose");
const listing1=require("./models/models.js");
const review = require("./models/reviews.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
              req.session.redirectUrl=req.originalUrl; 
              req.flash("error","you must be logged in to add listings");
              return res.redirect("/login");
            
    }
    next();

}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let id=req.params.id;
    let listing= await listing1.findById(id);
       if(!listing.owner._id.equals(res.locals.currUser._id))
       {
           req.flash("error","You are not the oqner of this listing");
           return res.redirect(`/listings/${id}`);
          }
          next();
}


module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review_doc=await review.findById(reviewId);
    if(!review_doc.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();

};
