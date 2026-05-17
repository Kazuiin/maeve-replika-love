const input = document.getElementById("cliInput");
const output = document.getElementById("cliOutput");
let device = "elster"
let commandInput = ""
let parsedCommand = ""

const deviceFetches = {
    "elster": `${newDevice("elster", "Windows 11", "X870 AORUS ELITE WIFI7 ICE", "Segoe UI (12pt)", "AMD Ryzen 7 9800X3D @ 5.25GHz", "NVIDIA GeForce RTX 5080 @ 3.09GHz", "2x48GB", ["C:/", "D:/", "E:/", "F:/", "G:/",], ["1000GB", "2000GB", "2000GB", "1000GB", "4000GB"], "windows11.png")}`,
    "eule": `${newDevice("eule", "Android 14", "S24 Ultra", "SamsungOne (12pt)", "Qualcomm Snapdragon 8 Gen 3 @ 3.40GHz", "Qualcomm Adreno 750 @ 3.09GHz", "12GB", ["/"], ["1000GB"], "android.png")}`,
    "kolibri": `${newDevice("kolibri", "RaspbianOS", "Raspberry Pi 5", "gallant 12x22 (12pt)", "Broadcom BCM2712 @ 2.40GHz", "VideoCore V3D VII @ 1.20GHz", "8GB", ["/"], ["512GB"], "raspbianos.png")}`,
    "ara": `${newDevice("ara", "NixOS", "HP Fortis Yavilla", "gallant 12x22 (12pt)", "Intel Core N100 @ 3.40GHz", "Intel UHD Graphics @ 0.75GHz", "8GB", ["/"], ["64GB"], "nixos.png")}`      
}

console.log(deviceFetches["elster"])


const commands = {
    
    "help": help,
    "neofetch": neofetch,
    "fastfetch": neofetch,
    "hyfetch": neofetch, 
    "ssh": ssh,
    "clear": clear
}

input.addEventListener("keydown", function(event) {
    if(event.code == "Enter") {
        commandInput = input.value;
        parsedCommand = commandInput.split(" ")
        console.log(parsedCommand)
        if (!(parsedCommand[0] in commands)) {
            output.innerHTML += `<div class="errorMsg cli">${commandInput}: command not found</div>`;
        }
        
        else if (parsedCommand[0] == "clear") {
            output.innerHTML = ""
        }

        else {
            output.innerHTML += commands[parsedCommand[0]]();
        }
        input.value = "";
    }
})

function neofetch() {
    let result = deviceFetches[device];
    return result
}

function ssh() {
    let result = "";
    if (parsedCommand[1] in deviceFetches) {
        device = parsedCommand[1];
        console.log(device);
        result = `<div class="deviceID cli">connected to ${device}.replika.love!</div>`;
    }
    else {
        result = `<div class="errorMsg cli">could not resolve hostname.</div<`;
    }
    return result
}

function clear() {
    console.log("cleared")
}


function help() {
    let helpList = `<div class="helpList cli"><nobr> clear neofetch ssh<br><br><b class="yellow">use --help to get more help on a specific command</b></nobr></div>`

    return helpList
}

function newDevice(device, os, host, font, cpu, gpu, ram, diskNames, diskCapacities, ascii) {
    let forCounter = 0;
    let Fetch =
            `<div class="neofetch cli">
                <img src="src/assets/images/ascii/${ascii}" alt="" height="160">
                <div class="neofetchText">
                    <nobr><b class="periwinkle">maeve</b>@<b class="periwinkle">${device}</b><br>
                    ---------<br>
                    <b class="yellow">OS</b>: ${os}<br>
                    <b class="yellow">Host</b>: ${host}<br>
                    <b class="yellow">Font</b>: ${font}<br>
                    <b class="yellow">CPU</b>: ${cpu}<br>
                    <b class="yellow">GPU</b>: ${gpu}<br>
                    <b class="yellow">Memory</b>: ${ram}<br>`;
            
        for (let i = 0; i < diskNames.length; i++) {
            Fetch += `<b class="yellow">Disk(${diskNames[i]})</b>: ${diskCapacities[i]}<br>`
            
            if (diskNames.length == i) {
                Fetch += "</nobr></div></div>";
            }
        }
    return Fetch;
}