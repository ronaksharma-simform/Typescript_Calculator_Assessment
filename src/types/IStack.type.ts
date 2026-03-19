export interface IStack {
	push(value: string): void;
	pop(): string;
	peek(): string;
	isEmpty(): boolean;
	size(): number;
	clear(): void;
}
