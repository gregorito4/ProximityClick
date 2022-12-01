const bcrypt = require('bcrypt');
const User = require('../model/User');

const signInController = async (req, res) => {
  const {userName, password} = req.body;
  User.findOne({userName}).then((user) => {
    if (!user) {
      return req.json({error: "This username doesn't exist"});
    }

    bcrypt.compare(password, user.password).then((isValid) => {
      if (!isValid) {
        return res.json({error: 'Your password is wrong! Try it again'})
      }
      const {id, name} = user;
      res.json({
        message: 'User logged success',
        id,
        name
      })
    })
  })
}

module.exports = signInController
