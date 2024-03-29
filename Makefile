install:
	npm install

publish:
	npm publish --dry-run

help:
	npx node ./bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx node --experimental-vm-modules node_modules/.bin/jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	npm link
