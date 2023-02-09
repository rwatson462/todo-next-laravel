
export default function setCookieToken(cookies: CookiesType, token: string): void {
  cookies.set('token', token, { maxAge: process.env.COOKIE_MAX_TIME })
}
