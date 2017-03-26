CREATE TABLE to_do (
    id SERIAL PRIMARY KEY,
    task character varying(140),
    complete boolean
);

INSERT INTO "to_do" (task, complete)
VALUES ('water plants', 'false');
INSERT INTO "to_do" (task, complete)
VALUES ('feed dog', 'false');
INSERT INTO "to_do" (task, complete)
VALUES ('get groceries', 'false');
