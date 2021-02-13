var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		id: {type: Number, required: true},
		name: {type: String, required: true},
		price: {type: Number, required: true}
	},
	{ versionKey: false },
    { collection: 'products' }
);

module.exports = mongoose.model('Product', ProductSchema);