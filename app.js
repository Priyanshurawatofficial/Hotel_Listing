
if(process.env.NODE_ENV != "production")
{
require('dotenv').config();
}

const express=require('express');
const mongoose=require('mongoose');
const app=express();
const path=require('path');
const listing=require("./models/models.js");
const methodOverride=require('method-override');
const ejsmate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("./schema.js");
const review=require("./models/reviews.js");
const listings=require("./routes/listing.js"); 
const reviews=require("./routes/review.js");  
const cookieParser=require("cookie-parser");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userrouter=require("./routes/user.js");
const multer=require("multer");
const upload=multer({dest:'uploads/'});
const dbUrl=process.env.atlasdb_url;

const mongodb='mongodb://127.0.0.1:27017/wanderlust';

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.Secret, 
    },
    touchAfter:24*3600, 
});

store.on("error",(err)=>{
    console.log("Error in Mongo Session Store",err);
})

const sessionOptions={
     store,
     secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
};

app.use(session(sessionOptions)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
       res.locals.currUser=req.user;
       next();
});

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.session.user || null;
    next(); 
})

app.use(cookieParser());



async function main(){
    await mongoose.connect(dbUrl)

}
main()
.then((res)=>console.log("connected to database"))
.catch((err)=>console.log(err));





app.use(express.static(path.join(__dirname,'/public')));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsmate);


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})


app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
  });
  

 app.get("/demouser",async (req,res)=>{
    let fakeUser=new User({
        email:"priyanshurawatmaster@gmail.com",
        username:"priyanshu",
    });
   let registeredUser=await User.register(fakeUser,"india@2020");
   res.send(registeredUser);
 })


app.get("/", async (req, res) => {
  const alllistings = await listing.find({});
  res.render("listings.ejs", { alllistings });
});



app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",userrouter);










app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})

 app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;

    res.render("error.ejs",{err});
    // res.status(statusCode).send(message);
    //gaming is fun
});
