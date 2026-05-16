const input = document.getElementById("cliInput")
const output = document.getElementById("cliOutput")
const deviceID = output.getAttribute("deviceID")

const deviceFetches = {
    "elster": `${newDevice("elster", "Windows 11", "X870 AORUS ELITE WIFI7 ICE", "Segoe UI (12pt)", "AMD Ryzen 7 9800X3D @ 5.25GHz", "NVIDIA GeForce RTX 5080 @ 3.09GHz", "2x48GB", ["C:/", "D:/", "E:/", "F:/", "G:/",], ["1000GB", "2000GB", "2000GB", "1000GB", "4000GB"], "src/assets/images/placeholders/pfpklbr.png")}`,
    "eule": `${newDevice("eule", "Android 14", "S24 Ultra", "SamsungOne (12pt)", "Qualcomm Snapdragon 8 Gen 3 @ 3.40GHz", "Qualcomm Adreno 750 @ 3.09GHz", "12GB", ["/"], ["1000GB"])}`,
    "kolibri": `${newDevice("kolibri", "RaspbianOS", "Raspberry Pi 5", "gallant 12x22 (12pt)", "Broadcom BCM2712 @ 2.40GHz", "VideoCore V3D VII @ 1.20GHz", "8GB", ["/"], ["512GB"])}`,
    "ara": `${newDevice("ara", "NixOS", "HP Fortis Yavilla", "gallant 12x22 (12pt)", "Intel Core N100 @ 3.40GHz", "Intel UHD Graphics @ 0.75GHz", "8GB", ["/"], ["64GB"])}`      
}

console.log(deviceFetches["elster"])

function newDevice(device, os, host, font, cpu, gpu, ram, diskNames, diskCapacities, ascii) {
    let forCounter = 0;
    let Fetch =
            `<div class="neofetch">
                <img src="${ascii}" alt="" height="256">
                <div class="neofetchText">
                    <nobr><b class="periwinkle">maeve</b>@<b class="periwinkle">${device}</b><br>
                    ---------<br>
                    <b class="yellow">OS</b>: ${os}<br>
                    <b class="yellow">Host</b>: ${host}<br>
                    <b class="yellow">Font</b>: ${font}<br>
                    <b class="yellow">CPU</b>: ${cpu}<br>
                    <b class="yellow">GPU</b>: ${gpu}<br>
                    <b class="yellow">Memory</b>: ${ram}<br>`
            
        for (let disk of diskNames) {
            Fetch += `<b class="yellow">Disk(${diskNames[forCounter]})</b>: ${diskCapacities[forCounter]}<br>`
            forCounter += 1
            if (diskNames.length == forCounter) {
                Fetch += "</nobr></div></div>"
            }
        }
    return Fetch
}