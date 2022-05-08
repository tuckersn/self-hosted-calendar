// CALL THIS SCRIPT FROM "yarn new <name>"


const readline = require("readline");
const path = require("path");
const fs = require('fs');
const { execSync } = require("child_process");

const PACKAGES_ROOT_DIR = path.join(process.cwd(), 'packages');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(questionString) {
	return new Promise((res, err) => {
		rl.question(questionString, res);
	});
}

function json(e) {
	return JSON.stringify(e, null, 8).replace(/        /gim, "\t");
}

rl.on("close", () => {
	process.exit(0);
});



(async function main() {
	//TODO: validation for the command executions
	const PACKAGE_NAME = await question(`New package name (excluding @internal prefix): `);
	const PACKAGE_DIR = path.join(PACKAGES_ROOT_DIR, PACKAGE_NAME);

	console.log("Creating:", PACKAGE_DIR);
	fs.mkdirSync(PACKAGE_DIR);
	
	console.log("Creating:", path.join(PACKAGE_DIR, "package.json"));
	fs.writeFileSync(path.join(PACKAGE_DIR, "package.json"), json({
		name: "@internal/" + PACKAGE_NAME,
		version: "1.0.0",
		main: "index.js",
		license: "MIT",
		scripts: {
			build: "tsc",
			format: `prettier --write "src/**/*.ts`,
			test: "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha -r ts-node/register 'tests/**/*.test.ts"
		}
	}));

	console.log("Executing:", 'pnpm add --workspace @internal/ts-config')
	execSync('pnpm add --workspace @internal/ts-config');
	console.log("Creating:", path.join(PACKAGE_DIR, "tsconfig.json"));
	fs.writeFileSync(path.join(PACKAGE_DIR, "tsconfig.json"), json({
		"extends": "@internal/ts-config",
		"compilerOptions": {
			"outDir": "./dist"
		},
		"exclude": [
			"node_modules/**",
			"test/**"
		]
	}))
	console.log("Creating:", path.join(PACKAGE_DIR, "src"));
	fs.mkdirSync(path.join(PACKAGE_DIR, "src"));
	console.log("Creating:", path.join(PACKAGE_DIR, "src/index.ts"));
	fs.writeFileSync(path.join(PACKAGE_DIR, "src/index.ts"), `console.log("Hello World!");`);

	// console.log("Executing:", 'pnpm add --workspace @internal/eslint-config')
	// execSync('pnpm add --workspace @internal/eslint-config');
	// console.log("Creating:", path.join(PACKAGE_DIR, ".eslintrc"));
	// fs.writeFileSync(path.join(PACKAGE_DIR, ".eslintrc"), json({
	// 	extends: "@internal/eslint-config"
	// }));

	console.log("Creating:", path.join(PACKAGE_DIR, "tests"));
	fs.mkdirSync(path.join(PACKAGE_DIR, "tests"));
	console.log("Creating", path.join(PACKAGE_DIR, "tests/demo.test.ts"))
	fs.writeFileSync(path.join(PACKAGE_DIR, "tests/demo.test.ts"), `\t// https://mochajs.org/#getting-started
	var assert = require('assert');
	describe('Array', function () {
		describe('#indexOf()', function () {
			it('should return -1 when the value is not present', function () {
				assert.equal([1, 2, 3].indexOf(4), -1);
			});
		});
	});`.split("\n").map((s) => s.replace(/^\t/, '')).join("\n"))
	
	console.log("Executing:", 'pnpm add --workspace @internal/prettier-config')
	execSync('pnpm add --workspace @internal/prettier-config');
	console.log("Creating:", path.join(PACKAGE_DIR, ".prettierrc.js"));
	fs.writeFileSync(path.join(PACKAGE_DIR, ".prettierrc.js"), `module.exports = {
		...require("workspace:@internal/prettier-config")
	}`.split("\n").map((s) => s.trim()).join("\n"));

	console.log("Creating:", path.join(PACKAGE_DIR, ".gitignore"));
	fs.writeFileSync(path.join(PACKAGE_DIR, ".gitignore"), `
		*.test.js
	`.split("\n").map((s) => s.trim()).join("\n"));

	rl.close();
})();