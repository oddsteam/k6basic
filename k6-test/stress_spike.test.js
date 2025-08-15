import http from 'k6/http';
import { check } from 'k6';

const TEST_URL = 'http://localhost:3001/hello';
//const TEST_URL = `https://banana-shop-ta-twan.pea-workshops.odd.works/api/products`;
export const options = {
  scenarios: {
    // Stress test: ค่อย ๆ เพิ่มโหลด
    stress: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 200,
      maxVUs: 3000,
      stages: [
        { target: 200, duration: '2m' },
        { target: 500, duration: '3m' },
        { target: 800, duration: '3m' },
        { target: 1200, duration: '3m' },
        { target: 100, duration: '1m' },
      ],
    },
    // Spike test: โหลดกระชากทันที
    spike: {
      executor: 'ramping-vus',
      startTime: '12m',
      stages: [
        { duration: '30s', target: 100 },   // อุ่นเครื่อง
        { duration: '5s',  target: 2000 },  // กระชาก
        { duration: '1m',  target: 2000 },  // ค้างบนพีก
        { duration: '2m',  target: 100 },   // ผ่อนลง
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.02'],   // error < 2%
    http_req_duration: ['p(95)<600']  // p95 < 600ms
  },
};

export default function () {
  const res = http.get(`${TEST_URL}`);
  check(res, { 'status is 200': (r) => r.status === 200 });
}