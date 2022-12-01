const {Schema, model} = require('mongoose');

const OrderSchema = new Schema({
  date: {type: Date},
  hour: {type: String},
  width: {type: Number},
  hight: {type: Number},
  large: {type: Number},
  weight: {type: Number},
  quantity: {type: Number},
  senderAddress: {type: String},
  senderCity: {type: String},
  senderPhone: {type: String},
  senderCellPhone: {type: String},
  targetAddress: {type: String},
  targetCity: {type: String},
  receiverPhone: {type: String},
  status: {type: String},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
}
);

module.exports = model('Order', OrderSchema);
