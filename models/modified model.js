const mongoose = require('mongoose');
//A Schema is like a blueprint
const Schema = mongoose.Schema;
//Beginning of the schema
//This defines an invidual scoring of an animal. It consists of the attributes defined below
const animalSchema = new Schema({
//The unique identifier for the specific instance of the animal. This number is incremented based on the size of the 
//database. eg. the first entry is 1, the 100th entry is 100 etc.
 id: {
    type: Number,
    unique: [true, 'Need an ID number'],
  },

//Name of the animal
  animalName:
  {
  	type: String,
    required: true,
    default: 'N/A'
  },
//The recorder will have a first and last name. Also contains a reference attribute to the user schema which is any member 
//in the BCR lab. This field is not required to create an instance since there can be data collected from the webscraper
  recorder:
  {
  	first: {type: String, required: true},
    last: {type:String, required: false},
    user: {type: Schema.Types.ObjectId, ref: "User", required: false}
  },

  date:
  {
  		type: Date,
      required: true
  },

  location:
  {
    Country: String,
    State: String,
    city: String,
    latitude: Number,
    Longitude: Number,
  },
//Either video , audio or image
  mediaType:
  {
  		type: String,
      required: true
  },
//Storing a media file here probably will require a media file schema.
  MediaFile:
  {
  	type: String
  },
});
//Virtual functions add a logical component to the Schema. Not stored in the database.
animalSchema.virtual('Date').get(function(){
  return this.date.toLocaleString();
});
//Still a work in progress. Might consider a nest location schema which can validate with the longitude and latitude of 
//the given data and return the nest number if the data corresponds to a nest location. 
//
animalSchema.virtual('Location').get(function(){
  return `longitude: ${this.location.longitude} latitude: ${this.location.latitude}`
});
//Stores the schema as an ODM (Object Data Model)
module.exports = mongoose.model("Animal", animalSchema);
