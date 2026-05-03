// time setter & refresher
const time = document.getElementById("localTime")
timeSet()
    function timeSet() {
        let date = new Date();
        time.innerHTML = date.toLocaleTimeString();
    }
    setInterval(() => {
        timeSet()
    }, 1000);