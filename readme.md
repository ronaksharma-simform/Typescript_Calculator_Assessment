# TypeScript Calculator Assessment

A fully modular, browser-based **Scientific Calculator** built using modern Typescript . This project demonstrates strong understanding of advanced Typescript concepts including **Generics , Type Guards, Utility Types, Interfaces,etc.**.

---

## 📑 Table of Contents

- Overview
- Features
- Technologies Used
- Folder Structure
- Typescript Concepts Demonstrated
- How Expression Evaluation Works
- Error Handling
- How to Run
- Testing
- License

---

# 📌 Overview

This Scientific Calculator is built with a focus on:

- Clean, maintainable Typescript code
- Robust expression evaluation (no eval)
- UI/UX responsiveness

It supports both **basic arithmetic** and **advanced scientific functions**.

---

# 🌟 Features

## 🔢 Basic Operations

- Addition (+)
- Subtraction (−)
- Multiplication (×)
- Division (÷)
- Modulus (%)
- Evaluate (=)

## 🔬 Scientific Functions

- sin(x), cos(x), tan(x)
- x^y (power)
- π, e
- Factorial

## 🖥 UI Features

- Responsive interface
- Expression & result display
- History panel
- Clear History
- Light/Dark theme toggle
- Keyboard support
- Localstorage persistence

---

# ⌨️ Keyboard Support

The calculator includes full keyboard support for faster and more convenient input.
The following keys are supported:

## 🔢 Number Keys (0–9)

All numeric keys can be used directly to enter numbers.

## ➕ Operators

The following operator keys work as expected:

- \+ (Addition)
- \- (Subtraction)
- \* (Multiplication)
- / (Division)
- % (Modulus)

## ↩️ Backspace

Backspace key deletes the last character from the current expression.

## 🧹 Clear Input

Press C or c to clear the entire input instantly.

## ✔️ Evaluate Expression

Press Enter to evaluate the current expression.

# 🧰 Technologies Used

- HTML5
- CSS3
- Typescript 4.9
- Jest + ts-jest (unit testing)

---

# 🗂 Folder Structure

```
/ (project root)
├─ index.html
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.build.json
├─ tsconfig.jest.json
├─ jest.config.js
├─ tsconfig.tsbuildinfo
├─ readme.md
├─ css/
│  └─ style.css
└─ js/
   ├─ script.js
src/
├─ index.ts
├─ types/
│  ├─ index.ts
│  ├─ IOperations.type.ts
│  ├─ IPostfixConversion.type.ts
│  ├─ IPostfixEvaluation.type.ts
│  ├─ IStack.type.ts
│  └─ ITokenizer.type.ts
└─ utils/
    ├─ Calculator.ts
    ├─ infixToPostfix.ts
    ├─ operations.ts
    ├─ postfixEvaluation.ts
    ├─ stack.ts
    └─ tokenizer.ts
test/
├─ calculator.test.ts
├─ infixToPostfix.test.ts
├─ operations.test.ts
├─ postfixEvaluation.test.ts
├─ stack.test.ts
└─ tokenizer.test.ts

```

---

## TypeScript features Demonstrated

This project includes several TypeScript patterns to improve correctness and maintainability:

- **Interfaces & Contracts:** modules expose interfaces such as `ITokenizer`, `IStack`, and `IPostfixEvaluation` to define clear contracts between components.
- **Type aliases & utility types:** central types like `TOperations` / `TFunctions` and utility types (`Omit`, etc.) describe operator/function shapes.
- **Generics:** `IStack<T>` enables reusable stack implementations for different value types while preserving type safety.
- **Union & literal types:** e.g. `Associativity = 'left' | 'right'` restricts allowed values and improves exhaustiveness checks.
- **Type guards:** runtime checks (helper functions) narrow types safely when parsing tokens (e.g. numeric vs operator tokens).
- **Module path aliases:** imports use `@/types` for clearer references (see `tsconfig.json` paths).

Recommended files to inspect for TypeScript usage:

- `src/types/*` — core type definitions
- `src/utils/tokenizer.ts` — token parsing + guards
- `src/utils/infixToPostfix.ts` — algorithm typing and operator handling
- `src/utils/postfixEvaluation.ts` — evaluation logic with typed execute functions

These TypeScript features help catch bugs early, document intent, and make refactors safer.

# ⚙️ Expression Evaluation Workflow

```
Infix Input → Tokenizer → Shunting Yard (Infix → Postfix) → Postfix Evaluation → Result
```

# 🔁 Shunting Yard Algorithm

The **Shunting Yard Algorithm** converts an **infix expression** (human-readable format) into **postfix notation (Reverse Polish Notation)**, which is easier to evaluate using a stack.

Example:

Infix: 3 + 4 _ 2  
Postfix: 3 4 2 _ +

---

## ⚙️ How It Works (Simplified)

The algorithm uses:

- Output Queue
- Operator Stack

Rules:

1. Numbers → go directly to output.
2. Operators → pushed to stack (respecting precedence).
3. `(` → pushed to stack.
4. `)` → pop operators until `(` is found.
5. After processing all tokens → pop remaining operators to output.

---

## 📊 Operator Precedence

| Operator | Precedence | Associativity |
| -------- | ---------- | ------------- |
| !        | Highest    | Right         |
| ^        | High       | Right         |
| \*, /, % | Medium     | Left          |
| +, −     | Low        | Left          |

---

## 🧪 Example with Parentheses

Infix: (3 + 4) _ 2  
Postfix: 3 4 + 2 _

---

## 🧠 Why Use It?

- Handles operator precedence correctly
- Supports parentheses
- Avoids using `eval()`
- Enables safe stack-based evaluation

## **Time Complexity:** O(n)

# 🛡 Error Handling

The calculator safely handles:

- Division by zero
- Invalid expressions
- Malformed input
- Scientific domain errors

---
## Prerequisites

- Node.js (16+ recommended)
- npm (bundled with Node.js)

## Installation

Follow the steps below to run the project locally.

### Clone the repository

Replace `<repo-url>` with the actual repository URL:

```bash
git clone https://github.com/ronaksharma-simform/calculator_assessment
```

Navigate into the project directory
cd calculator_assessment

Install dev dependencies:

```bash
npm install
```

## Available scripts

- `npm run build` — Compile TypeScript using `tsconfig.build.json`.
- `npm run watch` — Compile in watch mode.
- `npm run serve` — Serve project root (useful for quick HTML preview).
- `npm run serve:dist` — Serve the built `dist` folder.
- `npm start` — Build then serve `dist` (recommended for checking built output).
- `npm test` — Run the Jest unit test suite once.
- `npm run test:watch` — Run the Jest unit test suite in watch mode while developing.
- `npm run test:coverage` — Run the Jest unit test suite and print a coverage report.

### Development workflow

1. Compile continuously while editing:

```bash
npm run watch
```

2. Open the app directly without building (serves project root):

```bash
npm run serve
# then open http://localhost:8080
```

3. To test the production build flow (compile, then serve `dist`):

```bash
npm start
# then open http://localhost:8080
```

If you prefer a different static server you can also use `npx http-server . -p 8080` or any other static server.

---

Files of interest:

- `src/` — TypeScript source
- `test/` — Jest unit test suite
- `index.html` — Entry HTML
- `tsconfig.build.json` — build config
- `tsconfig.jest.json` — TypeScript config used to compile tests under Jest
- `jest.config.js` — Jest configuration (ts-jest + jsdom)
- `package.json` — npm scripts

If you want, I can run `npm install` now and start the server for you.

## Screenshots

### Light theme.

<img src="./images/light_mode.png" alt="Calculator Screenshot"   />

### Dark theme.

<img src="./images/dark_mode.png" alt="Dark theme"   />

### History panel.

<img src="./images/calculations_history.png" alt="Calculations History"   />

## 📌 Key Takeaways

This project demonstrates:

- Advanced understanding of expression parsing
- Data structure implementation (Stack)
- Algorithm implementation (Shunting Yard)
- Modular ES6 architecture
- Clean error handling strategy
- DOM event management
- Local storage state persistence

---

# 🧪 Testing

The core calculator logic (`src/utils/*`) is covered by an automated **Jest + ts-jest** unit
test suite. UI/DOM wiring in `src/index.ts` is intentionally left to manual/browser QA — the
test suite focuses on the pure, algorithmic modules that produce a calculation result.

## What's covered

| Module                        | Test file                       | Focus                                                                |
| ------------------------------ | -------------------------------- | --------------------------------------------------------------------- |
| `src/utils/stack.ts`           | `test/stack.test.ts`             | Push/pop/peek/clear/size, underflow errors                            |
| `src/utils/operations.ts`      | `test/operations.test.ts`        | Every operator & scientific function, `factorial()`, divide/mod-by-0  |
| `src/utils/tokenizer.ts`       | `test/tokenizer.test.ts`         | Tokenization, unary minus, implicit multiplication, constants, errors |
| `src/utils/infixToPostfix.ts`  | `test/infixToPostfix.test.ts`    | Shunting-yard precedence, associativity, parentheses, mismatched `()` |
| `src/utils/postfixEvaluation.ts` | `test/postfixEvaluation.test.ts` | RPN evaluation, malformed expressions, arity errors                  |
| `src/utils/Calculator.ts`      | `test/calculator.test.ts`        | End-to-end `evaluate()` pipeline + `localStorage` history persistence |

Tests are **behavioural** (real assertions on inputs/outputs and thrown error messages), not
snapshot tests, and they exercise happy paths, error paths, and edge cases (division/modulo by
zero, empty expressions, mismatched parentheses, malformed postfix, etc.). The `Calculator`
suite runs the real tokenizer → shunting-yard → evaluator pipeline together (no mocks) so the
full expression-evaluation flow is verified end-to-end, and uses jsdom's `localStorage` to
verify history persistence.

## Running the tests

```bash
npm install
npm test              # run once
npm run test:watch    # re-run on file changes
npm run test:coverage # run with a coverage summary
```

Test files live under `test/` and are excluded from the production build (`tsconfig.build.json`
excludes `**/*.test.ts`), so they never ship in `dist/`.

## Manual / browser QA

Because `src/index.ts` directly manipulates the DOM (button clicks, keyboard shortcuts, theme
toggle, history panel), it should also be smoke-tested manually in a browser after `npm start`:

- Enter expressions via on-screen buttons and via keyboard, and confirm the result matches.
- Toggle dark/light mode and confirm the icon and body class update.
- Trigger a division-by-zero / malformed expression and confirm the error message is shown.
- Add a few calculations, reload the page, and confirm history persists (and `Clear History`
  empties it).

## Contributing

Contributions are welcome! You can:

- Fork the repository

- Create a new branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m "Add feature")
- Add or update tests under `test/` for any behavioural change (`npm test` must pass)

- Push to the branch (git push origin feature/your-feature)

- Open a Pull Request

## License

This project is for assessment purposes. Modify and use as needed.
