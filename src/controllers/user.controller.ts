/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import * as userService from "../services/user.service"
import { StatusCodes } from "http-status-codes"

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await userService.postUser(req.body)
        res.sendStatus(StatusCodes.CREATED).send(data)
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userService.updateUser(req.params.id, req.body)
        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}
