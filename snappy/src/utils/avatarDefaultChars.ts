export function defaultChars(firstName?: string, lastName?: string) {
	if (firstName && lastName) return firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();
}
