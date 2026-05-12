    // import stuff
const showdown = require("showdown")
const fs = require("fs");
const { parse } = require("path");
    // public variables
const converter = new showdown.Converter()
let pagesDirectory = fs.readdirSync("notes/togenerate/");
const templateFile = fs.readFileSync("notes/template.html").toString()
    // checks directory reads all files inside
for (let fileName of pagesDirectory) {
    let noteFileMD = fs.readFileSync("notes/togenerate/" + fileName);
    const relativeNotesPath = "notes/pages/"
        // generates new folders with an index.html inside
    if (!fs.existsSync(relativeNotesPath)) {
        fs.mkdirSync(relativeNotesPath);
    }
    let noteDir = relativeNotesPath + fileName.replace(".md", "").replace(".html", "")
    if (!fs.existsSync(noteDir)) {
        fs.mkdirSync(noteDir);
    }
        // converts markdown to html string
    let noteFileHTML = converter.makeHtml(noteFileMD.toString())
    const fileNameDate = fileName.replace(".md", "").split("-")
    let parsedDate = new Date(parseInt(fileNameDate[2], 10),parseInt(fileNameDate[1], 10) - 1, parseInt(fileNameDate[0])).toLocaleDateString("en-GB",
    {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        // writes to template file
    fs.writeFileSync(noteDir + "/index.html", templateFile.replace("{content}", noteFileHTML)
    .replace('{date}', parsedDate));
    console.log(fileName.replace(".md", ".html") + " generated!")
}
