export function setItem(key: string, item: any) {
	localStorage.setItem(key, JSON.stringify(item));
}

export function getItem(key: string) {
	if (key) {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item);
		}
	}
}

export function removeItem(key: string) {
	localStorage.removeItem(key);
}
