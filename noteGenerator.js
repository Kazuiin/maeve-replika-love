    // variables
const fs = require("fs");
let pagesDirectory = fs.readdirSync("notes/togenerate/");

    // checks directory reads all files inside
for (let fileName of pagesDirectory) {
    let noteFile = fs.readFileSync("notes/togenerate/" + fileName);
    const relativeNotesPath = "notes/pages/"

        // generates new folders with an index.html inside
    if (!fs.existsSync(relativeNotesPath)) {
        fs.mkdirSync(relativeNotesPath);
    }
    let noteDir = relativeNotesPath + fileName.replace(".html", "")
    if (!fs.existsSync(noteDir)) {
        fs.mkdirSync(noteDir);
        console.log(fs.readdirSync(relativeNotesPath))
    }
    fs.writeFileSync(noteDir + "/index.html", noteFile);
}
