/*import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import * as profileService from "../services/profile.service"

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await profileService.getProfile(req.user.userId)
        res.send(data).sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}

export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await profileService.updateProfile(
            req.user.userId,
            req.body
        )
        res.send(data).sendStatus(StatusCodes.ACCEPTED)
    } catch (err) {
        next(err)
    }
}
*/
