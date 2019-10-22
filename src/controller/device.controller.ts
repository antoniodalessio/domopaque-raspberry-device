import Device from './../model/device'
import Sensor from './../model/sensor'
import Environment from '../model/environment';
import Actuator from '../model/actuator';
import SensorController from './sensor.controller';
import ActuatorController from './actuator.controller';

class DeviceController implements Device{
    
    name: string = '';
    type: string = '';
    ip: string = '';
    private _sensors: Sensor[] = [];
    private _environment: Environment;
    private _deviceData: any;
    error:any;

    private _actuatorControllers = []
    private _actuators: Actuator[] = []

    sensorTypes: string[] = ['temperature', 'umidity', 'raindrop'];

    constructor(environment, deviceData) {
        this.environment = environment;
        this.deviceData = deviceData;
        this.name = `${environment.name}_${deviceData.ip}`;
        this.ip =  deviceData.ip;
        if (deviceData.error) {
            this.error = deviceData.error
        }
        this.setSensors()
        this.setActuators()
    }

    getData() {
        let returnObj = {
            name: this.name,
            ip: this.ip,
            type: this.type,
            sensors: this.sensors
        }

        if (this.error) {
            returnObj["error"] = this.error
        }
        return returnObj
    }

    setSensors() {
        this.sensors = []
        Object.keys(this.deviceData).forEach((key) => {
            if (this.sensorTypes.indexOf(key) != -1) {
                let sensorData = {
                    key,
                    value: this._deviceData[key]
                }
                let sensorController = new SensorController(this.getData(), sensorData)
                this.sensors.push(sensorController.getData())
            }
        })
    }

    setActuators() {
        this.actuators = []
    }

    refresh(deviceData) {
        this.deviceData = deviceData;
        this.setSensors()
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
        return this._sensors
    }

    set sensors(sensors) {
        this._sensors = sensors
    }

    get actuators() {
        return this._actuators
    }

    set actuators(actuators) {
        this._actuators = actuators
    }

    set actuatorControllers(actuatorControllers) {
        this._actuatorControllers = actuatorControllers;
    }

    get actuatorControllers() {
        return this._actuatorControllers;
    }
}

export default DeviceController;