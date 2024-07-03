const mongoose = require("mongoose");
const User = require("../models/users");
mongoose.connect("mongodb://localhost/e_commerce_shop")
.then((resault)=>{
    console.log("Connecting To DB...");
})
.catch((err)=>{console.log(err)});
let users = [
new User({
    usreName : "Ahmed Elmasry",
    password : "12345",
    email : "www.ahmed@gmail.com",
}),
new User({
    usreName : "Mohamed Elmasry",
    password : "12345",
    email : "www.mohamed@gmail.com",
})
];
let done = 0;
for(let x = 0 ; x < users.length;x++)
    {
        users[x].save().
        then((resault)=>{
            console.log(resault);            done++;
            if(done == users.length)
                {
                    mongoose.disconnect();
                }
        }).
        catch((err)=>console.log(err));
    }
