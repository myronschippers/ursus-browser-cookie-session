const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp(`${cookieName}[^;]+`).exec(rawCookies());
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');
};

const rawCookies = () => {
    return document.cookie;
};

const setCookie = (cookieName, cookieValue) => {
    document.cookie = `${cookieName}=${cookieValue}`;
};

export {
    getCookie,
    rawCookies,
    setCookie,
};