import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import * as productService from "../services/product.service"

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await productService.getProduct(parseInt(req.params.id))
        res.send(data).status(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}

export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await productService.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const postProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await productService.setProduct(req.body)
        res.sendStatus(StatusCodes.CREATED).send(data)
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await productService.updateProduct(
            parseInt(req.params.id),
            req.body
        )
        res.sendStatus(StatusCodes.CREATED).send(data)
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await productService.deleteProduct(parseInt(req.params.id))
        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}
