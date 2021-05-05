install:
	npm install

publish:
	npm publish --dry-run

help:
	npx node src/bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx node --experimental-vm-modules node_modules/.bin/jest
