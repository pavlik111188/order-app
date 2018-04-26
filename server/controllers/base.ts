import * as jwt from 'jsonwebtoken';
abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  // Count all
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.status(200).json(count);
    });
  }

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

  // Insert middleware
  insertM = (req, res) => {
    const decoded = checkToken(req.headers.token);
    console.log(req.body);
    if (decoded) {
      const roles = decoded['role'];
      if (roles.indexOf('client') > -1) {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
          // 11000 is the code for duplicate key error
          if (err && err.code === 11000) {
            res.status(403).json({success: false, error: err});
          }
          if (err) {
            return res.status(403).json({success: false, error: err});
          }
          res.status(200).json({success: true, item: item });
        });
      } else {
        res.status(403).json({success: false, error: 'you do not have permissions'});
      }
    } else {
      res.status(403).json({success: false, error: 'incorrect token'});
    }
  }

  // Get by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

}

function checkToken(token) {
  let decoded = '';
  try {
    decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!decoded['user']) {
      return false;
    } else {
      return decoded['user'];
    }
  } catch (err) {
    return false;
    // return res.status(403).json({success: false, error: 'incorrect token'});
  }
}

export default BaseCtrl;
