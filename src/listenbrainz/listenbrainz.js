const user = "kazuiin_";
const lb_root = "https://api.listenbrainz.org/1";
const listens_url = `${lb_root}/user/${user}/listens?count=4`;
const now_playing_url = `${lb_root}/user/${user}/playing-now`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    // elements
const nowPlayingHTML = document.getElementById("nowlistening")
const nowPlayingCover = document.getElementById("nowListeningCover")
const coverLink = document.getElementById("listenbrainzlink")
const listen1HTML = document.getElementById("listen1")
const listen2HTML = document.getElementById("listen2")
const listen3HTML = document.getElementById("listen3")
    // on load
fetch_listens()
    // functions 
function fetch_listens() {
        // now listening fetch
    fetch_json_retry(now_playing_url, 2).then((nowPlayingData) => {
            console.log(nowPlayingData)
        if (nowPlayingData.payload.listens.length > 0) {
            const nowPlayingDataPath = nowPlayingData.payload.listens[0].track_metadata
            console.log(nowPlayingData)
            nowPlayingHTML.innerHTML = "now playing!" + '<br><br>' + nowPlayingDataPath.artist_name 
            + '<br>' + nowPlayingDataPath.track_name  + '<br>' + nowPlayingDataPath.release_name;
            nowPlayingCover.setAttribute('src', 'https://coverartarchive.org/release/' + nowPlayingDataPath.additional_info.release_mbid + '/front-250.jpg')
            nowPlayingCover.setAttribute('title', nowPlayingDataPath.artist_name + " - " + nowPlayingDataPath.release_name + " on listenbrainz!!!")
            coverLink.setAttribute('href', 'https://listenbrainz.org/album/' + nowPlayingDataPath.additional_info.release_group_mbid)
        }
         else {
            console.log("listenbrainz is sleepy...")
            nowPlayingHTML.innerHTML = "now playing!" + '<br><br>' + "listenbrainz is sleepy,,,";
            nowPlayingCover.setAttribute('src', 'src/assets/images/album covers/fallback.png')
            nowPlayingCover.setAttribute('title', '')
        }
    });
        // recent listen fetch :3
    fetch_json_retry(listens_url, 2).then((listensData) => {
        console.log(listensData)
            function feedListen(listenElement, listenValue) {
                const dataPath = listensData.payload.listens[listenValue].track_metadata
                listenElement.innerHTML = '<br><br>' + dataPath.artist_name + '<br>' + dataPath.track_name + '<br>' + dataPath.release_name;
            }
            feedListen(listen1HTML, 0)
            feedListen(listen2HTML, 1)
            feedListen(listen3HTML, 2)
    });
}
 setInterval(() => {
    fetch_listens()
    }, 10000);
    // json fetcher
async function fetch_json_retry(url, retry_count) {
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
            console.log(err)
            fetched = false;
            attempts++;
            await sleep(10);
        }
    }
    if (!fetched) return null;

        // parse data
    return await res.json();

}