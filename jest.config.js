/** @type {import('jest').Config} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	rootDir: ".",
	testMatch: ["<rootDir>/test/**/*.test.ts"],
	moduleNameMapper: {
		// Resolve the "@/types" path alias used throughout src/
		"^@/types$": "<rootDir>/src/types/index.ts",
		"^@/types/(.*)$": "<rootDir>/src/types/$1",
		// Source files use explicit ".js" extensions for NodeNext/ESM-style
		// relative imports (e.g. "./stack.js"). Strip the extension so
		// ts-jest can resolve the underlying ".ts" file under CommonJS.
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		"^.+\\.ts$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.jest.json",
			},
		],
	},
	collectCoverageFrom: [
		"src/utils/**/*.ts",
		"!src/utils/**/*.d.ts",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "text-summary", "lcov"],
	clearMocks: true,
};
