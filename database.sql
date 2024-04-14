CREATE TABLE allcontacts(
     id SERIAL ,
    username VARCHAR(20) NOT NULL UNIQUE ,
    passhash VARCHAR NOT NULL UNIQUE ,
    userid VARCHAR NOT NULL UNIQUE
);
INSERT INTO allcontacts (username,passhash,userid) VALUES ('hari' , 'dsjsdkjsdhuew32','7123bndsiuhjesdwee');