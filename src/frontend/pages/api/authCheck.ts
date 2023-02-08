import {NextApiRequest, NextApiResponse} from "next";
import Cookies from "@/server/Cookies";
import UserRepository from "@/server/repository/UserRepository";
import {ErrorResponse, UserResponse} from "@/pages/api/login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse|ErrorResponse>
) {
  const cookies = Cookies(req, res)
  const userRepository = UserRepository()

  try {

    const token = cookies.get('token')
    const response = await userRepository.check(token)
    cookies.set('token', token, { maxAge: 1800000})  // Should be half an hour
    res.status(200).json({user: response.user})

  } catch (err) {

    const error = (err as {message: ErrorResponse}).message as ErrorResponse
    cookies.del('token')
    console.log(err, error)
    res.status(422).send(error)

  }
}
