const router = require('express').Router();

router.route('/map').get((req, res) => {
  res.render('map');
});

module.exports = router;

