/**
 * Created by pzq317 on 16/11/2017.
 */
var ref = firebase.database().ref();
var sort = firebase.database().ref();
var ourname = "";
var othername = "";
var ids = [];
var ourid = "";
var otherid = "";
//for(i=0;i<3;i++){
var i = 1
    ref.orderByChild("friend_num").equalTo(i).once("value", function(snapshot) {
        if(snapshot.val()) {
            console.log(snapshot.key, Object.keys(snapshot.val()));

            for (j = 0; j <Object.keys(snapshot.val()).length;j+=2) {
                if(snapshot.val()[Object.keys(snapshot.val())[j+1]]){
                    ourname = snapshot.val()[Object.keys(snapshot.val())[j]]["name"];
                    othername = snapshot.val()[Object.keys(snapshot.val())[j+1]]["name"];
                    ourid = Object.keys(snapshot.val())[j];
                    otherid  = Object.keys(snapshot.val())[j+1];

                    sort.child(ourid).child("friends").child(othername).set(true);
                    sort.child(otherid).child("friends").child(ourname).set(true);

                    sort.child(ourid).child("friend_num").set(i+1);
                    sort.child(otherid).child("friend_num").set(i+1);
                    console.log(ourname,othername,ourid,otherid)
                }/*else{
                    if(i<2) {
                        ourname = snapshot.val()[Object.keys(snapshot.val())[j]]["name"];
                        othername = snapshot.val()[Object.keys(snapshot.val())[0]]["name"];
                        ourid = Object.keys(snapshot.val())[j];
                        otherid = Object.keys(snapshot.val())[0];
                        console.log(ourname,othername,ourid,otherid)
                        /*sort.child(ourid).child("friends").child(othername).set(true);
                        sort.child(otherid).child("friends").child(ourname).set(true);

                        sort.child(ourid).child("friend_num").set(i + 1);
                        sort.child(otherid).child("friend_num").set(i + 2);*/
                    /*}

                }*/
            }
        }
    });
//}





