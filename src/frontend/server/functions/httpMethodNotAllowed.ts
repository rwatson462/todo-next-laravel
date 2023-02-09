import {NextApiRequest, NextApiResponse} from "next";

export default function httpMethodNotAllowed(
  request: NextApiRequest,
  response: NextApiResponse,
  method: string
): boolean {
  if (request.method?.toUpperCase() !== method.toUpperCase()) {
    response.status(400).send(`Invalid request method ${request.method}, expecting ${method}`)
    return true
  }

  return false
}
