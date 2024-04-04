import http from 'k6/http';
import { check,sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 1 },
   // { duration: '20s', target: 2 },
  //  { duration: '3m', target: 3 },

   
  ],
};

export default function () {
  let res = http.get('http://loadtest-app.odd.works/mock15mb');
  //console.log(`Response time was ${res.timings.duration} ms`);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  //sleep(res.timings.duration/1000);
}

