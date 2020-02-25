
const app = {
    initialize: function() {
        document.addEventListener("deviceready", () => { this.onDeviceReady(); });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        const elementRect = document.getElementById("game").getBoundingClientRect();
        console.log("Width: " + elementRect.width + "px");
        console.log("Height: " + elementRect.height + "px");
        game.start({
            parent: "game",
            width: elementRect.width,
            height: elementRect.height
        });
    },
};

app.initialize();