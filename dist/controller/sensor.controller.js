"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SensorController {
    constructor(device, sensorData) {
        this.name = '';
        this.type = '';
        this._value = '';
        this.device = device;
        this.type = sensorData.key;
        this.sensorData = sensorData;
        this.name = `${device.name}_${sensorData.key}`;
        this.value = sensorData.value;
    }
    getData() {
        return {
            name: this.name,
            type: this.type,
            value: this.value,
            timestamp: Date.now()
        };
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    set device(device) {
        this._device = device;
    }
    get device() {
        return this._device;
    }
    set sensorData(sensorData) {
        this._sensorData = sensorData;
    }
    get sensorData() {
        return this._sensorData;
    }
}
exports.default = SensorController;
//# sourceMappingURL=sensor.controller.js.map