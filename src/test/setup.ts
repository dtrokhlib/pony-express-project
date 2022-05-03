import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  function signin(): any;
}

let mongo: any;

beforeAll(async () => {
  process.env.jwt = 'test-jest';

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

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'test';

  const response = await request(app)
    .post('/users/register')
    .send({ email, password });

  console.log(response);
  return 'test';
};
