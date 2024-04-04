import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
  stages: [
    { duration: '10s', target: 2 },
    { duration: '10s', target: 4 },
    { duration: '10s', target: 6 },
    { duration: '10s', target: 8 },
    { duration: '10s', target: 6 },
    { duration: '10s', target: 0 },
  ],
};

export default async function () {
  let token = "";
  group("GET Hello", function () {
    let res = http.get("http://host.docker.internal:3001/hello");
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
  group("GET Token", function () {
    let res = http.get("http://host.docker.internal:3001/token");
    //console.log(res.body);
    let j = JSON.parse(res.body);
    token = j.token;
    //console.log(token);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
  group("Load MockData", function () {
    let res = http.get("http://host.docker.internal:3001/mock5mb", {
      headers: { Authorization: "Bearer " + token },
    });

    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
