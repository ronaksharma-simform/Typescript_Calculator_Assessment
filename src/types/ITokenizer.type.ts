import * as Type from "@/types";
export interface ITokenizer {
	operators: Type.TOperations;
	functions: Type.TFunctions;
	tokenParser(expression: string): string[];
}
export type validateEnding = (tokens: string[]) => void;