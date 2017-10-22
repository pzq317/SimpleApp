/**
 * Created by pzq317 on 19/10/2017.
 */
var fb = firebase.database().ref();

var name = "";
var userid = "";

/*fb.on('value',function (snapshot) {
    console.log("test",snapshot.val());
    for(var obj in snapshot.val()) {

        var friend_box = document.createElement('div');
        console.log(obj);
        console.log(fb.child(obj));
        friend_box.innerText = fb.child(obj);
        friend_box.className = "mdl-cell mdl-cell--4-col";
        document.getElementsByClassName('mdl-grid')[0].appendChild(friend_box);
    }
    //$(".mdl-cell mdl-c").append("<div>hi</div>")
});*/

fb.on('child_added',function (snapshot) {
    var data = snapshot.val();
    //snapshot.forEach(function (child) {
    //var data = child.val();
    var enter = document.createElement('br');
    console.log(data);
    var friend_box = document.createElement('div');
    friend_box.innerText = data.name + "\n" + data.uid;
    friend_box.id = data.uid;
    friend_box.className = 'mdl-cell mdl-cell--4-col';

    document.getElementsByClassName('mdl-grid')[0].appendChild(friend_box);

    //document.getElementsByClassName('mdl-grid')[0].appendChild(enter);


    //document.getElementsByClassName('mdl-grid')[0].appendChild(enter);
    document.getElementById(data.uid).appendChild(enter);


    var send_message = document.createElement('button');
    send_message.innerText = "Send Invitation";
    send_message.id = data.uid;
    send_message.className = "send_message";
    send_message.onclick = function get_uid() {
        console.log(this.id);
        chatWithWhom(this.id)
    };
    //send_message.appendChild(enter);

    document.getElementById(data.uid).appendChild(send_message);
    //}
//});
});
function chatWithWhom(id){
    //fb.child(id+"/who invite me")
    fb.child(id).child("who invite me").child(name).set(true);
    //fb.child(id).update({"who invite me ":userid});
    //fb.child(id).update({"invite":1});
    console.log(userid+" is sending to "+id)
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userid = user.uid;
        name = user.displayName;
        //firebase.database().ref(userid).child("who invite me").on('value',function (snapchat) {

        fb.child(userid).child("who invite me").on('value',function (snapchat) {
            console.log(snapchat.toJSON());
            var num = snapchat.val();
            console.log(Object.keys(snapchat.val()))
            /*snapchat.forEach(function (child) {
               console.log(child)
            });*/
            console.log(num);

            for (i=0;i<Object.keys(num).length;i++){
                var drop = document.createElement('a');
                console.log(Object.keys(num)[i]);
                drop.innerText = Object.keys(num)[i];
                var inviteBtn = document.createElement('button');
                inviteBtn.id="inviteBtn";
                inviteBtn.className = 'mdl-button mdl-js-button mdl-button--raised';
                inviteBtn.innerText = "confirm";
                drop.appendChild(inviteBtn);
                document.getElementById("myDropdown").appendChild(drop)
            }

            $('#invite-box').attr("data-badge",Object.keys(num).length);
            /*snapchat.forEach(function (child) {
                var drop = document.createElement('a');
                console.log(Object.keys(child));
                drop.innerText = Object.keys(child);
                document.getElementById("myDropdown").appendChild(drop)

            })*/
        });
    }else{
        name = "";
        userid = "";
    }
});

/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

}

$('#inviteBtn').click(function (data) {
    alert("click");
    console.log(data);
    fb.child(userid).child("friends").child(name).set(true);
});

// Close the dropdown menu if the user clicks outside of it
/*window.onclick = function(event) {
    if (!event.target.matches('#invite-box' || '#inviteBtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};*/



