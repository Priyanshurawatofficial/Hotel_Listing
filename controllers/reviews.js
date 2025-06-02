const review=require("../models/reviews.js");
const listing=require("../models/models.js");


module.exports.createReview=async (req,res)=>{
    const {id}=req.params;
    const listing1=await listing.findById(id); 
    let newReview=new review(req.body.review); 
    newReview.author=req.user._id;
    listing1.reviews.push(newReview);
    await newReview.save();
    await listing1.save();
    console.log("new review saved");
    req.flash("success","new review created");
    res.redirect(`/listings/${id}`);
 
 
       }

  module.exports.delete=async (req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await review.findByIdAndDelete(reviewId);
    req.flash("success","review Deleted!!");
     res.redirect(`/listings/${id}`);
};


