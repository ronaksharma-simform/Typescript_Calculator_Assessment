# TypeScript Calculator Assessment

A fully modular, browser-based **Scientific Calculator** built using modern Typescript . This project demonstrates strong understanding of advanced Typescript concepts including **Generics , Type Guards, Utility Types, Interfaces,etc.**.

---

## 📑 Table of Contents

- Overview
- Features
- Currency Exchange
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

It supports both **basic arithmetic** and **advanced scientific functions**, plus a standalone **Currency Exchange** panel for converting between Indian Rupees (INR) and 5 other currencies.

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

## 💱 Currency Exchange

- Convert Indian Rupee (INR) to 5 other currencies, and vice versa
- Supported currencies: **USD, EUR, GBP, JPY, AUD**

## 🖥 UI Features

- Responsive interface
- Expression & result display
- History panel
- Clear History
- Light/Dark theme toggle
- Keyboard support
- Localstorage persistence
- Currency Exchange panel (INR ⇄ USD/EUR/GBP/JPY/AUD)

---

# 💱 Currency Exchange

A dedicated **Currency Exchange** panel sits alongside the calculator and history panel and lets you convert money between the Indian Rupee (INR) and 5 other currencies in either direction.

## Supported Currencies

| Code | Currency               |
| ---- | ---------------------- |
| USD  | US Dollar               |
| EUR  | Euro                    |
| GBP  | British Pound Sterling  |
| JPY  | Japanese Yen            |
| AUD  | Australian Dollar       |

## How to Use

1. Choose a direction: **INR → Foreign Currency** or **Foreign Currency → INR**.
2. Pick one of the 5 supported currencies.
3. Enter an amount (must be zero or a positive number).
4. Click **Convert** (or press **Enter** while the amount field is focused).
5. The converted amount is shown below the form, e.g. `₹1000 = 12 USD`.

## Implementation Notes

- Conversion logic lives in `src/utils/currencyExchange.ts` (`CurrencyConverter` class) and is fully unit tested in `test/currencyExchange.test.ts`.
- This is a static, client-side-only project with **no backend/API integration**, so exchange rates are a fixed **reference rate table** (`EXCHANGE_RATES`) rather than live market data. Update that table if you need different/current rates.
- Invalid input (negative amounts, non-numeric amounts, unsupported currency codes) is rejected with a descriptive error shown in the panel instead of throwing to the console.
- Converted amounts are rounded to 2 decimal places.

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

> **Note:** These global calculator shortcuts are automatically suspended while focus is inside
> the Currency Exchange panel's input/select fields, so typing an amount or picking a currency
> there won't leak keystrokes into the calculator display. Press **Enter** inside the amount
> field to trigger a currency conversion instead.

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
│  ├─ ITokenizer.type.ts
│  └─ ICurrencyExchange.type.ts
└─ utils/
    ├─ Calculator.ts
    ├─ infixToPostfix.ts
    ├─ operations.ts
    ├─ postfixEvaluation.ts
    ├─ stack.ts
    ├─ tokenizer.ts
    └─ currencyExchange.ts
test/
├─ calculator.test.ts
├─ infixToPostfix.test.ts
├─ operations.test.ts
├─ postfixEvaluation.test.ts
├─ stack.test.ts
├─ tokenizer.test.ts
└─ currencyExchange.test.ts

```

---

## TypeScript features Demonstrated

This project includes several TypeScript patterns to improve correctness and maintainability:

- **Interfaces & Contracts:** modules expose interfaces such as `ITokenizer`, `IStack`, `IPostfixEvaluation`, and `ICurrencyConverter` to define clear contracts between components.
- **Type aliases & utility types:** central types like `TOperations` / `TFunctions` and utility types (`Omit`, `Record`, etc.) describe operator/function/currency-rate shapes.
- **Generics:** `IStack<T>` enables reusable stack implementations for different value types while preserving type safety.
- **Union & literal types:** e.g. `Associativity = 'left' | 'right'` and `TCurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "AUD"` restrict allowed values and improve exhaustiveness checks.
- **Type guards:** runtime checks (helper functions) narrow types safely when parsing tokens (e.g. numeric vs operator tokens).
- **Module path aliases:** imports use `@/types` for clearer references (see `tsconfig.json` paths).

Recommended files to inspect for TypeScript usage:

- `src/types/*` — core type definitions
- `src/utils/tokenizer.ts` — token parsing + guards
- `src/utils/infixToPostfix.ts` — algorithm typing and operator handling
- `src/utils/postfixEvaluation.ts` — evaluation logic with typed execute functions
- `src/utils/currencyExchange.ts` — currency conversion logic with a typed rate table

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
- Invalid currency exchange input (negative/non-numeric amounts, unsupported currency codes)

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
- Static reference-rate currency conversion (INR ⇄ 5 currencies)

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
| `src/utils/currencyExchange.ts` | `test/currencyExchange.test.ts`  | INR ⇄ foreign conversion (both directions), rate lookup, validation, rounding |

Tests are **behavioural** (real assertions on inputs/outputs and thrown error messages), not
snapshot tests, and they exercise happy paths, error paths, and edge cases (division/modulo by
zero, empty expressions, mismatched parentheses, malformed postfix, negative/invalid currency
amounts, unsupported currency codes, etc.). The `Calculator`
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
toggle, history panel, currency exchange form), it should also be smoke-tested manually in a
browser after `npm start`:

- Enter expressions via on-screen buttons and via keyboard, and confirm the result matches.
- Toggle dark/light mode and confirm the icon and body class update.
- Trigger a division-by-zero / malformed expression and confirm the error message is shown.
- Add a few calculations, reload the page, and confirm history persists (and `Clear History`
  empties it).
- In the Currency Exchange panel: convert INR → USD/EUR/GBP/JPY/AUD and back, confirm the
  result updates; try a negative or blank amount and confirm a validation message is shown
  instead of a crash; confirm typing in the amount field does not leak into the calculator
  display, and that pressing Enter in the amount field triggers a conversion.

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
