const user = "kazuiin_";
const lb_root = "https://api.listenbrainz.org/1";
const listens_url = `${lb_root}/user/${user}/listens?count=8`;
const now_playing_url = `${lb_root}/user/${user}/playing-now`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

    // parse
    return await res.json();
}

const listensData = await fetch_json_retry(listens_url, 2);
const nowPlayingData = await fetch_json_retry(now_playing_url, 2);
