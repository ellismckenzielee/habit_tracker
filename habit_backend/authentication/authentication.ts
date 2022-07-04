import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import passport from "passport";
import client from "../db/db";

dotenv.config();
const secret = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    console.log("in local strategy");
    const habitDb = client.db("habit_tracker");
    const users = habitDb.collection("users");
    const user = await users.findOne({ username });
    if (user) {
      done(null, user);
    } else {
      done("error", "user not found");
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    async (jwtPayload, done) => {
      console.log("JWT");
      const habitDb = client.db("habit_tracker");
      const users = habitDb.collection("users");
      const user = await users.findOne({ username: jwtPayload });
      if (user) {
        done(null, { username: user.username, userId: user._id });
      }
    }
  )
);
console.log("PASSPORT", passport);
export default passport;
