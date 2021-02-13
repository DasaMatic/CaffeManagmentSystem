var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema(
	{
		id: {type: Number, required: true, unique: true},
		session: {type: String, required: true},
		date_time: {type: String, required: true}
	},
	{ versionKey: false },
    { collection: 'sessionsStorage' }
);

module.exports = mongoose.model('Session', SessionSchema);