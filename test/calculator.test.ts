// FILE: test/calculator.test.ts
// Integration tests: exercise Calculator with the real tokenizer, converter
// and evaluator (no mocks) so the full expression-evaluation pipeline is
// verified end-to-end, backed by jsdom's localStorage implementation.
import Calculator from "../src/utils/Calculator";
import TokenParser from "../src/utils/tokenizer";
import { InfixtoPostfix } from "../src/utils/infixToPostfix";
import PostfixEvaluator from "../src/utils/postfixEvaluation";

function createCalculator(): Calculator {
	return new Calculator(
		new TokenParser(),
		new InfixtoPostfix(),
		new PostfixEvaluator(),
	);
}

describe("Calculator", () => {
	let calc: Calculator;

	beforeEach(() => {
		window.localStorage.clear();
		calc = createCalculator();
	});

	describe("evaluate()", () => {
		it("evaluates a simple expression", () => {
			expect(calc.evaluate("3+4")).toBe("7");
		});

		it("respects operator precedence", () => {
			expect(calc.evaluate("3+4*2")).toBe("11");
		});

		it("respects parentheses", () => {
			expect(calc.evaluate("(3+4)*2")).toBe("14");
		});

		it("evaluates scientific functions", () => {
			expect(calc.evaluate("sqrt(16)")).toBe("4");
		});

		it("throws a descriptive error for division by zero", () => {
			expect(() => calc.evaluate("10/0")).toThrow(
				"Operator / : Divide by Zero not allowed",
			);
		});

		it("throws for a malformed / empty expression", () => {
			expect(() => calc.evaluate("")).toThrow("Expression cannot be empty");
		});
	});

	describe("history persistence", () => {
		it("starts with an empty history", () => {
			expect(calc.getHistory()).toEqual([]);
		});

		it("persists a calculation to localStorage via setHistory()", () => {
			calc.setHistory("3+4=7");
			expect(window.localStorage.getItem("prev_calculations")).toBe(
				"3+4=7",
			);
		});

		it("accumulates multiple history entries in order", () => {
			calc.setHistory("3+4=7");
			calc.setHistory("2*5=10");
			expect(window.localStorage.getItem("prev_calculations")).toBe(
				"3+4=7,2*5=10",
			);
		});

		it("getHistory() reads previously persisted entries", () => {
			calc.setHistory("3+4=7");
			const freshCalculator = createCalculator();
			expect(freshCalculator.getHistory()).toEqual(["3+4=7"]);
		});

		it("clearHistory() removes persisted history", () => {
			calc.setHistory("3+4=7");
			calc.clearHistory();
			expect(window.localStorage.getItem("prev_calculations")).toBeNull();
		});
	});
});
