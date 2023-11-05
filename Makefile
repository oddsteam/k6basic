
stats:
	docker stats 
down:
	docker compose down

pull:
	docker compose pull


# k6:
# 	docker compose run k6 run --vus 1 --duration 30s /scripts/basic.js

srv1:
	docker compose down srv01 && docker compose up srv01

start-service:
	docker compose up srv01 srv02 srv03 loadbalancer

k6-csv:
	docker run -v ./report:/report --rm -i \
	grafana/k6 run  --out csv=/report/results.csv  - < ./scripts/step.js

k6:
	docker run \
	-v ./scripts:/scripts \
	-v ./report:/report \
	-p 5665:5665  \
	-it --rm grafana/k6  run \
	/scripts/basic.js

xk6:
	docker run \
	-v ./scripts:/scripts \
	-v ./report:/report \
	-p 5665:5665  \
	-it --rm ghcr.io/grafana/xk6-dashboard:latest run \
	--out dashboard=report=/report/test-report-$$(date +%Y%m%d%H%M%S).html\
	/scripts/step.js

xk6-lb:
	docker run \
	-v ./scripts:/scripts \
	-v ./report:/report \
	-p 5665:5665  \
	-it --rm ghcr.io/grafana/xk6-dashboard:latest run \
	--out dashboard=report=/report/test-reportlb.$$(date +%Y%m%d%H%M%S).html \
	/scripts/steplb.js

xk6test:
	docker run \
	-v ./scripts:/scripts \
	-v ./report:/report \
	-p 5665:5665  \
	-it --rm ghcr.io/grafana/xk6-dashboard:latest run \
	--out dashboard=report=/report/$(TEST)-report-$$(date +%Y%m%d%H%M%S).html \
	/scripts/$(TEST).js

k6test:
	docker run \
	-v ./scripts:/scripts \
	-v ./report:/report \
	-p 5665:5665  \
	-it --rm grafana/k6  run \
	/scripts/$(TEST).js



