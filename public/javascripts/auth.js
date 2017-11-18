/**
 * Created by pzq317 on 25/09/2017.
 */
var type = 0;
//authencation
var userid = "";
var name = "";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userid = user.uid;
        name = user.displayName;
        $("#signupBtn").hide();
        $("#loginBtn").hide();
        $("#signoutBtn").show();
        $("#invite-box").show();
        $("#drawer").show();
        if(type == 1) {
            var dialog = document.querySelector('#Ldialog');
            $("#loginError").hide()
            $(".login").each(function () {
                this.reset();
            });
            $("#LarrowBtn").show();
            $("#Lloading").hide();
            dialog.close();
        }

    } else {
        name = "";
        userid = "";
        $("#signoutBtn").hide();
        $("#invite-box").hide();

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

$('#signoutBtn').click(function () {
    firebase.auth().signOut().then(function() {
        var dialog = document.querySelector('#Ldialog');
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        type = 1;
    }).catch(function(error) {
        // An error happened.
    });

});











