const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
comment : {
    required : true,
    type : String,
},
status : {
    type : String,
    default : "Approve" ,
},
commentDate : {
    type :Date,
},
commentActive : {
    required : true,
    type : Number,
    default : 1 , //Active
},
userId :{
    required : true,
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
itemId :{
    required : true,
    type : mongoose.Schema.Types.ObjectId,
    ref : "Items"
},
});
module.exports = mongoose.model("Comments",commentSchema); 