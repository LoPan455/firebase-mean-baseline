var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert('./server/firebase-service-account.json'),
  databaseURL: "https://phi-firebase-more-practice.firebaseio.com"
});

router.get('/',function(req,res){
  console.log(req.headers.id_token);
  admin.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken){
    // NOW the user has been fully authenticated on our backend.
    var dataString = "SECRET DATA!!! YOU GOT IT!!" + decodedToken.name;
    res.send({someString: dataString});
  })
  .catch(function(error){
    res.send("No Secret DATA FOR YOU!");
  });
});

module.exports = router;
