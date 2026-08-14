import * as Type from "@/types";

// Static reference exchange rates: 1 INR = <rate> units of the foreign
// currency. These are fixed demo values (not live market data) because
// this project is a static, client-side-only app with no backend/API
// integration. Update this table to refresh the reference rates.
export const EXCHANGE_RATES: Type.TCurrencyRates = {
	USD: 0.012, // 1 INR ≈ 0.012 USD  (≈ 83.33 INR per USD)
	EUR: 0.011, // 1 INR ≈ 0.011 EUR  (≈ 90.91 INR per EUR)
	GBP: 0.0095, // 1 INR ≈ 0.0095 GBP (≈ 105.26 INR per GBP)
	JPY: 1.81, // 1 INR ≈ 1.81 JPY   (≈ 0.55 INR per JPY)
	AUD: 0.018, // 1 INR ≈ 0.018 AUD  (≈ 55.56 INR per AUD)
};

export default class CurrencyConverter implements Type.ICurrencyConverter {
	#rates: Type.TCurrencyRates;

	constructor(rates: Type.TCurrencyRates = EXCHANGE_RATES) {
		this.#rates = rates;
	}

	getSupportedCurrencies(): Type.TCurrencyCode[] {
		return Object.keys(this.#rates) as Type.TCurrencyCode[];
	}

	getRate(currency: Type.TCurrencyCode): number {
		const rate = this.#rates[currency];
		if (rate === undefined) {
			throw new Error(`Unsupported currency: ${currency}`);
		}
		return rate;
	}

	convert(
		amount: number,
		currency: Type.TCurrencyCode,
		direction: Type.TConversionDirection,
	): number {
		if (typeof amount !== "number" || !Number.isFinite(amount)) {
			throw new Error("Invalid Amount : Amount must be a finite number");
		}
		if (amount < 0) {
			throw new Error("Invalid Amount : Amount cannot be negative");
		}
		const rate = this.getRate(currency);
		if (direction === "INR_TO_FOREIGN") {
			return this.#round(amount * rate);
		}
		if (direction === "FOREIGN_TO_INR") {
			return this.#round(amount / rate);
		}
		throw new Error(`Invalid Direction : ${direction}`);
	}

	#round(value: number): number {
		return Math.round(value * 100) / 100;
	}
}
