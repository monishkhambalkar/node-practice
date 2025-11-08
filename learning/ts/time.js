var timer;
timer = setInterval(function () {
    var currentTIme = new Date().toLocaleDateString();
    console.log("Current time ", currentTIme);
}, 2000);
