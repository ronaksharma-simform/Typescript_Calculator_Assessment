import * as Type from "@/types"
export const operators : Type.TOperations = new Map([
	[
		"+",
		{
			precedence: 1,
			associativity: "left",
			arity: 2,
			execute: (a:number, b:number) => a + b,
		},
	],
	[
		"-",
		{
			precedence: 1,
			associativity: "left",
			arity: 2,
			execute: (a, b) => a - b,
		},
	],
	[
		"*",
		{
			precedence: 2,
			associativity: "left",
			arity: 2,
			execute: (a, b) => a * b,
		},
	],
	[
		"/",
		{
			precedence: 2,
			associativity: "left",
			arity: 2,
			execute: (a, b) => {
				if (b === 0) {
					throw new Error("Operator / : Divide by Zero not allowed");
				}
				return a / b;
			},
		},
	],
	[
		"^",
		{
			precedence: 3,
			associativity: "right",
			arity: 2,
			execute: (a, b) => Math.pow(a, b),
		},
	],
	[
		"NEG",
		{ precedence: 4, associativity: "right", arity: 1, execute: (a) => -a },
	],
	[
		"!",
		{
			precedence: 5,
			associativity: "left",
			arity: 1,
			execute: (a) => factorial(a),
		},
	],
	[
		"%",
		{
			precedence: 2,
			associativity: "left",
			arity: 2,
			execute: (a, b) => {
				if (b === 0) {
					throw new Error("Operator % : Modulo by Zero not allowed");
				}
				return a % b;
			},
		},
	],
]);

export const functions : Type.TFunctions = new Map([
	["sin", { arity: 1, execute: (x:number) => Math.sin(x), precedence: 6 }],
	["cos", { arity: 1, execute: (x) => Math.cos(x), precedence: 6 }],
	["tan", { arity: 1, execute: (x) => Math.tan(x), precedence: 6 }],
	[
		"log",
		{
			arity: 1,
			execute: (x) => {
				if (x <= 0) {
					throw new Error(
						"Invalid Expression : Log of negative number doesnt exist",
					);
				}
				return Math.log10(x);
			},
			precedence: 6,
		},
	],
	[
		"ln",
		{
			arity: 1,
			execute: (x) => {
				if (x <= 0) {
					throw new Error(
						"Invalid Expression : Log of negative number doesnt exist",
					);
				}
				return Math.log(x);
			},
			precedence: 6,
		},
	],
	["sqrt", { arity: 1, execute: (x) => Math.sqrt(x), precedence: 6 }],
]) ;

export function factorial(num: number): number {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}
