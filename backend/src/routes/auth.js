import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User.js';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'dev-secret-key';
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });
};

router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture: avatar } = payload;
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        email,
        name,
        googleId,
        avatar,
      });
    } else if (!user.googleId) {
      // Update existing user with googleId
      user.googleId = googleId;
      if (!user.avatar) user.avatar = avatar;
      await user.save();
    }
    
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Simple dummy sign up for non-google
router.post('/signup', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });
    
    user = await User.create({ email, name, password });
    
    res.json({ token: generateToken(user), user: { id: user._id, email, name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simple dummy login for non-google
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.password !== password) return res.status(401).json({ error: 'Invalid password' });
    
    res.json({ token: generateToken(user), user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
