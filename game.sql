CREATE TABLE poster (
username TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
PRIMARY KEY(username));


CREATE TABLE comment (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
content TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
state_id INTEGER NOT NULL,
poster_username TEXT NOT NULL,CONSTRAINT "state-comment"
FOREIGN KEY (state_id)
REFERENCES state(id)
,CONSTRAINT "poster-comment"
FOREIGN KEY (poster_username)
REFERENCES poster(username)
ON DELETE No action
ON UPDATE Cascade);


CREATE TABLE state (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
description TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
game_id INTEGER NOT NULL,CONSTRAINT "game-state"
FOREIGN KEY (game_id)
REFERENCES game(id));


CREATE TABLE game (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
name TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT);


INSERT INTO game (name,creation_date,last_modification_date)
VALUES ('My_SANDBOX','2020-11-21 12:00:00',NULL);
VALUES ('"Un simple vol de routine ..."','2020-11-21 12:00:00',NULL);

INSERT INTO state (description,creation_date,last_modification_date,game_id)
SELECT 'C''est le debut de l''aventure qui est ecrit sur ce post. Quelqu''un a quelque chose a dire ?',CURRENT_TIMESTAMP, NULL , game.id
FROM game
WHERE game.name='My_SANDBOX';

INSERT INTO state (description,creation_date,last_modification_date,game_id)
SELECT 'Et paf une nouvelle peripetie',CURRENT_TIMESTAMP, NULL , game.id
FROM game
WHERE game.name='My_SANDBOX';


-- TEST : To run after the dataset's application

-- INSERT INTO state (description,creation_date,last_modification_date,game_id)
-- VALUES 
-- ('Ceci devrai sortir une erreure, commentez moi ! ','2020-11-21 12:00:00',NULL,'Unknown_Game');