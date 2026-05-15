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
    let noteDir = relativeNotesPath + fileName.replace(".md", "").replace(".html", "").replaceAll("!", "");
    if (!fs.existsSync(noteDir)) {
        fs.mkdirSync(noteDir);
    }
        // converts markdown to html string
    let noteFileHTML = converter.makeHtml(noteFileMD.toString());
    const pageName = fileName.replace(".md", "").replaceAll("-", " ").split("_");
    const pageDate = pageName[0].split(" ");
    let parsedDate = new Date(parseInt(pageDate[2], 10),parseInt(pageDate[1], 10) - 1, parseInt(pageDate[0])).toLocaleDateString("en-GB",
    {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        // writes to template file
    fs.writeFileSync(noteDir + "/index.html", templateFile.replace("{content}", noteFileHTML)
    .replace('{date}', parsedDate).replace("{fileName}", fileName).replace("{pageName}", pageName[1]));
    console.log(`${fileName.replace(".md", ".html")} generated!`);
    linkHtml += `<a href="${noteDir}"><div> ${parsedDate}<br><br><span class="pageName">${pageName[1]}</span></div></a>`;
    fs.writeFileSync("../../index.html", mainPage.replace("{NOTEPAGELINKS}", linkHtml));
}
