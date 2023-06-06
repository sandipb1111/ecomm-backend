import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import * as categoryService from "../services/category.service"

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await categoryService.getProduct(parseInt(req.params.id))
        res.send(data).status(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}

export const getAllCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await categoryService.getAll()
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const postCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await categoryService.setProduct(req.body)
        res.send(data).sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await categoryService.updateProduct(
            parseInt(req.params.id),
            req.body
        )
        res.send(data).sendStatus(StatusCodes.ACCEPTED)
    } catch (err) {
        next(err)
    }
}

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await categoryService.deleteProduct(parseInt(req.params.id))
        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}
