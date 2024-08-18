import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UsersModel } from "../models/Users";
import { comparePassword } from "../utils/helpers";

declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number;
    }
  }
}

/** Authentication of user account with passport.js */
/** Serialize user helps to store authenticated data in sessions
 * With mongoose attached to sessions in this app, the session id of the data
 * is automatically saved in the mongoose database
 */
passport.serializeUser((user, done) => {
  done(null, user.id)
})

/**
 * Deserializeing of the user, gets the saved session id in the database
 */

passport.deserializeUser(async (id, done) => {
  try {
    const foundUser = await UsersModel.findById(id)
    if (!foundUser) {
      throw new Error('User not found')
    }
    done(null, foundUser)
  } catch (err) {
    done(err, null)
  }
})

export const authWithPassport = passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async (email: any, password: any, done: any) => {
      try {
        const foundUser = await UsersModel.findOne({ email: email })
        if (!foundUser) {
          throw new Error('User not found')
        }
        if (!comparePassword(password, foundUser.password)) {
          throw new Error('Email or password is incorrect')
        }
        console.log(foundUser)
        done(null, foundUser)
      } catch (err: any) {
        done(err, false)
      }
    })
)