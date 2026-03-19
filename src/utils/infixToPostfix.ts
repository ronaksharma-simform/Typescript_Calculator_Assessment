import { Stack } from "./stack.js";
import * as Type from "@/types";
import { operators, functions } from "./operations.js";

export class InfixtoPostfix implements Type.IPosfixConversion {
	operators: Type.TOperations;
	functions: Type.TFunctions;
	constructor() {
		this.operators = operators;
		this.functions = functions;
	}
	convert(tokens: string[]) {
		if (tokens.length === 0) {
			throw new Error("Invalid Expression");
		}
		const output = [];
		const st = new Stack();

		for (let token of tokens) {
			if (token === "") continue;
			// Handling operator and function
			if (this.operators.has(token) || this.functions.has(token)) {
				this.#handleOperator(token, st, output);
			} 
			// Handling opening parenthesis and closing parenthesis
			else if(token === '(' || token===")"){
                this.#handleBracket(token,st,output)
            }
			// Handling operands
			else {
				output.push(token);
			}
		}
		// pushing remaining operators into expressions
		while (!st.isEmpty() && st.peek() !== "(") {
			output.push(st.pop());
		}
		if (!st.isEmpty()) {
			throw new Error("Invalid Expression ");
		}
		console.log(output);
		return output;
	}
	#handleOperator(token: string, stack: Type.IStack, output: string[]) {
		while (
			!stack.isEmpty() &&
			stack.peek() !== "(" &&
			this.#shouldPop(token, stack.peek())
		) {
			output.push(stack.pop());
		}

		stack.push(token);
	}
	#shouldPop(current: string, top: string) {
		if (this.functions.has(top)) return true;

		if (!this.operators.has(current) || !this.operators.has(top))
			return false;

		const currentOp = this.operators?.get(current)!;
		const topOp = this.operators?.get(top)!;

		if (currentOp.associativity === "left") {
			return currentOp.precedence <= topOp.precedence;
		}

		if (currentOp.associativity === "right") {
			return currentOp.precedence < topOp.precedence;
		}
		return false;
	}
	#handleBracket(token: string, stack: Type.IStack, output: string[]) {
        // Handling Opening Parenthesis
		if (token === "(") {
			stack.push(token);
		}
		// Handling closing parenthesis
		else {
			if (stack.isEmpty()) {
				throw new Error("Invalid Expression : Mismatched parentheses");
			}
			while (stack.peek() !== "(") {
				output.push(stack.pop());
			}
			stack.pop();
		}
	}
}
