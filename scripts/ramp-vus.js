import http from 'k6/http';
import { check, group, sleep } from "k6";


export const options = {
  stages: [
    { duration: '1m', target: 2 },
    { duration: '1m', target: 4 },
    { duration: '1m', target: 6 },
    { duration: '3m', target: 8 },
    { duration: '1m', target: 6 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  http.get('http://host.docker.internal:3001/mock5mb');
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
