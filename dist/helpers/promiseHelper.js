"use strict";
// @Service()
// class PromiseHelper {
//   constructor() {}
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPromise = (url) => {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((res) => resolve(res.json()))
            .catch(() => { console.error(`Timeout del server ${url}`); });
    });
};
exports.timerPromise = (time) => {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time, null);
    });
};
//# sourceMappingURL=promiseHelper.js.map