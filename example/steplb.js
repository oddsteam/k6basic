import http from "k6/http";
import { check, group, sleep } from "k6";

export const options = {
    stages: [
      { duration: '10s', target: 1 },
      { duration: '10s', target: 2 },
      { duration: '10s', target: 4 },
      { duration: '2m', target: 6 },
    ],
  };

export default async function () {
  let token = "";
  group("GET Hello", function () {
    let res = http.get("http://host.docker.internal:8088/hello");
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
  group("GET Token", function () {
    let res = http.get("http://host.docker.internal:8088/token");
    //console.log(res.body);
    let j = JSON.parse(res.body);
    token = j.token;
    //console.log(token);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
  group("Load MockData", function () {
    let res = http.get("http://host.docker.internal:8088/datamock", {
      headers: { Authorization: "Bearer " + token },
    });

    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
