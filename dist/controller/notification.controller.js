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
var FCM = require('fcm-node');
var serverKey = 'AAAAzrR9y9g:APA91bGRH3oO0jYrby24Zgou-If_gmynlD4uOHuaKJ4terNeIr9pP90J7Ur4lXCs-F0Mbw2SZR5m3FCKINXvnwNq4bcJ6P5B_UkJqopfO5qB1BqAylGF86yyi8kasl_I0M865pkDCzvQ';
var fcm = new FCM(serverKey);
class NotificationController {
    sendTo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = {
                to: token,
                collapse_key: 'your_collapse_key',
                notification: {
                    title: 'Title of your push notification',
                    body: 'Body of your push notification'
                },
                data: {
                    my_key: 'my value',
                    my_another_key: 'my another value'
                }
            };
            yield fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                }
                else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        });
    }
    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
    get users() {
        return this.removeDuplicates(this._users, 'deviceId');
    }
    set users(users) {
        this._users = users;
    }
}
exports.default = NotificationController;
//# sourceMappingURL=notification.controller.js.map