"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sensor_controller_1 = require("./sensor.controller");
class DeviceController {
    constructor(environment, deviceData) {
        this.name = '';
        this.type = '';
        this.ip = '';
        this._sensors = [];
        this._actuatorControllers = [];
        this._actuators = [];
        this.sensorTypes = ['temperature', 'umidity', 'raindrop'];
        this.environment = environment;
        this.deviceData = deviceData;
        this.name = `${environment.name}_${deviceData.ip}`;
        this.ip = deviceData.ip;
        if (deviceData.error) {
            this.error = deviceData.error;
        }
        this.setSensors();
        this.setActuators();
    }
    getData() {
        let returnObj = {
            name: this.name,
            ip: this.ip,
            type: this.type,
            sensors: this.sensors
        };
        if (this.error) {
            returnObj["error"] = this.error;
        }
        return returnObj;
    }
    setSensors() {
        this.sensors = [];
        Object.keys(this.deviceData).forEach((key) => {
            if (this.sensorTypes.indexOf(key) != -1) {
                let sensorData = {
                    key,
                    value: this._deviceData[key]
                };
                let sensorController = new sensor_controller_1.default(this.getData(), sensorData);
                this.sensors.push(sensorController.getData());
            }
        });
    }
    setActuators() {
        this.actuators = [];
    }
    refresh(deviceData) {
        this.deviceData = deviceData;
        this.setSensors();
    }
    set environment(environment) {
        this._environment = environment;
    }
    get environment() {
        return this._environment;
    }
    set deviceData(deviceData) {
        this._deviceData = deviceData;
    }
    get deviceData() {
        return this._deviceData;
    }
    get sensors() {
        return this._sensors;
    }
    set sensors(sensors) {
        this._sensors = sensors;
    }
    get actuators() {
        return this._actuators;
    }
    set actuators(actuators) {
        this._actuators = actuators;
    }
    set actuatorControllers(actuatorControllers) {
        this._actuatorControllers = actuatorControllers;
    }
    get actuatorControllers() {
        return this._actuatorControllers;
    }
}
exports.default = DeviceController;
//# sourceMappingURL=device.controller.js.map