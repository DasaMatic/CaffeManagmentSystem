var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
	{
        id: {type: Number},
        date: {type: Date},
        sumValue: {type: Number},
        storn: {type: Boolean, required: true, default: false},
        tableId: {type: Number},
        userId: {type: Schema.Types.ObjectId, ref: 'User'},
        finalize: {type: Boolean, default: false}
	},
	{ versionKey: false },
    { collection: 'orders' }
);

module.exports = mongoose.model('Order', OrderSchema);