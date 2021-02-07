const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.findUser = (req, res) => {
    // req.userId should be populated by a middleware auth
    User.findOne({ _id: req.userId })
        .then(user => res.status(200).render('userInfo', { user: user }))
        .catch(error => res.status(400).json({ error }));
};

exports.loging = (req, res, next) => {
    User.findOne({ pseudo: req.body.pseudo })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'utilisateur introuvable !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!' });
                    }
                    req.session.token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET', { expiresIn: '24h' });
                    res.status(200).redirect('/user/profil');
                });
        })
        .catch(error => res.status(500).json({ error }));
};

/* GET users listing. */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
