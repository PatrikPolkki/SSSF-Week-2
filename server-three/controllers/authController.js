"use strict";
import jwt from "jsonwebtoken";
import passport from "../utils/pass";

const login = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("authcontroller user:", user);
    if (err || !user) {
      return res.status(400).send("Error loggin in");
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.status(400).send("Error logging in.");
      }
      const { id, name, email } = user;
      const tokenUser = {
        id: id,
        name: name,
        email: email,
      };
      const token = jwt.sign(tokenUser, "Helsinki");
      return res.status(200).json({ message: token });
    });
  })(req, res);
};

export { login };
