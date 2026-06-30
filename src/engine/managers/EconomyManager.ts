export class EconomyManager {
	private balance: number;
	private totalIncome: number;
	private totalExpenses: number;
	private ticketPrice: number;
	private operatingCostPerTick: number;
	private passengersProcessed: number;

	constructor(initialBalance: number = 10000,	ticketPrice: number = 25, operatingCostPerTick: number = 5) {
		this.balance = initialBalance;
		this.totalIncome = 0;
		this.totalExpenses = 0;
		this.ticketPrice = ticketPrice;
		this.operatingCostPerTick = operatingCostPerTick;
		this.passengersProcessed = 0;
	}

	public getBalance(): number {
		return this.balance;
	}

	public getTotalIncome(): number {
		return this.totalIncome;
	}

	public getTotalExpenses(): number {
		return this.totalExpenses;
	}

	public getTicketPrice(): number {
		return this.ticketPrice;
	}

	public getOperatingCostPerTick(): number {
		return this.operatingCostPerTick;
	}

	public getPassengersProcessed(): number {
		return this.passengersProcessed;
	}

	public setTicketPrice(ticketPrice: number): void {
		if (ticketPrice < 0) {
			throw new Error("El precio del ticket no puede ser negativo.");
		}

		this.ticketPrice = ticketPrice;
	}

	public setOperatingCostPerTick(operatingCostPerTick: number): void {
		if (operatingCostPerTick < 0) {
			throw new Error("El coste operativo no puede ser negativo.");
		}

		this.operatingCostPerTick = operatingCostPerTick;
	}

	public addIncome(amount: number): void {
		if (amount < 0) {
			throw new Error("El ingreso no puede ser negativo.");
		}

		this.balance += amount;
		this.totalIncome += amount;
	}

	public addExpense(amount: number): void {
		if (amount < 0) {
			throw new Error("El gasto no puede ser negativo.");
		}

		this.balance -= amount;
		this.totalExpenses += amount;
	}

	public processTicketSale(ticketPrice: number = this.ticketPrice): number {
		this.addIncome(ticketPrice);
		this.passengersProcessed++;

		return ticketPrice;
	}

	public registerPassengerAtStation(): number {
		return this.processTicketSale();
	}

	public update(): void {
		if (this.operatingCostPerTick > 0) {
			this.addExpense(this.operatingCostPerTick);
		}
	}

	public reset(balance: number = 10000): void {
		this.balance = balance;
		this.totalIncome = 0;
		this.totalExpenses = 0;
		this.passengersProcessed = 0;
	}

}

