CREATE DATABASE sportsPal;
USE sportsPal;

-- Created the table "schools" 
CREATE TABLE game (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  players INTEGER, 
  location VARCHAR (100) NOT NULL,
  date INTEGER,
  PRIMARY KEY(id)
);
