DROP DATABASE IF EXISTS slanguage;
CREATE DATABASE slanguage;

\c slanguage;

CREATE TABLE sentences (
  ID SERIAL PRIMARY KEY,
  word1 VARCHAR (255),
  word2 VARCHAR (255),
  word3 VARCHAR (255),
  word4 VARCHAR (255),
  word5 VARCHAR (255),
  word6 VARCHAR (255),
  word7 VARCHAR (255)
);

INSERT INTO sentences (word1, word2, word3, word4, word5, word6, word7) 
 VALUES ('test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7');

CREATE TABLE words (
  ID SERIAL PRIMARY KEY,
  sentenceId INTEGER,
  word VARCHAR,
  urbanDef1 VARCHAR,
  urbanDef2 VARCHAR,
  urbanSent1 VARCHAR,
  urbanSent2 VARCHAR,
  oxfordDef1 VARCHAR,
  oxfordDef2 VARCHAR,
  oxfordSent1 VARCHAR,
  oxfordSent2 VARCHAR
);

INSERT INTO words (sentenceId, word, urbanDef1, urbanDef2, urbanSent1, urbanSent2, oxfordDef1, oxfordDef2, oxfordSent1, oxfordSent2) 
 VALUES (1, 'word', 'urbanDef1', 'urbanDef2', 'urbanSent1', 'urbanSent2', 'oxfordDef1', 'oxfordDef2', 'oxfordSent1', 'oxfordSent2');
 