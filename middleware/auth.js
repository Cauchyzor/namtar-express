const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.session);
    const decodeToken = jwt.verify(req.session.token, 'RANDOM_SECRET');
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      console.log('Décoded !');
      req.user = userId;
      next();
    };
  } catch (error) {
    // res.status(401).json({ error: error | 'Requête non authorisée !' });
    res.redirect('/user/');
  }
};
