const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/models.js");
const review=require("../models/reviews.js");
const reviewController=require("../controllers/reviews.js")
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");
const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(404,errMsg);
    }
    else{
        next(); 
    }
}



//reviews

// review post route
router.post("/",isLoggedIn,isReviewAuthor,validateReview,wrapAsync(reviewController.createReview));
 
 
 //review delete route      
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.delete));

 module.exports=router;