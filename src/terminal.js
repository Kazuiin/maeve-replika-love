    // elements
const input = document.getElementById("cliInput");
const output = document.getElementById("cliOutput");
    // variables
let device = "elster";
let commandInput = "";
let parsedCommand = [];
let inputHistory = [];
let historyIndex = 0;
let targetedPath = "";
let firstScroll = false;

    // dictionaries
const fs = {
    "home": {
        "maeve": {
            "signals": {
                "signal_512.md": `<div class="reference cli">achtung,,, achtung,,, 39486,,, 39486,,,</div>`,
                "max-strength.wav": `<div class="reference cli">.-.- - . -... .-.- .-.. ..-- -... .-.. ..--</div>`,
                "revachol.txt": `<div class="reference cli">youre not **made** of nothing anymore, youre something now.</div>`,
                "echo.txt": `<div class="reference cli">the universe is, and we are.</div>`,
                "arby.md": `<div class="reference cli">where is jessica hyde?</div>`,
                "doe.lrc": `<div class="reference cli">cantido, my god of fire.</div>`,
                "fool.txt": `<div class="reference cli">swing the bat!</div>`,
                "worldline.md": `<div class="reference cli">1.048596%</div>`,
            },
            "notes": {
                
            }
        },
        "kazuiin": { 
            "games": {

            }, 
            "music": {
                
            }, 
            "projects": {
                
            }
        }
    }
}
const deviceFetches = {
    "elster": `${newDevice("elster", "Windows 11", "X870 AORUS ELITE WIFI7 ICE", "Segoe UI (12pt)", "AMD Ryzen 7 9800X3D @ 5.25GHz", "NVIDIA GeForce RTX 5080 @ 3.09GHz", "2x48GB", ["C:/", "D:/", "E:/", "F:/", "G:/",], ["1000GB", "2000GB", "2000GB", "1000GB", "4000GB"], "windows11.png")}`,
    "eule": `${newDevice("eule", "Android 14", "S24 Ultra", "SamsungOne (12pt)", "Qualcomm Snapdragon 8 Gen 3 @ 3.40GHz", "Qualcomm Adreno 750 @ 3.09GHz", "12GB", ["/"], ["1000GB"], "android.png")}`,
    "kolibri": `${newDevice("kolibri", "RaspbianOS", "Raspberry Pi 5", "gallant 12x22 (12pt)", "Broadcom BCM2712 @ 2.40GHz", "VideoCore V3D VII @ 1.20GHz", "8GB", ["/"], ["512GB"], "raspbianos.png")}`,
    "ara": `${newDevice("ara", "NixOS", "HP Fortis Yavilla", "gallant 12x22 (12pt)", "Intel Core N100 @ 3.40GHz", "Intel UHD Graphics @ 0.75GHz", "8GB", ["/"], ["64GB"], "nixos.png")}`
}
const commands = {
    "help": help,
    "neofetch": neofetch,
    "fastfetch": neofetch,
    "hyfetch": neofetch,
    "ssh": ssh,
    "clear": clear,
    "cd": cd,
    "ls": ls,
    "cat": cat
}
    // handles textbox inputs
input.addEventListener("keydown", function (event) {
        // handles arrows
    if (event.code == "ArrowUp") {
        event.preventDefault();
        scrollHistory(1);
    }
    if (event.code == "ArrowDown") {
        event.preventDefault();
        scrollHistory(-1);
    }
    // handles enter
    if (event.code == "Enter") {
        event.preventDefault();
        runCommand();
    }
})
    // checks and runs commands :3
function runCommand() {
    commandInput = input.value;
    parsedCommand = commandInput.split(" ")
    if (commandInput != "") {
        if (!(parsedCommand[0] in commands)) {
            output.innerHTML += `<div class="errorMsg cli">${commandInput}: command not found</div>`;
        }
        else if (parsedCommand[0] == "clear") {
            output.innerHTML = "";
        }
        else {
            output.innerHTML += commands[parsedCommand[0]]();
        }
    }
    inputHistory.unshift(input.value);
    firstScroll  = true;
    historyIndex = 0;
    input.value = "";
}
    // scrolls through history
function scrollHistory(direction) {
    if (inputHistory[historyIndex + direction] !== undefined) {
        if (firstScroll == true) {
            input.value = inputHistory[historyIndex];
            firstScroll = false;
        }
        else {
            input.value = inputHistory[historyIndex = historyIndex + direction];
        }
    }
    else if (historyIndex == 0 && inputHistory.length > 0) {
        input.value = inputHistory[historyIndex]
        if (direction == -1) {
            input.value = ""
            firstScroll = true;
        }
    }
}
    // gets current directory
function getCurrentDirObj() {
    let splitPath = targetedPath.split("/");
    splitPath.splice(0, 1);
    const dirPath = getDirPath(splitPath);
    return dirPath;
}
    // gets directory path
function getDirPath(path) {
    let currentObject = fs;
    for (let dir of path) {
        if (dir in currentObject && typeof currentObject[dir] == "object") {
            currentObject = currentObject[dir]
        }
        else {
            return null;
        }
    }
    return currentObject;
}

    // commands
function neofetch() {
    let result = deviceFetches[device];
    return result
}
function ssh() {
    let result = "";
    if (parsedCommand[1] in deviceFetches) {
        device = parsedCommand[1];
        result = `<div class="deviceID cli">connected to ${device}.replika.love!</div>`;
    }
    else {
        result = `<div class="errorMsg cli">could not resolve hostname.</div<`;
    }
    return result
}
function clear() {
    console.log("cleared!")
}
function help() {
    let helpList = `<div class="helpList cli"><nobr>cd ls clear neofetch ssh<br><br><b class="yellow">use --help to get more help on a specific command</b></nobr></div>`
    return helpList;
}
function cd() {
    let pathToTarget = targetedPath + "/" + parsedCommand[1]
    if (parsedCommand[1].charAt(0) == "/") {
        pathToTarget = parsedCommand[1]
    }
    let path = pathToTarget.split("/");
    path.splice(0, 1)
    let pathResult = getDirPath(path)
    if (pathResult != null) {
        targetedPath = pathToTarget
        return `<div class="filepath cli">~${targetedPath}</div>`;
    }
    else {
        return `<div class="filepath cli">cd: ${parsedCommand[1]} no such file or directory</div>`;
    }
}
function ls() {
    let result = "";
    const dirObj = getCurrentDirObj()
    for (let key in dirObj) {
        result += `${key}<br>`;
    }
    return `<div class="ls cli">${result}</div>`;
}
function cat() {
    const argument = parsedCommand[1];
    const dirObj = getCurrentDirObj()
    if (dirObj[argument] != null) {
        return dirObj[argument]
    }
    else {
        return `<div class="catError cli">cat: ${parsedCommand[1]} no such file or directory</div>`
    }
}
    // makes devices
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