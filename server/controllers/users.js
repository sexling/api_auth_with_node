const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signToken = user => {
  const payload = {
    id: user.id,
  };
  return (token = jwt.sign(payload, 'superspecialawesome', {
    expiresIn: '5m',
  }));
};

module.exports = {
  async signUp(req, res, next) {
    const { email, password } = req.value.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'Email taken' });
    }

    const user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // use try..catch next time
    await user.save();

    const token = signToken(user);

    res.status(201).json({ token });
  },
  async signIn(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const token = signToken(user);

    res.status(200).json({ token });
  },
  async googleOAuth(req, res, next) {
    const user = req.value.user;
    const token = signToken(user);

    res.status(201).json({ token });
  },
  async facebookOAuth(req, res, next) {
    const user = req.value.user;
    const token = signToken(user);

    res.status(201).json({ token });
  },
  async secret(req, res, next) {
    console.log('Users controller secret called!');
    res.status(200).send('nope no secret here ;)');
  },
};
