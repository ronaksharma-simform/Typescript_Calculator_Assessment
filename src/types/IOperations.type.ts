export type TOperations = Map<string, TOperationsValue>;

export type TFunctions = Map<string, TFunctionsValue>;

export type TOperationsValue = {
	precedence: number;
	associativity: string;
	arity: number;
	execute: TExecuteFunction;
};
export type TFunctionsValue = Omit<TOperationsValue, "associativity">;
export type TExecuteFunction = (...args: number[]) => number ;
