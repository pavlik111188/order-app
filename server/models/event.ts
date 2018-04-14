import * as mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {type: String, required: true },
  description: String,
  date_start: Date,
  date_end: Date,
  place_id: String
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
