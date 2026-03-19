import * as Type from "@/types";
export interface IPosfixConversion {
	operators: Type.TOperations;
	functions: Type.TFunctions;
    convert(tokens:string[]):string[]
}
