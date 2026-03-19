export class Stack {
    constructor() {
        this.stack = [];
    }
    push(value) {
        this.stack.push(value);
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack underflow: cannot pop from empty stack.");
        }
        return this.stack.pop();
    }
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack Empty : cannot access from empty stack.");
        }
        return this.stack[this.stack.length - 1];
    }
    isEmpty() {
        return this.stack.length === 0;
    }
    clear() {
        this.stack.length = 0;
    }
    size() {
        return this.stack.length;
    }
}
//# sourceMappingURL=stack.js.map