import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    stages: [
      { duration: '10s', target: 2 },
     
    ],
  };
export default function () {
  http.get('http://host.docker.internal:8801/image/png');
  sleep(1);
  //http.get('http://host.docker.internal:3001/mock5mb');
  //sleep(1);
}
