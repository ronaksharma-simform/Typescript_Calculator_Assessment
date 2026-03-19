import { IStack } from "@/interfaces/IStack";
export declare class Stack implements IStack {
    private stack;
    constructor();
    push(value: string): void;
    pop(): string | undefined;
    peek(): string | undefined;
    isEmpty(): boolean;
    clear(): void;
    size(): number;
}
//# sourceMappingURL=stack.d.ts.map