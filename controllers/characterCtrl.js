const Character = require('../models/Character');
const Skill = require('../models/Skill');
const User = require('../models/User');
const aptCharMap = require('../models/AptitudeCharacteristics');
const aptTypeMap = require('../models/AptitudesAttributes');
const aptDescMap = require('../models/AptitudesDescription');
const Game = require('../models/Game');

exports.selectCharacter = (req, res, next) => {
    // req.userId should be populated by a middleware auth
    console.log(req.userId);
    User.findOne({ _id: req.userId })
        .populate('characters')
        .then(user => { res.render('characterSelection', { user: user }); })
        .catch(next);
};

exports.getAllSkill = (req, res, next) => {
    Skill.find()
        .then(skills => res.render('characterSkills', { skills: skills }))
        .catch(next);
};

exports.getCharacterInfo = (req, res, next) => {
    Character.findOne({ _id: req.query._id })
        .populate('compétences')
        .then((character) => {
            const aptitudes = Object.entries(character.aptitudes);
            const characteristics = Object.entries(character.caractéristiques);

            aptitudes.shift();
            characteristics.shift();
            res.render('characterSheet', { character: character, characteristics: characteristics, aptitudes: aptitudes, skills: character.compétences });
        })
        .catch(next);
};

exports.getCharacterCreation = (req, res, next) => {
    // req.userId should be populated by a middleware auth
    let games;
    Game.find()
        .then(premiseGame => {
            games = premiseGame;
            return Skill.find();
        })
        .then(skills => {
            const characteristics = [];
            const aptitudes = [];
            Character.schema.eachPath((path) => {
                if (/^caractéristiques.*/.test(path)) {
                    return characteristics.push({
                        name: path.replace(/^(caractéristiques.)*/, '')
                    });
                } else if (/^aptitudes.*/.test(path)) {
                    return aptitudes.push({
                        name: path.replace(/^(aptitudes.)*/, ''),
                        characteristic: aptCharMap.get(path.replace(/^(aptitudes.)*/, '')),
                        type: aptTypeMap.get(path.replace(/^(aptitudes.)*/, '')),
                        description: aptDescMap.get(path.replace(/^(aptitudes.)*/, ''))
                    });
                }
            });
            res.render('characterCreation', { games: games, characteristics: characteristics, aptitudes: aptitudes, skills: skills });
        })
        .catch(next);
};

exports.createCharacter = (req, res, next) => {
    Object.filterAndTransform = (obj, regExp) => {
        const entries = Object.entries(obj)
            .filter(([name, score]) => regExp.test(name))
            .map(([k, v]) => [k.replace(regExp, ''), v]);
        return Object.fromEntries(entries);
    };

    const characteristics = Object.filterAndTransform(req.body, /^char_*/);
    const aptitudes = Object.filterAndTransform(req.body, /^apt_*/);
    const skill = Object.filterAndTransform(req.body, /^skl_*/);
    const game = Object.filterAndTransform(req.body, /^game_*/);

    const character = new Character({
        nom: req.body.pj_name,
        espèce: req.body.pj_species,
        bio: req.body.pj_biography,
        caractéristiques: characteristics,
        aptitudes: aptitudes,
        compétences: Object.keys(skill)
    });

    character.save()
        .then(character => User.updateOne({ _id: req.userId }, { $push: { characters: character._id } }))
        .then(() => Game.updateOne({ _id: Object.keys(game).pop() }, { $push: { charactersPlaying: character._id } }))
        .then(() => res.status(201).json({ message: 'Personnage créé avec succès' }))
        .catch(next);
};
