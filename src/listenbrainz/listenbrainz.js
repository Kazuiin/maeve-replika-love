const user = "kazuiin_";
const lb_root = "https://api.listenbrainz.org/1";
const listens_url = `${lb_root}/user/${user}/listens?count=4`;
const now_playing_url = `${lb_root}/user/${user}/playing-now`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    // elements
const nowPlayingHTML = document.getElementById("nowlistening")

    // on load
fetch_listens()
    // functions 
function fetch_listens() {
    fetch_json_retry(now_playing_url, 2).then((nowPlayingData) => {
    nowPlayingHTML.innerHTML = "now playing!" + '<br>' + nowPlayingData.payload.listens[0].track_metadata.artist_name + " - " +nowPlayingData.payload.listens[0].track_metadata.track_name;
    console.log(nowPlayingData)
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