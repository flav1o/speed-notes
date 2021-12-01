const request = require('supertest');
const app = require('../src/app');

test('Check if there is a response.', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});
