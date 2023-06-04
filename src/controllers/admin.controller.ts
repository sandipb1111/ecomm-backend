/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import * as adminService from "../services/admin.service"
import { StatusCodes } from "http-status-codes"

export const readOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await adminService.displayOne(parseInt(req.params.id))
    res.send(data)
}

export const readUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = await adminService.display()
    res.send(data)
}

export const postUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password, isAdmin, phone_number } = req.body
        const data = await adminService.createUser(
            email,
            password,
            isAdmin,
            phone_number
        )
        res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await adminService.deleteUser(parseInt(req.params.id))
        res.status(200).send(data)
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
        await adminService.updateUser(req.params.id, req.body)
        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}
