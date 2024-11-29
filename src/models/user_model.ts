import mongoose, { Schema, Types } from "mongoose";

export interface IUserModel {
  _id: Types.ObjectId;
  name: string;
  password: string;
}

const userSchema = new Schema<IUserModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<IUserModel>("Users", userSchema);
