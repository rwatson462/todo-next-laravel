import C from 'cookies'
import { NextRequest } from 'next/server'
import {NextApiRequest, NextApiResponse} from "next";

export default function Cookies(
  request: NextRequest|NextApiRequest,
  response: NextApiResponse|undefined = undefined
): CookiesType {
  const cookies = new C(request, response)

  return {
    get: (name: string, defaultValue: string = '') => cookies.get(name) ?? defaultValue,
    set: (name: string, value: string, options: {}) => cookies.set(name, value, options),
    del: (name: string) => cookies.set(name),
    has: (name: string) => !!cookies.get(name)
  }
}
