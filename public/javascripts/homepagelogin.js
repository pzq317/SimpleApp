/**
 * Created by pzq317 on 07/11/2017.
 */
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

$("#login").click(function () {

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