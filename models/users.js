const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
usreName : {
    required : true,
    type : String,
},
password : {
    required : true,
    type : String,
},
fullName : {
    type : String,
},
email : {
    required : true,
    type : String,
},
hireDate : {
    type : Date,
},
userAvatar : {
    type : String,
},
userType : {
    required : true,
    type : String,
    default : "User", // User
},
userActive : {
    required : true,
    type : Number,
    default : 1 , //Active
}
});
module.exports = mongoose.model("User",userSchema);