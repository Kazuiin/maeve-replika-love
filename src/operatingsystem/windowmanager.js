//window manager
const dragWM = document.querySelectorAll(".dragWM");
const closeWndw = document.querySelectorAll(".closeWndw");
const desktopWndw = document.querySelectorAll(".desktopWndw")
const shortcut = document.querySelectorAll(".shortcut")
const albumCover = document.querySelectorAll(".albumCover")
const dropdown = document.querySelectorAll(".dropdown")
const bodyBG = document.getElementById("everything")
    function clamp(num, min, max) {
            const lowLim = Math.max(num, min)
            const result = Math.min(lowLim, max)
            return result
    };
    // window dragging titlebar
    dragWM.forEach((dragWM) => {
        const windowElement = dragWM.parentElement;
        dragWM.innerHTML = `<span class="lineContainer">
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                            </span>
                            <div class="titlecontainer">` 
                                +
                                windowElement.getAttribute("window")
                                +
                            `</div>
                            <span class="lineContainer">
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                            </span>
                            <div class="closeWndwContainer">
                                <div class="closeWndw">
                                    X
                                </div>
                            </div>`

        let startX = 0;
        let startY = 0;
        const mousePos = (e) => {
            startY = clamp(startY + e.movementY, 0, window.innerWidth * 0.25)
            startX = clamp(startX + e.movementX, 0, window.innerHeight)
            windowElement.style.top = startY + "px";
            windowElement.style.left = startX + "px";
            };

            dragWM.addEventListener("mousedown", () => {
                startX = windowElement.getBoundingClientRect().left;
                startY = windowElement.getBoundingClientRect().top;
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

    dropdown.forEach((dropdown) => {
        const dropdownWndw = dropdown.getAttribute("dropdownWndw")
        dropdown.addEventListener("mouseout", () => {
                document.getElementById(dropdownWndw).style.display = "none";
            });
        dropdown.addEventListener("mouseover", () =>  {
            if (document.getElementById(dropdownWndw).style.display == "none") {
                document.getElementById(dropdownWndw).style.top = "calc(50% - (36rem * 0.5))"
                document.getElementById(dropdownWndw).style.left= "calc(50% - (64rem * 0.5))"
            }
            document.getElementById(dropdownWndw).style.display = "flex";
        });
    });