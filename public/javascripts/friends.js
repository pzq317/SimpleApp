/*
 * Created by pzq317 on 19/10/2017.
 */
var fb = firebase.database().ref();

var name = "";
var userid = "";
var friend_num =0;
fb.on('child_added',function (snapshot) {
    var data = snapshot.val();
    console.log(data);
    var enter = document.createElement('br');
    var flag = document.createElement('div');
    flag.className = "flag pam";
    var pic = document.createElement('div');
    pic.className = "flag--image prm";
    var img = document.createElement("img");
    img.src = "../assets/45.jpeg";
    img.className ="irm";

    pic.appendChild(img);

    var tname = document.createElement('div');
    tname.className ="fw-semibold f1 db nam";
    tname.innerText = data.name;
    var time = document.createElement('time');
    time.className = "db f6 text-color-2 time";
    time.innerText = data.uid
    var footer = document.createElement('footer');
    footer.className="clear phm ptm mbm border-top border--3";
    var invite_icon = document.createElement('span');
    invite_icon.className='dib mrs icon-utility-groups f1 send_message';
    invite_icon.id = data.uid;

    invite_icon.onclick = function get_uid() {
        console.log(this.id);
        chatWithWhom(this.id)
    };

    
    footer.appendChild(invite_icon);

    flag.appendChild(pic);

    var friend_box = document.createElement('action');
    friend_box.id = data.uid;
    friend_box.className = 'mam bg-1 brm border border--9';
    friend_box.appendChild(flag);
    friend_box.appendChild(tname);
    friend_box.appendChild(time);
    friend_box.appendChild(footer);
    document.getElementById('scroller').appendChild(friend_box);

    document.getElementById(data.uid).appendChild(enter);
});

function chatWithWhom(id){
    if(friend_num>=3) {
        alert("your reach your member limit");
    }else{
        fb.child(id).child("who invite me").child(name).set(userid);
        console.log(userid + " is sending to " + id);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userid = user.uid;
        name = user.displayName;
        check_invitation();
        check_friends();
        friend_num = 0;
        firebase.database().ref().child(userid).child("friends").on('value',function (snap) {
            if(snap.val()) {
                friend_num = Object.keys(snap.val()).length;
                console.log("friends", friend_num)
            }
        });
    }else{
        name = "";
        userid = "";
        friend_num = 0;
    }
});



function check_invitation() {
    fb.child(userid).child("who invite me").on('value', function (snapchat) {
        var num = snapchat.val();
        //console.log(Object.values(num));
        $(".drop").remove();
        if(num == null){
            $('#invite-box').attr("data-badge", "0");
        }else {
            for (i = 0; i < Object.keys(num).length; i++) {
                var drop = document.createElement('a');
                console.log(num[Object.keys(num)[i]]);
                drop.className = "drop";
                drop.innerText = Object.keys(num)[i];
                var inviteBtn = document.createElement('button');
                inviteBtn.id = Object.keys(num)[i];
                inviteBtn.className = 'mdl-button mdl-js-button mdl-button--raised';
                inviteBtn.attr = Object.values(num)[i];
                inviteBtn.innerText = "confirm";
                inviteBtn.onclick = function make_friends() {
                    confirm(this);
                };
                drop.appendChild(inviteBtn);
                document.getElementById("myDropdown").appendChild(drop)
            }
            $('#invite-box').attr("data-badge", Object.keys(num).length);
        }
    });
}

function confirm(data){
    console.log(name,data.id,data.className,data.attr);
    var other_friend_num = 0;
    firebase.database().ref().child(data.attr).child("friends").on('value',function (snap) {
        other_friend_num = Object.keys(snap.val()).length;
        console.log("other_friends",other_friend_num)
    });
    if(other_friend_num>=3) {
        alert("the inviter had reach their member limit");
        $('#'+data.id).remove();
    }else{
        fb.child(userid).child("friends").child(data.id).set(true);
        fb.child(userid).child("who invite me").child(data.id).remove();
        fb.child(data.attr).child("friends").child(name).set(true);
        fb.child(userid).child("friend_num").set(friend_num+1);
        fb.child(data.attr).child("friend_num").set(other_friend_num+1);
    }


    check_invitation();
    check_friends()
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

}
function check_friends() {
    $(".friends").remove();
    firebase.database().ref().child(userid).child("friends").on('value',function (snap) {
        var data = snap.val();
        if(data){
            for (i = 0; i < Object.keys(data).length; i++) {
                var friend_block = document.createElement('a');
                friend_block.className = "mdl-navigation__link friends";
                friend_block.innerText = Object.keys(data)[i];
                document.getElementsByClassName("mdl-navigation")[0].appendChild(friend_block);
                console.log("friends", snap.val());
            }
            friend_num = Object.keys(data).length;
            document.getElementsByClassName("friends_limit")[0].innerText = "members  " + friend_num + "/3";
        }else{
            document.getElementsByClassName("friends_limit")[0].innerText = "members  0/3";
        }


    });

}




