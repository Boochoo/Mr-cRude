const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const bodyParser = require("body-parser");

const app = express();

MongoClient.connect(
  "mongodb://<user>:<pwd>@ds247027.mlab.com:47027/cruder",
  (err, db) => {
    var dbase = db.db("cruder");
    if (err) {
      return console.log(err);
    }

    app.listen(3000, function() {
      console.log("listening on 3000");
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/name/add", (req, res, next) => {
      var name = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      };

      dbase.collection("name").save(name, (err, result) => {
        if (err) {
          console.log(err);
        }

        res.send("name added successfully");
      });
    });

    app.get("/name", (req, res) => {
      dbase
        .collection("name")
        .find()
        .toArray((err, results) => {
          res.send(results);
        });
    });

    app.get("/name/:id", (req, res, next) => {
      if (err) {
        throw err;
      }

      let id = ObjectID(req.params.id);
      dbase
        .collection("name")
        .find(id)
        .toArray((err, result) => {
          if (err) {
            throw err;
          }

          res.send(result);
        });
    });
  }
);
