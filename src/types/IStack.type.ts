export interface IStack<T = string> {
	push(value: T): void;
	pop(): T;
	peek(): T;
	isEmpty(): boolean;
	size(): number;
	clear(): void;
}
