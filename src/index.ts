// Import Statements
import Calculator from "./utils/Calculator.js";
import { InfixtoPostfix } from "./utils/infixToPostfix.js";
import PostfixEvaluator from "./utils/postfixEvaluation.js";
import TokenParser from "./utils/tokenizer.js";
const tokenParser = new TokenParser();
const postfixEvaluater = new PostfixEvaluator();
const infixToPostfix = new InfixtoPostfix();
let overWrite = false;
let errorFlag = false;
let prev_calculations: string[] = [];
// Calculator class instance
const calc = new Calculator(tokenParser, infixToPostfix, postfixEvaluater);
prev_calculations = calc.getHistory();

// element selectors
let themeBtn = document.getElementById("themeBtn") as HTMLButtonElement;
let themeIcon = document.getElementsByClassName(
	"theme-icon",
)[0] as HTMLSpanElement;
let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
let currentDisplay = document.getElementById(
	"currentDisplay",
) as HTMLDivElement;
let historyDisplay = document.getElementById(
	"historyDisplay",
) as HTMLDivElement;
let numberBtn = document.getElementsByClassName(
	"calculator-wrapper",
)[0] as HTMLButtonElement;
let clearHistoryBtn = document.getElementById(
	"clearHistoryBtn",
) as HTMLButtonElement;
let historyList = document.getElementById("historyList") as HTMLDivElement;
let emptyHistoryMessage = document.getElementsByClassName(
	"empty",
)[0] as HTMLParagraphElement;

// Dark theme toggle Event Listener
themeBtn.addEventListener("click", () => {
	console.log("Dark Theme Event Listener");
	body.classList.toggle("dark-mode");
	themeIcon.innerHTML == "☀️"
		? (themeIcon.innerHTML = "🌙")
		: (themeIcon.innerHTML = "☀️");
});
// clear history event listener
clearHistoryBtn.addEventListener("click", () => {
	calc.clearHistory();
	prev_calculations = [];
	historyList.innerHTML = "";
	emptyHistoryMessage.style.display = "block";
	historyList.append(emptyHistoryMessage);
});
// adding keyboard listener for taking input for keyboard
body.addEventListener("keydown", (event) => {
	let currentKeyboardKey = event.key;
	console.log(currentKeyboardKey.toLowerCase());
	const keyboardActionObject: Record<string, () => void> = {
		backspace: () => {
			currentDisplay.textContent = handleActionInput(
				"delete",
				currentDisplay.textContent,
			);
		},
		c: () => {
			currentDisplay.textContent = handleActionInput(
				"clear",
				currentDisplay.textContent,
			);
		},
		enter: () => {
			currentDisplay.textContent = handleActionInput(
				"calculate",
				currentDisplay.textContent,
			);
		},
	};
	if (currentKeyboardKey.match(/[0-9+\/*-]/)) {
		currentDisplay.innerHTML += event.key;
	} else {
		if (currentKeyboardKey.toLowerCase() in keyboardActionObject) {
			keyboardActionObject[currentKeyboardKey?.toLowerCase()]?.();
		}
	}
	event.stopPropagation();
});
intialRender();
// Event listener for taking user input expression
numberBtn.addEventListener("click", (event) => {
	if (overWrite == false || errorFlag == true) {
		currentDisplay.textContent = "";
		overWrite = true;
		errorFlag = false;
	}
	// accessing current target element
	let currentTargetElement = event.target! as HTMLDataListElement;
	let characterToAdd = "";
	console.log(currentTargetElement.dataset);
	const handlers: Record<
		string,
		(cur_element: HTMLDataListElement) => string | void
	> = {
		operator: (el) => handleOperatorInput(el),
		number: (el) => handleNumberInput(el),
		function: (el) => handleFunctionInput(el),
		action: (el) => {
			currentDisplay.textContent = handleActionInput(
				el.dataset.action!,
				currentDisplay.textContent,
			);
		},
	};
	if (currentTargetElement.nodeName == "BUTTON") {
		const type = Object.keys(handlers).find(
			(key) => currentTargetElement.dataset[key],
		);

		if (!type) {
			return;
		}
		const executeFunction = handlers[type];
		if (!executeFunction) {
			return;
		}
		const result = executeFunction(currentTargetElement);
		characterToAdd = result ? result : "";
	}
	currentDisplay.innerHTML += characterToAdd;
	event.stopPropagation();
});
function handleOperatorInput(currentTargetElement: HTMLDataListElement) {
	if (!currentTargetElement.dataset.operator)
		throw new Error("Element didn't have any operator data attribute");
	return currentTargetElement.dataset.operator;
}
function handleNumberInput(currentTargetElement: HTMLDataListElement) {
	if (!currentTargetElement.dataset.number)
		throw new Error("Element didn't have any number data attribute");
	return currentTargetElement.dataset.number;
}
function handleFunctionInput(currentTargetElement: HTMLDataListElement) {
	if (!currentTargetElement.dataset.function)
		throw new Error("Element didn't have any function data attribute");
	let funcToAdd = currentTargetElement.dataset.function;
	if (currentTargetElement.dataset.parenthesis) {
		funcToAdd += "(";
	}
	return funcToAdd;
}
function handleActionInput(currentAction: string, currentExpression: string) {
	const tempObject: Record<string, () => void> = {
		clear: () => {
			currentExpression = "";
		},
		delete: () => {
			// checking if any sin log cos or other function comes
			let idxTillSlice = currentExpression.length - 1;
			if (
				currentExpression[currentExpression.length - 1]!.match(
					/[a-df-z]/,
				)
			) {
				for (; idxTillSlice >= 0; idxTillSlice--) {
					if (currentExpression[idxTillSlice]!.match(/[^a-df-z]/))
						break;
				}
				idxTillSlice++;
			}
			currentExpression = currentExpression.slice(0, idxTillSlice);
		},
		calculate: () => {
			currentExpression = calculateExpression(currentExpression);
			if (historyDisplay.textContent !== "") {
				calc.setHistory(historyDisplay.textContent);
				addHistoryItem(historyDisplay.textContent);
			}
		},
		reciprocal: () => {
			currentExpression = calculateReciprocal(currentExpression);
			if (historyDisplay.textContent !== "") {
				calc.setHistory(historyDisplay.textContent);
				addHistoryItem(historyDisplay.textContent);
			}
		},
		toggleSign: () => {
			currentExpression = toggleSign(currentExpression);
		},
	};
	// if (currentAction === "clear") {
	// 	currentExpression = "";
	// } else if (currentAction === "delete") {
	//  	// checking if any sin log cos or other function comes
	// 	let idxTillSlice = currentExpression.length - 1;
	// 	if (currentExpression[currentExpression.length - 1].match(/[a-df-z]/)) {
	// 		for (; idxTillSlice >= 0; idxTillSlice--) {
	// 			if (currentExpression[idxTillSlice].match(/[^a-df-z]/)) break;
	// 		}
	// 		idxTillSlice++;
	// 	}
	// 	currentExpression = currentExpression.slice(0, idxTillSlice);
	// } else if (currentAction == "calculate") {
	// 	currentExpression = calculateExpression(currentExpression);
	// 	if (historyDisplay.textContent !== "") {
	// 		calc.setHistory(historyDisplay.textContent);
	// 		addHistoryItem(historyDisplay.textContent);
	// 	}
	// } else if (currentAction == "reciprocal") {
	// 	currentExpression = calculateReciprocal(currentExpression);
	// 	if (historyDisplay.textContent !== "") {
	// 		calc.setHistory(historyDisplay.textContent);
	// 		addHistoryItem(historyDisplay.textContent);
	// 	}
	// } else {
	// 	currentExpression = toggleSign(currentExpression);
	// }
	tempObject[currentAction]!();
	return currentExpression;
}
function calculateExpression(expression: string) {
	try {
		let result = calc.evaluate(expression);
		historyDisplay.innerHTML = expression + " = " + result;
		return result;
	} catch (error) {
		historyDisplay.innerHTML = "";
		errorFlag = true;
		if (error instanceof Error) return error.message;
		return "";
	}
}
function calculateReciprocal(expression: string) {
	try {
		let result = calculateExpression(expression);
		if (Number.parseFloat(result) === 0)
			throw new Error("Invalid Expression : Cant divide by Zero");
		let str = "1/" + result;
		result = eval(str);
		historyDisplay.textContent = " 1 / " + historyDisplay.textContent;
		return result;
	} catch (error) {
		errorFlag = true;
		historyDisplay.innerHTML = "";
		if (error instanceof Error) return error.message;
		return "";
	}
}
function addHistoryItem(expression: string) {
	if (historyList.firstElementChild === emptyHistoryMessage) {
		emptyHistoryMessage.style.display = "none";
	}
	let historyItem = document.createElement("p");
	historyItem.textContent = expression;
	historyItem.setAttribute("class", "history-item");
	historyList.appendChild(historyItem);
}
function intialRender() {
	if (prev_calculations.length === 0) {
		emptyHistoryMessage.style.display = "block";
	} else {
		emptyHistoryMessage.style.display = "none";
		prev_calculations.forEach((expression) => {
			addHistoryItem(expression);
		});
	}
}

function toggleSign(expression: string) {
	if (!expression) return expression;

	// last part is bracket
	if (expression.endsWith(")")) {
		let count = 0;

		for (let i = expression.length - 1; i >= 0; i--) {
			if (expression[i] === ")") count++;
			if (expression[i] === "(") count--;
			// if their is minus sign remove that
			if (i != 0 && expression.slice(i - 1).startsWith("-")) {
				return expression.slice(0, i - 1) + expression.slice(i);
			}
			// if thier is no minus than add it
			if (count === 0) {
				return expression.slice(0, i) + "-" + expression.slice(i);
			}
		}
	}

	//  last part is number
	let match = expression.match(/(-?\d+\.?\d*)$/);
	if (match) {
		let number = match[0];

		let toggled = number.startsWith("-") ? number.slice(1) : "-" + number;

		return expression.slice(0, expression.length - number.length) + toggled;
	}
	match = expression.match(/-?[a-z]+\($/);
	//  last part is function
	if (match) {
		let func = match[0];
		let toggled = func.startsWith("-") ? func.slice(1) : "-" + func;
		return expression.slice(0, expression.length - func.length) + toggled;
	}
	return expression;
}
