import { Stack } from "./stack.js";
import { operators, functions } from "./operations.js";
import * as Type from "@/types";
export default class PostfixEvaluator implements Type.IPostfixEvaluation {
	operators: Type.TOperations;
	functions: Type.TFunctions;
	constructor() {
		this.operators = operators;
		this.functions = functions;
	}
	evaluate(tokens: string[]) {
		if (!Array.isArray(tokens) || tokens.length === 0) {
			throw new Error("Invalid expression");
		}
		const st = new Stack();
		for (let token of tokens) {
			if (this.operators.has(token) || this.functions.has(token)) {
				const currentOperands: number[] = [];
				// get current operator or function details
				let currentOperator = this.operators.has(token)
					? this.operators.get(token)
					: this.functions.get(token);
				if (!currentOperator)
					throw new Error("Operator or Function didnt Exist");
				if (st.size() < currentOperator.arity) {
					throw new Error("Malformed Expression");
				}

				for (let i = 0; i < currentOperator.arity; i++) {
					currentOperands.unshift(parseFloat(st.pop()));
				}
				// executing operator on operands
				let result = currentOperator.execute(...currentOperands);

				st.push(String(result));
			} else {
				st.push(token);
			}
		}
		console.log(st.peek());
		if (st.size() !== 1) {
			throw new Error("Malformed Expression");
		}
		return st.peek();
	}
}
