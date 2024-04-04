# k6basic
docker compose up -d k6-test-api
docker compose run --rm k6 run script.js
docker compose run --rm k6 run --out web-dashboard=export=test-report.html script.js