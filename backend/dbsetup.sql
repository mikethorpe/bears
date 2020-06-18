DROP DATABASE IF EXISTS bearsdb;
CREATE DATABASE bearsdb;
\c bearsdb;

CREATE TABLE bears (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255),
    type VARCHAR (255)
);

INSERT INTO bears (name, type) VALUES ('Bob', 'Brown');
INSERT INTO bears (name, type) VALUES ('Jill', 'Drunk');
INSERT INTO bears (name, type) VALUES ('Brian', 'Addict');
INSERT INTO bears (name, type) VALUES ('Karen', 'Scary');