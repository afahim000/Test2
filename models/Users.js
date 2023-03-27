const mongoose = require('mongoose');
//A Schema is like a blueprint
const Schema = mongoose.Schema;
const UserSchema = new Schema({

firstName:{type: String, required: true, trim: true},
lastName: {type: String, required: true, trim: true},
email: {type: String, required: true, trim : true, unique: true},
username: { type: String required: true, trim: true, unique: true},
password: { type: Schema.Types.Mixed},
profilePicture: { type: Buffer, default: '/assets/images/hero.png'}


	})

module.exports = mongoose.model("User", UserSchema);