import jwt from "jsonwebtoken";
import { securityModel } from "../models/security.model.js"
import { userModel } from "../models/user.model.js"

export const generateToken = async (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 1;
    try {
        const user = await userModel.findOne(uid);
        if (!user) throw new Error("Usuario no encontrado");

        const permissions = await securityModel.findPermissionsByUserId(uid);
        const flattenedPermissions = [].concat(...permissions).map(p => p.permiso_id);

        const token = jwt.sign(
            { uid, permissions: flattenedPermissions },
            process.env.JWT_SECRET,
            { expiresIn }
        );
        // Set cookie with the token
        res.cookie("tokenInfo", token, {
            httpOnly: process.env.MODO === "developer",
            secure: process.env.MODO !== "developer",
            sameSite: 'none',
            expires: new Date(Date.now() + expiresIn * 1000)
        });

        return { token, expiresIn };
    } catch (error) {
        console.log("Generate Token error: " +error)
    }
}
