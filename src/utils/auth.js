import Cookies from "js-cookie";

const accessTokenKey = "crow_access_token";
const refreshTokenKey = "crow_refresh_token";

const objectCookies = {
  expires: 30,
  domain: process.env.COOKIE_DOMAIN,
};

export const saveToken = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, {
      ...objectCookies,
    });
    Cookies.set(refreshTokenKey, refresh_token, {
      ...objectCookies,
    });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objectCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objectCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};

export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);

  return { access_token, refresh_token };
};

export const logOut = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objectCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objectCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};
