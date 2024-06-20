import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = model('User', UserSchema);
