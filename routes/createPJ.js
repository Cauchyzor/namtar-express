const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

const aptCharMap = new Map();
aptCharMap.set('Athletisme', 'Vigueur');
aptCharMap.set('Pugilat', 'Vigueur');
aptCharMap.set('Coercion', 'Vigueur');
aptCharMap.set('Corps  à corps', 'Vigueur');
aptCharMap.set('Résistance', 'Vigueur');
aptCharMap.set('Coordination', 'Agilité');
aptCharMap.set('Artillerie', 'Agilité');
aptCharMap.set('Pilotage', 'Agilité');
aptCharMap.set('Distance - Légère', 'Agilité');
aptCharMap.set('Distance - Lourde', 'Agilité');
aptCharMap.set('Discrétion', 'Agilité');
aptCharMap.set('Informatique', 'Intelligence');
aptCharMap.set('Mécanique', 'Intelligence');
aptCharMap.set('Medecine', 'Intelligence');
aptCharMap.set('Résonance', 'Intelligence');
aptCharMap.set('Perception', 'Ruse');
aptCharMap.set('Magouille', 'Ruse');
aptCharMap.set('Survie', 'Ruse');
aptCharMap.set('Calme', 'Volonté');
aptCharMap.set('Sang-froid', 'Volonté');
aptCharMap.set('Vigilance', 'Volonté');
aptCharMap.set('Charme', 'Présence');
aptCharMap.set('Tromperie', 'Présence');
aptCharMap.set('Negociation', 'Présence');
aptCharMap.set('Commandement', 'Présence');

const aptTypeMap = new Map();
aptTypeMap.set('Athletisme', 'Général');
aptTypeMap.set('Pugilat', 'Combat');
aptTypeMap.set('Coercion', 'Général');
aptTypeMap.set('Corps  à corps', 'Comabt');
aptTypeMap.set('Résistance', 'Général');
aptTypeMap.set('Coordination', 'Utilitaire');
aptTypeMap.set('Artillerie', 'Combat');
aptTypeMap.set('Pilotage', 'Utilitaire');
aptTypeMap.set('Distance - Légère', 'Combat');
aptTypeMap.set('Distance - Lourde', 'Combat');
aptTypeMap.set('Discrétion', 'Utilitaire');
aptTypeMap.set('Informatique', 'Utilitaire');
aptTypeMap.set('Mécanique', 'Utilitaire');
aptTypeMap.set('Medecine', 'Utilitaire');
aptTypeMap.set('Résonance', 'Combat');
aptTypeMap.set('Perception', 'Général');
aptTypeMap.set('Magouille', 'Utilitaire');
aptTypeMap.set('Survie', 'Utilitaire');
aptTypeMap.set('Calme', 'Général');
aptTypeMap.set('Sang-froid', 'Général');
aptTypeMap.set('Vigilance', 'Général');
aptTypeMap.set('Charme', 'Social');
aptTypeMap.set('Tromperie', 'Social');
aptTypeMap.set('Negociation', 'Social');
aptTypeMap.set('Commandement', 'Social');

const aptDescMap = new Map();
aptDescMap.set('Athletisme', 'Athlétisme traduit les capacités physiques du personnage. C’est cette compétence qui détermine la capacité à escalader, nager, sauter, pousser et tirer dans le cadre d’un effort soutenu et prolongé.');
aptDescMap.set('Pugilat', 'Le combat à mains nues se résout par l’intermédiaire de cette compétence, les dégâts infl igés étant égaux à la valeur de Vigueur du personnage.');
aptDescMap.set('Coercion', 'Lorsqu’un personnage tente de se faire obéir par le biais de menaces ou d’intimidation physique, comme c’est le cas lors d’un interrogatoire musclé, il recourt à Coercition.');
aptDescMap.set('Corps  à corps', 'L’entraînement à l’utilisation meurtrière des armes au contact de l’ennemi se traduit par la compétence Corps à corps');
aptDescMap.set('Résistance', 'Cette compétence reflète la capacité du corps à dépasser les limites du raisonnable. Effectuez un test de Résistance lorsque vous tenter de rester éveillé, de résister à des substances toxiques, d’endurer un environnement inhospitalier ou de lutter contre les effets de la faim.');
aptDescMap.set('Coordination', 'Cette compétence mesure la souplesse et le sens de l’équilibre. Pour traverser une surface instable ou étroite, se libérer de liens ou chuter en limitant les dégâts, les personnages mettront leur Coordination à l’épreuve.');
aptDescMap.set('Artillerie', 'Les armes à distance montées sur des vehicules demande un savoir-faire particulier dans leur maniements. Cette aptitude comprends egalement le maniement des armes depuis un poste de pilotage d’un chasseur par exemple.');
aptDescMap.set('Pilotage', 'Cette compétence permet de se servir d’engins à répulseurs, d’avions ou de véhicules aquatiques en conditions diffi ciles, ou de distancer un adversaire lors d’une course ou d’une poursuite.');
aptDescMap.set('Distance - Légère', 'Les armes à distance dont le maniement ou la visée ne demande qu’une main, notamment les pistolets blasters et les petites armes de jet comme les grenades, sont régies par cette compétence.');
aptDescMap.set('Distance - Lourde', 'Les armes à distance dont le maniement ou la visée demande les deux mains, notamment les fusils blasters et les grandes armes de jet comme les lances et certaines haches, sont régies par cette compétence.');
aptDescMap.set('Discrétion', 'Cette compétence reflète la faculté de se soustraire à l’attention de l’adversaire, en échappant à l’un ou à l’ensemble de ses sens. Discrétion permet de fi ler une cible sans se faire remarquer, de se camoufl er et de dissimuler autrui ou des objets.');
aptDescMap.set('Informatique', 'Cette compétence traduit la maîtrise du personnage en matière de logiciels et de systèmes informatiques. Contourner un dispositif de sécurité technologique, consulter des archives cryptées, modifi er la programmation d’un droïde, récupérer des données sur un système corrompu : tout cela est géré par la compétence Informatique.');
aptDescMap.set('Mécanique', 'Cette compétence représente la familiarité du personnage avec les mécanismes qui composent les vaisseaux planétaires et atmosphériques, les droïdes, les armes et autres appareils. Toute tentative de réparation, de modifi cation ou de fabrication de ces dispositifs passe par un test de mécanique');
aptDescMap.set('Medecine', 'La compétence Médecine englobe l’aptitude à puiser dans le savoir anatomique et pathologique, à pratiquer les premiers soins et à reconnaître les cas urgents, à traiter les empoisonnements et à effectuer des opérations chirurgicales');
aptDescMap.set('Résonance', 'Maitriser les Echos de Namtar demande un long et fastidieux entrainement. Plus cette aptitude est élevée et plus vos competences, notament celles qui ne sont pas liées à une caractéristique physique, seront efficaces.');
aptDescMap.set('Perception', 'Perception englobe tous les sens naturels du personnage, soit généralement cinq pour un humain. On peut toutefois en compter davantage chez certains êtres dotés d’implants cybernétiques et chez certaines espèces. Cette compétence permet d’éviter les guets-apens et les pièges, de remarquer les voleurs et les individus sournois, de détecter les indices subtils et de percevoir les objets lointains.');
aptDescMap.set('Magouille', 'Magouilles englobe tout un arsenal de notions essentielles à l’exercice criminel. C’est le cas du crochetage des serrures, du vol à la tire et à l’étalage, des effractions dans les bâtiments surveillés, de la pose de pièges et de l’art du déguisement, entre autres vilenies.');
aptDescMap.set('Survie','Savoir identifier les menaces naturelles et s’y prendre avec les animaux domestiques, trouver de quoi manger et s’abriter, ou suivre une trace (qu’elle soit celle du gibier ou d’un fuyard) correspond à cette compétence');
aptDescMap.set('Calme', 'La faculté de rester serein et de réfléchir quand sa propre vie est en jeu est représentée par la compétence Calme. Les joueurs pourront effectuer des tests de Calme pour déterminer l’initiative lors des rencontres pour lesquelles leurs PJ auront posément préparé leurs actions (quand ils tendront une embuscade, par exemple).');
aptDescMap.set('Sang-froid', 'La faculté de conserver son flegme et de réagir de manière effi cace est mesurée par cette compétence. Sang-froid permet au personnage de voir clair dans le jeu des autres, d’agir posément sous la contrainte, de surmonter la peur et de résister à la tentation.');
aptDescMap.set('Vigilance', 'Quand se présente une situation de combat à laquelle les personnages n’ont pas pu se préparer, testez cette compétence pour déterminer l’ordre d’initiative. Un test de Vigilance peut en outre se présenter pour défi nir si un personnage a bien anticipé une situation donnée et s’il dispose d’un certain accessoire ou d’un avantage circonstanciel');
aptDescMap.set('Charme', 'Le Charmee correspond à la capacité qu’a le personnage de trouver le mot juste et sincère au bon moment. Cette compétence permet de persuader autrui, d’éveiller la serviabilité des gens et de séduire sans arrière-pensée.');
aptDescMap.set('Tromperie', 'La capacité à mentir de manière crédible est exprimée par la compétence Tromperie. Celle-ci gouverne des actions comme exagérer ou minimiser la valeur d’un objet, tricher aux jeux d’argent, déconcentrer un adversaire par une feinte, prétendre être épris d’autrui ou laisser une fausse piste à ses poursuivants.');
aptDescMap.set('Negociation', 'La compétence Négociation gère le marchandage, la vente et le commerce de produits et de services, dans le but d’en tirer le meilleur profi t.');
aptDescMap.set('Commandement', 'Commandement correspond à la capacité à prendre les bonnes décisions, à se montrer ferme et décisif ce faisant, et à susciter la loyauté et le respect. Cette compétence peut également servir à pousser une foule à l’action, à galvaniser les alliés quand la situation paraît désespérée et à reprendre l’ascendant sur un subalterne récalcitrant.');

router.get('/', function (req, res, next) {
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

  res.render('createPJ', { characteristics: characteristics, aptitudes: aptitudes });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  Object.filterAndTransform = (obj, regExp) => {
    const entries = Object.entries(obj)
      .filter(([name, score]) => regExp.test(name))
      .map(([k, v]) => [k.replace(regExp, ''), v]);
    return Object.fromEntries(entries);
  };

  const characteristics = Object.filterAndTransform(req.body, /^char_*/);
  const aptitudes = Object.filterAndTransform(req.body, /^apt_*/);

  const character = new Character({
    nom: req.body.pj_name,
    espèce: req.body.pj_species,
    bio: req.body.pj_biography,
    caractéristiques: characteristics,
    aptitudes: aptitudes,
    compétences: []
  });

  character.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
  // res.status(201).json({ message: 'Requête envoyée !' });
});

module.exports = router;
