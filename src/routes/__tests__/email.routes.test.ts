import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Email } from '../../models/email.model';

const objectId = mongoose.Types.ObjectId;

it('CREATE email authorization fail', async () => {
  await request(app).post('/emails').send().expect(401);
});

it('CREATE email validation fail', async () => {
  const token = await global.signin();
  const res = await request(app)
    .post('/emails')
    .set('Authorization', `Bearer ${token}`)
    .send({
      from: '',
      to: '',
      subject: '',
      body: '',
    })
    .expect(400);

  expect(res.body.length).toEqual(4);
});

it('CREATE email has been finished', async () => {
  const token = await global.signin();
  const res = await request(app)
    .post('/emails')
    .set('Authorization', `Bearer ${token}`)
    .send({
      from: 'test@test.com',
      to: 'test@test.com',
      subject: 'testtesttest',
      body: 'testtesttest',
    })
    .expect(201);

  expect(res.body.userId).toBeDefined();
  expect(res.body.from).toEqual('test@test.com');
  expect(res.body.to).toEqual('test@test.com');
  expect(res.body.subject).toEqual('testtesttest');
  expect(res.body.body).toEqual('testtesttest');
});

it('UPDATE email authorization fail', async () => {
  await request(app).patch(`/emails/${new objectId()}`).send().expect(401);
});

it('UPDATE which is not exist', async () => {
  const token = await global.signin();
  const res = await request(app)
    .patch('/emails')
    .set('Authorization', `Bearer ${token}`)
    .send({
      subject: 'testtest',
      body: 'testtest',
    })
    .expect(404);
});

it('UPDATE email without permission to perform actions on the email', async () => {
  const token = await global.signin();
  const email = await global.createEmail(token);
  const fakeToken = await global.signin('fakeUser', 'fakePassword');
  const res = await request(app)
    .patch(`/emails/${email.id}`)
    .set('Authorization', `Bearer ${fakeToken}`)
    .send({
      subject: 'testtest',
      body: 'testtest',
    })
    .expect(403);
});

it('UPDATE email has been finished', async () => {
  const token = await global.signin();
  const email = await global.createEmail(token);
  const res = await request(app)
    .patch(`/emails/${email.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      subject: 'testtest2',
      body: 'testtest2',
    })
    .expect(200);

  expect(res.body.subject).toEqual('testtest2');
  expect(res.body.body).toEqual('testtest2');
});

it('DELETE email which is not exist', async () => {
  const token = await global.signin();
  const res = await request(app)
    .delete('/emails')
    .set('Authorization', `Bearer ${token}`)
    .send({
      subject: 'testtest',
      body: 'testtest',
    })
    .expect(404);
});

it('DELETE email authorization fail', async () => {
  await request(app).delete(`/emails/${new objectId()}`).send().expect(401);
});

it('DELETE email without permission to perform actions on the email', async () => {
  const token = await global.signin();
  const email = await global.createEmail(token);
  const fakeToken = await global.signin('fakeUser', 'fakePassword');
  const res = await request(app)
    .delete(`/emails/${email.id}`)
    .set('Authorization', `Bearer ${fakeToken}`)
    .send()
    .expect(403);
});

it('DELETE email has been finished', async () => {
  const token = await global.signin();
  const email = await global.createEmail(token);
  const res = await request(app)
    .delete(`/emails/${email.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(204);

  const checkEmail = await Email.findById(email.id);
  expect(checkEmail).toBe(null);
});

it('GET emailById has been finished', async () => {
  const token = await global.signin();
  const email = await global.createEmail(token);
  const res = await request(app)
    .get(`/emails/${email.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);

  expect(res.body.userId).toBeDefined();
  expect(res.body.from).toBeDefined();
  expect(res.body.to).toBeDefined();
  expect(res.body.subject).toBeDefined();
  expect(res.body.body).toBeDefined();
});

it('GET emails authorization fail', async () => {
  await request(app).get('/emails').send().expect(401);
});
