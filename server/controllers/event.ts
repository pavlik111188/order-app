import Event from '../models/event';
import BaseCtrl from './base';
import * as jwt from 'jsonwebtoken';

export default class EventCtrl extends BaseCtrl {
  model = Event;
}
