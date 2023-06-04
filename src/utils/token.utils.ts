import * as jwt from "jsonwebtoken"

export const createAccessToken = (userId: number, isAdmin: boolean) => {
    return jwt.sign({ userId, isAdmin }, "random-secret-access", {
        expiresIn: "30m",
    })
}

export const createRefreshToken = (userId: number, isAdmin: boolean) => {
    return jwt.sign({ userId, isAdmin }, "random-secret-refresh", {
        expiresIn: "10m",
    })
}

export const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, "random-secret-access")
}

export const verifyRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, "random-secret-access")
}
