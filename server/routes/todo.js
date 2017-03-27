var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
    database: 'chi',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
    pool.connect(function(error, client, done) {
        if (error) {
            // console.log("error connecting to database");
            res.send(500);
        } else {
            client.query('SELECT * FROM "to_do"', function(queryError, result) {
                done();
                if (queryError) {
                    // console.log("error making query");
                    res.sendStatus(500);
                } else {
                    // console.log("success making query");
                    res.send(result.rows);
                }
            });
        }
    });
}); //router.get '/' end

router.post('/add', function(req, res) {
    // console.log(req.body);
    var task = req.body.task;
    // var complete = req.body.complete;
    pool.connect(function(error, client, done) {
        if (error) {
            // console.log("error connecting to db");
            res.send(500);
        } else {
            client.query('INSERT INTO "to_do" ("task", "complete") VALUES ($1, $2)',
            [task, false], function(queryError, result) {
                done();
                if (queryError) {
                    // console.log("error making query in add");
                    res.send(500);
                } else {
                    // console.log(result);
                    res.send(200);
                }
            });
        }
    });
});

router.delete('/delete/:listItem', function(req, res) {
    // console.log('in delete item');
    var listItem = req.params.listItem;

    pool.connect(function(error, db, done) {
        if (error) {
            // console.log('Error connecting to the database.');
            res.send(500);
        } else {
            db.query('DELETE FROM "to_do" WHERE "id" = $1', [listItem],
            function(queryError, result) {
                done();
                if (queryError) {
                    // console.log('Error making query.');
                    res.send(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.put('/change', function(req, res) {
    console.log("from change: ", req.body, req.body.id, req.body.complete);
    var listId = req.body.id;
    var listClass = req.body.complete;
    console.log("From /change with: ", listId, listClass);
      pool.connect(function(error, db, done) {
          if (error) {
              res.send(500);
          } else {
            if(listClass == 'true'){
              db.query('UPDATE "to_do" SET "complete" = $2 WHERE "id" = $1',
                    [listId, 'false'], function(queryError, result){
                  done();
                  if(queryError) {
                      res.send(500);
                  } else {
                      res.sendStatus(201);
                  }
                });
            } else if(listClass == 'false'){
              db.query('UPDATE "to_do" SET "complete" = $2 WHERE "id" = $1',
                    [listId, 'true'], function(queryError, result){
                  done();
                  if(queryError) {
                      res.send(500);
                  } else {
                      res.sendStatus(201);
                  }
                });
            }
          }
      });
    }); //end router.put

module.exports = router;
