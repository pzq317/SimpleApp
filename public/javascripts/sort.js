/**
 * Created by pzq317 on 16/11/2017.
 */
var ref = firebase.database().ref();
var sort = firebase.database().ref();
var ourname = "";
var othername = "";
var ourid = "";
var otherid = "";
var whosearch = "";
var searchlist = [];
var i = 0;


$('#sortBtn').click(function () {
    sorted(0);
});


function sorted(i) {
    ref.orderByChild("friend_num").equalTo(i).once("value", function (snapshot) {
        if (snapshot.val()) {
            console.log(snapshot.val(), Object.keys(snapshot.val()));
            findPair(Object.keys(snapshot.val()));
            function findPair(array) {
                console.log(array);
                var arr = array.slice(0);
                whosearch = array[0];
                searchlist = array;
                searchlist.splice(0, 1);
                console.log(i);
                if (i == 0) {
                    for (j = 0; j < Object.keys(snapshot.val()).length; j += 2) {
                        if (snapshot.val()[Object.keys(snapshot.val())[j + 1]]) {
                            ourname = snapshot.val()[Object.keys(snapshot.val())[j]]["name"];
                            othername = snapshot.val()[Object.keys(snapshot.val())[j + 1]]["name"];
                            ourid = Object.keys(snapshot.val())[j];
                            otherid = Object.keys(snapshot.val())[j + 1];

                            sort.child(ourid).child("friends").child(othername).set(true);
                            sort.child(otherid).child("friends").child(ourname).set(true);

                            sort.child(ourid).child("friend_num").set(i + 1);
                            sort.child(otherid).child("friend_num").set(i + 1);
                        }
                    }
                    sorted(i+1)
                }
                else {
                    for (var fri = 0; fri < searchlist.length; fri += 1) {
                        if (Object.keys(snapshot.val()[searchlist[fri]]["friends"]).includes(snapshot.val()[whosearch]["name"]) != true) {
                            sort.child(whosearch).child("friends").child(snapshot.val()[searchlist[fri]]["name"]).set(true);
                            sort.child(searchlist[fri]).child("friends").child(snapshot.val()[whosearch]["name"]).set(true);

                            sort.child(whosearch).child("friend_num").set(snapshot.val()[searchlist[fri]]["friend_num"] + 1);
                            sort.child(searchlist[fri]).child("friend_num").set(snapshot.val()[whosearch]["friend_num"] + 1);
                            console.log(whosearch, searchlist[fri]);


                            var index1 = arr.indexOf(whosearch);
                            var index2 = arr.indexOf(searchlist[fri]);

                            arr.splice(index1, 1);
                            arr.splice(index2 - 1, 1);
                            console.log(index1, index2);
                            findPair(arr);
                            break;
                        }
                    }
                }
            }

        }
    });
}






