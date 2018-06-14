// =====================================
// Firebase
// =====================================
function Firebase(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA1nuKcMwAYWDtk8IZrbCz1AEe0-b_28c4",
        authDomain: "rock-paper-scissors-60a79.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-60a79.firebaseio.com",
        projectId: "rock-paper-scissors-60a79",
        storageBucket: "rock-paper-scissors-60a79.appspot.com",
        messagingSenderId: "391371446537"
    };
    firebase.initializeApp(config);

    var db = firebase.database();
    this.db = db;

    var chatroom;
    this.setChatroom = function (_chatroom) {
        chatroom = _chatroom;
    }

    // Add new chatroom messages.
    db.ref("/chatroom").on('child_added', function(snapshot){
        var val = snapshot.val();
        var username = val.username, message = val.message;
        chatroom.addMessage(username, message);
    });


    this.sendMessage = sendMessage
    function sendMessage(username, message){
        db.ref("/chatroom").push({username : username, message : message});
    }

}