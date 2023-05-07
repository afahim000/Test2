const mongoose = require('mongoose');
//A Schema is like a blueprint
const Schema = mongoose.Schema;
const UserSchema = new Schema({

firstName:{type: String, required: true, trim: true},
lastName: {type: String, required: true, trim: true},
email: {type: Schema.Types.Mixed, required: true, trim : true, unique: true},
password: { type: String, required: true},
TLA: {type: String, required: true },
profilePicture: { type: String , default: '/assets/images/hero.png'},
role: String
	})

module.exports = mongoose.model("User", UserSchema);