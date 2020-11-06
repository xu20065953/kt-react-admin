import Cookies from 'js-cookie'

const TokenKey = "token"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRefreshToken(refresh_token){
    return Cookies.set("refresh_token", refresh_token)
}
export function getRefreshToken(){
    return Cookies.get("refresh_token")
}
