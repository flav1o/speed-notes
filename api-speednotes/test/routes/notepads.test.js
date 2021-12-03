const request = require('supertest');
const app = require('../../src/app');

// test('Test #1 - Listar os utilizadores', () => {
//     return request(app).get('/notepad/:url')
//       .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body.length).toBeGreaterThan(0);
//       });
//   });