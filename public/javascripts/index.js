/**
 * Created by pzq317 on 21/09/2017.
 */

//var textv = document.getElementById("text");
//var submitBtn = document.getElementById("submitbtn");
//var heading = document.getElementById("heading");

var fb = firebase.database().ref()
//var fc = firebase.database().ref().child("name")
//fb.on('value',function (snapshot) {
//    heading.innerText = snapshot.val()
//    console.log(heading.innerText)
//})

fb.on('value',function (snapshot) {
     console.log("test",snapshot.val())

})

//fc.on('value',function (snapshot) {
//    heading.innerText = snapshot.val().name

//})

function submit(){

    //window.alert("HIHI")
    var databaseRef = firebase.database().ref();

    var maintext = textv.value;
    firebase.database().ref("name").update({name:maintext});
    //databaseRef.push().set(maintext);
    //var fb = firebase.database().ref().child("heading")
    //console.log(heading.innertext)
    //fb.on('value',function (snapshot) {
    //    heading.innertext = snapshot.val()
    //    console.log(heading.innertext)
    //})

}

function writeUserData(userId, name, email) {
    firebase.database().ref("users/" + userId).set({
        username: name,
        email: email
    });
}

function updateUserData(userId, phone) {
    firebase.database().ref("users/"+userId).update({
        phone: phone
    });
}