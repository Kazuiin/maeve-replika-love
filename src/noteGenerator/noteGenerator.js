    // import stuff
const showdown = require("showdown");
const fs = require("fs");
const { parse } = require("path");
    // public variables
const notesRoot = "../../notes/";
const converter = new showdown.Converter();
let pagesDirectory = fs.readdirSync(`${notesRoot}togenerate/`);
const templateFile = fs.readFileSync(`${notesRoot}templates/template.html`).toString();
const mainPage = fs.readFileSync(`${notesRoot}templates/indexTemplate.html`).toString();
let linkHtml = "";
    // checks directory reads all files inside
for (let fileName of pagesDirectory) {
    let noteFileMD = fs.readFileSync(`${notesRoot}togenerate/${fileName}`);
    const relativeNotesPath = `${notesRoot}pages/`;
        // generates new folders with an index.html inside
    if (!fs.existsSync(relativeNotesPath)) {
        fs.mkdirSync(relativeNotesPath);
    }
    let noteDir = relativeNotesPath + fileName.replace(".md", "").replace(".html", "");
    if (!fs.existsSync(noteDir)) {
        fs.mkdirSync(noteDir);
    }
        // converts markdown to html string
    let noteFileHTML = converter.makeHtml(noteFileMD.toString());
    const fileNameDate = fileName.replace(".md", "").split("-");
    let parsedDate = new Date(parseInt(fileNameDate[2], 10),parseInt(fileNameDate[1], 10) - 1, parseInt(fileNameDate[0])).toLocaleDateString("en-GB",
    {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        // writes to template file
    fs.writeFileSync(noteDir + "/index.html", templateFile.replace("{content}", noteFileHTML)
    .replace('{date}', parsedDate).replace("{pageName}", fileName));
    console.log(`${fileName.replace(".md", ".html")} generated!`);
    linkHtml += `<a href="${noteDir}"> ${parsedDate}</a><br>`;
    fs.writeFileSync("../../index.html", mainPage.replace("{NOTEPAGELINKS}", linkHtml));
}
