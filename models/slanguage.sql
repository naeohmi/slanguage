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
 

--  label as a foreign key and create a reference 
--  alter command to change soemthing inside a table/data type 
-- INNER JOIN (have them related to each other)