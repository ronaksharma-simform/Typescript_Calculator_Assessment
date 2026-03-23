import * as Type from "@/types";

export class Stack implements Type.IStack<string> {
	private stack: string[];
	constructor() {
		this.stack = [];
	}
	push(value: string) {
		this.stack.push(value);
	}
	pop() {
		if (this.isEmpty()) {
			throw new Error("Stack underflow: cannot pop from empty stack.");
		}
		return this.stack.pop()!;
	}
	peek() {
		if (this.isEmpty()) {
			throw new Error("Stack Empty : cannot access from empty stack.");
		}
		return this.stack[this.stack.length - 1]!;
	}
	isEmpty() {
		return this.stack.length === 0;
	}
	clear() {
		this.stack.length = 0;
	}
	size() {
		return this.stack.length;
	}
}
