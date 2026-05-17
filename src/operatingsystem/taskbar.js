
    // elements
const time = document.getElementById("localTime")
    // on load
timeSet()
    // time setter & refresher
function timeSet() {
    let date = new Date();
    time.innerHTML = date.toLocaleTimeString();
}
setInterval(() => {
    timeSet()
}, 1000);