import * as express from 'express';

import EventCtrl from './controllers/event';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';
import PlaceCtrl from './controllers/place';

export default function setRoutes(app) {

  const router = express.Router();

  const eventCtrl = new EventCtrl();
  const placeCtrl = new PlaceCtrl();
  const userCtrl = new UserCtrl();

  // Events
  router.route('/events').get(eventCtrl.getAll);
  router.route('/events/count').get(eventCtrl.count);
  router.route('/event').post(eventCtrl.insertM);
  router.route('/event/:id').get(eventCtrl.get);
  router.route('/event/:id').put(eventCtrl.update);
  router.route('/event/:id').delete(eventCtrl.delete);

  // Places
  router.route('/places').get(placeCtrl.getAll);
  router.route('/places/count').get(placeCtrl.count);
  router.route('/place').post(placeCtrl.insert);
  router.route('/place/:id').get(placeCtrl.get);
  router.route('/place/:id').put(placeCtrl.update);
  router.route('/place/:id').delete(placeCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
