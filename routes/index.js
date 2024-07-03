var express = require('express');
var router = express.Router();
const Catogary = require("../models/catogeries");
const Item = require("../models/items");
let Member = require("../models/users");
const Comment = require("../models/comments");
const multer = require("multer");
const comments = require('../models/comments');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/itemImages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'E Commerce Shop',layout:'layouts'});
});
router.post('/', function(req, res, next) {
  let userName = req.body.userName;
  let password = req.body.password;
  Member.find({usreName : userName,password:password,userActive : 1}).then((resault)=>{
    if(resault.length > 0)
      {
        if(resault[0].userType== "Admin")
          {
            req.session.user = resault[0];
            res.redirect("/index");
          }else{
            req.session.user = resault[0];
            res.redirect("/user");
          }
      }else{
        res.redirect("/");
      }
  }).catch((err)=>{
console.log(err);
  });
});

router.get('/index', function(req, res, next) {
  let catLength = 0;
  let itemLength = 0;
  let memberLength = 0;
  let userLength = 0;
  let adminLength = 0;
  let commentLength = 0;
  Catogary.find({catActive : 1}).then((cat)=>{
    catLength = cat.length;
    Item.find({itemActive : 1}).then((item)=>{
      itemLength = item.length;
      Member.find({userActive:1}).then((users)=>{
        memberLength = users.length;
        for(let x = 0 ; x < users.length;x++)
          {
            if(users[x].userType == "User")
              {
                userLength++;
              }else{
                adminLength++;
              }
          }
          Comment.find({commentActive : 1})
          .then((comments)=>{
            commentLength = comments.length;
            res.render('index', { title: 'E Commerce Shop',userName : req.session.user.usreName ,cat:catLength,item : itemLength,member : memberLength ,user:userLength,admin:adminLength,comments:commentLength});
          }).catch((err)=>{
            console.log(err);
          });
      })
      .catch((err)=>{
        console.log(err)
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });
});
router.get('/user', function(req, res, next) {
  let catLength = 0;
  let itemLength = 0;
  let memberLength = 0;
  let userLength = 0;
  let adminLength = 0;
  let commentLength = 0;
  Catogary.find({catActive : 1}).then((cat)=>{
    catLength = cat.length;
    Item.find({itemActive : 1}).then((item)=>{
      itemLength = item.length;
      Member.find({userActive:1}).then((users)=>{
        memberLength = users.length;
        for(let x = 0 ; x < users.length;x++)
          {
            if(users[x].userType == "User")
              {
                userLength++;
              }else{ 
                adminLength++;
              }
          }
          Comment.find({commentActive : 1})
          .then((comments)=>{
            commentLength = comments.length;
            res.render('user', { title: 'E Commerce Shop',userName : req.session.user.usreName,layout : 'catLayout',userName : req.session.user.usreName ,cat:catLength,item : itemLength,member : memberLength ,user:userLength,admin:adminLength,comments:commentLength,cats:cat});
          }).catch((err)=>{
            console.log(err);
          });
      })
      .catch((err)=>{
        console.log(err)
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });
});
router.get('/itemUser/:catId', function(req, res, next) {
  Catogary.find({catActive : 1}).then((cat)=>{
    let catId = req.params.catId;
    Item.find({catId : catId,itemActive : 1}).populate("userId")
    .then((resault)=>{
      Catogary.find({_id : catId,catActive:1}).then((ress)=>{
        res.render('itemUser', { title: 'E Commerce Shop',userName : req.session.user.usreName,layout : 'catLayout',items : resault,catName : ress[0].catName,cats:cat});
      }).catch((err)=>{
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });
});
router.get("/changePassword",function(req,res,next){

  Catogary.find({catActive : 1}).then((cat)=>{
    let catId = req.params.catId;
    Item.find({catId : catId,itemActive :1}).populate("userId")
    .then((resault)=>{
      Catogary.find({_id : catId,catActive : 1}).then((ress)=>{
        Member.find({password:req.session.user.password,usreName : req.session.user.usreName,userActive:1}).then((admin)=>{
          res.render('changePassword', { title: 'E Commerce Shop',userName : req.session.user.usreName,password:admin[0].password});
        })
          .catch((err)=>{
            console.log(err);
          });
      }).catch((err)=>{
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });

});

router.post("/changePassword",(req,res,next)=>{
  let userId = req.session.user._id;
  let editUser = {
    password : req.body.pass
  };
  Member.updateOne({_id : userId},{$set:editUser})
  .then((ress)=>{
    res.redirect("/");
  }).catch((err)=>{
    console.log(err);
  });
});
router.get('/itemDesc/:itemId', function(req, res, next) {
  let itemId = req.params.itemId;
 Catogary.find({catActive : 1}).then((cat)=>{
  Item.find({_id : itemId,itemActive:1}).populate("userId").populate("catId")
  .then((resault)=>{
    Comment.find({itemId:itemId,userId:req.session.user._id,status : "Approve",commentActive:1}).populate("userId").populate("itemId")
    .then((items)=>{
      res.render('itemDesc', { itemId:itemId,itemPhoto : resault[0].itemPhoto,itemName : resault[0].itemName,itemPrice : resault[0].itemPrice,addedDate:resault[0].addedDate,country : resault[0].counteryMade,catName : resault[0].catId.catName,user : resault[0].userId.userName,cat :resault[0].catId.catName ,cats:cat,title: 'E Commerce Shop',userName : req.session.user.usreName,layout : 'catLayout',items:items});
    }).catch((err)=>{
      console.log(err);
    });
  }).catch((err)=>{
    console.log(err);
  });
 }).catch((err)=>{
  console.log(err);
 });

});
router.get("/logout",function(req,res,next){
  if(req.session.user)
    {
      req.session.destroy();
      res.redirect("/");
    }
});
router.post('/addComment', function(req, res, next) {
  let itemId = req.body.itemId;
  let userId = req.session.user._id;
  let comment =req.body.comment;
  let addComment = new Comment({
    comment : comment,
    userId : userId,
    itemId : itemId,
  });
  addComment.save().then((resault)=>{
    res.redirect("itemDesc/"+itemId+"");
  }).catch((err)=>{console.log(err)});
});

router.get('/catogeries', function(req, res, next) {
 Catogary.find({catActive : 1})
  .then((resault)=>{
    Item.find({itemActive:1}).then((item)=>{
      res.render('catogeries', { title: 'E Commerce Shop',resault : resault,userName : req.session.user.usreName,items:item  });
    })
    .catch((err)=>{
      console.log(err)
    });
  })
  .catch((err)=>{console.log(err)});
  });
router.get('/addCatogary', function(req, res, next) {
  Item.find({itemActive:1}).then((item)=>{
    res.render('addCatogary', { title: 'E Commerce Shop',userName : req.session.user.usreName,items:item  });
  })
  .catch((err)=>{
    console.log(err)
  });
}); 
router.post('/addCatogary', function(req, res, next) {
  let catName = req.body.catName ; 
  let descraption = req.body.descraption ; 
  let childItems = req.body.childItems ; 
  let visibleItem = req.body.visibleItem ; 
  let allowComment = req.body.allowComment ; 
  let allowAds = req.body.allowAds ; 
  let catogary = new Catogary({
    catName : catName,
    descraption : descraption,
    parentItem : childItems,
    visibility : visibleItem,
    allowComment : allowComment,
    allowAds : allowAds,
    userId : req.session.user._id,
  });
  catogary.save()
  .then((resault)=>{
    res.redirect("/index");
    console.log(resault);
  })
  .catch((err)=>{console.log(err)});
});
router.get('/deleteCatogary/:catId', function(req, res, next) {
let catId = req.params.catId;
let deleteCatogary = {
catActive : 0,
};
Catogary.updateOne({_id : catId},{$set : deleteCatogary})
.then((resault)=>{
  res.redirect("/index");
})
.catch((err)=>{
  console.log(err)
});
});

router.get("/editCatogary/:catId",function(req,res,next){
  let catId = req.params.catId;
  Catogary.find({_id : catId,catActive:1}).then((resault)=>{
    let childItems ;
    if( resault[0].parentItem == "start")
      {
        childItems = 'start'; 
      }else{
        childItems = null;
      }
      let visibility ;
      if( resault[0].visibility == 1)
        {
          visibility = 1; 
        }else{
          visibility = null;
        }
        let allowComment ;
        if( resault[0].allowComment == 1)
          {
            allowComment = 1; 
          }else{
            allowComment = null;
          }
          let allowAds ;
          if( resault[0].allowAds == 1)
            {
              allowAds = 1; 
            }else{
              allowAds = null;
            }
            Item.find({itemActive:1}).then((item)=>{
                      res.render("editCatogary",{title : 'E Commerce Shop',catName : resault[0].catName,descraption : resault[0].descraption,childItems : childItems,visibility : visibility,allowComment : allowComment,allowAds : allowAds,catId : catId,userName : req.session.user.usreName,items:item});
            }).catch((err)=>{
              console.log(err);
            })
  }).catch((err)=>{
    console.log(err);
  });
});
router.post("/editCatogary",(req,res,next)=>{
  let catId = req.body.catId;
  let catName = req.body.catName ; 
  let descraption = req.body.descraption ; 
  let childItems = req.body.childItems ; 
  let visibleItem = req.body.visibleItem ; 
  let allowComment = req.body.allowComment ; 
  let allowAds = req.body.allowAds ; 
  let editCatogary = {
    catName : catName,
    descraption : descraption,
    parentItem : childItems,
    visibility : visibleItem,
    allowComment : allowComment,
    allowAds : allowAds,
    userId : req.session.user._id
  };
  Catogary.updateOne({_id : catId},{$set : editCatogary})
  .then((resault)=>{
    res.redirect("/index");
  }).catch((err)=>{
    console.log(err);
  });
});
router.get('/items', function(req, res, next) {
  Item.find({itemActive : 1}).populate("catId")
   .then((resault)=>{
      res.render('items', { title: 'E Commerce Shop',resault : resault,userName : req.session.user.usreName  });
   })
   .catch((err)=>{console.log(err)});
   });
   router.get('/addItem', function(req, res, next) {
    Catogary.find({catActive:1})
    .then((resault)=>{
      res.render('addItem', { title: 'E Commerce Shop',resault: resault,userName : req.session.user.usreName  });
    })
    .catch((err)=>{console.log(err)});
});
router.post('/addItem',upload.single("upload_file"),function(req, res, next) {
  let itemName =  req.body.itemName;
  let itemPrice = req.body.price;
  let addedDate = req.body.date;
  let counteryMade = req.body.country;
  let status = req.body.status;
  let itemPhoto = "/itemImages/"+req.file.originalname;
  let userId = req.session.user._id;
  let catId = req.body.parentItems;
  let item = new Item({
    itemName : itemName,
    itemPrice : itemPrice,
    addedDate : addedDate,
    counteryMade : counteryMade,
    status : status,
    itemPhoto : itemPhoto,
    userId : userId,
    catId : catId,
  });
  item.save().then((resault)=>{
    res.redirect("/index");
  }).catch((err)=>{
    console.log(err);
  });
});
router.get('/deleteItem/:itemId', function(req, res, next) {
  let itemId = req.params.itemId;
  let deleteItem = {
  itemActive : 0,
  };
  Item.updateOne({_id : itemId},{$set : deleteItem})
  .then((resault)=>{
    res.redirect("/index");
  })
  .catch((err)=>{
    console.log(err)
  });
  });
  router.get("/editItem/:itemId",function(req,res,next){
    let itemId = req.params.itemId;
    Item.find({_id : itemId,itemActive:1}).then((resault)=>{
      let newItem ;
      let likedNew ;
      let used ;
      let veryUsed ;
      if(resault[0].status == 0)
        {
          newItem = 0;
        }
        else if(resault[0].status == 1)
          {
            likedNew = 1;
          }
        else if(resault[0].status == 2)
          {
            used = 2;
          }
          else{
            veryUsed = 3;
          }
          Catogary.find({catActive:1}).then((resaults)=>{
            let selectedCat;
            for(let x = 0 ; x < resaults.length;x++)
              {
                if(resault[0].catId.toString() == resaults[x]._id.toString())
                  {
                    selectedCat = resault[0].catId.toString();
                  }else{
                    selectedCat = null;
                  }
              }
            res.render("editItem",{title : 'E Commerce Shop',itemId : resault[0]._id,itemName : resault[0].itemName,itemPrice : resault[0].itemPrice ,addedDate : resault[0].addedDate,countryMade : resault[0].counteryMade,newItem:newItem,likedNew:likedNew,used:used,veryUsed : veryUsed,cat : resaults,selectedCat : selectedCat,userName : req.session.user.usreName });
          }).catch((err)=>{
            console.log(err);
          });
      
    }).catch((err)=>{
      console.log(err);
    });
  });
  router.post('/editItem',function(req, res, next) {
    let itemId = req.body.itemId;
    let itemName =  req.body.itemName;
    let itemPrice = req.body.price;
    let addedDate = req.body.date;
    let counteryMade = req.body.country;
    let status = req.body.status;
    let userId = req.session.user._id;
    let catId = req.body.parentItems;
    let item =  {
      itemName : itemName,
      itemPrice : itemPrice,
      addedDate : addedDate,
      counteryMade : counteryMade,
      status : status,
      userId : userId,
      catId : catId,
    };
    Item.updateOne({_id : itemId},{$set : item}).then((resault)=>{
      res.redirect("/index");
    }).catch((err)=>{
      console.log(err);
    });
  });

  router.get('/members', function(req, res, next) {
    Member.find({userActive : 1}).then((resault)=>{
            res.render('members', { title: 'E Commerce Shop' ,resault : resault,userName : req.session.user.usreName });
    })
    .catch((err)=>{
      console.log(err);
    });
  });
  router.get('/deleteMember/:memberId', function(req, res, next) {
    let memberId = req.params.memberId;
    let deleteMember = {
      userActive : 0,
    };
    Member.updateOne({_id : memberId},{$set : deleteMember})
    .then((resault)=>{
      res.redirect("/index");
    })
    .catch((err)=>{
      console.log(err);
    });
  });
  router.get("/editMember/:memberId",function(req,res,next){
    let memberId = req.params.memberId;
    Member.find({_id : memberId,userActive:1}).then((resault)=>{
            res.render("editMember",{title : 'E Commerce Shop',memberId : resault[0]._id,userName : resault[0].usreName,password : resault[0].password,email:resault[0].email,user : resault[0].userType == 'User'? 'User' : null,admin : resault[0].userType == 'Admin'? 'Admin' : null,userName : req.session.user.usreName });
          }).catch((err)=>{
            console.log(err);
          });
  });

  router.post('/editMember',function(req, res, next) {
    let memberId = req.body.userId;
    let userName =  req.body.username;
    let password = req.body.password;
    let fullName = req.body.fullname;
    let email = req.body.email;
    let hireDate = req.body.hiredate;
    let userType = req.body.usertype;
    let member = {
      usreName :userName,
      password : password,
      fullName : fullName,
      email:email,
      hireDate:hireDate,
      userType: userType
    };
    Member.updateOne({_id : memberId},{$set : member}).then((resault)=>{
      console.log(resault);
      res.redirect("/");
    }).catch((err)=>{
      console.log(err);
    });
  });
  router.get('/comments', function(req, res, next) {
    comments.find({commentActive : 1}).populate("userId").populate("itemId").then((resault)=>{
      res.render('comments', { title: 'E Commerce Shop',resault : resault,userName : req.session.user.usreName  });
    })
    .catch((err)=>{
      console.log(err);
    });
  });

  router.get('/deleteComment/:commentId', function(req, res, next) {
    let commentId = req.params.commentId;
    let deleteComment = {
      commentActive : 0,
    };
    Comment.updateOne({_id : commentId,commentActive:1},{$set : deleteComment})
    .then((resault)=>{
      res.redirect("/index");
    })
    .catch((err)=>{
      console.log(err);
    });
  });

  router.get('/approvement/:commentId', function(req, res, next) {
    let commentId = req.params.commentId;
    Comment.find({_id : commentId,commentActive:1})
    .then((resault)=>{
      if(resault[0].status == "Approve")
        {
          let approvement = {
            status : "Not Approve",
          };
          Comment.updateOne({_id : commentId},{$set : approvement})
          .then((resault)=>{
            res.redirect("/index");
          })
          .catch((err)=>{
            console.log(err);
          });
        }else{
          let approvement = {
            status : "Approve",
          };
          Comment.updateOne({_id : commentId},{$set : approvement})
          .then((resault)=>{
            res.redirect("/index");
          })
          .catch((err)=>{
            console.log(err);
          });
        }
    }).catch((err)=>{
      console.log(err);
    });
    
  });

  router.get("/editComment/:commentId",function(req,res,next){
    let commentId = req.params.commentId;
    Comment.find({_id : commentId,commentActive:1}).then((resault)=>{
            res.render("editComment",{title : 'E Commerce Shop',commentId : resault[0]._id,comment : resault[0].comment,userName : req.session.user.usreName });
          }).catch((err)=>{
            console.log(err);
          });
  });
  router.post("/editComment",function(req,res,next){
    let commentId = req.body.commentId;
    let comment   = req.body.comment;
    let editComment = {
      comment : comment
    };
    Comment.updateOne({_id : commentId},{$set : editComment})
    .then((resault)=>{
      res.redirect("/index");
    }).catch((err)=>{
      console.log(err);
    });
  });
module.exports = router;
