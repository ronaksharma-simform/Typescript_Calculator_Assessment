// FILE: test/tokenizer.test.ts
import TokenParser from "../src/utils/tokenizer";

describe("TokenParser.tokenParser()", () => {
	let tokenizer: TokenParser;

	beforeEach(() => {
		tokenizer = new TokenParser();
	});

	describe("validation", () => {
		it("throws when the expression is empty", () => {
			expect(() => tokenizer.tokenParser("")).toThrow(
				"Expression cannot be empty",
			);
		});

		it("throws when the expression is only whitespace", () => {
			expect(() => tokenizer.tokenParser("   ")).toThrow(
				"Expression cannot be empty",
			);
		});

		it("throws when the expression ends with a binary operator", () => {
			expect(() => tokenizer.tokenParser("3+")).toThrow(
				"Invalid Expression: Expression cannot end with operator",
			);
		});

		it("throws when an operand has more than one decimal point", () => {
			expect(() => tokenizer.tokenParser("3.5.6")).toThrow(
				"Invalid Expression: Multiple decimal points in operand",
			);
		});
	});

	describe("basic tokenization", () => {
		it("splits a simple addition expression into tokens", () => {
			expect(tokenizer.tokenParser("3+4")).toEqual(["3", "+", "4"]);
		});

		it("preserves decimal numbers as single tokens", () => {
			expect(tokenizer.tokenParser("3.5+2")).toEqual(["3.5", "+", "2"]);
		});

		it("ignores whitespace between tokens", () => {
			expect(tokenizer.tokenParser("3 + 4")).toEqual(["3", "+", "4"]);
		});
	});

	describe("parentheses handling", () => {
		it("tokenizes a parenthesized expression", () => {
			expect(tokenizer.tokenParser("(3+4)")).toEqual([
				"(",
				"3",
				"+",
				"4",
				")",
			]);
		});

		it("inserts an implicit multiplication before a parenthesis", () => {
			expect(tokenizer.tokenParser("2(3+4)")).toEqual([
				"2",
				"*",
				"(",
				"3",
				"+",
				"4",
				")",
			]);
		});
	});

	describe("unary minus handling", () => {
		it("converts a leading minus into the NEG token", () => {
			expect(tokenizer.tokenParser("-3+4")).toEqual([
				"NEG",
				"3",
				"+",
				"4",
			]);
		});

		it("converts a minus following an operator into NEG", () => {
			expect(tokenizer.tokenParser("3*-4")).toEqual([
				"3",
				"*",
				"NEG",
				"4",
			]);
		});
	});

	describe("constants", () => {
		it("expands π into its numeric value", () => {
			expect(tokenizer.tokenParser("π+1")).toEqual([
				String(Math.PI),
				"+",
				"1",
			]);
		});

		it("expands e into its numeric value", () => {
			expect(tokenizer.tokenParser("e+1")).toEqual([
				String(Math.E),
				"+",
				"1",
			]);
		});
	});

	describe("function names", () => {
		it("tokenizes a function call as a single function token", () => {
			expect(tokenizer.tokenParser("sin(30)")).toEqual([
				"sin",
				"(",
				"30",
				")",
			]);
		});
	});
});
