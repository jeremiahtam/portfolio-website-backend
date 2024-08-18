import express from "express"
import projectsRouter from './src/routes/projectsRoute'
import contactMeRouter from './src/routes/contactMeRoute'
import userRouter from './src/routes/usersRoute'
import filesRouter from './src/routes/filesRoute'
import authRouter from './src/routes/authRoute'
import { authWithPassport } from "./src/middleware/authentication"

import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from 'mongoose'
import MongoStore from "connect-mongo";
import cors from 'cors'
import fileUpload from 'express-fileupload'
import serverless from "serverless-http";

export const createApp = () => {
  let app = express();
  // default options
  app.use(fileUpload());

  /** cors Setup*/
  const origin1 = process.env.CORS_ORIGIN_URL_1 as string
  const allowedOrigins = origin1;
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200
  };
  app.use(cors(options))

  /** Middleware to accepts json body for post requests */
  app.use(express.json())
  app.use(cookieParser())

  /** Sessions configuration */
  app.use(session({
    secret: 'tam secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE_CONNECTION_URI
      // client: mongoose.connection.getClient()
    })
  }))

  /** Authentication with passport.js */
  app.use(passport.initialize())

  /** Iniitialise sessions */
  app.use(passport.session())

  //import strategy
  authWithPassport

  /** All routers to be used */
  app.use(projectsRouter)
  app.use(contactMeRouter)
  app.use(filesRouter)
  app.use(userRouter)
  app.use(authRouter)

  return app;
}