const mongoose=require('mongoose');
const initData=require('../init/data.js');
const listing=require("../models/models.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

}
main()
.then((res)=>console.log("connected to database"))
.catch((err)=>console.log(err));
//console.log(initData);

const initdb=async()=>{
    await listing.deleteMany({});
    //initData.data = (initData.data || []).map((obj) => ({ ...obj, owner: "68026abe16c778d1ef1b0527" }));
 
//    initData.data=initData.data.map((obj)=>({...obj,owner:"68026abe16c778d1ef1b0527"}))
    await listing.insertMany(initData);
    console.log("data inserted successfully");
}  
initdb();
