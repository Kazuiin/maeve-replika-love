// time setter & refresher
let time = document.getElementById("localTime")
timeSet()
    function timeSet() {
        let date = new Date();
        time.innerHTML = date.toLocaleTimeString();
    }
    setInterval(() => {
        timeSet()
    }, 1000);
//window manager
const dragWM = document.querySelectorAll(".dragWM");
const closeWndw = document.querySelectorAll(".closeWndw");
const desktopWndw = document.querySelectorAll(".desktopWndw")
const shortcut = document.querySelectorAll(".shortcut")
    // window dragging titlebar
    dragWM.forEach((dragWM) => {
        let startX = 0;
        let startY = 0;
        const mousePos = (e) => {
            startY = startY + e.movementY
            startX = startX + e.movementX
            dragWM.parentElement.style.top = startY + "px";
            dragWM.parentElement.style.left = startX + "px";
            };

            dragWM.addEventListener("mousedown", () => {
                startX = dragWM.parentElement.getBoundingClientRect().left;
                startY = dragWM.parentElement.getBoundingClientRect().top;
                if (isNaN(startX)) startX = 0;
                if (isNaN(startY)) startY = 0;
                window.addEventListener("mousemove", mousePos);
            });

            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", mousePos);
            });
    });
    // window open shortcut
    shortcut.forEach((shortcut) => {
        const wndw = shortcut.getAttribute("wndw")
        shortcut.addEventListener("mousedown", () => {
            desktopWndw.forEach((desktopWndw) => {
                desktopWndw.style.display = "flex";
            });
        });
    });
    // window close titlebar
    desktopWndw.forEach((desktopWndw) => {
        const closeWndw = desktopWndw.querySelector(".closeWndw");
         closeWndw.addEventListener("mousedown", () => {
                desktopWndw.style.display = "none";
            });
    });


                