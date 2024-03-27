export function getRandomId(arr:unknown[]) {

	let random = Math.floor(Math.random() * arr.length);
	return arr[random];

}
