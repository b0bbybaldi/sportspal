function Chatroom(_firebase, _username) {

    var firebase = _firebase;
    var username = _username;

    body = $("body");
    id = "sideCanvas";

    
    var content = $("<div>").addClass("uk-offcanvas-content");
    var toggleButton = $("<button>").attr("uk-toggle", "target: #" + id);
    toggleButton.addClass("uk-button").css("height", 50).css("width", 200).css("background-color", "#4796EC");
    var offCanvas = $("<div>").attr("id", id).attr("uk-offcanvas", "overlay: true");
    var bar = $("<div>").addClass("uk-offcanvas-bar")
    var canvasClose = $("<button uk-close>").addClass("uk-offcanvas-close uk-background-primary").attr("type", "button");
    var chatBox = $("<input>").addClass("uk-input").css("border", "1px solid #ccc").css("color", "#183446");
    var messages = $("<div>");
    toggleButton.addClass("uk-position-bottom-left uk-position-small");
    toggleButton.text("Chatroom");
    chatBox.css("margin-top", 25);
    bar.addClass("uk-background-muted uk-width-1-3");
    


    content.css("z-index", 1);

    bar.append(canvasClose, chatBox, messages);
    offCanvas.append(bar);
    content.append(toggleButton, offCanvas);
    body.append(content);


    $(chatBox).keypress(function(e) {
        if(e.which === 13 && chatBox.val().length > 0) {
           firebase.sendMessage(username, chatBox.val());
           chatBox.val("");
        }
    });

    // Display a new message when a user chats into the chatroom.
    this.addMessage = addMessage
    function addMessage(username, msg){
        var comment = $("<article>").addClass("uk-comment uk-comment-primary");
        comment.css("padding", 10);
        var name = $("<h4>").addClass("uk-comment-title").css("color", "#0892a5")
        var message = $("<div>").css("color", "#183446").addClass("uk-comment-body");
        name.css("font-family", "Helvetica Neue, Helvetica, Arial, sans-serif;").text(username);
        message.css("font-family", "Helvetica Neue, Helvetica, Arial, sans-serif;").text(msg);
        var item = $("<li>");
        comment.append(name, message);
        messages.prepend(comment);
    }

    this.hide = hide
    function hide(){
        content.hide();
    }

    this.show = show
    function show(){
        content.show();
    }

}