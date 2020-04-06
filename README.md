<div align="center">
    <a href="https://github.com/rand256/valetudo"><img src="https://github.com/rand256/valetudo/blob/testing/assets/logo/valetudo_logo_with_name.svg" width="800" alt="valetudo"></a>
    <p align="center"><h2>valetudo mapper - modified</h2></p>
</div>

This is a simple companion service for valetudo which does all the heavy lifting.

Since both CPU and Memory are limited on the robot, PNG generation for third-party components has been moved here.

## Changes compared to [valetudo-mapper](https://github.com/rand256/valetudo-mapper) original

Here are the main changes from valetudo-mapper:
- Docker image now use production environment and dedicated user
- Allow use of `MQTT_BROKER_URL` environment variable instead of JSON configuration in order to version the configuration on Git without specifying credentials (not working for now)
- Do not send map pixel details in map_data_parsed topic if asked (`omitMapDataPixels`). Compatible with [lovelace-rockrobo-path-card](https://github.com/nboissel/lovelace-rockrobo-path-card)

Those changes aim at providing better Docker experience and a lighter MQTT use. 

## Description

To override the configuration inside the docker container, map it to `/app/config.json`. It looks like this:

```
{
        "mqtt" : {
            "identifier": "rockrobo",
            "topicPrefix": "valetudo",
            "autoconfPrefix": "homeassistant",
            "broker_url": "mqtt://user:pass@example.com:port",
            "caPath": "",
            "mapSettings": {
                "drawPath": true,
                "drawCharger": true,
                "drawRobot": true,
                "drawForbiddenZones": true,
                "drawVirtualWalls": true,
                "border": 2,
                "scale": 4,
                "gradientBackground": true,
                "autoCrop": 20
            },
            "mapDataTopic": "valetudo/rockrobo/map_data",
            "minMillisecondsBetweenMapUpdates": 10000,
            "publishMapImage": false,
            "publishMapData": true,
            "omitMapDataPixels": true
        },
        "webserver": {
            "enabled": false,
            "port": 3000
        }
}
```

Guessed crop values allow to get rid of empty spaces at the edges of the image.

### FHEM, ioBroker, etc
If you set `webserver.enabled` to `true`, the map PNG will be available at `http://host:port/api/map/image`

### TheLastProject/lovelace-valetudo-map-card
To make Valetudo RE compatible with `lovelace-valetudo-map-card` project, enable `publishMapData` option and
set map sensor source in HA to `topicPrefix/identifier/map_data_parsed` (i.e. `valetudo/rockrobo/map_data_parsed`).
