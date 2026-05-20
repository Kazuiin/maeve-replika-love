    // import stuff
const showdown = require("showdown");
const fs = require("fs");
const { parse } = require("path");
    // public variables
const genRoot = "../../pgGen/"
const notesRoot = "../../notes/";
const projectRoot = "../../projects/"
const converter = new showdown.Converter();
const readNotes = `${genRoot}togenerate/notes/`
const readProjects = `${genRoot}togenerate/projects/`
let notesMarkdown = fs.readdirSync(`${readNotes}`);
let projectMarkdown = fs.readdirSync(`${readProjects}`)
const notesTemplate = fs.readFileSync(`${genRoot}templates/notes-template.html`).toString();
const indexTemplate = fs.readFileSync(`${genRoot}templates/indexTemplate.html`).toString();
    // link buttons
let noteLinks = genPages(readNotes, notesRoot, notesMarkdown, notesTemplate)
let projectLinks = genPages(readProjects, projectRoot, projectMarkdown, notesTemplate)

    // checks directory reads all files inside
function genPages(directory, toWrite, dirSync, templateFile)  {
    let linkVar = "";
     for (let file of dirSync) {
        const fileMD = fs.readFileSync(`${directory}${file}`);
        const relativePath = `${toWrite}`;
            // generates new folders with an index.html inside
        if (!fs.existsSync(relativePath)) {
            fs.mkdirSync(relativePath);
        }
        const pageName = file.replace(".md", "").replaceAll("-", " ").split("_");
        const pageDate = pageName[0].split(" ");
        const path = relativePath + pageName[1].replace(".md", "").replace(".html", "").replaceAll("!", "").replaceAll(" ", "-");
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
            // converts markdown to html string
        const fileHTML = converter.makeHtml(fileMD.toString());
        const parsedDate = new Date(parseInt(pageDate[2], 10),parseInt(pageDate[1], 10) - 1, parseInt(pageDate[0])).toLocaleDateString("en-GB",
        {weekday: "long", year: "numeric", month: "long", day: "numeric"});
            // writes to template file
        fs.writeFileSync(path + "/index.html", templateFile.replace("{content}", fileHTML)
        .replace('{date}', parsedDate).replace("{file}", file).replace("{pageName}", pageName[1]));
        console.log(`${pageName[1].replace(".md", ".html")} generated!`);
        linkVar += `<a href="${path}"><div> ${parsedDate}<br><br><span class="pageName">${pageName[1]}</span></div></a>`;
    }
    return linkVar
}

writeIndex()

function writeIndex() {
    fs.writeFileSync("../../index.html", indexTemplate.replace(`{NOTEPAGELINKS}`, noteLinks).replace(`{PROJECTPAGELINKS}`, projectLinks))
}
