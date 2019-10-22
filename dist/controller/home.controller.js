"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_controller_1 = require("./environment.controller");
class HomeController {
    constructor() {
        this.reset();
    }
    create(environments) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            for (const environment of environments) {
                let environmentController = new environment_controller_1.default(environment);
                this.environmentsController[environment.name] = environmentController;
                yield environmentController.createDevices();
                let data = yield environmentController.getData();
                this.environments.push(data);
            }
        });
    }
    reset() {
        this.environmentsController = {};
        this.environments = [];
    }
    get environmentsController() {
        return this._environmentsController;
    }
    set environmentsController(envs) {
        this._environmentsController = envs;
    }
    get environments() {
        return this._environments;
    }
    set environments(envs) {
        this._environments = envs;
    }
    get devices() {
        return this._devices;
    }
    get sensors() {
        return this._sensors;
    }
    get actuators() {
        return this._actuators;
    }
}
exports.default = HomeController;
//# sourceMappingURL=home.controller.js.map