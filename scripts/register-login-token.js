import http from "k6/http";
import { group, sleep,check } from "k6";

export const options = {
  vus: 1,
  iterations: 10,
  duration: '30s',
};

// Create a random string of given length
function randomString(length, charset = "") {
  if (!charset) charset = "abcdefghijklmnopqrstuvwxyz";
  let res = "";
  while (length--) res += charset[(Math.random() * charset.length) | 0];
  return res;
}

const BASE_URL = "http://k6testapi:8000";

export default function () {
  const USERNAME = `${randomString(10)}@example.com`; // Set your own email or `${randomString(10)}@example.com`;
  const PASSWORD = "superCroc2019";

  group("Register a new user", () => {
    const res = http.post(`${BASE_URL}/user/register/`, {
      first_name: "Crocodile",
      last_name: "Owner",
      username: USERNAME,
      password: PASSWORD,
    });

    check(res, { "created user": (r) => r.status === 201 });
  });


  group("Login", () => {
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD,
    });

    const authToken = loginRes.json("access");
    check(authToken, { "logged in successfully": () => authToken !== "" });
  });

  sleep(1);
}
