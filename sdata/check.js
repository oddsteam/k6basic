import http from 'k6/http';
import { check, group, sleep } from "k6";

export default function () {
  http.get('http://host.docker.internal:3001/mock5mb');
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
