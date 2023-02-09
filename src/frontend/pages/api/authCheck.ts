import {NextApiRequest, NextApiResponse} from "next";
import Cookies from "@/server/Cookies";
import UserRepository from "@/server/repository/UserRepository";
import {UserResponse} from "@/pages/api/login";
import setCookieToken from "@/server/functions/setCookieToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse|string>
) {
  const cookies = Cookies(req, res)
  const userRepository = UserRepository()

  try {

    const token = cookies.get('token')
    const response = await userRepository.check(token)
    setCookieToken(cookies, token)
    res.status(200).json({user: response.user})

  } catch (err) {

    const error = (err as ErrorType).message
    console.log(err, error)
    cookies.del('token')
    res.status(422).send(error)

  }
}
