import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//? Register user
export const registerUser = async (req, res) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(req.body.password, salt);
   req.body.password = hashedPass;
   const newUser = new UserModel(req.body);
   const { username } = req.body;

   try {
      const oldUser = await UserModel.findOne({ username });

      if (oldUser) {
         return res
            .status(400)
            .json({ message: "This email address is already being used" });
      }
      const user = await newUser.save();

      const token = jwt.sign(
         {
            username: user.username,
            id: user._id,
         },
         process.env.JWT_KEY,
         { expiresIn: "12h" }
      );
      // user.token = token // Si on fait ainsi, pas besoin d'ajouter "token" au res.status plus bas
      res.status(200).json({ user, token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

//? Login user
export const loginUser = async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await UserModel.findOne({
         username: username.toLowerCase(),
      });

      if (user) {
         const validity = await bcrypt.compare(password, user.password);

         // Before Token
         /*          validity 
            ? res.status(200).json(user)
            : res.status(404).json("Wrong Password"); */

         if (!validity) {
            res.status(400).json("Wrong password");
         } else {
            const token = jwt.sign(
               {
                  username: user.username,
                  id: user._id,
               },
               process.env.JWT_KEY,
               { expiresIn: "12h" }
            );
            res.status(200).json({ user, token });
         }
      } else {
         res.status(404).json("User does not exists");
      }
   } catch (error) {}
};
