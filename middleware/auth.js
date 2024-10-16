import User from "../models/user.js";
import { verifyToken } from "../helper/jwt.js";
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const payload = verifyToken(token);
        const user = await User.findOne({ _id: payload.id });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = {...user,_id:user._id.toString()};

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthorized" });
    }

}