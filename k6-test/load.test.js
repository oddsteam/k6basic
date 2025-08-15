import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    steady_load: {
      executor: 'constant-arrival-rate',
      rate: 200,               // 200 requests/sec
      timeUnit: '1s',
      duration: '10m',         // ทดสอบ 10 นาที
      preAllocatedVUs: 100,
      maxVUs: 400,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],  // error < 1%
    http_req_duration: ['p(95)<300'] // p95 < 300ms
  },
};

export default function () {
  const res = http.get('http://localhost:3001/hello');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.2);
}