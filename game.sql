-- This sequence provide the structure of the 'game' database on SQLITE DBMS

CREATE TABLE "POSTER" (
id INTEGER NOT NULL,
username TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
PRIMARY KEY(id),
CONSTRAINT poster_ak_1 UNIQUE(username));


CREATE TABLE "COMENT" (
id INTEGER NOT NULL,
content TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
state_id INTEGER NOT NULL,
poster_id INTEGER NOT NULL,CONSTRAINT "state-coment"
FOREIGN KEY (state_id)
REFERENCES "STATE"(id)
,CONSTRAINT "poster-coment"
FOREIGN KEY (poster_id)
REFERENCES "POSTER"(id)
ON DELETE No action
ON UPDATE Cascade,
PRIMARY KEY(id));


CREATE TABLE "STATE" (
id INTEGER NOT NULL,
description TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
game_id INTEGER NOT NULL,CONSTRAINT "game-state"
FOREIGN KEY (game_id)
REFERENCES "GAME"(id),
PRIMARY KEY(id));


CREATE TABLE "GAME" (
id INTEGER NOT NULL,
name TEXT NOT NULL,
creation_date TEXT NOT NULL,
last_modification_date TEXT,
PRIMARY KEY(id),
CONSTRAINT game_ak_1 UNIQUE(name));
