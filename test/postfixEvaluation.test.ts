// FILE: test/postfixEvaluation.test.ts
import PostfixEvaluator from "../src/utils/postfixEvaluation";

describe("PostfixEvaluator.evaluate()", () => {
	let evaluator: PostfixEvaluator;

	beforeEach(() => {
		evaluator = new PostfixEvaluator();
	});

	describe("validation", () => {
		it("throws for an empty token list", () => {
			expect(() => evaluator.evaluate([])).toThrow("Invalid expression");
		});

		it("throws for a malformed expression with leftover operands", () => {
			expect(() => evaluator.evaluate(["3", "4"])).toThrow(
				"Malformed Expression",
			);
		});

		it("throws when an operator has insufficient operands", () => {
			expect(() => evaluator.evaluate(["+"])).toThrow(
				"Malformed Expression",
			);
		});
	});

	describe("arithmetic evaluation", () => {
		it("evaluates a simple addition", () => {
			expect(evaluator.evaluate(["3", "4", "+"])).toBe("7");
		});

		it("evaluates 3 + 4 * 2 postfix form (3 4 2 * +) to 11", () => {
			expect(evaluator.evaluate(["3", "4", "2", "*", "+"])).toBe("11");
		});

		it("evaluates (3 + 4) * 2 postfix form (3 4 + 2 *) to 14", () => {
			expect(evaluator.evaluate(["3", "4", "+", "2", "*"])).toBe("14");
		});

		it("propagates division-by-zero errors from the operator", () => {
			expect(() => evaluator.evaluate(["4", "0", "/"])).toThrow(
				"Operator / : Divide by Zero not allowed",
			);
		});
	});

	describe("unary operators and functions", () => {
		it("evaluates the factorial operator", () => {
			expect(evaluator.evaluate(["5", "!"])).toBe("120");
		});

		it("evaluates the NEG operator", () => {
			expect(evaluator.evaluate(["5", "NEG"])).toBe("-5");
		});

		it("evaluates a function call token (sqrt)", () => {
			expect(evaluator.evaluate(["16", "sqrt"])).toBe("4");
		});
	});
});
