default: lint typecheck

lint:
	./node_modules/.bin/biome check src

lint-fix:
	./node_modules/.bin/biome check --write src

typecheck:
	./node_modules/.bin/tsc --noEmit

ESBUILD = ./node_modules/.bin/esbuild \
	--bundle \
	--public-path=/dist \
	--sourcemap \
	--outfile=dist/index.js \
	--minify \
	--keep-names \
	src/index.tsx

dev: dist/index.html
	$(ESBUILD) --serve=9000 --servedir=dist

build: dist/index.html
	$(ESBUILD)

dist/index.html: src/index.html
	mkdir -p dist
	cp src/index.html dist/index.html
