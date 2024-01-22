const mongoose = require("mongoose")

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

//  mongoose.set('debug', true);

mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true}, (err) => {
	if (!err)
		console.log('MongoDB connection successful.');
	else
	console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});



module.exports = mongoose;