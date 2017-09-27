/**
 * Created by pzq317 on 25/09/2017.
 */
/**
 * Created by pzq317 on 22/09/2017.
 */
var username =  document.getElementById("username");

var fire = firebase.database().ref("user");

fire.on('value', function(snapshot){
    console.log(snapshot.val())
    username.innerText ="Hello, " + snapshot.val().name
});

var type = 0
//authencation

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $("#signupBtn").hide();
        $("#loginBtn").hide();
        $("#signoutBtn").show();
        $("#drawer").show();

        if(type==2) {
            var dialog = document.querySelector('#Sdialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            $("#semail").val('');
            $("#spassword").val('');
            $("#SarrowBtn").show();
            $("#Sloading").hide();
            dialog.close();
        }
        if(type == 1) {
            var dialog = document.querySelector('#Ldialog');
            if (!dialog.showModal) {
                dialogPolyfill.registerDialog(dialog);
            }
            $("#email").val('');
            $("#password").val('');
            $("#LarrowBtn").show();
            $("#Lloading").hide();
            dialog.close();
        }

    } else {



        $("#signupBtn").show();
        $("#loginBtn").show();
        $("#signoutBtn").hide();
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
$('#SarrowBtn').click(function(){
    var email = document.getElementById("semail").value;
    var password = document.getElementById("spassword").value;
    //var name = document.getElementById("sname").value;
    //fire.update({"name":name});
    console.log("email"+email+"\n"+"password"+password);

    if(email!="" && password!=""){
        $("#SarrowBtn").hide();
        $("#Sloading").show();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#signupError").show().text(errorMessage);
            $("#SarrowBtn").show();
            $("#Sloading").hide();
            // ...
        });

    }
});
$('#signoutBtn').click(function () {
    firebase.auth().signOut().then(function() {
        type = 0;
    }).catch(function(error) {
        // An error happened.
    });

});

