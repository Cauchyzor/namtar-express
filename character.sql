-- This sequence provide the structure of the 'character' database on SQLITE DBMS

CREATE TABLE mark (
name TEXT NOT NULL,
description TEXT,
cost INTEGER,
PRIMARY KEY(name));


CREATE TABLE skill (
name TEXT NOT NULL,
description TEXT,
type TEXT,
PRIMARY KEY(name));


CREATE TABLE skill_mark_set (
rank INTEGER NOT NULL,
skill_name TEXT NOT NULL,
mark_name TEXT NOT NULL,CONSTRAINT "mark-skill_mark"
FOREIGN KEY (mark_name)
REFERENCES mark(name)
,CONSTRAINT "skill-skill_mark"
FOREIGN KEY (skill_name)
REFERENCES skill(name)
ON DELETE Cascade
ON UPDATE Cascade,
PRIMARY KEY(skill_name,mark_name));


CREATE TABLE character_skill_set (
character_name TEXT NOT NULL,
skill_name TEXT NOT NULL,CONSTRAINT "skill-character_skill"
FOREIGN KEY (skill_name)
REFERENCES skill(name)
ON DELETE Cascade
ON UPDATE Cascade
,CONSTRAINT "character-character_skill"
FOREIGN KEY (character_name)
REFERENCES character(name)
ON DELETE Cascade
ON UPDATE Cascade,
PRIMARY KEY(character_name,skill_name));


CREATE TABLE character_aptitude_set (
rank INTEGER NOT NULL,
character_name TEXT NOT NULL,
aptitude_name TEXT NOT NULL,CONSTRAINT "aptitude-character_aptitude"
FOREIGN KEY (aptitude_name)
REFERENCES aptitude(name)
ON DELETE Cascade
ON UPDATE Cascade
,CONSTRAINT "character-character_aptitude"
FOREIGN KEY (character_name)
REFERENCES character(name)
ON DELETE Cascade
ON UPDATE Cascade,
PRIMARY KEY(character_name,aptitude_name));


CREATE TABLE character_characteristic_set (
rank INTEGER NOT NULL,
characteristic_name TEXT NOT NULL,
character_name TEXT NOT NULL,CONSTRAINT "character-character_characteristic"
FOREIGN KEY (character_name)
REFERENCES character(name)
ON DELETE Cascade
ON UPDATE Cascade
,CONSTRAINT "characteristic-character_characteristic"
FOREIGN KEY (characteristic_name)
REFERENCES characteristic(name)
ON DELETE Cascade
ON UPDATE Cascade,
PRIMARY KEY(characteristic_name,character_name));


CREATE TABLE aptitude (
name TEXT NOT NULL,
description TEXT,
type TEXT,
characteristic_name TEXT NOT NULL,CONSTRAINT "characteristic-aptitude"
FOREIGN KEY (characteristic_name)
REFERENCES characteristic(name)
ON DELETE Cascade
ON UPDATE Cascade,
PRIMARY KEY(name));


CREATE TABLE characteristic (
name TEXT NOT NULL,
description TEXT,
PRIMARY KEY(name));


CREATE TABLE character (
name TEXT NOT NULL,
species TEXT,
biography TEXT,
PRIMARY KEY(name));




-- Creation du jeu de donnée initial

INSERT INTO characteristic (name,description)
VALUES 
('Vigueur','La Vigueur regroupe la puissance physique ; la force brute et la robustesse du personnage, mais aussi sa capacité à s''en servir quand il le faut.'),
('Agilité','L''Agilité mesure l''adresse, la coordination et la précision. Les personnages dotés d''une Agilité élevée ont un bon sens de l''équilibre, sont souples et habiles de leurs mains.'),
('Intelligence','L''Intelligence reprend les facultés de compréhension, l''éducation, l''acuité mentale ; et les capacités de raisonnement et de rationalisation. Les personnages avec une intelligence élevée peuvent extrapoler, se souvenir de détails et tirer parti d''expériences passées.'),
('Ruse','La Ruse traduit l''ingéniosité, la fourberie, la perspicacité et la créativité. Les personnages avec une Ruse élevée ont de la jugeote, saisissent rapidement leur environnement et ceux qui les entourent, et préparent plus vite leurs plans et tactiques.'),
('Volonté','La Volonté reflète la discipline, le sang-froid, la force d''âme et l''assurance d''un personnage. Les personnages dotés d''une Volonté élevée résistent au stress et la fatigue mentale, gardent leur calme dans des situations chaotique.'),
('Présence','La Présence regroupe le cran, le charisme, la confiance et la force de caractère. Les personnages dotés d''une Présence élevée sont des leaders tout désignés, attirent les regards quand ils entrent dans une pièce, mènent facilement une conversation avec n''importe qui et s''adaptent facilement à toute situation en société');

INSERT INTO aptitude (name,type,characteristic_name,description)
VALUES 
('Artillerie','Combat','Agilité','Les armes à distance montées sur des vehicules demande un savoir-faire particulier dans leur maniements. Cette aptitude comprends egalement le maniement des armes depuis un poste de pilotage d''un chasseur par exemple.'),
('Distance Legère','Combat','Agilité','Les armes à distance dont le maniement ou la visée ne demande qu’une main, notamment les pistolets blasters et les petites armes de jet comme les grenades, sont régies par cette compétence.'),
('Distance Lourde','Combat','Agilité','Les armes à distance dont le maniement ou la visée demande les deux mains, notamment les fusils blasters et les grandes armes de jet comme les lances et certaines haches, sont régies par cette compétence.'),
('Pilotage','Utilitaire','Agilité','Cette compétence permet de se servir d’engins à répulseurs, d’avions ou de véhicules aquatiques en conditions diffi ciles, ou de distancer un adversaire lors d’une course ou d’une poursuite.'),
('Survie','Utilitaire','Ruse','Savoir identifi er les menaces naturelles et s’y prendre avec les animaux domestiques, trouver de quoi manger et s’abriter, ou suivre une trace (''qu’elle soit celle du gibier ou d’un fuyard'') correspond à cette compétence'),
('Mécanique','Utilitaire','Intelligence','Cette compétence représente la familiarité du personnage avec les mécanismes qui composent les vaisseaux planétaires et atmosphériques, les droïdes, les armes et autres appareils. Toute tentative de réparation, de modifi cation ou de fabrication de ces dispositifs passe par un test de mécanique'),
('Informatique','Utilitaire','Intelligence','Cette compétence traduit la maîtrise du personnage en matière de logiciels et de systèmes informatiques. Contourner un dispositif de sécurité technologique, consulter des archives cryptées, modifi er la programmation d’un droïde, récupérer des données sur un système corrompu : tout cela est géré par la compétence Informatique.'),
('Négociation','Social','Présence','La compétence Négociation gère le marchandage, la vente et le commerce de produits et de services, dans le but d’en tirer le meilleur profi t.'),
('Tromperie','Social','Ruse','La capacité à mentir de manière crédible est exprimée par la compétence Tromperie. Celle-ci gouverne des actions comme exagérer ou minimiser la valeur d’un objet, tricher aux jeux d’argent, déconcentrer un adversaire par une feinte, prétendre être épris d’autrui ou laisser une fausse piste à ses poursuivants.'),
('Coercition','Social','Volonté','Lorsqu’un personnage tente de se faire obéir par le biais de menaces ou d’intimidation physique, comme c’est le cas lors d’un interrogatoire musclé, il recourt à Coercition.'),
('Corps à corps','Combat','Vigueur','L’entraînement à l’utilisation meurtrière des armes au contact de l’ennemi se traduit par la compétence Corps à corps'),
('Pugilat','Combat','Vigueur','Le combat à mains nues se résout par l’intermédiaire de cette compétence, les dégâts infl igés étant égaux à la valeur de Vigueur du personnage.'),
('Athlétisme','Général','Vigueur','Athlétisme traduit les capacités physiques du personnage. C’est cette compétence qui détermine la capacité à escalader, nager, sauter, pousser et tirer dans le cadre d’un effort soutenu et prolongé.'),
('Sang-froid','Général','Volonté','La faculté de conserver son fl egme et de réagir de manière effi cace est mesurée par cette compétence. Sang-froid permet au personnage de voir clair dans le jeu des autres, d’agir posément sous la contrainte, de surmonter la peur et de résister à la tentation.'),
('Charme','Social','Présence','Le charme correspond à la capacité qu’a le personnage de trouver le mot juste et sincère au bon moment. Cette compétence permet de persuader autrui, d’éveiller la serviabilité des gens et de séduire sans arrière-pensée.'),
('Commandement','Social','Présence','Commandement correspond à la capacité à prendre les bonnes décisions, à se montrer ferme et décisif ce faisant, et à susciter la loyauté et le respect. Cette compétence peut également servir à pousser une foule à l’action, à galvaniser les alliés quand la situation paraît désespérée et à reprendre l’ascendant sur un subalterne récalcitrant.'),
('Médecine','Utilitaire','Intelligence','La compétence Médecine englobe l’aptitude à puiser dans le savoir anatomique et pathologique, à pratiquer les premiers soins et à reconnaître les cas urgents, à traiter les empoisonnements et à effectuer des opérations chirurgicales'),
('Magouille','Utilitaire','Ruse','Magouilles englobe tout un arsenal de notions essentielles à l’exercice criminel. C’est le cas du crochetage des serrures, du vol à la tire et à l’étalage, des effractions dans les bâtiments surveillés, de la pose de pièges et de l’art du déguisement, entre autres vilenies.'),
('Vigilance','Général','Volonté','Quand se présente une situation de combat à laquelle les personnages n’ont pas pu se préparer, testez cette compétence pour déterminer l’ordre d’initiative. Un test de Vigilance peut en outre se présenter pour défi nir si un personnage a bien anticipé une situation donnée et s’il dispose d’un certain accessoire ou d’un avantage circonstanciel'),
('Résonance','Combat','Volonté','Maitriser les Echos de Namtar demande un long et fastidieux entrainement. Plus cette aptitude est élevée et plus vos competences, notament celles qui ne sont pas liées à une caractéristique physique, seront efficaces.'),
('Perception','Général','Ruse','Perception englobe tous les sens naturels du personnage, soit généralement cinq pour un humain. On peut toutefois en compter davantage chez certains êtres dotés d’implants cybernétiques et chez certaines espèces. Cette compétence permet d’éviter les guets-apens et les pièges, de remarquer les voleurs et les individus sournois, de détecter les indices subtils et de percevoir les objets lointains.'),
('Coordination','Général','Agilité','Cette compétence mesure la souplesse et le sens de l’équilibre. Pour traverser une surface instable ou étroite, se libérer de liens ou chuter en limitant les dégâts, les personnages mettront leur Coordination à l’épreuve.'),
('Résistance','Général','Vigueur','Cette compétence reflète la capacité du corps à dépasser les limites du raisonnable. Effectuez un test de Résistance lorsque vous tenter de rester éveillé, de résister à des substances toxiques, d’endurer un environnement inhospitalier ou de lutter contre les effets de la faim.'),
('Discrétion','Utilitaire','Agilité','Cette compétence reflète la faculté de se soustraire à l’attention de l’adversaire, en échappant à l’un ou à l’ensemble de ses sens. Discrétion permet de fi ler une cible sans se faire remarquer, de se camoufl er et de dissimuler autrui ou des objets.'),
('Calme','Général','Ruse','La faculté de rester serein et de réfléchir quand sa propre vie est en jeu est représentée par la compétence Calme. Les joueurs pourront effectuer des tests de Calme pour déterminer l’initiative lors des rencontres pour lesquelles leurs PJ auront posément préparé leurs actions (quand ils tendront une embuscade, par exemple).');

INSERT INTO mark (name,description,cost)
VALUES
('Brûlure','La cible subit 1 Blessure par Succès Net par tour. L''effet peut être annulé par une manoeuvre.','3'),
('Premier Soin','Soigne jusqu''a 1 Blessure infligée lors des dernières minutes.','2'),
('Précision Létale','Divise par 2 les numériques de la compétence. Multiplie par 2 les bonus des succès net.','5'),
('Attaque en Force','Inflige 1 Blessure Supplementaire sur une attaque au Corps à Corps ou Pugilats','2'),
('Augmenter l''Armure','Augmente de 1 l''Encaissement par Succès Net pour sa prochaine Utilisation','8'),
('Augmenter l''Arme','Augmente les Dégâts de l''Arme en Main de 1 par Succès Net pour sa prochaine utilisation','6'),
('Augmenter l''Aptitude','Augmente 1 fois le prochain Test d''Aptitude, en faveur de la Cible.','15'),
('Augmenter le Mouvement','Augmente 1 fois le niveau de portée que peut atteindre la cible en 1 Manoeuvre','10'),
('Gain d''Energie','Génère 1 Point d''Energie pour la Cible','2'),
('Déviation','Ajoute 1 Dé supplémentaire sur le prochain jet Défense par Succès Net','8'),
('Dommage Physique','Inflige 1 Blessure par Succès Net','2'),
('Dommage Brut','Inflige 1 Blessure par Succès Net. Ignore L''Encaissement','4'),
('Soin Intense','Soigne 1 Blessure','5'),
('Réduire l''Aptitude','Dégrade 1 fois le prochain Test d''Aptitude, en défaveur de la Cible.','15'),
('Prospection','Vous permet de resentir la position des êtres vivants sur 1 niveau de portée. Cumulable jusqu''a 4 fois','5'),
('Reminiscence','Vous permet de reconstituer l''histoire d''un lieux sur 1 journée et 1 niveau de portée','5'),
('Chaine','Touche 1 cible supplémentaire à portée courte de la dernière cible touchée','3');


-- Insertion des Personnage Kyo et admin

INSERT INTO character (name,species, biography)
VALUES 
('Kyo','humain','"Un samouraï badin !" Comme il le dit lui-même, faisant référence à un ancien ordre oublié... Le regard dur, une discipline à toute épreuve, un courage qui n''a d''égale que sa maîtrise du sabre, ce compagnon vous protégera contre toutes les mauvaises rencontres, si vous y mettez le prix'),
('Admin','Dieu','Il peut tous faire. Y compris des erreur. Mais vous ne pourrez pas le contredire. Méfiez vous');


INSERT INTO character_characteristic_set (rank,characteristic_name,character_name)
VALUES 
('3','Vigueur','Kyo'),
('3','Agilité','Kyo'),
('2','Intelligence','Kyo'),
('2','Ruse','Kyo'),
('3','Volonté','Kyo'),
('2','Présence','Kyo'),
('6','Vigueur','Admin'),
('6','Agilité','Admin'),
('6','Intelligence','Admin'),
('6','Ruse','Admin'),
('6','Volonté','Admin'),
('6','Présence','Admin');

INSERT INTO character_aptitude_set (rank,aptitude_name,character_name)
VALUES 
('0','Artillerie','Kyo'),
('0','Distance Legère','Kyo'),
('0','Distance Lourde','Kyo'),
('0','Pilotage','Kyo'),
('1','Survie','Kyo'),
('0','Mécanique','Kyo'),
('0','Informatique','Kyo'),
('0','Négociation','Kyo'),
('0','Tromperie','Kyo'),
('1','Coercition','Kyo'),
('3','Corps à corps','Kyo'),
('0','Pugilat','Kyo'),
('3','Athlétisme','Kyo'),
('3','Sang-froid','Kyo'),
('0','Charme','Kyo'),
('0','Commandement','Kyo'),
('0','Médecine','Kyo'),
('1','Magouille','Kyo'),
('2','Vigilance','Kyo'),
('0','Résonance','Kyo'),
('2','Perception','Kyo'),
('0','Coordination','Kyo'),
('0','Résistance','Kyo'),
('2','Discrétion','Kyo'),
('2','Calme','Kyo'),

('6','Artillerie','Admin'),
('6','Distance Legère','Admin'),
('6','Distance Lourde','Admin'),
('6','Pilotage','Admin'),
('6','Survie','Admin'),
('6','Mécanique','Admin'),
('6','Informatique','Admin'),
('6','Négociation','Admin'),
('6','Tromperie','Admin'),
('6','Coercition','Admin'),
('6','Corps à corps','Admin'),
('6','Pugilat','Admin'),
('6','Athlétisme','Admin'),
('6','Sang-froid','Admin'),
('6','Charme','Admin'),
('6','Commandement','Admin'),
('6','Médecine','Admin'),
('6','Magouille','Admin'),
('6','Vigilance','Admin'),
('6','Résonance','Admin'),
('6','Perception','Admin'),
('6','Coordination','Admin'),
('6','Résistance','Admin'),
('6','Discrétion','Admin'),
('6','Calme','Admin');



INSERT INTO skill (name,type,description)
VALUES 
('Frappe puissante','Attaque','Vous puisez dans votre énergie pour surpasser l''espace d''un instant vos contraintes musculaires, et assénez un coup puissant. En cas d''une attaque au corps-à-corps en mêlée réussie, doublez les Blessures infligées pas les succès nets. Consomme 5 points d''Énergie.'),
('Concentration du Tireur','Attaque','Vous gagnez instantanément en stabilité et en concentration pour effectuer un tir parfait. Augmentez votre prochain jet de Distance (légère ou lourde). Consomme 5 points d''Énergie.'),
('Échoglobine','Mantra','Un lien intime entre votre sang et la résonance semble s''être tissé. À tout moment, vous pouvez convertir autant de PV désirés en points d''Énergie. Une fois ce Mantra acquis, il est possible cependant que vous soyez plus vulnérables aux fluctuations de la Résonance. Vous pouvez ainsi perdre des PV si des menaces sont générées sur vos jets.'),
('"Bande de dégenérés! Vous allez tous crever !"','Mantra','Vous n''aimez pas les adversaires qui manquent d''honneur et de manières. Si vous avez été la cible de 2 adversaires ou plus au dernier tour, vous augmentez 1 fois vos jets d''attaques aux corps à corps contre ces adversaires.'),
('Écho balayant','Sort','Vous créez une cavité concentrant la Résonance sur la position de votre choix, et relâchez brutalement l''énergie ainsi retenue. La déflagration renverse toutes les créatures à distance courte de la zone ciblée, et inflige 1 Blessures pour 2 Points d''Énergie investis lors de l''appel du Sort.');

INSERT INTO character_skill_set (skill_name,character_name)
VALUES 
('Frappe puissante','Kyo'),
('"Bande de dégenérés! Vous allez tous crever !"','Kyo');
