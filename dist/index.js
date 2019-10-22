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
var app = express();
app.use(express.json());
app.listen(3005, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Server Running on port 3005!');
        yield initApp();
    });
});
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        createRoutes();
    });
}
function createRoutes() {
    app.get('/ping', function (req, res) {
        let data = {
            deviceName: 'soggiorno_device_1',
            ip: "192.168.1.5",
            sensors: [
                {
                    temperature: "21.20"
                },
                {
                    umidity: "75.00"
                }
            ],
            actuators: []
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    });
}
//# sourceMappingURL=index.js.map