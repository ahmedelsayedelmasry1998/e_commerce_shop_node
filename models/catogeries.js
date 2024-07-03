const mongoose = require("mongoose");
const catogerySchema = mongoose.Schema({
catName : {
    required : true,
    type : String,
},
descraption : {
    required : true,
    type : String,
},
parentItem : {
    type : String,
},
visibility : {
    type : Number,
    default : 1 ,
},
allowComment : {
    type : Number,
    default : 1 ,
},
allowAds : {
    type : Number,
    default : 1 ,
},
catActive : {
    required : true,
    type : Number,
    default : 1 , //Active
},
userId :{
    required : true,
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
}
});
module.exports = mongoose.model("Catogeries",catogerySchema); 