const mongoose = require("mongoose");
const Comment = require("../models/comments");
mongoose.connect("mongodb://localhost/e_commerce_shop")
.then((resault)=>{
    console.log("Connecting To DB...");
})
.catch((err)=>{console.log(err)});
let comments = [
new Comment({
    comment : "Good Product",
    status : "Approve",
    commentDate : Date.now(),
    userId : "667f18da79ef567ce0b50230",
    itemId : "6680676e498c21d445aeabcd",
}),
new Comment({
    comment : "Thank You",
    status : "Approve",
    commentDate : Date.now(),
    userId : "667f18da79ef567ce0b50230",
    itemId : "6680676e498c21d445aeabcd",
})
];
let done = 0;
for(let x = 0 ; x < comments.length;x++)
    {
        comments[x].save().
        then((resault)=>{
            console.log(resault);            done++;
            if(done == comments.length)
                {
                    mongoose.disconnect();
                }
        }).
        catch((err)=>console.log(err));
    }
