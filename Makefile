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
	--keep-names \
	src/index.tsx

dev: dist/index.html
	$(ESBUILD) --serve=9000 --servedir=dist --define:API_BASE_URL='"http://localhost:5000/api"'

build: dist/index.html
	$(ESBUILD) --minify --define:API_BASE_URL='"https://howtheyvote.eu/api"'

dist/index.html: src/index.html
	mkdir -p dist
	cp src/index.html dist/index.html
