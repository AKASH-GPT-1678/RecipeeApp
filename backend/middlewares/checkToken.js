import jwt from "jsonwebtoken"


let JWT_SECRET = process.env.JWT_SECRET;
export async function verifyToken(token) {
    try {
        const verfication = await jwt.verify(token, JWT_SECRET);
        return verfication
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { message: "Token Expired" }
        } else {
            return null
        }
    }

}
