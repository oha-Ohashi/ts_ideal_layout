"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaiKeeper = exports.string_to_xyarray = void 0;
const fs = __importStar(require("fs"));
function string_to_xyarray(text, keys_in1row) {
    let res = [];
    text.split("").forEach((item) => {
        const xy = c_to_xy(item, keys_in1row);
        if (xy != null) {
            res.push(xy);
        }
    });
    return res;
}
exports.string_to_xyarray = string_to_xyarray;
function c_to_xy(item, keys_in1row) {
    const c = item.toUpperCase();
    const index = keys_in1row.split("").indexOf(c);
    if (index > -1) {
        return [index % 10, Math.floor(index / 10)];
    }
    else {
        return null;
    }
}
class NaiKeeper {
    constructor(path) {
        let data = fs.readFileSync(path).toString().split("");
        data = data.filter(item => item !== "\n");
        this.layout = data;
        this.nai = this.gen_nai();
    }
    gen_nai() {
        let nai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ;,./'.split("");
        nai = nai.filter(item => this.layout.indexOf(item) == -1);
        return nai;
    }
    mizuni_modosu(target) {
        let tgt = target.map(x => x);
        let modoshi = [];
        for (let i = 0; i < 30; i++) {
            const c = this.layout[i];
            if (c != '_') {
                modoshi.push(c);
            }
            else {
                let item = tgt.shift();
                if (typeof item === 'string') {
                    modoshi.push(item);
                }
            }
        }
        return modoshi.join("");
    }
}
exports.NaiKeeper = NaiKeeper;
//# sourceMappingURL=io.js.map