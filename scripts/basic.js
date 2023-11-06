import http from 'k6/http';
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: '30s', target: 7 },
    { duration: '30s', target: 8 },
    { duration: '30s', target: 9 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 15 },
    
  ],
};

export default function () {
  //http.get('https://test.k6.io');
  //sleep(1);
  let res = http.get('http://host.docker.internal:3001/mock5mb');
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  //sleep(1);
}
