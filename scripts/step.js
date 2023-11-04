import http from "k6/http";
import { check, group, sleep } from "k6";

export default async function () {
  let token = "";

  group("GET Token", function () {
    let res = http.get("http://app-srv01:3000/token");
    //console.log(res.body);
    let j = JSON.parse(res.body);
    token = j.token;
    //console.log(token);
    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
  group("Load MockData", function () {
    let res = http.get("http://app-srv01:3000/datamock", {
      headers: { Authorization: "Bearer " + token },
    });

    check(res, {
      "is status 200": (r) => r.status === 200,
    });
  });
}
