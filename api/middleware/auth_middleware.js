import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtKey = process.env.JWT_KEY;

const authMiddleWare = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, jwtKey);
      const userId = decodedToken.userId;
      req.auth = {
         userId: userId,
      };
      next();
   } catch (error) {
      res.status(403).json({ error });
   }
};

export default authMiddleWare;
