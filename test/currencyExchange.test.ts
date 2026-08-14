// FILE: test/currencyExchange.test.ts
import CurrencyConverter, {
	EXCHANGE_RATES,
} from "../src/utils/currencyExchange";

describe("CurrencyConverter - supported currencies", () => {
	it("supports exactly 5 foreign currencies alongside INR", () => {
		const converter = new CurrencyConverter();
		expect(converter.getSupportedCurrencies()).toEqual(
			expect.arrayContaining(["USD", "EUR", "GBP", "JPY", "AUD"]),
		);
		expect(converter.getSupportedCurrencies()).toHaveLength(5);
	});
});

describe("CurrencyConverter - getRate()", () => {
	it("returns the configured rate for a supported currency", () => {
		const converter = new CurrencyConverter();
		expect(converter.getRate("USD")).toBe(EXCHANGE_RATES.USD);
	});

	it("throws for an unsupported currency", () => {
		const converter = new CurrencyConverter();
		expect(() => converter.getRate("XYZ" as never)).toThrow(
			"Unsupported currency: XYZ",
		);
	});
});

describe("CurrencyConverter - convert() INR to foreign", () => {
	it("converts INR to USD using the configured rate", () => {
		const converter = new CurrencyConverter({
			USD: 0.012,
			EUR: 0.011,
			GBP: 0.0095,
			JPY: 1.81,
			AUD: 0.018,
		});
		expect(converter.convert(1000, "USD", "INR_TO_FOREIGN")).toBe(12);
	});

	it("returns 0 when converting a 0 amount", () => {
		const converter = new CurrencyConverter();
		expect(converter.convert(0, "USD", "INR_TO_FOREIGN")).toBe(0);
	});
});

describe("CurrencyConverter - convert() foreign to INR", () => {
	it("converts USD back to INR using the configured rate", () => {
		const converter = new CurrencyConverter({
			USD: 0.012,
			EUR: 0.011,
			GBP: 0.0095,
			JPY: 1.81,
			AUD: 0.018,
		});
		expect(converter.convert(12, "USD", "FOREIGN_TO_INR")).toBe(1000);
	});
});

describe("CurrencyConverter - convert() validation", () => {
	it("throws for a negative amount", () => {
		const converter = new CurrencyConverter();
		expect(() => converter.convert(-5, "USD", "INR_TO_FOREIGN")).toThrow(
			"Invalid Amount : Amount cannot be negative",
		);
	});

	it("throws for a NaN amount", () => {
		const converter = new CurrencyConverter();
		expect(() =>
			converter.convert(Number.NaN, "USD", "INR_TO_FOREIGN"),
		).toThrow("Invalid Amount : Amount must be a finite number");
	});

	it("throws for a non-finite amount", () => {
		const converter = new CurrencyConverter();
		expect(() =>
			converter.convert(Number.POSITIVE_INFINITY, "USD", "INR_TO_FOREIGN"),
		).toThrow("Invalid Amount : Amount must be a finite number");
	});

	it("throws for an unsupported currency during conversion", () => {
		const converter = new CurrencyConverter();
		expect(() =>
			converter.convert(100, "XYZ" as never, "INR_TO_FOREIGN"),
		).toThrow("Unsupported currency: XYZ");
	});

	it("throws for an unsupported conversion direction", () => {
		const converter = new CurrencyConverter();
		expect(() =>
			converter.convert(100, "USD", "SIDEWAYS" as never),
		).toThrow("Invalid Direction : SIDEWAYS");
	});
});

describe("CurrencyConverter - rounding", () => {
	it("rounds converted amounts to 2 decimal places", () => {
		const converter = new CurrencyConverter({
			USD: 0.0123456,
			EUR: 0.011,
			GBP: 0.0095,
			JPY: 1.81,
			AUD: 0.018,
		});
		expect(converter.convert(100, "USD", "INR_TO_FOREIGN")).toBe(1.23);
	});
});
