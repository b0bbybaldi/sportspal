CREATE DATABASE sportsPal;
USE sportsPal;

-- Created the table "schools" 
CREATE TABLE sportsPal (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  players INTEGER, 
  location VARCHAR (100) NOT NULL,
  time INTEGER,
  PRIMARY KEY(id)
);
