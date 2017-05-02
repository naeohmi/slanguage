DROP DATABASE IF EXISTS sentences;
CREATE DATABASE sentences;

\c sentences;

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
