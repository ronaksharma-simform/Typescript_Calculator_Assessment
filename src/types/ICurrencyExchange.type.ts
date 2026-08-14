// Currency codes for the 5 supported foreign currencies. INR (Indian
// Rupee) is the implicit base/home currency and is not part of this set —
// conversions always go INR -> one of these, or one of these -> INR.
export type TCurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "AUD";

// Direction of a conversion relative to the base currency (INR).
export type TConversionDirection = "INR_TO_FOREIGN" | "FOREIGN_TO_INR";

// Exchange rate table: 1 INR = rates[currency] units of that currency.
export type TCurrencyRates = Record<TCurrencyCode, number>;

export interface ICurrencyConverter {
	getSupportedCurrencies(): TCurrencyCode[];
	getRate(currency: TCurrencyCode): number;
	convert(
		amount: number,
		currency: TCurrencyCode,
		direction: TConversionDirection,
	): number;
}
