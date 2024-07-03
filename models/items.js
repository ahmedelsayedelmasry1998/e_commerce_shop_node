const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
itemName : {
    required : true,
    type : String,
},
itemPrice : {
    required : true,
    type : Number,
},
addedDate : {
    type : Date,
},
counteryMade : {
    type : String,
},
status : {
    type : Number,
    default : 1 ,
},
rating : {
    type : Number,
    default : 1 ,
},
approve : {
    type : Number,
    default : 1 ,
},
itemActive : {
    required : true,
    type : Number,
    default : 1 , //Active
},
itemPhoto: {
type : String,
},
userId :{
    required : true,
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
catId :{
    required : true,
    type : mongoose.Schema.Types.ObjectId,
    ref : "Catogeries"
},
});
module.exports = mongoose.model("Items",itemSchema); 