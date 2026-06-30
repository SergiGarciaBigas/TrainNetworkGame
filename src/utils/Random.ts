export function randomInt(minimum: number, maximum: number): number {
	if (maximum < minimum) {
		throw new Error("El valor máximo debe ser mayor o igual que el mínimo.");
	}

	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

