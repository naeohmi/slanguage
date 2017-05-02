DROP DATABASE IF EXISTS words;
CREATE DATABASE words;

\c words;

CREATE TABLE words (
  ID SERIAL PRIMARY KEY,
  sentenceId INTEGER,
  apiId INTEGER,
  word TEXT,
  def1 TEXT,
  def2 TEXT,
  useInSentence TEXT
);

INSERT INTO words (sentenceId, apiId, word, def1, def2, useInSentence) 
 VALUES (1, 2, 'test', 'testdef1', 'testdef2', 'testsentuse');
