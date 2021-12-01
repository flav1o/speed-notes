const supertest = require('supertest');

const request = supertest('http://localhost:3001');

test('Check if the server is up.', () => {
  return request.get('/')
    .then((res) => expect(res.status).toBe(200));
});
