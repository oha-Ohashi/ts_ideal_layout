import * as io from "./io";
import * as ev from "./evaluate";
class Random {
	x: number
	y: number
	z: number
	w: number
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
	nextInt(min: number, max: number) {
		const r = Math.abs(this.next());
		return min + (r % (max + 1 - min));
	}
}
const random = new Random(1);


export function search(nk: io.NaiKeeper): string{
	const n_roop: number= 2000
	let abc: string[] = nk.nai
	//console.log(abc)
	let e_max: number = ev.evaluate(
		nk.mizuni_modosu(abc)
	).cost_sum
	//console.log(abc)
	for(let i = 0; i < n_roop; i++){
		const new_abc: string[] = swap(abc)
		const new_e: number = ev.evaluate(
			nk.mizuni_modosu(new_abc)
		).cost_sum
		if(new_e < e_max){
			//console.log("update!", i)
			abc = new_abc
			e_max = new_e
		}
	}
	return abc.join("")
}

function swap(arg: string[]){
	let arr:string[] = arg.map(x => x)
	let i: number = random.nextInt(0, arr.length-1)
	let j: number = random.nextInt(0, arr.length-1)
	const tmp: string = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
	return arr
}
function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

if(require.main === module) {
	let nk: io.NaiKeeper = new io.NaiKeeper("./src/config.txt")

	for(let i = 0; i < 10; i++){
		const indv: string = search(nk)
		const keys_to_show = nk.mizuni_modosu(indv.split(""))
		console.log(keys_to_show)
		console.log(ev.keys3x10(keys_to_show))
		console.log(ev.evaluate(keys_to_show).cost_sum)
	}
}


