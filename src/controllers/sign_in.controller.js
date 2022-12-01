const bcrypt = require('bcrypt');
const User = require('../model/User');

const signInController = async (req, res) => {
  const {name, userName, email, password} = req.body

  User.findOne({email})
  .then((user) => {
    if (user) {
      return res.json({ error: 'Email already exists' });
    } else if (!name || !email || !password) {
      return res.json({ error: "There's an empty field. Please make sure you have filled up all"});
    } else {
      bcrypt.hash(password, 10, (error, hashedPaswword) =>{
        if (error) {
          return res.json({error})
        }
        const newUser = new User({
          name, userName, email, password: hashedPaswword
        });

        newUser.save()
        .then((user) => res.json({
          message: 'User created correctly', user
        })
        )
        .catch((error) => console.error(error))
      })
    }
  })
}

module.exports = signInController
