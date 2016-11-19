"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const index_1 = require('../index');
const hook = new index_1.default({ proxy_agent: '188.120.246.158:8930' });
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let ok = yield hook.get('https://vk.com');
            console.log(ok);
        }
        catch (err) {
            console.log(err);
        }
    });
}
