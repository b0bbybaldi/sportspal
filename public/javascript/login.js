function Login() {

    var userId = 0;
    this.userId = userId;

    var visible = true;

    var container = $("<div id='login'>").addClass("uk-container uk-padding animated fadeIn");
    container.css("z-index", 2);
    container.css("width", $(window).width() / 3);
    container.css("position", "absolute").css("left", $(window).width() / 2 - container.width() / 2);
    container.css("top", 200).css("max-width", 450);

    var header = $("<h2>").css("text-align", "center").text("Sports Pal");
    var form = $("<form>").addClass();
    var username = $("<input>").addClass("uk-input").attr("placeholder", "Enter username");
    var margin1 = $("<div>").addClass("uk-margin");
    margin1.append(username)
    var password = $("<input>").addClass("uk-input").attr("placeholder", "Enter password...").attr("type", "password");
    var margin2 = $("<div>").addClass("uk-margin");
    margin2.append(password);
    var submit = $("<button>").addClass("uk-button uk-button-primary");
    submit.addClass("uk-button").css("height", 50).css("width", 200).css("background-color", "#4796EC");
    submit.text("Login/Register").attr("type", "submit");
    var margin3 = $("<div>").addClass("uk-margin");
    margin3.append(submit);
    var warning = $("<p>").addClass("uk-text-danger");



    form.append(margin1, margin2, margin3);
    container.append(header, form, warning);
    $("body").append(container);


    submit.click(function(event){
        event.preventDefault();
        var userInput = username.val();
        var passwordInput = password.val();
        if(passwordInput.length < 5){
            warning.text("Password must be at least 5 characters long.");
            return;
        }
        console.log('submit fired');
        $.ajax({
            url: "/api/login",
            data: {name: userInput, password: passwordInput},
            type: "POST"
        }).then( function (response) {
            userId = response.id;
            console.log('toggling display');
            $("#login").css("display", "none");
            $("#main-content").css("display", "block");
        });
    });

    this.setWarning = setWarning;
    function setWarning(msg){
        warning.text(msg);
        warning.fadeIn('slow', function(){});
    }
    
}