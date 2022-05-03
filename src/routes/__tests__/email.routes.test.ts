import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const objectId = mongoose.Types.ObjectId;

it('CREATE email authorization fail', async () => {
  await request(app).post('/emails').send().expect(401);
});

it('GET emails authorization fail', async () => {
  await request(app).get('/emails').send().expect(401);
});

it('GET emailById authorization fail', async () => {
  await request(app).get(`/emails/${new objectId()}`).send().expect(401);
});

it('UPDATE authorization fail', async () => {
  await request(app).patch(`/emails/${new objectId()}`).send().expect(401);
});

it('DELETE email authorization fail', async () => {
  await request(app).delete(`/emails/${new objectId()}`).send().expect(401);
});
