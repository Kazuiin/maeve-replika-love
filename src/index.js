console.log("              {零}")
console.log("THIS SPACE INTENTIONALLY LEFT BLANK.")

function clamp(num, min, max) {
        const lowLim = Math.max(num, min)
        const result = Math.min(lowLim, max)
        return result
    };

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
const albumCover = document.querySelectorAll(".albumCover")
    // window dragging titlebar
    dragWM.forEach((dragWM) => {
        let startX = 0;
        let startY = 0;
        const mousePos = (e) => {
            startY = clamp(startY + e.movementY, 0, window.innerWidth * 0.25)
            startX = clamp(startX + e.movementX, 0, window.innerHeight)
            dragWM.parentElement.style.top = startY + "px";
            dragWM.parentElement.style.left = startX + "px";
            console.log(startX, "x")
            console.log(startY, "y")

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
        const btnwndw = shortcut.getAttribute("wndw")
        shortcut.addEventListener("mousedown", () => {
            if (document.getElementById(btnwndw).style.display == "none") {
                document.getElementById(btnwndw).style.top = "calc(50% - (36rem * 0.5))"
                document.getElementById(btnwndw).style.left= "calc(50% - (64rem * 0.5))"
            }
            document.getElementById(btnwndw).style.display = "flex";
        });
    });
    // window close titlebar
    desktopWndw.forEach((desktopWndw) => {
        const closeWndw = desktopWndw.querySelector(".closeWndw");
         closeWndw.addEventListener("mouseup", () => {
                desktopWndw.style.display = "none";
            });
    });
