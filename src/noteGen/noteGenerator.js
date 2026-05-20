    // import stuff
const showdown = require("showdown");
const fs = require("fs");
const { parse } = require("path");
    // public variables
const notesRoot = "../../notes/";
const genRoot = "../../pgGen/"
const converter = new showdown.Converter();
let pagesDirectory = fs.readdirSync(`${genRoot}togenerate/`);
const templateFile = fs.readFileSync(`${genRoot}templates/template.html`).toString();
const mainPage = fs.readFileSync(`${genRoot}templates/indexTemplate.html`).toString();
let linkHtml = "";
    // checks directory reads all files inside
for (let file of pagesDirectory) {
    let noteFileMD = fs.readFileSync(`${genRoot}togenerate/${file}`);
    const relativeNotesPath = `${notesRoot}`;
        // generates new folders with an index.html inside
    if (!fs.existsSync(relativeNotesPath)) {
        fs.mkdirSync(relativeNotesPath);
    }
    const pageName = file.replace(".md", "").replaceAll("-", " ").split("_");
    const pageDate = pageName[0].split(" ");
    let notePath = relativeNotesPath + pageName[1].replace(".md", "").replace(".html", "").replaceAll("!", "").replaceAll(" ", "-");
    if (!fs.existsSync(notePath)) {
        fs.mkdirSync(notePath);
    }
        // converts markdown to html string
    let noteFileHTML = converter.makeHtml(noteFileMD.toString());
    let parsedDate = new Date(parseInt(pageDate[2], 10),parseInt(pageDate[1], 10) - 1, parseInt(pageDate[0])).toLocaleDateString("en-GB",
    {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        // writes to template file
    fs.writeFileSync(notePath + "/index.html", templateFile.replace("{content}", noteFileHTML)
    .replace('{date}', parsedDate).replace("{file}", file).replace("{pageName}", pageName[1]));
    console.log(`${pageName[1].replace(".md", ".html")} generated!`);
    linkHtml += `<a href="${notePath}"><div> ${parsedDate}<br><br><span class="pageName">${pageName[1]}</span></div></a>`;
    fs.writeFileSync("../../index.html", mainPage.replace("{NOTEPAGELINKS}", linkHtml));
}
