import * as mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {type: String, required: true },
  description: String,
  date_start: {type: Date, default: Date.now},
  date_end: {type: Date, default: +new Date() + 1*24*60*60*1000},
  place_id: String
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
