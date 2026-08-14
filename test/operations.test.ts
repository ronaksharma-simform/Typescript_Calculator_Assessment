// FILE: test/operations.test.ts
import { operators, functions, factorial } from "../src/utils/operations";

function op(symbol: string) {
	const entry = operators.get(symbol);
	if (!entry) throw new Error(`operator ${symbol} not registered`);
	return entry;
}

function fn(name: string) {
	const entry = functions.get(name);
	if (!entry) throw new Error(`function ${name} not registered`);
	return entry;
}

describe("operations - operators map", () => {
	it("registers all expected operator symbols", () => {
		expect([...operators.keys()]).toEqual(
			expect.arrayContaining(["+", "-", "*", "/", "^", "NEG", "!", "%"]),
		);
	});

	it("+ adds two numbers (left associative, precedence 1)", () => {
		expect(op("+").execute(2, 3)).toBe(5);
		expect(op("+").associativity).toBe("left");
		expect(op("+").precedence).toBe(1);
	});

	it("- subtracts two numbers", () => {
		expect(op("-").execute(5, 2)).toBe(3);
	});

	it("* multiplies two numbers (higher precedence than +/-)", () => {
		expect(op("*").execute(4, 5)).toBe(20);
		expect(op("*").precedence).toBeGreaterThan(op("+").precedence);
	});

	it("/ divides two numbers", () => {
		expect(op("/").execute(10, 2)).toBe(5);
	});

	it("/ throws on division by zero", () => {
		expect(() => op("/").execute(5, 0)).toThrow(
			"Operator / : Divide by Zero not allowed",
		);
	});

	it("^ raises to a power (right associative)", () => {
		expect(op("^").execute(2, 3)).toBe(8);
		expect(op("^").associativity).toBe("right");
	});

	it("NEG negates a single operand", () => {
		expect(op("NEG").execute(5)).toBe(-5);
		expect(op("NEG").arity).toBe(1);
	});

	it("! computes the factorial of the operand", () => {
		expect(op("!").execute(5)).toBe(120);
	});

	it("% computes the remainder of division", () => {
		expect(op("%").execute(10, 3)).toBe(1);
	});

	it("% throws on modulo by zero", () => {
		expect(() => op("%").execute(5, 0)).toThrow(
			"Operator % : Modulo by Zero not allowed",
		);
	});
});

describe("operations - functions map", () => {
	it("registers all expected function names", () => {
		expect([...functions.keys()]).toEqual(
			expect.arrayContaining(["sin", "cos", "tan", "log", "ln", "sqrt"]),
		);
	});

	it("sin/cos/tan delegate to Math", () => {
		expect(fn("sin").execute(0)).toBeCloseTo(Math.sin(0));
		expect(fn("cos").execute(0)).toBeCloseTo(Math.cos(0));
		expect(fn("tan").execute(0)).toBeCloseTo(Math.tan(0));
	});

	it("sqrt computes the square root", () => {
		expect(fn("sqrt").execute(16)).toBe(4);
	});

	it("log computes base-10 logarithm", () => {
		expect(fn("log").execute(100)).toBeCloseTo(2);
	});

	it("log throws for zero or negative input", () => {
		expect(() => fn("log").execute(0)).toThrow(
			"Invalid Expression : Log of negative number doesnt exist",
		);
		expect(() => fn("log").execute(-5)).toThrow(
			"Invalid Expression : Log of negative number doesnt exist",
		);
	});

	it("ln computes the natural logarithm", () => {
		expect(fn("ln").execute(Math.E)).toBeCloseTo(1);
	});

	it("ln throws for zero or negative input", () => {
		expect(() => fn("ln").execute(0)).toThrow(
			"Invalid Expression : Log of negative number doesnt exist",
		);
	});
});

describe("factorial()", () => {
	it("returns 1 for 0 and 1 (base cases)", () => {
		expect(factorial(0)).toBe(1);
		expect(factorial(1)).toBe(1);
	});

	it("computes the factorial recursively for positive integers", () => {
		expect(factorial(5)).toBe(120);
		expect(factorial(6)).toBe(720);
	});
});
