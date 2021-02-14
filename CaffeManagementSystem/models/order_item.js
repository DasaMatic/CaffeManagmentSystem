var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema(
	{
        id: {type: Number},
        quantity: {type: Number, default: 1},
        product: {type: Schema.Types.ObjectId, ref: 'Product'},
        order: {type: Number, unique: false}
	},
	{ versionKey: false },
    { collection: 'orderitems' }
);

module.exports = mongoose.model('OrderItem', OrderItemSchema);