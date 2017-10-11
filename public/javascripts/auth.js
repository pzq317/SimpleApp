/**
 * Created by pzq317 on 25/09/2017.
 */
/**
 * Created by pzq317 on 22/09/2017.
 */
//                       firebase admin SDk





var type = 0;
//authencation

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $("#signupBtn").hide();
        $("#loginBtn").hide();
        $("#signoutBtn").show();
        $("#drawer").show();

        if(type==2) {
            var dialog = document.querySelector('#Sdialog');

            $("#signupError").hide()
            $("#semail").val('');
            $("#spassword").val('');
            $("#stel").val('');
            $("#sname").val('');
            $("#SarrowBtn").show();
            $("#Sloading").hide();
            dialog.close();
        }
        if(type == 1) {
            var dialog = document.querySelector('#Ldialog');

            //$("#email").reset();
            //$("#password").reset();
            $("#loginError").hide()
            $(".login").each(function () {
                this.reset();
            });
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
    var name = document.getElementById("sname").value;
    var tel = document.getElementById("stel").value;
    //fire.update({"name":name});
    console.log("email"+email+"\n"+"password"+password);
    $("#SarrowBtn").hide();
    $("#Sloading").show();
    //pass to server
    $.ajax({
        type: 'POST',
        data: {"email":email,"password":password,"name":name,"tel":tel},
        url: '/endpoint',
        success: function(data) {
            console.log('success');
            //console.log(JSON.stringify(data));
            if(data.state =="correct"){
                console.log(data.name,data.uid);

                /*put uid in to database*/
                var fire = firebase.database().ref(data.uid);
                fire.set({"uid":data.uid,"name":data.name});

                /*Signin*/
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
            }
            else {
                $("#signupError").show().text(data);
                $("#SarrowBtn").show();
                $("#Sloading").hide();
            }
        }

    });

        /*       Sign in with Email and password*/
        /*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#signupError").show().text(errorMessage);
            $("#SarrowBtn").show();
            $("#Sloading").hide();
            // ...
        });*/
});
$('#signoutBtn').click(function () {
    firebase.auth().signOut().then(function() {
        type = 0;
    }).catch(function(error) {
        // An error happened.
    });

});

