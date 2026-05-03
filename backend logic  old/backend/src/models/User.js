import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    sparse: true,
  },
  password: {
    type: String, // Optional since Google Login users won't have a password
  },
  avatar: String,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
