import express from "express";
import path from "path";
import fs from "fs";
import { handler } from "./svelte/build/handler.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const dbpath = "./lib/data/db.json";

const lat_ratio = 1.85; // 1850
const long_ratio = 1.48; // 1480

function getdistance(alat, along, blat, blong) {
    return (
        (((alat - blat) * lat_ratio) ** 2 +
            ((along - blong) * long_ratio) ** 2) **
        (1 / 2)
    );
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Demo route
app.get("/expressroute", (req, res) => {
    res.send("This is an express route!");
});

app.get("/readdb", (req, res) => {
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post("/updatedb/gps", (req, res) => {
    var temp;
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);
        temp.gps[1] = temp.gps[0];
        temp.gps[0] = req.body;
        if (temp.navigate.isSet) {
            var d = getdistance(
                temp.gps[0].location.lat,
                temp.gps[0].location.long,
                temp.config[temp.navigate.destination].location.lat,
                temp.config[temp.navigate.destination].location.long
            );
            console.log(d);

            if (d < 3) {
                temp.navigate.isSet = false;
            }
        }

        fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
            if (err) throw err;
        });
    });
    res.end();
});

app.post("/updatedb/config/:idx", (req, res) => {
    var idx = req.params.idx;
    var temp;
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);
        temp.config[idx].location = temp.gps[0].location;
        fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
            if (err) throw err;
        });
    });
    res.end();
});

app.post("/updatedb/calib", (req, res) => {
    var temp;
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);
        var width = temp.config[10].location.lat - temp.config[0].location.lat;
        var height =
            temp.config[10].location.long - temp.config[0].location.long;
        for (var i = 1; i < 10; i++) {
            temp.config[i].location.lat =
                temp.config[i].location.lat + (i * width) / 10;
            temp.config[i].location.long =
                temp.config[i].location.long + (i * height) / 10;
        }
        fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
            if (err) throw err;
        });
    });
    res.end();
});

app.post("/updatedb/setdestination/:idx", (req, res) => {
    var idx = req.params.idx;
    var temp;
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);
        temp.navigate.destination = idx;
        temp.navigate.isSet = true;
        fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
            if (err) throw err;
        });
    });
    res.end();
});

app.use(handler);

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});
