const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});



userSchema.methods.generateToken = async function() {
  const user = this;

  const secretKey = process.env.JWT_SECRET || 'minha_chave_secreta';

  const token = jwt.sign({_id: user._id}, secretKey, {expiresIn: '1d'});
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.methods.comparePassword = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;