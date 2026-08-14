// FILE: test/stack.test.ts
import { Stack } from "../src/utils/stack";

describe("Stack", () => {
	let stack: Stack;

	beforeEach(() => {
		stack = new Stack();
	});

	describe("isEmpty()", () => {
		it("returns true for a newly created stack", () => {
			expect(stack.isEmpty()).toBe(true);
		});

		it("returns false once an item has been pushed", () => {
			stack.push("1");
			expect(stack.isEmpty()).toBe(false);
		});
	});

	describe("push()", () => {
		it("adds a value to the top of the stack", () => {
			stack.push("a");
			stack.push("b");
			expect(stack.peek()).toBe("b");
			expect(stack.size()).toBe(2);
		});
	});

	describe("pop()", () => {
		it("removes and returns the top value (LIFO order)", () => {
			stack.push("1");
			stack.push("2");
			stack.push("3");
			expect(stack.pop()).toBe("3");
			expect(stack.pop()).toBe("2");
			expect(stack.size()).toBe(1);
		});

		it("throws a descriptive error when popping an empty stack", () => {
			expect(() => stack.pop()).toThrow(
				"Stack underflow: cannot pop from empty stack.",
			);
		});
	});

	describe("peek()", () => {
		it("returns the top value without removing it", () => {
			stack.push("x");
			expect(stack.peek()).toBe("x");
			expect(stack.size()).toBe(1);
		});

		it("throws a descriptive error when peeking an empty stack", () => {
			expect(() => stack.peek()).toThrow(
				"Stack Empty : cannot access from empty stack.",
			);
		});
	});

	describe("clear()", () => {
		it("empties the stack", () => {
			stack.push("1");
			stack.push("2");
			stack.clear();
			expect(stack.isEmpty()).toBe(true);
			expect(stack.size()).toBe(0);
		});
	});

	describe("size()", () => {
		it("reflects the number of elements currently on the stack", () => {
			expect(stack.size()).toBe(0);
			stack.push("1");
			stack.push("2");
			expect(stack.size()).toBe(2);
			stack.pop();
			expect(stack.size()).toBe(1);
		});
	});
});
