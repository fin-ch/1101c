import express from "express";
import path from "path";
import fs from "fs";
import { handler } from "./svelte/build/handler.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const dbpath = "./lib/data/db.json";

//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::

function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }
}

function decimalDegree(ddmm) {
    return Math.floor(ddmm / 100) + (ddmm - Math.floor(ddmm / 100) * 100) / 60;
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
    var sign = new Object();
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);

        // update realtime gps data
        temp.gps[1] = temp.gps[0];
        temp.gps[0] = req.body;

        // navigate
        const signCount = temp.config.device.signCount;
        const haptics = temp.config.device.haptics;
        const angle = temp.navigate.destination.angle;
        if (temp.navigate.isSet) {
            const _gps = [temp.gps[0].location.lat, temp.gps[0].location.lon];
            const __gps = [temp.gps[1].location.lat, temp.gps[1].location.lon];
            const desPoint = temp.navigate.destination.point;
            const ___gps = [
                temp.config.route.intersectionPoint[desPoint].location.lat,
                temp.config.route.intersectionPoint[desPoint].location.lon,
            ];

            const _d = distance(
                decimalDegree(_gps[0]),
                decimalDegree(_gps[1]),
                decimalDegree(___gps[0]),
                decimalDegree(___gps[1])
            );
            const __d = distance(
                decimalDegree(__gps[0]),
                decimalDegree(__gps[1]),
                decimalDegree(___gps[0]),
                decimalDegree(___gps[1])
            );

            console.log(_d);

            for (var i = 0; i < signCount; i++) {
                if (_d < temp.config.device.signPoint[i]) {
                    temp.config.device.signCount += 1;
                    if (dircContd == false) {
                        for (var j = 0; j < haptics; j++) {
                            sign[j].freq = (127 * (i + 0)) / signCount;
                            if (
                                (360 / haptics) * j < angle &&
                                (360 / haptics) * (j + 1) > angle
                            ) {
                                sign[j].pow = 100;
                            } else {
                                sign[j].pow = 0;
                            }
                        }
                    } else {
                        var _angle = angle - (360 / haptics) * 0.5;
                        if (_angle < 0) _angle += 360;

                        var r = _angle % (360 / haptics);
                        var _r = parseInt(_angle / (360 / haptics));

                        for (var j = 0; j < haptics + 1; j++) {
                            sign[j % haptics].freq =
                                (127 * (i + 0)) / signCount;
                            if (j == _r) {
                                sign[j].pow = (100 * r) / (360 / haptics);
                            } else if (j == _r + 1) {
                                sign[j % haptics].pow =
                                    100 - (100 * r) / (360 / haptics);
                            } else {
                                sign[j].pow = 0;
                            }
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < haptics; i++) {
                sign[j].pow = 0;
                sign[j].freq = 0;
            }
        }
        console.log(JSON.stringify(sign));

        // modify db
        fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
            if (err) throw err;
        });
    });
    res.end(JSON.stringify(sign));
});

app.post("/updatedb/config/:idx", (req, res) => {
    var idx = req.params.idx;
    if (idx == "startPoint" || idx == "endPoint") {
        var temp;
        fs.readFile(dbpath, function (err, data) {
            if (err) throw err;
            temp = JSON.parse(data);
            temp.config.route[idx].location = temp.gps[0].location;
            fs.writeFile(dbpath, JSON.stringify(temp), function (err) {
                if (err) throw err;
            });
        });
    }
    res.end();
});

app.post("/updatedb/calib/:count", (req, res) => {
    var count = req.params.count;
    var temp;
    fs.readFile(dbpath, function (err, data) {
        if (err) throw err;
        temp = JSON.parse(data);

        temp.config.route.intersections = count;
        temp.config.route.intersectionPoint = [];

        var width =
            temp.config.route.startPoint.location.lat -
            temp.config.route.endPoint.location.lat;
        var height =
            temp.config.route.startPoint.location.lon -
            temp.config.route.endPoint.location.lon;

        for (var i = 0; i < count; i++) {
            temp.config.route.intersectionPoint[i].location.lat =
                temp.config.route.startPoint.location.lat +
                ((i + 1) * width) / count;
            temp.config.route.intersectionPoint[i].location.lon =
                temp.config.route.startPoint.location.lon +
                ((i + 1) * height) / count;
            temp.config.route.intersectionPoint[i].ways = 1;
            temp.config.route.intersectionPoint[i].waysAngle[0] = 90;
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
        temp.navigate.destination.point = idx;
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
