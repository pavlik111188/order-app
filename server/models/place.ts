import * as mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  title: {type: String, required: true },
  description: String,
  owner: {type: String, required: true },
  logo: String,
  location: [{ country: String, city: String, zip: String, address: String, coordinates: String}]
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
