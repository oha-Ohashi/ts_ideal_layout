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
exports.search = void 0;
const io = __importStar(require("./io"));
const ev = __importStar(require("./evaluate"));
class Random {
    constructor(seed = 88675123) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }
    // XorShift
    next() {
        const t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }
    // min 以上 max 以下の乱数を生成する
    nextInt(min, max) {
        const r = Math.abs(this.next());
        return min + (r % (max + 1 - min));
    }
}
const random = new Random(1);
function search(nk) {
    const n_roop = 2000;
    let abc = nk.nai;
    //console.log(abc)
    let e_max = ev.evaluate(nk.mizuni_modosu(abc)).cost_sum;
    //console.log(abc)
    for (let i = 0; i < n_roop; i++) {
        const new_abc = swap(abc);
        const new_e = ev.evaluate(nk.mizuni_modosu(new_abc)).cost_sum;
        if (new_e < e_max) {
            //console.log("update!", i)
            abc = new_abc;
            e_max = new_e;
        }
    }
    return abc.join("");
}
exports.search = search;
function swap(arg) {
    let arr = arg.map(x => x);
    let i = random.nextInt(0, arr.length - 1);
    let j = random.nextInt(0, arr.length - 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return arr;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
if (require.main === module) {
    let nk = new io.NaiKeeper("./src/config.txt");
    /*
    console.log(nk.layout)
    console.log(nk.nai)
    let arr = ["1","2","3","4","5","6","7","8","9","10"]
    for(let i = 0; i < 10; i++){
        swap(arr)
    }
    console.log(arr)
    */
    for (let i = 0; i < 10; i++) {
        const indv = search(nk);
        const keys_to_show = nk.mizuni_modosu(indv.split(""));
        console.log(keys_to_show);
        console.log(ev.keys3x10(keys_to_show));
        console.log(ev.evaluate(keys_to_show).cost_sum);
    }
}
//# sourceMappingURL=search.js.map