import { ConfigService } from "@nestjs/config"
import { IncomingMessage } from "http"
const { verify } = require('jsonwebtoken')


export const authContext = async (req: IncomingMessage, configService: ConfigService) => {
    let res = {
        "authorization": req.headers.authorization 
    }
    if (req.headers.authorization) {
        const decoded = verify(req.headers.authorization, configService.get('SECRET'))
        res["user"] = decoded
    }
    return res
}