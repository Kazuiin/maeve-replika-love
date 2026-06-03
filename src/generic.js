export { rep };

function rep(s) { 
    let result = s;
    const r = [" OST", "/", " ", ">", ".", ",", ":", "#"]
    const w = ["", "", "-", "", "", "", "", ""]
    
    for (let i = 0; i < r.length; i++) {
        result = result.replaceAll(r[i], w[i]);
    }
    return result;
}