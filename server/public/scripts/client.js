var app = angular.module('app', ['firebase']); // inject the entire Firebase dependency

app.controller('FirstController', function($firebaseAuth, $http) { // enable Firebase Auth and http
  console.log('FirstController up and running');
  var self = this;
  self.message = "Welcome!"

  var auth = $firebaseAuth();

self.logIn = function(){
  // the auth.$signInWithPopUp is a 'promise', after .then() is a 'callback'
  auth.$signInWithPopup('google').then(function(firebaseUser){ // which OAuth provider do you want? This is setup in the Firebase portal
    console.log('Firebase authenticated user as: ',firebaseUser.user);
  }).catch(function(error){
    console.log('Error with auth: ',error);
  });
} // end logIn()


//here we are sending the token to the backend
auth.$onAuthStateChanged(function(firebaseUser){
  if(firebaseUser){ // if the object exists...aka. "true"
    firebaseUser.getToken().then(function(idToken){

      $http({
        method: 'GET',
        url: '/privateData',
        headers: {
          id_token: idToken
        }
      }).then(function(response){
        self.secretData = response.data;
      }); // end http
    });//end getToken().then()
  } else {
    console.log('Not logged in or not authorized');
    self.secretData = "Log in to get some secret data"

  } // end else
}); // end $onAuthStateChanged



self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging out the user, they will no longer be authenticated');
    })
} // end logOut()


});
