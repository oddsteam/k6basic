import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1 },
  ],
};

export default function () {
  //http.get('https://test.k6.io');
  //sleep(1);
  http.get('http://host.docker.internal:3001/mock5mb');
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  //sleep(1);
}
