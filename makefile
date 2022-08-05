up:
	npx rollup -c rollup.config.js -o ./public/build/main.js -m
	docker-compose up -d --build

down:
	docker-compose down

api-log:
	docker logs --tail -f api

svelte:
	npx rollup -c rollup.config.js -o ./public/build/main.js -m && \
	npm run svelte;
ts:
	npx tsc 

setup-env:
	cp ./.env.sample .env && npm install

run:
	npx tsc && \
	node --es-module-specifier-resolution=node dist/app.js 

rollup:
	npx rollup -c rollup.config.js -o ./public/build/main.js -m

run-redis:
	docker run -p 6379:6379 -d --name redis-cache-example redislabs/rejson:latest

### -v "$(pwd)"/config/dat/init.sh:/docker-entrypoint-initdb.d
run-postgres:
	docker run --name postgresql-cache-example \
	-e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 \
	-d postgres 
