const favGamesContainer = document.getElementById("favGamesContainer")
const gamesRoot = "/src/assets/images/games/";
let favGames = "";

set_favGames()

function set_favGames() {
    newGame("Signalis 10/10 #1", "1262350")
    newGame("Outer Wilds 10/10 #2", "753640")
    newGame("Z.A.T.O: I Love the World and Everything In It 9/10 #3", "4122860")
    newGame("Destiny 2 7/10 #4", "1085660")
    newGame("Disco Elysium 9/10 #5", "632470")
    newGame("Destiny 9/10 #6", "1085660")
    newGame("Cyberpunk 2077 8/10 #7", "1091500")
    newGame("Risk Of Rain 2 7/10 #8", "632360")
    newGame("Sekiro: Shadows Die Twice 7/10 #9", "814380")
    newGame("Marathon 9/10 #10", "3065800")
    favGamesContainer.innerHTML = favGames
}

function newGame(game, steamID) {
    // replaces BAD characters
    const toReplace = [" OST", "/", " ", ">", ".", ",", ":", "#"]
    const replaceWith = ["", "", "-", "", "", "", "", ""]
    const replacers = (string) => { 
        let stringResult = string;
        for (let i = 0; i < toReplace.length; i++) {
            stringResult = stringResult.replaceAll(toReplace[i], replaceWith[i])
        }
        return stringResult
    }
    // adds to favgames
    favGames += `<div class="games" game="${game}">
                        <a rel="noopener" title="${game}" href="https://store.steampowered.com/app/${steamID}" target="_blank"> 
                            <img title="${game}"src="${gamesRoot}${replacers(game)}.webp" alt="" class="gameCover">
                        </a>
                    </div>`;
}