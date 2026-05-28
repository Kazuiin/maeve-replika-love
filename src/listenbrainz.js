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
    newAlbum("julie", "pushing daisies", "0ba72f09-730c-4d20-8bf3-1fdb9a7a0c50");
    newAlbum("julie", "my anti aircraft friend", "277b1d85-1b36-4f29-86c0-d668f8a41176");
    newAlbum("julie", "starjump/kit", "19d1e200-6c38-47fe-b327-343719348fe7");
    newAlbum("panchiko", "D>E>A>T>H>M>E>T>A>L", "e53da1e9-2197-4755-baf1-182de0c74e26");
    newAlbum("my bloody valentine", "loveless", "cb76227e-3ac0-3002-9a10-615a5b73cc59");
    newAlbum("doefriends", "I WANT TO LOVE AGAIN", "747ad1cb-bc36-49a5-974f-0b1e032f6417");
    // row 2
    newAlbum("glass beach", "the first glass beach album", "a491e185-9c1e-47a0-964b-137b802aa928");
    newAlbum("glass beach", "plastic death", "9bcaf505-2c6c-4931-9623-1f22a8229aa6");
    newAlbum("Jane Remover", "Frailty", "a0d3725b-18cb-4189-b968-14bdf8948c04");
    newAlbum("Jane Remover", "Revengeseekerz", "a77018ca-5db9-45ed-918a-a04a30e8136b");
    newAlbum("saoirse dream", "saoirse dream", "ebdde637-da39-4c85-96b9-a0b051a2af4b");
    newAlbum("Fontaines D.C", "Skinty Fia", "aa2f908a-5aba-40c1-a198-3d0ad4f43486");
    // row 3
    newAlbum("Have a Nice Life", "Deathconsciousness", "bb449522-eefd-3d7e-b712-b2cf7e9de0b1");
    newAlbum("FREE.99", "TRAUMA REDUCTION PRAYER", "8b139185-e38c-4de7-9d3e-2899f50f655e");
    newAlbum("black midi", "Schlagenheim", "c65fb96b-08dc-44b4-b0ca-3576317b5513");
    newAlbum("geordie greep", "the new sound", "171db008-7f7b-48d3-a3b5-640d6ea41aa7");
    newAlbum("Sea Power", "From the Sea to the Land beyond", "aa3a6169-135b-4f19-99ae-a14235f98879");
    newAlbum("Oberhofer", "Chronovision", "ed9c8415-bddc-404f-b85a-09c12b5bfe56");
    // row 4
    newAlbum("1000 eyes, circada sirens", "signalis OST", "e00e924f-f099-4cab-ae87-5403e0affd1f");
    newAlbum("Alexandre Desplat", "Fantastic Mr Fox OST", "faaa3439-4b59-4426-b870-463b0daf772c");
    newAlbum("Andrew Prahlow", "Signals From The Outer Wilds", "b295ecc3-f78b-4f3e-9514-7ca83e2d7339");
    newAlbum("Andrew Prahlow", "Secrets From The Outer Wilds: Echoes of the Eye", "3b2b4c4b-dd97-47df-ab19-7e4067f941f2");
    newAlbum("Cristobal Tapia de Veer", "Utopia S1 OST", "11901ca9-9d89-4ab9-a025-584448dba7da");
    newAlbum("Cristobal Tapia de Veer", "Utopia S2 OST", "e41c4473-bf22-4c8e-b9ef-69eb323dc65e");
    albumContainer.innerHTML = favAlbums;
}
// new album!!!!!!!!!!!!
function newAlbum(artist, album, brainzID) {
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
    // adds to favAlbums
    favAlbums += `<div class="album" albm="${album}">
                        <a rel="noopener" title="${album}" href="https://listenbrainz.org/album/${brainzID}" target="_blank"> 
                            <img title="${artist} - ${album}"src="${coversRoot}${replacers(artist)}-${replacers(album)}.webp" alt="" class="albumCover">
                        </a>
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
            nowPlayingHTML.innerHTML = 
            `<nobr>now playing! <b class="musicHover periwinkle" title="${nowPlayingDataPath.track_name}"><br>${nowPlayingDataPath.track_name}</b><br>
            by <b class="musicHover periwinkle" title="${nowPlayingDataPath.artist_name}"><br>${nowPlayingDataPath.artist_name}</b><br>
            from <b class="musicHover periwinkle" title="${nowPlayingDataPath.release_name}"><br>${nowPlayingDataPath.release_name}</b></b></nobr>`;
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
            let listened_at = listensData.payload.listens[listenValue].listened_at;
            var listenTime = new Date(listened_at * 1000);
            var day = listenTime.getDate()
            var month = listenTime.getMonth()
            var hours = listenTime.getHours();
            var minutes = `0${listenTime.getMinutes()}`;
            var time = `${hours}:${minutes.substr(-2)} on ${day}/${month}`

            listenElement.innerHTML = `<nobr>listened to at <b class="grey"">${time}</b><b class="musicHover periwinkle" title="${dataPath.track_name}"><br>${dataPath.track_name}</b><br>
            by <b class="musicHover periwinkle" title="${dataPath.artist_name}"><br>${dataPath.artist_name}</b><br>
            from <b class="musicHover periwinkle" title="${dataPath.release_name}"><br>${dataPath.release_name}</b></nobr>`;
        }
        console.log(listensData)
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