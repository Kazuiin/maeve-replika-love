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
    fetch_json_retry(now_playing_url, 2).then((nowPlayingData) => {
        nowPlayingHTML.innerHTML = "now playing!" + '<br><br>' + nowPlayingData.payload.listens[0].track_metadata.artist_name 
        + '<br>' +nowPlayingData.payload.listens[0].track_metadata.track_name  + '<br>' + nowPlayingData.payload.listens[0].track_metadata.release_name;
        nowPlayingCover.setAttribute('src', 'https://coverartarchive.org/release/' + nowPlayingData.payload.listens[0].track_metadata.additional_info.release_mbid + '/front-250.jpg')
        nowPlayingCover.setAttribute('title', nowPlayingData.payload.listens[0].track_metadata.artist_name + " - " + nowPlayingData.payload.listens[0].track_metadata.release_name + " on listenbrainz!")
        coverLink.setAttribute('href', 'https://listenbrainz.org/album/' + nowPlayingData.payload.listens[0].track_metadata.additional_info.release_group_mbid)
        console.log(nowPlayingData)
    });
    fetch_json_retry(listens_url, 2).then((listensData) => {
        listen1HTML.innerHTML = "recent listens!" + '<br><br>' + listensData.payload.listens[0].track_metadata.artist_name + '<br>'
         + listensData.payload.listens[0].track_metadata.track_name + '<br>' + listensData.payload.listens[0].track_metadata.release_name;
        console.log(listensData)
    });
    fetch_json_retry(listens_url, 2).then((listensData) => {
        listen2HTML.innerHTML = '<br><br>' + listensData.payload.listens[1].track_metadata.artist_name + '<br>'
         + listensData.payload.listens[1].track_metadata.track_name + '<br>' + listensData.payload.listens[1].track_metadata.release_name;
        console.log(listensData)
    });
    fetch_json_retry(listens_url, 2).then((listensData) => {
        listen3HTML.innerHTML = '<br><br>' + listensData.payload.listens[2].track_metadata.artist_name + '<br>'
         + listensData.payload.listens[2].track_metadata.track_name + '<br>' + listensData.payload.listens[2].track_metadata.release_name;
        console.log(listensData)
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