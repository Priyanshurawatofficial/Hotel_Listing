const listing=require("../models/models.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const mapToken=process.env.map_token;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req,res)=>{
    const alllistings=await listing.find({});
   // console.log(alllistings);    
   res.render("listings.ejs",{alllistings});}


 module.exports.renderNewForm=(req,res)=>{
   
    res.render("new.ejs");
};

module.exports.showListing=async (req,res)=>{
     const {id}=req.params;
     const listing1=await listing.findById(id).populate({path:"reviews",populate:{path:"author"}},).populate("owner");
     if(!listing1)
     {
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
     }
     
     
     res.render("show.ejs",{listing1});
};

module.exports.createListing= async(req,res,next)=>{
      
    let response= await geocodingClient.forwardGeocode({
         query:req.body.listing.location,
         limit: 1
       })
       .send()
          



    let url=req.file.path;
    let filename=req.file.filename;
 console.log(url,"  ",filename);
   let {title,description,image,price,country,location}=req.body.listing;
     const newlisting=new listing({title,description,image,price,country,location});
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
    newlisting.owner=req.user._id;
     await newlisting.save();
req.flash("success","new listing created");
   
     
      res.redirect("/listings");
 
}


module.exports.renderEditForm=async (req,res)=>{
    const {id}=req.params;
    const listing1=await listing.findById(id);
    req.flash("success","Listing Updated!!");
    if(!listing1)
     {
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
     }
     
     let originalurl=listing1.image.url;
     originalurl=originalurl.replace("/upload","/upload/h_300,w_250");
    res.render("edit.ejs",{listing1,originalurl});
 };


 module.exports.updateListing=async (req,res)=>{
    
    let {id}=req.params;
    let listingg=await listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !=="undefined")
   {
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
   }
   };


 module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);  
    req.flash("success","Listing Deleted!!");
    res.redirect("/listings");}