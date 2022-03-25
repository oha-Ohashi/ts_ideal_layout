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
exports.evaluate = exports.keys3x10 = exports.disp_eval = void 0;
const fs = __importStar(require("fs"));
const io = __importStar(require("./io"));
const calc = __importStar(require("./calc"));
function disp_eval(keys) {
    console.log(keys3x10(keys));
    const calc_obj = evaluate(keys);
    console.log("alternates: ", calc_obj.n_alternate);
    console.log("costs:", calc_obj.costs);
    console.log("cost:", calc_obj.cost_sum);
    console.log("------------------------------");
    //const calc =
}
exports.disp_eval = disp_eval;
function keys3x10(keys) {
    let l = keys.split("");
    const sth = [[5, ' '], [16, ' '], [27, ' '], [11, '\n'], [23, '\n']];
    sth.forEach((item) => {
        l.splice(item[0], 0, item[1]);
        //console.log(item)
    });
    return l.join("");
}
exports.keys3x10 = keys3x10;
function evaluate(keys) {
    let text = 'it is a fine day';
    text += fs.readFileSync("./src/txt_to_type/en.txt").toString();
    text += fs.readFileSync("./src/txt_to_type/ja.txt").toString();
    //console.log(text.length)
    const xy_array = io.string_to_xyarray(text, keys);
    //console.log(xy_array)
    const calc_obj = new calc.Calculation(xy_array);
    return calc_obj;
}
exports.evaluate = evaluate;
if (require.main === module) {
    disp_eval('ABCDEFGHIJKLMNOPQRSTUVWXYZ____');
    disp_eval('QWERTYUIOPASDFGHJKL_ZXCVBNM___');
}
//# sourceMappingURL=evaluate.js.map