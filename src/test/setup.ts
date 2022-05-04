import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  function signin(username?: string, password?: string): any;
  function createEmail(token: string): any;
}

let mongo: any;

beforeAll(async () => {
  process.env.jwt = 'test-jest';
  process.env.JWT_SECRET = 'randomSecretForTest'
  process.env.ROUNDS = '6';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = async (
  username: string = 'testtesttest',
  password: string = 'testtesttest'
) => {
  const response = await request(app)
    .post('/users/register')
    .send({ username, password });

  return response.body.token;
};

global.createEmail = async (token: string) => {
  const email = await request(app)
    .post('/emails')
    .set('Authorization', `Bearer ${token}`)
    .send({
      from: 'test@test.com',
      to: 'test@test.com',
      subject: 'testtesttest',
      body: 'testtesttest',
    });

  return email.body;
};
