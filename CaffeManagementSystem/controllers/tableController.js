var Table = require('../models/table');
var User = require('../models/user');


// Display list of tables
exports.table_list = function(req, res, next) {
	
	Table.find()
	.exec(function(err, list_tables) {
		if (err) { return next(err); }
		res.json(list_tables);
	});
};

// Find table by id
exports.table_with_id = function(req, res, next) {
	Table.find( { id: req.params.id } )
	.exec(function(err, table) {
		if (err) { return next(err); }
		res.json(table);
	});
};

// Insert new table without id
exports.insert_table = function(req, res, next) {
	
	Table.findOne().sort({id: -1}).exec(function(err, lastTable) {
		var newID = lastTable.id + 1;
		var table = new Table({
			id: newID,
			position: req.params.position
		});
	
		table.save(function (err, newtable) {
			if(err){ return next(err); }
			res.json(newtable);
		});
	});
};

// Delete table with id
exports.delete_table = function(req, res, next) {

	Table.deleteOne({ id: req.params.id }, function (err) {
		if (err) return next(err);
		res.send("Table with id=" + req.params.id + " is deleted!");
	});
};

// Update table with id
exports.update_table = function(req, res, next) {
	Table.update({ 
		id: req.params.id 
	}, { 
		$set: {
			 position: req.params.position,
			 }
	}, function (err, numAffected) {
		if (err) return next(err);
		res.send("Table with id=" + req.params.id + " is updated!");
	});	
};

// Update product with id
exports.table_api = function(req, res, next) {
	User.findById(req.session.userId)
    .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null || user.flag !== 'admin') {
                var err = new Error('Not authorized, you must log in first! Go back!');
                err.status = 400;
                return res.send(err.message);
            } else {
				res.render('table_api');
			}
        }
    });
}





