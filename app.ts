import mongoose from 'mongoose'
import dotenv from "dotenv";
import { createApp } from "./createApp";

/* configures dotenv to work in your application*/
dotenv.config();

/** mongodb connection */
mongoose.connect(process.env.MONGOOSE_CONNECTION_URI as string, { dbName: 'portfolio-website' })
  .then(() => console.log("Conneced to database"))
  .catch((err) => console.log(`Error: ${err}`))

/** Create app connection */
const app = createApp();
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});