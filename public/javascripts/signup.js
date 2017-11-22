/**
 * Created by pzq317 on 24/10/2017.
 */
var type = 0;
//authencation
var userid = "";
var name = "";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userid = user.uid;
        name = user.displayName;
        window.location.replace("http://localhost:3000/menu")

    } else {
        name = "";
        userid = "";
        $("#login").show();
    }
});
$("#loginBtn").click(function () {

    var dialog = document.querySelector('#Ldialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    type = 1;
});
$("#signupBtn").click(function () {

    var dialog = document.querySelector('#Sdialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    type = 2;
});
$('#LarrowBtn').click(function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log("email"+email+"\n"+"password"+password);

    if(email!="" && password!=""){
        $("#LarrowBtn").hide();
        $("#Lloading").show();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#loginError").show().text(errorMessage);
            $("#LarrowBtn").show();
            $("#Lloading").hide();
            // ...
        });
    }
});
$('#submit').click(function() {


    var email = document.getElementById("email").value;
    var password = document.getElementById("repassword").value;
    var name = document.getElementById("name").value;
    var tel = document.getElementById("tel").value;
    var studentID = document.getElementById("studentID").value;
    var major = document.getElementById("major").value;
    var classinfo = document.getElementById("classinfo").value;
    var year = document.getElementById("year").value;
    var gender = document.getElementById("gender").value;
    var skill = document.getElementById("skill").value;
    var interestedfield = document.getElementById("interestedfield").value;
    var preference = document.getElementById("preference").value;
    console.log("email"+email+"\n"+"password"+password,tel, gender,year);

    //pass to server
    $.ajax({
        type: 'POST',
        data: {"email":email,"password":password,"name":name,"tel":tel,"studentID":studentID,"major":major,
        "classinfo":classinfo,"year":year,"gender":gender,"skill":skill,"interestedfield":interestedfield,"preference":preference},
        url: '/end',
        success: function(data) {
            console.log('success');
            //console.log(JSON.stringify(data));
            if(data.state =="correct"){
                /*put uid in to database*/
                var fire = firebase.database().ref(data.uid);
                fire.set({"uid":data.uid,"name":data.name,"tel":tel,"major":major,"year":year,"gender":gender,"skill":skill, "interestedfield":interestedfield,"preference":preference,"friend_num":0});
                console.log("input success");
                /*Signin*/
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

                //window.location  = "http://localhost:3000/menu";
            }
            else {
                $("#signupError").show().text(data);
            }
        }

    });

});

/*$('#signoutBtn').click(function () {
    firebase.auth().signOut().then(function() {
        type = 0;
    }).catch(function(error) {
        // An error happened.
    });

});*/
//$('#whole_page');