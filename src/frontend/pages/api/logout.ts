import {NextApiRequest, NextApiResponse} from "next";
import Cookies from "@/server/Cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const cookies = Cookies(req, res)
  cookies.del('token')
  res.status(200).send()
}
