
type CookiesType = {
  get: (name: string, defaultValue: string = '') => string,
  set: (name: string, value: string, options: {}) => void,
  del: (name: string) => void,
  has: (name: string) => boolean,
}


type ErrorType = {
  message: string
}
