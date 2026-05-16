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
    "elster": `${newDevice("elster", "Windows 11", "X870 AORUS ELITE WIFI7 ICE", "Segoe UI (12pt)", "AMD Ryzen 7 9800X3D @ 5.25GHz", "NVIDIA GeForce RTX 5080 @ 3.09GHz", "2x48GB", ["C:/", "D:/", "E:/", "F:/", "G:/",], ["1000GB", "2000GB", "2000GB", "1000GB", "4000GB"])}`,
    "eule": `${newDevice("eule", "Android 14", "S24 Ultra", "SamsungOne (12pt)", "Qualcomm Snapdragon 8 Gen 3 @ 3.40GHz", "Qualcomm Adreno 750 @ 3.09GHz", "12GB", ["/"], ["1000GB"])}`,
    "kolibri": `${newDevice("kolibri", "RaspbianOS", "Raspberry Pi 5", "gallant 12x22 (12pt)", "Broadcom BCM2712 @ 2.40GHz", "VideoCore V3D VII @ 1.20GHz", "8GB", ["/"], ["512GB"])}`,
    "ara": `${newDevice("ara", "NixOS", "HP Fortis Yavilla", "gallant 12x22 (12pt)", "Intel Core N100 @ 3.40GHz", "Intel UHD Graphics @ 0.75GHz", "8GB", ["/"], ["64GB"])}`      
}

function newDevice(device, os, host, font, cpu, gpu, ram, diskNames, diskCapacities, ascii) {
    let forCounter = 0;
    let deviceFetch =
            `<nobr><b class="periwinkle">maeve</b>@<b class="periwinkle">${device}</b><br>
            ---------<br>
            <b class="yellow">OS</b>: ${os}<br>
            <b class="yellow">Host</b>: ${host}<br>
            <b class="yellow">Font</b>: ${font}<br>
            <b class="yellow">CPU</b>: ${cpu}<br>
            <b class="yellow">GPU</b>: ${gpu}<br>
            <b class="yellow">Memory</b>: ${ram}<br>`
        for (let disk of diskNames) {
            deviceFetch += `<b class="yellow">Disk(${diskNames[forCounter]})</b>: ${diskCapacities[forCounter]}<br>`
            forCounter += 1
            if (diskNames.length == forCounter) {
                deviceFetch += "</nobr>"
            }
        }
    return deviceFetch
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
