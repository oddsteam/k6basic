import http from 'k6/http';

export default function () {
  http.get('http://app-srv01:3000/hello250ms');
};