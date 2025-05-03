const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const listing=require("../models/models.js");
const {isLoggedIn, isOwner}=require("../middleware.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});
 const listingController=require("../controllers/listings.js");
// const validateListing=(req,res,next)=>{
//     let {error}= listingSchema.validate(req.body);
    
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(404,errMsg);
//     }
//     else{
//         next();
//     }
// }

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404, errMsg);
  } else {
      next();
  }
};


//index route
router.get("/",wrapAsync(listingController.index))

//new route    
router.get("/new",isLoggedIn,listingController.renderNewForm)

//show route
router.get("/:id",wrapAsync(listingController.showListing));

//create route
router.post("/",isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


//update route
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing));


//delete route
router.delete("/:id",isLoggedIn,wrapAsync(listingController.destroyListing));



module.exports=router;
