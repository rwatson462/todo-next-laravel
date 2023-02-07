import {NextApiRequest, NextApiResponse} from "next";

export default function Unauthenticated(req: NextApiRequest, res: NextApiResponse) {
    res.status(401).send('Unauthorised')
}
