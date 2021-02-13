var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
	{
		id: {type: Number, required: true, unique: true},
		position: {type: String, required: true}
	},
	{ versionKey: false },
    { collection: 'tables' }
);

module.exports = mongoose.model('Table', TableSchema);