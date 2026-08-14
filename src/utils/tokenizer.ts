import { operators, functions } from "./operations.js";
import * as Type from "@/types";

export default class TokenParser implements Type.ITokenizer {
	operators: Type.TOperations;
	functions: Type.TFunctions;

	constructor() {
		this.operators = operators;
		this.functions = functions;
	}

	tokenParser(expression: string) {
		this.#validateExpression(expression);

		const tokens: string[] = [];
		let currentOperand = "";
		let currentDecimal = false;

		// 🔥 Handler map (clean dispatch)
		const handlers: Record<string, () => void> = {
			".": () => {
				if (currentDecimal) {
					throw new Error(
						"Invalid Expression: Multiple decimal points in operand"
					);
				}
				if (currentOperand === "") currentOperand = "0";
				currentOperand += ".";
				currentDecimal = true;
			},

			"(": () => {
				if (currentOperand !== "") {
					tokens.push(currentOperand);

					if (!this.functions.has(currentOperand)) {
						tokens.push("*");
					}

					currentOperand = "";
					currentDecimal = false;
				}
				tokens.push("(");
			},

			")": () => {
				if (currentOperand !== "") {
					tokens.push(currentOperand);
					currentOperand = "";
					currentDecimal = false;
				}
				tokens.push(")");
			},
		};

		// 🔥 Main loop (flat, readable)
		for (let key of expression) {
			if (key === " ") continue;

			// 1️⃣ Number
			if (this.#isDigit(key)) {
				currentOperand += key;
				continue;
			}

			// 2️⃣ Special handlers (., (, ))
			if (handlers[key]) {
				handlers[key]!();
				continue;
			}

			// 3️⃣ Operator
			if (this.operators.has(key)) {
				({ currentOperand, currentDecimal } = this.#handleOperator(
					key,
					tokens,
					currentOperand,
					currentDecimal
				));
				continue;
			}

			// 4️⃣ Constants
			if (key === "π" || key === "e") {
				key = key === "π" ? String(Math.PI) : String(Math.E);
			}

			// 5️⃣ Function / variable handling
			if (currentOperand !== "" && this.#isNumericString(currentOperand)) {
				tokens.push(currentOperand);
				tokens.push("*");
				currentOperand = "";
				currentDecimal = false;
			}

			currentOperand += key;
		}

		// operand push
		if (currentOperand !== "") {
			tokens.push(currentOperand);
		}

		this.#validateEnding(tokens);
		return tokens;
	}

	// ---------------- Helpers ----------------

	#isDigit(char: string): boolean {
		return /\d/.test(char);
	}

	#isNumericString(str: string): boolean {
		return /^\d+(\.\d+)?$/.test(str);
	}

	#validateExpression(expression: string): void {
		if (!expression || expression.trim() === "") {
			throw new Error("Expression cannot be empty");
		}
	}

	#validateEnding(tokens: string[]): void {
		if (
			tokens.length === 0 ||
			(this.operators.has(tokens[tokens.length - 1]!) &&
				tokens[tokens.length - 1] !== "!")
		) {
			throw new Error(
				"Invalid Expression: Expression cannot end with operator"
			);
		}
	}

	#handleOperator(
		key: string,
		tokens: string[],
		currentOperand: string,
		currentDecimal: boolean
	): { currentOperand: string; currentDecimal: boolean } {
		if (currentOperand !== "") {
			tokens.push(currentOperand);
			currentOperand = "";
			currentDecimal = false;
		} else if (key === "-") {
			if (
				tokens.length === 0 ||
				(this.operators.has(tokens[tokens.length - 1]!) &&
					tokens[tokens.length - 1] !== "!") ||
				tokens[tokens.length - 1] === "("
			) {
				tokens.push("NEG");
				return { currentOperand, currentDecimal };
			}
		}

		tokens.push(key);
		return { currentOperand, currentDecimal };
	}
}