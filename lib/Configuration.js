const fs = require("fs");
const Tools = require("./Tools");
const path = require("path");

/**
 * @constructor
 */
const Configuration = function() {
    this.location = path.join(__dirname, "../config.json");
    this.settings = {
        "mqtt" : {
            identifier: "rockrobo",
            topicPrefix: "valetudo",
            autoconfPrefix: "homeassistant",
            broker_url: "mqtt://user:pass@foobar.example",
            caPath: "",
            mapSettings: {
                drawPath: true,
                drawCharger: true,
                drawRobot: true,
                drawForbiddenZones: true,
                drawVirtualWalls: true,
                border: 2,
                scale: 4,
                gradientBackground: true,
                autoCrop: 20
            },
            mapDataTopic: "valetudo/rockrobo/map_data",
            minMillisecondsBetweenMapUpdates: 10000,
            publishMapImage: true,
            publishMapData: false,
            omitMapDataPixels: false
        },
        "webserver": {
            enabled: false,
            port: 3000
        }
    };

    /* load an existing configuration file. if it is not present, inform user with default config */
    if(fs.existsSync(this.location)) {
        console.log("Loading configuration file:", this.location);
        this.settings = Object.assign(this.settings, JSON.parse(fs.readFileSync(this.location)));
        //console.log("Loaded configuration: " + JSON.stringify(this.settings, null, 2));
    } else {
        console.error("No configuration file present. You must create one at :", this.location);
        console.log("Example: " + JSON.stringify(this.settings, null, 2));
        process.exit(1);
    }
};


/**
 *
 * @param key {string}
 * @returns {*}
 */
Configuration.prototype.get = function(key) {
    return this.settings[key];
};

Configuration.prototype.getAll = function() {
    return this.settings;
};

module.exports = Configuration;
