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
		if (!expression || expression.trim() === "") {
			throw new Error("Expression cannot be empty");
		}
		const tempObj: Record<string, () => void> = {
			".": () => {
				if (!currentDecimal) {
					if (currentOperand === "") {
						currentOperand = "0"; // Adding 0 before .
					}
					currentOperand += ".";
					currentDecimal = true;
				} else {
					throw new Error(
						"Invalid Expression : You cant have more than one decimal point in operand",
					);
				}
			},
			"(": () => {
				if (currentOperand !== "") {
					tokens.push(currentOperand);
					if (!this.functions.has(currentOperand)) {
						tokens.push("*");
					}
					currentOperand = "";
				}
				tokens.push("(");
			},
			")": () => {
				if (currentOperand !== "") {
					tokens.push(currentOperand);
					currentOperand = "";
				}
				tokens.push(")");
			},
		};

		const tokens: string[] = []; // array for storing output token
		let currentOperand = "";
		let currentDecimal = false;

		for (let key of expression) {
			if (key === " ") continue;
			// Handle numbers
			if (/\d/.test(key)) {
				currentOperand += key;
			}
			
			// Handles operator
			else if (this.operators.has(key)) {
				({ currentOperand, currentDecimal } = this.#handleOperator(
					key,
					tokens,
					currentOperand,
					currentDecimal,
				));
			}
			// Handles functions like sin cos tan log ln , etc.
			else {
				if (currentOperand !== "" && /\d/.test(currentOperand)) {
					tokens.push(currentOperand);
					tokens.push("*");
					currentOperand = "";
				}
				if (key === "π" || key === "e") {
					key = key === "π" ? String(Math.PI) : String(Math.E);
				}
				currentOperand += key;
			}
			tempObj[key]?.()
		}
		// Push last operand
		if (currentOperand !== "") {
			tokens.push(currentOperand);
		}

		this.#validateEnding(tokens);
		console.log(tokens);
		return tokens;
	}
	// Helper Functions
	#validateExpression(expression:string) : void{
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
				"Invalid Expression: Expression cannot end with operator",
			);
		}
	}
	#handleOperator(
		key: string,
		tokens: string[],
		currentOperand: string,
		currentDecimal: boolean,
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
