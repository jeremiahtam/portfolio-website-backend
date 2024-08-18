import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  name: {
    type: Schema.Types.String,
    required: true,
  }
});

export const UsersModel = model("Users", UsersSchema)