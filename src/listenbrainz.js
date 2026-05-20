    // elements
const nowPlayingHTML = document.getElementById("nowlistening");
const nowPlayingCover = document.getElementById("nowListeningCover");
const coverLink = document.getElementById("listenbrainzlink");
const listen1HTML = document.getElementById("listen1");
const listen2HTML = document.getElementById("listen2");
const listen3HTML = document.getElementById("listen3");
const albumContainer = document.getElementById("albumContainer"); 
    // variables
const user = "kazuiin_";
const root = "https://api.listenbrainz.org/1";
const listens_url = `${root}/user/${user}/listens?count=3`;
const playing_url = `${root}/user/${user}/playing-now`;
const coversRoot = "/src/assets/images/album-covers/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fetchCount = 0;
let favAlbums = "";

    // on load
fetchListens();
set_favAlbums();

// functions 
function fallback(element) {
    element.src = "src/assets/images/fallback.png";
    element.href = "https://listenbrainz.org/user/kazuiin_/";
}
// sets favAlbums in MusicPG
function set_favAlbums() {
    // row 1
    newAlbum("julie", "pushing daisies");
    newAlbum("julie", "my anti aircraft friend");
    newAlbum("julie", "starjump/kit");
    newAlbum("panchiko", "D>E>A>T>H>M>E>T>A>L");
    newAlbum("my bloody valentine", "loveless");
    newAlbum("doefriends", "I WANT TO LOVE AGAIN");
    // row 2
    newAlbum("glass beach", "the first glass beach album");
    newAlbum("glass beach", "plastic death");
    newAlbum("Jane Remover", "Frailty");
    newAlbum("Jane Remover", "Revengeseekerz");
    newAlbum("saoirse dream", "saoirse dream");
    newAlbum("Fontaines D.C", "Skinty Fia");
    // row 3
    newAlbum("Have a Nice Life", "Deathconsciousness");
    newAlbum("FREE.99", "TRAUMA REDUCTION PRAYER");
    newAlbum("black midi", "Schlagenheim");
    newAlbum("geordie greep", "the new sound");
    newAlbum("Sea Power", "From the Sea to the Land beyond");
    newAlbum("Oberhofer", "Chronovision");
    // row 4
    newAlbum("1000 eyes, circada sirens", "signalis OST");
    newAlbum("Alexandre Desplat", "Fantastic Mr Fox OST");
    newAlbum("Andrew Prahlow", "Signals From The Outer Wilds");
    newAlbum("Andrew Prahlow", "Secrets From The Outer Wilds: Echoes of the Eye");
    newAlbum("Cristobal Tapia de Veer", "Utopia S1 OST");
    newAlbum("Cristobal Tapia de Veer", "Utopia S2 OST");
    albumContainer.innerHTML = favAlbums;
}
// new album!!!!!!!!!!!!
function newAlbum(artist, album) {
    // replaces BAD characters
    const replaceArray = [" OST", "/", ">", ".",]
    const replacers = (string) => string.replaceAll(" OST", "").replaceAll("/", "").replaceAll(" ", "-").replaceAll(">", "").replaceAll(".", "").replaceAll(",", "").replaceAll(":", "");
    // adds to favAlbums
    favAlbums += `<div class="album" albm="${album}">
                        <img title="${artist} - ${album}"src="${coversRoot}${replacers(artist)}-${replacers(album)}.webp" alt="" class="albumCover">
                    </div>`;
}
function fetchListens() {
    fetchCount = fetchCount + 1;
    console.log(`listenbrainz fetch ${fetchCount}\n \nbark bark ruff ruff :3`);
    // now listening fetch
    fetchJsonRetry(playing_url, 2).then((nowPlayingData) => {
        if (nowPlayingData.payload.listens.length > 0) {
            console.log("listenbrainz is WOKE LEFT!!!");
            const nowPlayingDataPath = nowPlayingData.payload.listens[0].track_metadata;
            nowPlayingHTML.innerHTML = `now playing!<br><br>${nowPlayingDataPath.artist_name}<br><br>${nowPlayingDataPath.track_name}
            <br><br>${nowPlayingDataPath.release_name}`;
            nowPlayingCover.setAttribute('src', `https://coverartarchive.org/release/${nowPlayingDataPath.additional_info.release_mbid}/front-250.jpg`);
            nowPlayingCover.setAttribute('title', `${nowPlayingDataPath.artist_name} - ${nowPlayingDataPath.release_name} on listenbrainz!!!`);
            nowPlayingCover.setAttribute('alt', `${nowPlayingDataPath.artist_name} - ${nowPlayingDataPath.release_name}`);
            coverLink.setAttribute('href', `https://listenbrainz.org/album/${nowPlayingDataPath.additional_info.release_group_mbid}`);
        }
        else {
            console.log("listenbrainz is sleepy...");
            nowPlayingHTML.innerHTML = "listenbrainz is sleepy,,,";
            nowPlayingCover.setAttribute('src', 'src/assets/images/fallback.png');
            nowPlayingCover.setAttribute('title', '');
            coverLink.setAttribute('href', "https://listenbrainz.org/user/kazuiin_/");
        }
    });
    // recent listen fetch :3
    fetchJsonRetry(listens_url, 2).then((listensData) => {
        function feedListen(listenElement, listenValue) {
            const dataPath = listensData.payload.listens[listenValue].track_metadata;
            listenElement.innerHTML = `${dataPath.artist_name}<br>${dataPath.track_name}<br>${dataPath.release_name}`;
        }
        feedListen(listen1HTML, 0);
        feedListen(listen2HTML, 1);
        feedListen(listen3HTML, 2);
    });
}
setInterval(() => {
    fetchListens();
}, 10000);
// json fetcher
async function fetchJsonRetry(url, retry_count) {
    let fetched = false;
    let res = null;
    let attempts = 0;
    while (!fetched && attempts < retry_count) {
        try {
            res = await fetch(url, {
                method: "get"
            });
            fetched = true;
        } catch (err) {
            console.log(`Fetch failed!!`);
            console.log(err);
            fetched = false;
            attempts++;
            await sleep(10);
        }
    }
    if (!fetched) return null;
    // parse data
    return await res.json();
}