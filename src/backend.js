var express = require('express');
var app = express();
var router=express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');


var cookieParser = require('cookie-parser');
app.use(cookieParser());
var cookies=require('cookies');

const bcrypt = require('bcrypt');
const saltRounds = 10;
// const JWT= require('jsonwebtoken');
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
  }));
  
  app.use(bodyParser.json());


  const User =require('./models/user_model');
  const Feedback =require('./models/feedback_model');


  const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://vaibhav:vaibhav@cluster0-rwiul.mongodb.net/Braven?retryWrites=true&w=majority', {useNewUrlParser: true ,useUnifiedTopology: true })
.then(result => {
  console.log("connected to mongo");
})
.catch(err =>{
  console.log(err);
});

app.post('/login',function(req,res){

    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
  
    User.findOne({email:req.body.email},function(err,doc){  
      if(doc)
      {
  
        console.log("doc found");
        
        bcrypt.compare(req.body.password, doc.password, function(err, res1) {
          // res == true
  
          if(res1==true){
            res.cookie('email',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            // res.cookie('user_type',doc.user_type,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(doc));
    console.log("logged in");
    console.log( doc.user_type);
    console.log(req.session.user);
    console.log(req.session.id);
          }
          else{
            
    console.log("incorrect password");
            res.send({
              "code":204,
              "success":"Email and password does not match"
                });
          }
  
      });
  
      }else{
  
        console.log("No user found");
        res.send("no user");
      }
  
  
    });
});



app.post('/signup',function(req,res){

  console.log("Inside Signup Post Request");
  console.log("Req Body : ",req.body);

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          const user=new User({

            _id: new mongoose.Types.ObjectId(),
            email:req.body.email,
            name:req.body.name,
            password:hash,
            user_type:"",
            major:"",
            position:"",
            careerIntersts:"",
            skills:"",
            phone:"",
            about_me:"",
            city:"",
            country:"",
            company:"",
            school:"",
            gender:"",
            companySize:0


          });
          user.save().then(resul =>{
            console.log(resul);

            res.cookie('email',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            res.send({
              "code":204,
              "success":"Email and password does not match"
                });

          })
          .catch(err => {
            console.log(err);
           
          
          });

  console.log("user inserted in table");

        });
});



app.post('/feedback',function(req,res){

  console.log("Inside feedback Post Request");
  console.log("Req Body : ",req.body);

  
          const feedback=new Feedback({

            _id: new mongoose.Types.ObjectId(),
            userId:req.body.userId,
            speakRating:req.body.speakRating,
            eyeContactRating:req.body.eyeContactRating,
            solidHandshakeRating:req.body.solidHandshakeRating,
            bodyLanguageRating:req.body.bodyLanguageRating,
            relevantRating:req.body.relevantRating,
            skillsRating:req.body.skillsRating,
            clearRating:req.body.clearRating,
            compellingRating:req.body.compellingRating,
            confidentRating:req.body.confidentRating,
            connectionRating:req.body.connectionRating,
            additionalComments:req.body.comment


          });
          feedback.save().then(resul =>{
            console.log(resul);

            res.send({
              "code":204,
              "success":"feedback sent"
                });

          })
          .catch(err => {
            console.log(err);
            res.send({
              "code":404,
              "success":"feedback not sent"
                });
          
          });

  console.log("feedback inserted in table");


});

app.get('/seeFeedback',function(req,res){

  console.log("Inside feedback get Request");
  // console.log("Req Body : ",req.body);

  Feedback.find({_id:"5dbe7e7ec54202d930e2460e"},function(err,doc){  
    if(doc)
    {

      console.log("doc found");
      console.log(doc);
      
     
res.send(doc);
    }else{

      console.log("No doc found");
      res.send("no doc");
    }


  });
});



app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;


