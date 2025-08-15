import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 5,
  duration: '5s',
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status is 200': (r) => r.status === 200 });
}

// export function เพื่อให้ k6 สร้าง report
export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
  };
}