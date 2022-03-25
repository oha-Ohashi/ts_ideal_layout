import * as fs from 'fs'
import * as io from "./io";
import * as calc from "./calc";

export function disp_eval(keys: string): void{
	console.log(keys3x10(keys))
	const calc_obj = evaluate(keys)
	console.log("alternates: ", calc_obj.n_alternate)
	console.log("costs:", calc_obj.costs)
	console.log("cost:", calc_obj.cost_sum)
	console.log("------------------------------")
	//const calc =
}

export function keys3x10(keys: string): string{
	let l: string[] = keys.split("")
	const sth: [number, string][] = [[5, ' '],[16, ' '],[27, ' '],[11, '\n'],[23, '\n']]
	sth.forEach((item) => {
		l.splice(item[0], 0, item[1])
		//console.log(item)
	})
	return l.join("")
}

export function evaluate(keys: string): calc.Calculation{
	let text: string = 'it is a fine day'
	text += fs.readFileSync("./src/txt_to_type/en.txt").toString()
	text += fs.readFileSync("./src/txt_to_type/ja.txt").toString()
	//console.log(text.length)
	const xy_array = io.string_to_xyarray(text, keys)
	//console.log(xy_array)
	const calc_obj = new calc.Calculation(xy_array)
	return calc_obj
}


if(require.main === module) {
	disp_eval('ABCDEFGHIJKLMNOPQRSTUVWXYZ____')
	disp_eval('QWERTYUIOPASDFGHJKL_ZXCVBNM___')
}