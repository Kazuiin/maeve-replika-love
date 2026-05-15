    //window manager
const dragWM = document.querySelectorAll(".dragWM");
const dropdown = document.querySelectorAll(".dropdown");
const closeWndw = document.querySelectorAll(".closeWndw");
const desktopWndw = document.querySelectorAll(".desktopWndw");
const shortcut = document.querySelectorAll(".shortcut");
const albumCover = document.querySelectorAll(".albumCover");
const bodyBG = document.getElementById("everything");
const device = document.querySelectorAll(".device")
const hyfetch = document.getElementById("hyfetch")
const deviceFetches = {
    "elster": `maeve@elster<br>OS: Windows 11<br>Host: X870 AORUS ELITE WIFI7 ICE<br>Font: Segoe UI (12pt)<br>CPU: AMD Ryzen 7 9800X3D @ 5.25<br>GPU: NVIDIA GeForce RTX 5080 @ 3.09GHz<br>Memory: 96GB<br>Disk (C:/): 1000GB<br>Disk (D:/): 2000GB<br>Disk (E:/): 2000GB<br>Disk (F:/): 1000GB<br>Disk (G:/): 4000GB<br> <p class="ascii"></p>` ,
    "eule": `maeve@eule<br>OS: Android 14<br>Host: S24 Ultra<br>Font: SamsungOne (12pt)<br>CPU: Qualcomm Snapdragon 8 Gen 3 @ 3.40GHz<br>GPU: Qualcomm Adreno 750 @ 3.09GHz<br>Memory: 12GB<br>Disk (/): 1000GB<br><p class="ascii"></p>` ,
    "kolibri": `maeve@kolibri<br>OS: RaspbianOS<br>Host: Raspberry pi 5<br>Font: gallant 12x22 (12pt)<br>CPU: Broadcom BCM2712 @ 2.40GHz<br>GPU: VideoCore V3D VII @ 1.20GHz<br>Memory: 8GB<br>Disk (/): 512GB<br> <p class="ascii"></p>`,
    "ara": `maeve@ara<br>OS: NixOS<br>Host: HP Fortis Yavilla<br>Font: gallant 12x22 (12pt)<br>CPU: Intel Core N100  @ 3.40GHz<br>GPU: Intel UHD Graphics @ 0.75GHz<br>Memory: 8GB<br>Disk (/): 64GB<br> <p class="ascii"></p>`      
          
}
    function clamp(num, min, max) {
            const lowLim = Math.max(num, min);
            const result = Math.min(lowLim, max);
            return result;
    };
        // window dragging titlebar
    dragWM.forEach((dragWM) => {
        const windowElement = dragWM.parentElement;
        dragWM.innerHTML = `<span class="lineContainer">
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                                <div class="lineHorizontal"></div>
                            </span>
                            <div class="titlecontainer">
                                ${windowElement.getAttribute("window")}
                            </div>
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
            startY = clamp(startY + e.movementY, 0, window.innerWidth * 0.25);
            startX = clamp(startX + e.movementX, 0, window.innerHeight);
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
                document.getElementById(btnwndw).style.top = "calc(50% - (36rem * 0.5))";
                document.getElementById(btnwndw).style.left= "calc(50% - (64rem * 0.5))";
            }
            document.getElementById(btnwndw).style.display = "flex";
        });
        shortcut.innerHTML = shortcut.innerHTML + `<p>${btnwndw}</p>`;
    });
        // window close titlebar
    desktopWndw.forEach((desktopWndw) => {
        const closeWndw = desktopWndw.querySelector(".closeWndw");
         closeWndw.addEventListener("mouseup", () => {
                desktopWndw.style.display = "none";
            });
    });

    device.forEach((device) => {
        const deviceID = device.getAttribute("deviceID")
        device.addEventListener("mouseover", () => {
            hyfetch.innerHTML = deviceFetches[deviceID];
        })
        device.addEventListener("mouseout", () => {
            hyfetch.innerHTML = "";
        })
    })