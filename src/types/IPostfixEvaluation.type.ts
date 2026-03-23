import * as Type from "@/types";
export interface IPostfixEvaluation {
	operators: Type.TOperations;
	functions: Type.TFunctions;
    evaluate(tokens:string[]):string
}
