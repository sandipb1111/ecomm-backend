import { Request, Response, NextFunction } from "express"
import * as authService from "../services/auth.service"
import { StatusCodes } from "http-status-codes"

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body
        const { accessToken } = await authService.login(email, password)
        res.status(200).send(accessToken)
    } catch (err) {
        next(err)
    }
}

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await authService.register(req.body)
    res.sendStatus(StatusCodes.CREATED).send(data)
}
