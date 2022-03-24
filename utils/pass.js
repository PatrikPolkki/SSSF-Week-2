"use strict";
import passport from "passport";
import { Strategy } from "passport-local";
import { getUserLogin } from "../models/userModel";
import passportJWT from "passport-jwt";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      const [user] = getUserLogin(params);
      console.log("Local strategy", user);
      if (user === undefined) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  })
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "Helsinki",
    },
    async (jwtPayLoad, done) => {
      try {
        if (jwtPayLoad === undefined) {
          return done(null, false, { message: "Incorrect id." });
        }
        // jwt matches
        return done(
          null,
          { ...jwtPayLoad },
          { message: "Logged in succesfully" }
        );
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
