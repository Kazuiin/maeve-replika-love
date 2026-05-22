const gamesContainer = document.getElementById("gamesContainer")
const gamesRoot = "/src/assets/images/games/";
let favGames = "";

set_favGames()

function set_favGames() {
    newGame("Signalis")
    newGame("Outer Wilds")
    newGame("Sekiro: Shadows Die Twice")
    gamesContainer.innerHTML = favGames
}

function newGame(game) {
    // replaces BAD characters
    const toReplace = [" OST", "/", " ", ">", ".", ",", ":"]
    const replaceWith = ["", "", "-", "", "", "", "",]
    const replacers = (string) => { 
        let stringResult = string;
        for (let i = 0; i < toReplace.length; i++) {
            stringResult = stringResult.replaceAll(toReplace[i], replaceWith[i])
        }
        return stringResult
    }
    // adds to favgames
    favGames += `<div class="games" game="${game}">
                        <img title="${game}"src="${gamesRoot}${replacers(game)}.webp" alt="" class="gameCover">
                    </div>`;
}