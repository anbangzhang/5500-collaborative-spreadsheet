
function getCookie(name: string) {
    // split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(';');
   
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=');
       
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function setCookie(name: string, value: string, daysToLive: number) {
    // By default, set cookie to expire in 1 day
    var cookie = name + "=" + encodeURIComponent(value);

    cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
   
    document.cookie = cookie;
}

export { getCookie, setCookie };