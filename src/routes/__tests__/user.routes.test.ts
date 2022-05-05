import request from 'supertest';
import { app } from '../../app';

it('Registration validation failed for password field', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'testtest',
      password: 'test',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(1);
});

it('Registration validation failed for username field', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'test',
      password: 'testtest',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(1);
});

it('Registration validation failed for username and password field', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'test',
      password: 'test',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(2);
});

it('Registration has been finished', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      username: 'testtest',
      password: 'testtest',
    })
    .expect(201);

  expect(res.body.token).not.toBeUndefined();
  expect(res.body.user).not.toBeUndefined();
});

it('Login validation failed for password field', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'testtest',
      password: 'test',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(1);
});

it('Login validation failed for username field', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'test',
      password: 'testtest',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(1);
});

it('Login validation failed for username and password field', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'test',
      password: 'test',
    })
    .expect(400);

  expect(res.body.message.length).toEqual(2);
});

it('Login failed, user does not exist', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'testtest',
      password: 'testtest',
    })
    .expect(400);
});

it('Login failed, user does exist, but password does not match', async () => {
  await request(app)
    .post('/users/register')
    .send({
      username: 'testtest',
      password: 'testtest',
    })
    .expect(201);

  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'testtest',
      password: 'testtest1',
    })
    .expect(400);
});

it('Login has been finished', async () => {
  await request(app)
    .post('/users/register')
    .send({
      username: 'testtest',
      password: 'testtest',
    })
    .expect(201);

  const res = await request(app)
    .post('/users/login')
    .send({
      username: 'testtest',
      password: 'testtest',
    })
    .expect(200);
});
