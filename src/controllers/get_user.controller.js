const User = require('../model/User');

const getUserController = async (req, res) => {
  const {id} = req.params

  if (id.length !== 24) {
    return res.json({error: "Your credentials don't matched"})
  }

  User.findById(id).then((user) => {
    if (!user) {
      return res.json({error: 'This user does not exist'})
    }
    const {_id, password, _v, ...rest} = user._doc
    res.json(rest)
  })
}

module.exports = getUserController
