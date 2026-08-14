// FILE: test/infixToPostfix.test.ts
import { InfixtoPostfix } from "../src/utils/infixToPostfix";

describe("InfixtoPostfix.convert()", () => {
	let converter: InfixtoPostfix;

	beforeEach(() => {
		converter = new InfixtoPostfix();
	});

	it("throws for an empty token list", () => {
		expect(() => converter.convert([])).toThrow("Invalid Expression");
	});

	it("converts a simple addition to postfix", () => {
		expect(converter.convert(["3", "+", "4"])).toEqual(["3", "4", "+"]);
	});

	it("respects operator precedence (multiplication before addition)", () => {
		// 3 + 4 * 2 -> 3 4 2 * +
		expect(converter.convert(["3", "+", "4", "*", "2"])).toEqual([
			"3",
			"4",
			"2",
			"*",
			"+",
		]);
	});

	it("respects parentheses over default precedence", () => {
		// (3 + 4) * 2 -> 3 4 + 2 *
		expect(
			converter.convert(["(", "3", "+", "4", ")", "*", "2"]),
		).toEqual(["3", "4", "+", "2", "*"]);
	});

	it("handles right-associative operators (power)", () => {
		// 2 ^ 3 ^ 2 -> 2 3 2 ^ ^  (right associative: 2^(3^2))
		expect(converter.convert(["2", "^", "3", "^", "2"])).toEqual([
			"2",
			"3",
			"2",
			"^",
			"^",
		]);
	});

	it("pops a preceding function off the stack ahead of an operator", () => {
		// sin(2) + 3 -> 2 sin 3 +
		expect(
			converter.convert(["sin", "(", "2", ")", "+", "3"]),
		).toEqual(["2", "sin", "3", "+"]);
	});

	it("throws for an unmatched closing parenthesis", () => {
		expect(() => converter.convert([")"])).toThrow(
			"Invalid Expression : Mismatched parentheses",
		);
	});

	it("throws for an unmatched opening parenthesis", () => {
		expect(() => converter.convert(["(", "3", "+", "4"])).toThrow(
			"Invalid Expression ",
		);
	});
});
