export { rep };

    // functions 
function rep(s) { 
    let result = s;
    const r = [" OST", "/", " ", ">", ".", ",", ":", "#"]
    const w = ["", "", "-", "", "", "", "", ""]
    
    for (let i = 0; i < r.length; i++) {
        result = result.replaceAll(r[i], w[i]);
    }
    return result;
}
function fallback(element) {
    element.src = "src/assets/images/fallback.png";
    element.href = "https://listenbrainz.org/user/kazuiin_/";
}