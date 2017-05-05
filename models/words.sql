DROP DATABASE IF EXISTS words;
CREATE DATABASE words;

\c words;

CREATE TABLE words (
  ID SERIAL PRIMARY KEY,
  sentenceId INTEGER,
  word VARCHAR (255),
  urbanDef1 VARCHAR (255),
  urbanDef2 VARCHAR (255),
  urbanSent1 VARCHAR (255),
  urbanSent2 VARCHAR (255),
  oxfordDef1 VARCHAR (255),
  oxfordDef2 VARCHAR (255),
  oxfordSent1 VARCHAR (255),
  oxfordSent2 VARCHAR (255)
);

INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2) 
 VALUES (1, 'word', 'urbanDef1', 'urbanDef2', 'urbanSent1', 'urbanSent2', 'oxfordDef1', 'oxfordDef2', 'oxfordSent1', 'oxfordSent2');
 