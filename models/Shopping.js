var mongoose = require('mongoose');

var ShoppingSchema = new mongoose.Schema({
  Name: String,
  purchases: {type: Number, default:0},
  price: {type: Number, default:0},
  urlvalue: String
});

ShoppingSchema.methods.purchase = function(cb) {
  this.purchases += 1;
  this.save(cb);
};

mongoose.model('Shopping',ShoppingSchema);
