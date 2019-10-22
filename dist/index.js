var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var express = require('express');
var sensorLib = require('node-dht-sensor');
var app = express();
const Gpio = require('onoff').Gpio;
const main_light = new Gpio(17, 'out');
process.on('SIGINT', _ => {
    main_light.unexport();
});
app.use(express.json());
app.listen(3005, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Server Running on port 3005!');
        yield initApp();
    });
});
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createRoutes();
    });
}
function createRoutes() {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/ping', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let sens = yield sensorLib.read(11, 4);
                let data = {
                    deviceName: 'soggiorno_device_1',
                    ip: "192.168.1.5",
                    sensors: [
                        {
                            temperature: sens.temperature.toFixed(2),
                        },
                        {
                            umidity: sens.humidity.toFixed(2),
                        }
                    ],
                    actuators: []
                };
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            });
        });
        app.get('/temperature', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let sens = yield sensorLib.read(11, 4);
                let data = {
                    value: sens.temperature.toFixed(2),
                };
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            });
        });
        app.get('/umidity', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let sens = yield sensorLib.read(11, 4);
                let data = {
                    value: sens.humidity.toFixed(2),
                };
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            });
        });
        app.get('/umidity', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let sens = yield sensorLib.read(11, 4);
                let data = {
                    value: sens.humidity.toFixed(2),
                };
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(data));
            });
        });
        app.post('/main_light', function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let value = parseInt(req.body.value);
                console.log(value);
                main_light.writeSync(value);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ msg: value }));
            });
        });
    });
}
//# sourceMappingURL=index.js.map