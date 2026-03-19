import * as Type from "@/types";

export default class Calculator {
	#tokenizer;
	#parser;
	#evaluator;
	#history: string[];

	constructor(
		tokenizer: Type.ITokenizer,
		parser: Type.IPosfixConversion,
		evaluator: Type.IPostfixEvaluation,
	) {
		this.#tokenizer = tokenizer;
		this.#parser = parser;
		this.#evaluator = evaluator;
		this.#history = [];
	}
	evaluate(expression: string): string {
		const tokens = this.#tokenizer.tokenParser(expression);
		const postfix = this.#parser.convert(tokens);
		const result = this.#evaluator.evaluate(postfix);
		return result;
	}
	setHistory(expression: string) {
		this.#history.push(expression);
		localStorage.setItem("prev_calculations", this.#history.join(","));
	}
	clearHistory() {
		localStorage.clear();
	}
	getHistory() {
		const prev_calculations = localStorage.getItem("prev_calculations");
		if (prev_calculations) this.#history = prev_calculations.split(",");
		return this.#history;
	}
}
