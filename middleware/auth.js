const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decodeToken = jwt.verify(req.session.token, 'RANDOM_SECRET');
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      // eslint-disable-next-line no-throw-literal
      throw 'User ID non valable !';
    } else {
      req.userId = userId;
      next();
    };
  } catch (error) {
    // res.status(401).json({ error: error | 'Requête non authorisée !' });
    res.redirect('/user/');
  }
};
