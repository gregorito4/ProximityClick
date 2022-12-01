const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name: {type: String, require: true},
  userName: {type: String, require: true, unique: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
},
{
  timestamps: true
}
);

module.exports = model('User', UserSchema);
