/**
 * Created by pzq317 on 05/10/2017.
 */
var username =  document.getElementById("username");

var fire = firebase.database().ref("user");

/*fire.on('value', function(snapshot){
    console.log(snapshot.val());
    username.innerText ="Hello, " + snapshot.val().name
});*/
/*show name on the drawer*/
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.uid,user.displayName,user.email)
        username.innerText ="Hello, " +user.displayName
    }
});