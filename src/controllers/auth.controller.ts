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
        const { accessToken, refreshToken } = await authService.login(
            email,
            password
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/api/auth/refresh",
        })

            .status(200)
            .json({ "Access-Token": accessToken })
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

export const userLogOut = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.clearCookie("refreshToken").send()
}

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.cookies
    try {
        const token = await authService.refreshToken(refreshToken)
        res.json({ accessToken: token })
    } catch (err) {
        next(err)
    }
}
