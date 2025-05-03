const mongoose=require('mongoose');
const {Schema}=mongoose;
const review=require("./reviews.js");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
      url:String,
      filename:String,       
    
    },
    price:Number,
    location:String, 
    country:String,
    reviews:[{
         type:Schema.Types.ObjectId,
         ref:"Review"
    },
   ],
   owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
   },
   geometry:{
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
},


});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){await review.deleteMany({ _id:{$in:listing.reviews}})}
      

});


const l=mongoose.model("listing",listingSchema);
module.exports=l;