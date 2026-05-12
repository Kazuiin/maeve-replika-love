    // variables
const fs = require("fs");
let pagesDirectory = fs.readdirSync("notes/pages/");

console.log(pagesDirectory)

for (let fileName of pagesDirectory) {
    let noteFile = fs.readFileSync("notes/pages/" + fileName);
    const relativeNotesPath = "notes/generated/"
    let noteDir = relativeNotesPath + fileName.replace(".html", " ")
    if (!fs.existsSync(noteDir)) {
        fs.mkdirSync(noteDir);
    }
    fs.writeFileSync(noteDir + "/index.html", noteFile);
}