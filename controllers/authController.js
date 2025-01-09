const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {  
  register:async (req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    try {
      const user = await User.create({email, password});
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },

  login: async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid Email or Password' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({error: 'Invalid Email or Password 2'});
      }
      const token = await user.generateToken();
      res.json({token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },

  /*
  profile: async (req, res) => {
    res.json(req.user);
  },

  logout: async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
      await req.user.save();
      res.json({message: 'Logged out successfully'});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },

  refresh: async (req, res) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if (!user) {
        return res.status(401).json({error: 'Invalid Email or Password'});
      }
      const token = await user.generateToken();
      res.json({token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  } */
}

module.exports = authController
