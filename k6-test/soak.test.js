import http from 'k6/http';
import { check, sleep } from 'k6';
const TEST_URL = 'http://localhost:3001/hello';
//const TEST_URL = `https://banana-shop-ta-twan.pea-workshops.odd.works/api/products`;
export const options = {
  scenarios: {
    soak: {
      executor: 'constant-arrival-rate',
      rate: 50,                // 50 requests/sec
      timeUnit: '1s',
      duration: '8h',           // ยิงต่อเนื่อง 8 ชั่วโมง
      preAllocatedVUs: 60,
      maxVUs: 200,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.005'], // error < 0.5%
    http_req_duration: ['p(95)<400'] // p95 < 400ms
  },
};

export default function () {
  const res = http.get('http://localhost:3001/hello');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}