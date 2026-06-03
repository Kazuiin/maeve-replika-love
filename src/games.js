import { rep } from "./generic.js";

const gameContainer = document.getElementById("gameContainer")
const root = "/src/assets/images/games/";
let list = "";

set_game();

function set_game() {
    newGame("Signalis 10/10 #1", "1262350");
    newGame("Outer Wilds 10/10 #2", "753640");
    newGame("Z.A.T.O: I Love the World and Everything In It 9/10 #3", "4122860");
    newGame("Destiny 2 7/10 #4", "1085660");
    newGame("Disco Elysium 9/10 #5", "632470");
    newGame("Destiny 9/10 #6", "1085660");
    newGame("Cyberpunk 2077 8/10 #7", "1091500");
    newGame("Risk Of Rain 2 7/10 #8", "632360");
    newGame("Sekiro: Shadows Die Twice 7/10 #9", "814380");
    newGame("Marathon 9/10 #10", "3065800");
    gameContainer.innerHTML = list;
}

function newGame(name, steamID) {
        // adds to game
    list += `<div class="games" game="${name}">
                        <a rel="noopener" title="${name}" href="https://store.steampowered.com/app/${steamID}" target="_blank"> 
                            <img title="${name}"src="${root}${rep(name)}.webp" alt="" class="gameCover">
                        </a>
                    </div>`;
}