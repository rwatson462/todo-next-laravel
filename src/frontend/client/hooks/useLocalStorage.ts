
type LocalStorage = {
  getItem: (name: string) => string|null,
  setItem: (name: string, value: string) => void
}

/**
 * The purpose of this hook is to deal with SSR trying to use localStorage (which isn't available on the server).
 * There is a risk that we set data in localStorage then attempt to display data from it - that will probably cause
 * hydration errors from Next.
 * Possible solution: switch to Cookies
 */
export default function useLocalStorage(): LocalStorage {
  return {
    getItem: (name: string) => {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(name)
      } else {
        return null
      }
    },
    setItem: (name: string, value: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(name, value)
      }
    }
  }
}
